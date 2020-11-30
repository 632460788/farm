import axios from '../axios'

/*
 * 地块模块
 */

// 查找所有地块位置信息
export const findAllLotLoc = params => {
  return axios({
    url: 'lot/findAllLotLoc',
    method: 'get',
    params
  })
}

// 按地块号查找地块位置信息
export const findLotLocByID = params => {
  return axios({
    url: 'lot/findLotLocByID',
    method: 'get',
    params
  })
}

//按地块号查找土壤熵情信息
export const findSoilEntropyByLotID = params => {
  return axios({
    url:'lot/findSoilEntropyByLotID',
    type:'get',
    params
  })
}

// Todo 查找所有的地块记录
export const findAllLotRecord = data =>{
  return axios({
    url:'lot/findAllLotRecord',
    type:'get',
    data
  })
}

// Todo 根据时间和传感器的范围查找地块记录
export const findLotRecordByTimeAndSensor = params =>{
  return axios({
    url:'lot/findLotRecordByTimeAndSensor',
    type:'get',
    params
  })
}

// Todo 根据时间范围查找地块记录
export const findLotRecordByTime = params =>{
  return axios({
    url:'lot/findLotRecordByTime',
    type:'get',
    params
  })
}

// Todo 根据传感器范围查找地块记录
export const findLotRecordBySensor = params =>{
  return axios({
    url:'lot/findLotRecordBySensor',
    type:'get',
    params
  })
}
