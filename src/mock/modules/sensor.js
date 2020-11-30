import axios from "../../http/axios";

import Mock from 'mockjs' // 引入mockjs

const Random = Mock.Random

export function findSensorLocBylotID() {
  const lot1SensorLoc = {
    "code": 200,
    "msg": "success",
    "data": {
      "id": "1",
      "name": "地块1",
      "SensorList": [{
        "id": 1,
        'sensorType': '20',
        "sensorName": "土壤湿度电容",
        'subType': '-1',
        "locPoint": {
          "lng": 105.687202,
          "lat": 30.184705
        }
      }, {
        "id": 2,
        'sensorType': '24',
        "sensorName": "土壤湿度485",
        'subType': '-1',
        "locPoint": {
          "lng": 105.687822,
          "lat": 30.184385
        }
      }, {
        "id": 3,
        'sensorType': '15',
        "sensorName": "土壤张力30公分",
        'subType': '30',
        "locPoint": {
          "lng": 105.686878,
          "lat": 30.184728
        }
      }, {
        "id": 4,
        'sensorType': '15',
        "sensorName": "土壤张力60公分",
        'subType': '60',
        "locPoint": {
          "lng": 105.3911,
          "lat": 30.2112
        }
      }, {
        "id": 5,
        'sensorType': '15',
        "sensorName": "土壤张力90公分",
        'subType': '90',
        "locPoint": {
          "lng": 105.687651,
          "lat": 30.184533
        }
      }, {
        "id": 6,
        'sensorType': '0E',
        "sensorName": "土壤温度计",
        'subType': '-1',
        "locPoint": {
          "lng": 105.687732,
          "lat": 30.184908
        }
      }]
    }
  };
  return {
    url: 'sensor/findSensorByLotID',
    type: 'get',
    data: lot1SensorLoc
  }
}

export function findAllSensorInfo() {
  const SensorLoc = {
    "code": 200,
    "msg": "success",
    "data": [{
      "id": 1,
      'sensorType': '20',
      "sensorName": "土壤湿度电容",
      'subType': '-1',
      "locPoint": {
        "lng": 105.687202,
        "lat": 30.184705
      }
    }, {
      "id": 2,
      'sensorType': '24',
      "sensorName": "土壤湿度485",
      'subType': '-1',
      "locPoint": {
        "lng": 105.687822,
        "lat": 30.184385
      }
    }, {
      "id": 3,
      'sensorType': '15',
      "sensorName": "土壤张力30公分",
      'subType': '30',
      "locPoint": {
        "lng": 105.686878,
        "lat": 30.184728
      }
    }, {
      "id": 4,
      'sensorType': '15',
      "sensorName": "土壤张力60公分",
      'subType': '60',
      "locPoint": {
        "lng": 105.3911,
        "lat": 30.2112
      }
    }, {
      "id": 5,
      'sensorType': '15',
      "sensorName": "土壤张力90公分",
      'subType': '90',
      "locPoint": {
        "lng": 105.687651,
        "lat": 30.184533
      }
    }, {
      "id": 6,
      'sensorType': '0E',
      "sensorName": "土壤温度计",
      'subType': '-1',
      "locPoint": {
        "lng": 105.687732,
        "lat": 30.184908
      }
    }]
  };
  return {
    url: 'sensor/findAllSensorInfo',
    type: 'get',
    data: SensorLoc
  }
}

export function findSensorByStype(params) {
  let findPageData = {
    "code": 200,
    "msg": null,
    "data": {}
  }
  let pageNum = 1
  let pageSize = 10
  if (params !== null) {
    // pageNum = params.pageNum
    // pageSize = params.pageSize
  }
  let totalSize = pageNum * pageSize
  let content = this.getContent(pageNum, pageSize)
  findPageData.data.pageNum = pageNum
  findPageData.data.pageSize = pageSize
  findPageData.data.totalSize = totalSize
  findPageData.data.content = content

  return {
    url: 'sensor/findSensorBySType',
    method: 'get',
    data: findPageData
  }
}

