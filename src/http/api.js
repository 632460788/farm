/*
 * 接口统一集成模块
 */
import * as login from './modules/login'
import * as user from './modules/user'
import * as menu from './modules/menu'
import * as log from './modules/log'
import * as lot from './modules/lot'
import * as sensor from './modules/sensor'
import * as device from './modules/device'
import * as dailyjobs from './modules/dailyjobs'
import * as irrigation from './modules/irrigation'
import * as fertilization from './modules/fertilization'
import * as ipcamera from './modules/ipcamera'


// 默认全部导出
export default {
  login,
  user,
  menu,
  log,
  lot,
  sensor,
  device,
  dailyjobs,
  irrigation,
  fertilization,
  ipcamera
}
