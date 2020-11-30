import axios from '../axios'
import qs from "qs";

/*
 * 用户管理模块
 */

// 保存
export const save = params => {
    return axios({
        url: '/user/save',
        method: 'post',
      params
    })
}
// 删除
export const batchDelete = params => {
    return axios({
        url: '/user/delete',
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
        url: '/user/findPage',
        method: 'get',
        params
    })
}
// 查找用户的菜单权限标识集合
export const findPermissions = (params) => {
    return axios({
        url: '/user/findPermissions',
        method: 'get',
        params
    })
}
