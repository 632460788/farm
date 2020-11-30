import axios from '../axios'
// 前端给后台发送请求
/*
 * 系统登录模块
 */

// 登录
export const login = params => {
    return axios({
        url: 'login',
        method: 'post',
      params
    })
}

// 登出
export const logout = () => {
    return axios({
        url: 'logout',
        method: 'post'
    })
}
