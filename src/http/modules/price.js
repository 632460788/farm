import axios from '../axios'

/*
 * 枳壳价格数据获取模块
 */

// 获取指定时间内的产地价格数据
export const findAreaPriceByTime = params => {
  return axios({
    url: 'price/findAreaPriceByTime',
    method: 'get',
    params
  })
}


// 获取指定时间内的市场价格数据
export const findMarketPriceByTime = params => {
  return axios({
    url: 'price/findMarketPriceByTime',
    method: 'get',
    params
  })
}

