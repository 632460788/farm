<template>
  <div class="mp-view">
    <baidu-map class="bm-view" ak="3ta2Ns3XYmoIEgC3a5ovdGK0qvFiVXta" :center="getCenterPoint(lotPathList)" :zoom="zoom"
               :scroll-wheel-zoom="true">
      <!--展示比例尺-->
      <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
      <!--地块信息-->
      <bm-polygon v-for="(lot,index) in lotPathList" :key="index" :path="lot.locList" stroke-color="red"
                   :stroke-opacity="0.3" :stroke-weight="2" fill-color="yellow"  @click="jumpToLotMng"/>
     <!-- --传感器信息-->
       <bm-marker v-for="(item,index) in sensorList" :key="index+1" :position="item.locPoint"
                  :dragging="true" :title="getItemInfo(item)"></bm-marker>
       <bm-label v-for="(lot,index) in lotPathList" :key="index+2" :position="getAreaCenterPoint(lot)"
                 :title="getLotInfo(lot)" @click="jumpToLotMng" :labelStyle="curIndex==-1?labelCurStyles:labelStyles" :content="getLotInfo(lot)"></bm-label>

    </baidu-map>
  </div>
</template>

<script>
  import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
  import BmScale from 'vue-baidu-map/components/controls/Scale.vue'
  import BmPolygon from 'vue-baidu-map/components/overlays/Polygon.vue'
  import BmMarker from 'vue-baidu-map/components/overlays/Marker.vue'
  import BmLabel from 'vue-baidu-map/components/overlays/Label.vue'

  export default {
    name: "MapPanel",
    props: {
      zoom: {
        type: Number,
        default: 17
      },
      lotPathList:
        {
          type: Array,
          default: [{
            'id': 0,
            'locList': [{'lng': 0, 'lat': 0}]
          }]
        },
      sensorList:
        {
          type: Array,
          default: [{
            'id': 0,
            'locPoint': {'lat': 0, 'lng': 0}
          }]
        }
    },
    components: {
      BaiduMap,
      BmMarker,
      BmPolygon,
      BmScale,
      BmLabel
    },
    data() {
      return {
        show: false,
        curIndex: -1,
        labelShow: true,
        labelStyles: {color: '#fff',
          fontSize: '8px',
          background: '#f56666',
          padding: '4px',
          border: 'none',
          borderRadius: '4px',
          //background:rgba(1,1,1,0.88)
    },
        labelCurStyles: {color: '#fff',
          fontSize: '12px',
          background: '#1894ea',
          padding: '6px',
          border: 'none',
          borderRadius: '4px'
        }
      }
    },
    methods: {
      jumpToLotMng() {
        if (this.$store.state.allFlag) {
          this.$router.push("/LotMng") // 跳转到对应的地块管理界面
        }
      },
      // 获取地图中心点坐标
      getCenterPoint(polygonPath) {
        let centerLng = 0, centerLat = 0, num = 0;
        polygonPath.forEach((item) => {
          item.locList.forEach((point) => {
            centerLng = centerLng + point.lng;
            centerLat = centerLat + point.lat;
            num = num + 1;
          })
        });
        centerLng = centerLng / num;
        centerLat = centerLat / num;
        return {lng: centerLng, lat: centerLat}
      },
      getAreaCenterPoint(polygonPath) {
        console.log("计算地块中心点坐标")
        let centerLng = 0, centerLat = 0, num = 0;
        var i;
        for (i=0;i<polygonPath.locList.length;i++){
          centerLng = centerLng + polygonPath.locList[i].lng;
          centerLat = centerLat + polygonPath.locList[i].lat;
          num = num + 1;
        }
        centerLng = centerLng / num - 0.000210953;

        centerLat = centerLat / num ;
        console.log(centerLng,centerLat)
        return {lng: centerLng, lat: centerLat}

      },
      // 传感器节点显示内容
      getItemInfo(item) {
        if(item.sensorType === '15'){
          return item.id + ':' + item.sensorName +item.subType;
        }else{
          return item.id + ':' + item.sensorName;
        }

      },
      // 地块显示内容
      getLotInfo(lot) {
        //console.log("Focus in")
        return lot.id + ':' + lot.name;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .mp-view {
    width: 100%;
    height: 100%;
    padding: 5px;
    vertical-align: middle;
    margin: 0;
  }

  .bm-view {
    width: 98%;
    height: 800px;
    vertical-align: middle;
    margin: 0;
  }

  .BMap_cpyCtrl {
    display:none;
  }
  .anchorBL{
    display:none;
  }
</style>
