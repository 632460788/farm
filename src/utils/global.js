/**
 * 全局常量、方法封装模块
 * 通过原型挂载到Vue属性
 * 通过 this.Global 调用
 */

 // 后台管理系统服务器地址
export const baseUrl = 'https://cfeplatform.net' // 这个是远端，目前前后端联调的时候用的网址(域名目前无法使用)
// export const baseUrl = 'http://localhost:5000/api' // 这个是远端，目前前后端联调的时候用的网址(域名目前无法使用)


// export const baseUrl = 'https://192.168.3.18:8443' // 这个是远端，目前实验室前后端联调的时候用的网址

// export const baseUrl = 'https://47.92.166.81'
// export const baseUrl = 'http://47.92.166.81:8080' // 这个是远端，目前前后端联调的时候用的网址
// export const baseUrl = 'http://localhost:8080' // 这个是调试的时候，启用本地服务器进行编辑用的
 // 系统数据备份还原服务器地址
// export const backupBaseUrl = 'http://139.196.87.48:8002'
// export const backupBaseUrl = 'http://localhost:8002'

export default {
    baseUrl
    // backupBaseUrl
}


