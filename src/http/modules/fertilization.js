import axios from '../axios'
import qs from "qs";

/*
 * 用户管理模块
 */

// 保存
export const save = params => {
  return axios({
    url: '/fertilizer/addFertilizerManagement',
    method: 'post',
    params
  })
}
// 删除
export const batchDelete = params => {
  return axios({
    url: '/fertilizer/delete',
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
    url: '/fertilizer/findAllFertilizerManagement',
    method: 'get',
    params
  })
}

// 分页查询
export const findPageByDate = params => {
  return axios({
    url: '/fertilizer/findDailyManagement',
    method: 'get',
    params
  })
}


