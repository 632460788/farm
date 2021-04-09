import axios from '../axios'
import qs from "qs";

/*
 * 新闻获取模块
 */

// 获取指定时间内的新闻
export const findNewsByTime = params => {
  return axios({
    url: 'news/findNewsByTime',
    method: 'get',
    params
  })
}
