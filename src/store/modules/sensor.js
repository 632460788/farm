export default {
  state: {
    sensorListByLotID: [],  // 地块坐标信息
    allSensorList: [],  // 地块坐标信息
  },
  getters: {
    getSensorList: function (state) {
      return state.sensorListByLotID;
    }
  },
  mutations: {
    setSensorListByLotID(state, sensorListByLotID) {  // 设置地块坐标列表
      state.sensorListByLotID = sensorListByLotID;
    },
    setAllSensorList(state, allSensorList) {  // 设置地块坐标列表
      state.allSensorList = allSensorList;
      console.log("设置传感器")
      console.log(allSensorList)

      var i;
      console.log(allSensorList[1].locPoint.lat)
      //2019-11-29
      for( i=0;i<allSensorList.length;i++){

        allSensorList[i].locPoint.lat += 0.0032716465
        allSensorList[i].locPoint.lng += 0.010110953


          // allSensorList[i].locPoint.lat += 0.0058716465
          // allSensorList[i].locPoint.lng += 0.006510953
      }

      // allSensorList.forEach((item) => {
      //  item.locPoint.lat += 0.0032716465
      //   item.locPoint.lng += 0.010110953
      // });

    }
  },
  actions: {}
}
