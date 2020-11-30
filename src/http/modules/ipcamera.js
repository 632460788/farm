import axios from '../axios'

/*
 * 摄像头云台控制
 */

// 开始控制
export const startControl = params => {
  return axios({
    url: 'ipcamera/start',
    method: 'get',
    params
  })
}


// 停止控制
export const stopControl = params => {
  return axios({
    url: 'ipcamera/stop',
    method: 'get',
    params
  })
}

