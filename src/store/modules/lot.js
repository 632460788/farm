export default {
  state: {
    allLotLocList: [],  // 地块坐标信息
    lotLocByID:[],   // 按地块号查询地块坐标
    lotID:-1,
    allFlag: false , // 根据具体页面，判断是否为全局查找（具体页面的mounted函数需要做出相应改变）
    center:{lng:0,lat:0}
  },
  getters: { // 用于存储对象的计算属性，相当于vue中的computed计算属性

  },
  mutations: {// 修改state中的值
    setLotLocList(state, allLotLocList){  // 设置地块坐标列表
      // 转换坐标 GCJ-02 转成 BD-09
      // var TO_BLNG = function(lng){return lng+0.0065;};
      // var TO_BLAT = function(lat){return lat+0.0060;};
      // var TO_GLNG = function(lng){return lng-0.0065;};
      // var TO_GLAT = function(lat){return lat-0.0060;};
      /*
      谷歌地图：30.1807371265,105.6890069011
      百度地图：30.1868008898,105.6954984230
      腾讯高德：30.1807336933,105.6890076399
      图吧地图：30.1793592433,105.6843434699
      谷歌地球：30.1834592433,105.6854234699
      北纬N30°11′0.45″ 东经E105°41′7.52″
       */


      console.log("转换地图坐标")
      console.log(allLotLocList)
      var i,j;
      console.log(allLotLocList[1].locList[1].lat)
      for( i=0;i<allLotLocList.length;i++){
        var point_length = allLotLocList[i].locList.length;
        for( j=0;j<point_length;j++){


          allLotLocList[i].locList[j].lat += 0.0032716465
          allLotLocList[i].locList[j].lng += 0.010110953
        }
      }
      console.log(allLotLocList[1].locList[1].lat)


      state.allLotLocList = allLotLocList;
    },
    setLotLocByID(state, lotLocByID){  // 设置地块坐标列表
      state.lotLocByID = lotLocByID;
    },
    setLotID(state, lotID){  // 设置地块坐标列表
      state.lotID = lotID;
    },
    changeAllFlag(state,allFlag){
      state.allFlag = allFlag;
    },
    setCenter(state,lng,lat){
      state.center.lng = lng;
      state.center.lat = lat;
    }
  },
  actions: {// 不建议直接通过mutation进行修改，而是通过actions调用

  }
}