// 新增传感器位置信息
export function addSensorInfo() {
  return {
    url: 'sensor/addSensorInfo',
    method: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}

// 新增传感器位置信息
export function modifySensorInfo() {
  return {
    url: 'sensor/modifySensorInfo',
    method: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}

// 删除传感器位置信息
export function deleteSensorInfo() {
  return {
    url: 'sensor/deleteSensorInfo',
    method: 'post',
    data: {
      "code": 200,
      "msg": null,
      "data": 1
    }
  }
}

export function getContent(pageNum, pageSize) {
  let content = []
  for (let i = 0; i < pageSize; i++) {
    let obj = {}
    obj.id = ((pageNum - 1) * pageSize) + i + 1
    obj.registerID = '8101'
    obj.registerName = '传感器 1'
    obj.sensorType = '15'
    obj.sensorName = '土壤张力'
    if (i % 2 === 0) {
      obj.registerID = '8102'
      obj.registerName = '传感器 2'
      obj.sensorType = '0E'
      obj.sensorName = '土壤温度计'

    } else if (i % 3 === 0) {
      obj.registerID = '8100'
      obj.registerName = '传感器 0'
      obj.sensorType = '24'
      obj.sensorName = '土壤湿度计485'

    } else {
      obj.registerID = '8100'
      obj.registerName = '传感器 0'
      obj.sensorType = '20'
      obj.sensorName = '土壤湿度计电容'

    }

    obj.lng = Math.round(Math.random() * 180)
    obj.lat = Math.round(Math.random() * 90)
    content.push(obj)
  }
  return content
}

// 按传感器ID号查询传感器信息
export function getSensorLive() {
  var myDate = new Date();
  // 按传感器号获取实时信息
  return {
    url: 'sensor/getSensorLive',
    method: 'get',
    data: {
      "code": 200,
      "msg": null,
      "data": [{
        'id': 3,
        'sensorType': '15',
        'sensorName': "土壤张力30公分",
        'subType': '30',
        'sensorData': [{
          'time': myDate.toLocaleTimeString('chinese', {hour12: false}),
          'value': 52.7 + Random.float(0, 10, 0, 3)
        }]
      }, {
        'id': 4,
        'sensorType': '15',
        'sensorName': "土壤张力60公分",
        'subType': '60',
        'sensorData': [{
          'time': myDate.toLocaleTimeString('chinese', {hour12: false}),
          'value': 64.3 + Random.float(0, 10, 0, 3)
        }]
      }, {
        'id': 6,
        'sensorType': '0E',
        'sensorName': "土壤温度传感器",
        'subType': '-1',
        'sensorData': [{
          'time': myDate.toLocaleTimeString('chinese', {hour12: false}),
          'value': 4.523 + Random.float(0, 10, 0, 3)
        }]
      }, {
        'id': 5,
        'sensorType': '15',
        'sensorName': "土壤张力90公分",
        'subType': '90',
        'sensorData': [{
          'time': myDate.toLocaleTimeString('chinese', {hour12: false}),
          'value': 78.7 + Random.float(0, 10, 0, 3)
        }]
      }, {
        'id': 1,
        'sensorType': '20',
        'sensorName': "土壤湿度计电容",
        'subType': '-1',
        'sensorData': [{
          'time': myDate.toLocaleTimeString('chinese', {hour12: false}),
          'value': 193.5 + Math.round((Math.random() * 10) * 100) / 100
        }]
      }, {
        'id': 2,
        'sensorType': '24',
        'sensorName': "土壤湿度计485",
        'subType': '-1',
        'sensorData': [{
          'time': myDate.toLocaleTimeString('chinese', {hour12: false}),
          'value': 193.5 + Math.round((Math.random() * 10) * 100) / 100
        }]
      }]
    }
  }
}

