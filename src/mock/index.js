import Mock from 'mockjs'
import { baseUrl } from '../utils/global'
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'
import * as lot from './modules/lot'
import * as sensor from './modules/sensor'
import * as device from './modules/device'

import qs from 'qs'

// 1. 开启/关闭[业务模块]拦截, 通过调用fnCreate方法[isOpen参数]设置.
// 2. 开启/关闭[业务模块中某个请求]拦截, 通过函数返回对象中的[isOpen属性]设置.
let isOpen = false;
fnCreate(login, isOpen);
fnCreate(user, isOpen);
fnCreate(menu, isOpen);
fnCreate(lot,isOpen);
fnCreate(sensor,isOpen);
fnCreate(device,isOpen);

/**
 * 创建mock模拟数据
 * @param {*} mod 模块
 * @param {*} isOpen 是否开启?
 */
function fnCreate (mod, isOpen = true) {
  if (isOpen) {
    for (var key in mod) {
      ((res) => {
          let url = baseUrl
          if(!url.endsWith("/")) {
            url = url + "/"
          }
          url = url + res.url
          Mock.mock(new RegExp(url), res.type, (opts) => {
            opts['data'] = opts.body ? qs.parse(opts.body) : null
            delete opts.body;
            console.log('\n');
            console.log('%cmock拦截, 请求: ', 'color:blue', opts)
            console.log('%cmock拦截, 响应: ', 'color:blue', res.data)
            return res.data
          })

      })(mod[key]() || {})
    }
  }
}
