/*
 * 菜单管理模块
 */

// 获取导航菜单树
export function findNavTree() {
  const navTreeData = {
    "code": 200,
    "msg": null,
    "data": [{
      "id": 1,
      "createBy": null,
      "createTime": null,
      "lastUpdateBy": null,
      "lastUpdateTime": null,
      "parentId": 0,
      "name": "实时数据",
      "url": "实时数据的url",
      "perms": null,
      "type": 0,
      "icon": "al-icon-firstsensor",
      "orderNum": 0,
      "delFlag": 0,
      "parentName": null,
      "level": 0,
      "children": [{
        "id": 11,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 1,
        "name": "地块监测",
        "url": "/live/lotLive",
        "perms": null,
        "type": 0,
        "icon": "al-icon-firsttiandiguanli",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": "实时数据",
        "level": 1,
      }, {
        "id": 12,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 1,
        "name": "网关监测",
        "url": "/live/routeLive",
        "perms": null,
        "type": 0,
        "icon": "al-icon-firstroute",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": "实时数据",
        "level": 1,
        "children": []
      }]
    }, {
      "id": 2,
      "createBy": null,
      "createTime": null,
      "lastUpdateBy": null,
      "lastUpdateTime": null,
      "parentId": 0,
      "name": "数据统计",
      "url": "数据统计的url",
      "perms": null,
      "type": 0,
      "icon": "al-icon-firststatics",
      "orderNum": 0,
      "delFlag": 0,
      "parentName": null,
      "level": 0,
      "children": [{
        "id": 21,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 2,
        "name": "地块记录",
        "url": "/record/lotRecord",
        "perms": null,
        "type": 0,
        "icon": "al-icon-firstkytiandi",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": null,
        "level": 1,
        "children": []
      }, {
        "id": 22,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 2,
        "name": "网关记录",
        "url": "网关记录的url",
        "perms": null,
        "type": 0,
        "icon": "al-icon-firstluyou",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": null,
        "level": 1,
        "children": []
      }]
    }, {
      "id": 3,
      "createBy": null,
      "createTime": null,
      "lastUpdateBy": null,
      "lastUpdateTime": null,
      "parentId": 0,
      "name": "视频监控",
      "url": "/cctvPage",
      "perms": null,
      "type": 0,
      "icon": "al-icon-firstlive",
      "orderNum": 0,
      "delFlag": 0,
      "parentName": null,
      "level": 0,
    }, {
      "id": 4,
      "createBy": null,
      "createTime": null,
      "lastUpdateBy": null,
      "lastUpdateTime": null,
      "parentId": 0,
      "name": "系统设置",
      "url": "系统设置的url",
      "perms": null,
      "type": 0,
      "icon": "al-icon-firstsensor",
      "orderNum": 0,
      "delFlag": 0,
      "parentName": null,
      "level": 0,
      "children": [{
        "id": 41,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 4,
        "name": "用户管理",
        "url": "/sys/userMng",
        "perms": null,
        "type": 0,
        "icon": "al-icon-firstUsermanagement",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": "系统设置",
        "level": 1,
        "children": []
      }, {
        "id": 42,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 4,
        "name": "地块管理",
        "url": "/sys/LotMng",
        "perms": null,
        "type": 0,
        "icon": "al-icon-firstlog-management",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": "系统设置",
        "level": 1,
        "children": []
      }, {
        "id": 43,
        "createBy": null,
        "createTime": null,
        "lastUpdateBy": null,
        "lastUpdateTime": null,
        "parentId": 1,
        "name": "设备管理",
        "url": "/sys/sensorMng",
        "perms": null,
        "type": 0,
        "icon": "al-icon-firstsensor",
        "orderNum": 0,
        "delFlag": 0,
        "parentName": "系统设置",
        "level": 1,
        "children": []
      }]
    }]
  }
  return {
    url: 'menu/findNavTree',
    type: 'get',
    data: navTreeData
  }
}



export function setParentName(data) {
  if (data == null) {
    return
  }
  let len = data.length
  for (let i = 0; i < len; i++) {
    let menu = data[i]
    menu.parentName = 'menu' + menu.parentId
    if (menu.children != null) {
      setParentName(menu.children)
    }
  }
}

