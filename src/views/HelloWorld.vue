<template>
  <div style="overflow-y: auto;">


    <el-row>
      <div style="color: #FFFFFF;margin-top: 5px;margin-bottom: 10px; padding:10px;font-size: 20px;line-height: 1.5;background-color:#00bcd4;font-color:#fff; ">
        种 植 基 地 掠 影
      </div>
      <template>
        <!--        <swiper :options="swiperOption">-->
        <!--          &lt;!&ndash; slides-->
        <!--          <swiper-slide  v-for="(item,index) in swiperimages" :key="index">-->
        <!--            <img :src="item.src"/>-->
        <!--          </swiper-slide>&ndash;&gt;-->
        <!--          <swiper-slide><img :src=swiperimages[0].src height="400" ></swiper-slide>-->
        <!--          <swiper-slide><img :src=swiperimages[1].src height="400" ></swiper-slide>-->
        <!--          <swiper-slide><img :src=swiperimages[2].src height="400" ></swiper-slide>-->
        <!--          <swiper-slide><img :src=swiperimages[3].src height="400" ></swiper-slide>-->
        <!--          <swiper-slide><img :src=swiperimages[4].src height="400" ></swiper-slide>-->

        <!--          &lt;!&ndash; 如果需要分页器 &ndash;&gt;-->
        <!--          <div class="swiper-pagination"  slot="pagination"></div>-->
        <!--        </swiper>-->
        <el-carousel :interval="3000" type="card" height="500px" class="carousel" >
          <el-carousel-item  :key="item1">
            <div><img :src=swiperimages[0].src style="width:100%;height:100%;padding-top:15px;" /></div>
          </el-carousel-item>
          <el-carousel-item  :key="item2">
            <div><img :src=swiperimages[1].src style="width:100%;height:100%;padding-top:15px;" /></div>
          </el-carousel-item>
          <el-carousel-item  :key="item3">
            <div><img :src=swiperimages[2].src style="width:100%;height:100%;padding-top:15px;" /></div>
          </el-carousel-item>
          <el-carousel-item  :key="item4">
            <div><img :src=swiperimages[3].src style="width:100%;height:100%;padding-top:15px;" /></div>
          </el-carousel-item>
          <el-carousel-item  :key="item5">
            <div><img :src=swiperimages[4].src style="width:100%;height:100%;padding-top:15px;" /></div>
          </el-carousel-item>
          <el-carousel-item  :key="item6">
            <div><img :src=swiperimages[5].src style="width:100%;height:100%;padding-top:15px;" /></div>
          </el-carousel-item>
        </el-carousel>
      </template>
    </el-row>


    <el-row>
<!--      background-color:#130D84-->
      <div style="color: #FFFFFF;margin-top: 25px;margin-bottom: 10px; padding:10px;font-size: 20px;line-height: 1.5;background-color:#00bcd4 ">
        地 块 展 示
      </div>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="20">
        <el-card :body-style="{padding:'5px'}" shadow="hover">
          <map-panel class="map-contain" :lot-path-list="lotPathList" :sensor-list="sensorLocList"></map-panel>
        </el-card>
      </el-col>
    </el-row>

    <!--
    <el-row>
      <div style="margin-top: 25px;margin-bottom: 10px; padding:10px;font-size: 20px;line-height: 1.5;background-color:#b3d4fc ">
        视 频 监 控
      </div>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <video id="myPlayer1" muted height="250px" width="400px" autoplay controls
               controlsList='nosetting noremote footbar'>
          <source src="rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398" type="rtmp/flv"/>
        </video>
      </el-col>
      <el-col :span="6" :offset="2">
        <video id="myPlayer2" muted height="250px" width="400px" autoplay controls
               controlsList='nosetting noremote footbar'>
          <source src="rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398" type="rtmp/flv"/>
        </video>
      </el-col>
    </el-row>
    -->
  </div>
</template>

<script>
  import MapPanel from './Core/MapPanel'
  import Dashboard from './components/Dashboard'
  import store from '@/store'
  import {mapState} from 'vuex'
  import cctvPage from './pages/CctvPage'
  import {swiper,swiperSlide} from 'vue-awesome-swiper'
  import 'swiper/dist/css/swiper.css'
  //import swiperimage1 from '../assets/swiper5.jpg'
  //import swiperimage2 from '../assets/swiper2.jpg'
  //import swiperimage3 from '../assets/swiper3.jpg'
  //import swiperimage4 from '../assets/swiper4.jpg'
  //import swiperimage5 from '../assets/swiper1.jpg'

  import swiperimage1 from '../assets/swiper.jpg'
  import swiperimage2 from '../assets/swiper1.jpg'
  import swiperimage3 from '../assets/swiper2.jpg'
  import swiperimage4 from '../assets/swiper3.jpg'
  import swiperimage5 from '../assets/swiper4.jpg'
  import swiperimage6 from '../assets/swiper5.jpg'

  export default {
    name: 'HelloWorld',
    components: {MapPanel, Dashboard},
    data() {
      return {
        locList: {
          type: Array,
          default: [{
            lng: 0,
            lat: 0
          }]
        },
        locPoint:{
          type: Array,
          default: {
            lng: 0,
            lat: 0
          }
        },
        swiperimages:[
          {src:swiperimage1},
          {src:swiperimage2},
          {src:swiperimage3},
          {src:swiperimage4},
          {src:swiperimage5},
          {src:swiperimage6},
        ],
        swiperOption: {//swiper3
          autoplay: 3000,
          speed: 1000,
          width: 540,
          height:100,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          //type: 'fraction',
          //type : 'progressbar',
          //type : 'custom',
          progressbarOpposite: true, //使进度条分页器与Swiper的direction参数相反
          bulletElement : 'li', //设定分页器指示器（小点）的HTML标签。
          dynamicBullets: true,  //动态分页器，当你的slide很多时，开启后，分页器小点的数量会部分隐藏。
          dynamicMainBullets: 2, //动态分页器的主指示点的数量
          hideOnClick: true, //默认分页器会一直显示。这个选项设置为true时点击Swiper会隐藏/显示分页器。
          clickable: true, //此参数设置为true时，点击分页器的指示点分页器会控制Swiper切换。

        },



      }
    },
    mounted() {
      this.getAllLotLoc();
      this.getAllSensorInfo();
    },
    computed: {
      ...mapState({
        lotPathList: state => state.lot.allLotLocList,
        sensorLocList: state => state.sensor.allSensorList,
        themeColor: state => state.app.themeColor
      }),
    },
    methods: {
      getAllLotLoc() {
        this.$api.lot.findAllLotLoc().then((res) => {
          store.commit('setLotLocList', res.data);
        }).catch(function (res) {
        })
      },
      getAllSensorInfo() {
        this.$api.sensor.findAllSensorInfo().then((res) => {
          store.commit('setAllSensorList', res.data);
        }).catch(function (res) {
        })
      }
    }
  }

</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .dashboard-contain {
    width: auto;
    height: 410px;
    vertical-align: middle;
    text-align: center;
  }

  .map-contain {
    width: auto;
    height: auto;
    vertical-align: middle;
  }
  .myPlayer_contain {
    width: 600px;
    height: 400px;
  }

</style>
