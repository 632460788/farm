import axios from '../axios'
import qs from "qs";

/*
 * 用户管理模块
 */

// 保存
export const save = params => {
  return axios({
    url: '/jobs/addDailyManagement',
    method: 'post',
    params
  })
}
// 删除
export const batchDelete = params => {
  return axios({
    url: '/jobs/delete',
    method: 'post',
    params,
    paramsSerializer: params => {
      return qs.stringify(params, { indices: false })
    }
  })
}
// 分页查询
export const findPage = params => {
  return axios({
    url: '/jobs/findAllDailyManagement',
    method: 'get',
    params
  })
}

// 分页查询
export const findPageByDate = params => {
  return axios({
    url: '/jobs/findDailyManagement',
    method: 'get',
    params
  })
}

