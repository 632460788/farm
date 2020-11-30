import axios from '../axios'

// 获取路由节点
export const getDeviceTopo = params => {
  return axios({
    url: 'device/topo',
    method: 'get',
    params
  })
}
