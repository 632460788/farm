import {baseUrl} from '../utils/global'

// 这个是默认的参数设置
export default {
  method: 'get',
  // 基础url前缀
  baseURL: baseUrl,

  // 请求头信息
  headers: {
    'Content-Type': 'application/json;charset=UTF-8',
    // 'Content-Type':'application/x-www-form-urlencoded',
    //'Access-Control-Request-Headers':'x-requested-with,content-type,access-control-allow-headers,Access-Control-Allow-Credentials',
    //
    'Access-Control-Allow-Headers': 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild, access-control-allow-credentials, access-control-allow-headers',
    'Access-Control-Allow-Credentials': 'true',
    //'Access-Control-Allow-Headers': 'Content-Type,api_key,Authorization',
    'Access-Control-Allow-Origin': '*'
  },
  // 参数
  data: {},
  // 设置超时时间
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  // 返回数据类型
  responseType: 'json'
}
