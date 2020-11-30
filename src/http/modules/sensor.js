import axios from '../axios'
import qs from 'qs'
/*
 * 传感器模块
 */

// 查找所有传感器位置信息
export const findAllSensorInfo = params => {
  return axios({
    url: 'sensor/findAllSensorInfo',
    method: 'get',
    params
  })
}


// 按地块号查找传感器位置信息
export const findSensorByLotID = params => {
  return axios({
    url: 'sensor/findSensorByLotID',
    method: 'get',
    params
  })
}
// 按传感器类型查找传感器位置信息
export const findSensorBySType = params => {
  return axios({
    url: 'sensor/findSensorBySType',
    method: 'get',
    params
  })
}
// 新增传感器位置信息
export const addSensorInfo = data => {
  return axios({
    url: 'sensor/addSensorInfo',
    method: 'post',
    data
  })
}

// 新增传感器位置信息
export const modifySensorInfo = data => {
  return axios({
    url: 'sensor/modifySensorInfo',
    method: 'post',
    data
  })
}

// 删除传感器位置信息
export const deleteSensorInfo = data => {
  return axios({
    url: 'sensor/deleteSensorInfo',
    method: 'post',
    data
  })
}

// 按传感器号获取实时信息
export const getSensorLive = params =>{
  return axios({
    url:'sensor/getSensorLive',
    method:'get',
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}


