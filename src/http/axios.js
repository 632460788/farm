import axios from 'axios';
import config from './config';
import Cookies from "js-cookie";
import router from '@/router';
import qs from 'qs'

// 使用vuex做全局loading时使用
// import store from '@/store'
export default function $axios(options) {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      baseURL: config.baseURL,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials
    })

    // request 拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get('token')
        // let token = null
        // 1. 请求开始的时候可以结合 vuex 开启全屏 loading 动画
        // console.log(store.state.loading)
        console.log('准备发送请求...')

        // 目前前端用的请求插件是axios, 这是相关的配置，采用qs 对相关参数进行约束调整
        if (config.method === 'post') { // 2019/4/10  by zzq
          config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
          config.data = qs.stringify({
            ...config.data
          })
          // config.url = config.url +"?t="+Date.now()
        }
        if (config.method === 'get') { // 2019/4/10  by zzzq
          const params = qs.parse(config.params)
          config.params = {
            ...params,
          }
        }

        // 2. 带上token
        if (token) {
          config.headers.accessToken = token

        } else {
          // 重定向到登录页面
          sessionStorage.removeItem("user")
          router.push('/login')
        }
        console.error(config)
        return config
      },

      error => {
        // 请求错误时
        console.log('request:', error)
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          console.log('timeout请求超时')
          // return service.request(originalRequest);// 再重复请求一次
        }
        // 2. 需要重定向到错误页面
        const errorInfo = error.response
        console.log(errorInfo)
        if (errorInfo) {
          error = errorInfo.data  // 页面那边catch的时候就能拿到详细的错误信息,看最下边的Promise.reject
          const errorStatus = errorInfo.status; // 404 403 500 ...
          router.push({
            path: `/error/${errorStatus}`
          })
        }
        return Promise.reject(error) // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    )

    // response 拦截器
    instance.interceptors.response.use(
      response => {
        let data;
        // alert(JSON.stringify(response.data))
        console.log('output1'+JSON.stringify(response))
        console.log('output2'+JSON.stringify(qs.parse(response.request.responseText)))
        console.log('output3'+JSON.stringify(response.data))
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = qs.parse(response.request.responseText)
        } else {
          data = response.data
        }
        // alert(JSON.stringify(data))
        if(data.code === undefined){
          console.log("登录超时，请重新登录")
          //store.commit('changeState')
          //this.$message({message: '登录超时，请重新登录 ', type: 'error'})
          sessionStorage.removeItem("user")
          this.$router.push('/');
        }


        // 根据返回的code值来做不同的处理
        switch (data.rc) {
          case 1:
            console.log(data.desc)
            break;
          case 0:
            store.commit('changeState')
            console.log('登录成功')
          default:
        }
        // 若不是正确的返回code，且已经登录，就抛出错误
        // const err = new Error(data.desc)
        // err.data = data
        // err.response = response
        // throw err
        return data
      },
      err => {
        if (err && err.response) {
          switch (err.response.status) {
            case 400:
              err.message = '请求错误'
              break
            case 401:
              err.message = '未授权，请登录'
              break
            case 403:
              err.message = '拒绝访问'
              break
            case 404:
              err.message = `请求地址出错: ${err.response.config.url}`
              break
            case 408:
              err.message = '请求超时'
              break
            case 500:
              err.message = '服务器内部错误'
              break
            case 501:
              err.message = '服务未实现'
              break
            case 502:
              err.message = '网关错误'
              break
            case 503:
              err.message = '服务不可用'
              break
            case 504:
              err.message = '网关超时'
              break
            case 505:
              err.message = 'HTTP版本不受支持'
            case 302:
              console.log("跳转到登录界面")
              break
            default:
          }
        }
        return Promise.reject(err) // 返回接口返回的错误信息
      }
    )

    // 请求处理
    instance(options).then(res => {
      resolve(res)
      return false
    }).catch(error => {
      reject(error)
    })
  })
}
