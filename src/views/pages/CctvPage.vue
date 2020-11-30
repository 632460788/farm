<template>
  <div>
<!--    <div>-->
<!--    <el-switch-->
<!--      style="display: block "-->
<!--      v-model="displayMode"-->
<!--      active-color="#13ce66"-->
<!--      inactive-color="#ff4949"-->
<!--      active-value="control"-->
<!--      inactive-value="monitoring"-->
<!--      active-text="控制模式"-->
<!--      inactive-text="监控模式">-->
<!--    </el-switch>-->

<!--    </div>-->
    <div class="block"  >
                    <!--      监控模式选择栏      -->
      <span class="demonstration" >模式选择</span>
      <el-cascader
        v-model="displayValue"
        :options="options"
        :props="{ expandTrigger: 'hover' }"
        @change="handleChange"
        ></el-cascader>
      <el-select v-model="temp_selected" multiple :disabled="select_Limit===0" :multiple-limit="select_Limit"  value-key="name" placeholder="请选择摄像头">
        <el-option
          v-for="item in cameraUrls"
          :key="item.name"
          :label="item.name"
          :value="item"
          :multiple-limit ="select_Limit">
        </el-option>
      </el-select>
      <el-button type="success" @click="change_mode" icon="el-icon-check" circle></el-button>
      <span style="padding: 0 5%"></span>
<!--      <el-button type="primary" @click="add_camera">添加摄像头<i class="el-icon-upload el-icon&#45;&#45;right"></i></el-button>-->

    </div>


    <div v-if="displayMode === '2_2' && confirmed">
                <!------------------------2×2布局----------------------------->
      <el-row type="flex" justify="left">

        <el-col :span="11" >
          <h4 v-if="selected_Monitors[0]" >{{selected_Monitors[0].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video  id="myPlayer1" style="color: #82848a" muted height="400px" width="500px" autoplay   controls controlsList='nosetting noremote nofootbar' >
            <source  v-if="selected_Monitors[0]" :src="selected_Monitors[0].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="11">
          <h4 v-if="selected_Monitors[1]" >{{selected_Monitors[1].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video    id="myPlayer2" style="color: #82848a" muted height="400px" width="500px" autoplay controls controlsList='nosetting noremote footbar' >
            <source  v-if="selected_Monitors[1] " :src="selected_Monitors[1].url" type="rtmp/flv"/>
          </video>
        </el-col>

      </el-row>
      <el-row type="flex" justify="left" style="padding: 20px 0">

        <el-col :span="11">
          <h4 v-if="selected_Monitors[2]" >{{selected_Monitors[2].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video  id="myPlayer3" style="color: #82848a" muted height="400px" width="500px" autoplay   controls controlsList='nosetting noremote nofootbar' >
            <source v-if="selected_Monitors[2] " :src="selected_Monitors[2].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="11">
          <h4 v-if="selected_Monitors[3]" >{{selected_Monitors[3].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video  id="myPlayer4" style="color: #82848a" muted height="400px" width="500px" autoplay controls controlsList='nosetting noremote footbar' >
            <source v-if="selected_Monitors[3] " :src="selected_Monitors[3].url" type="rtmp/flv"/>
          </video>
        </el-col>

      </el-row>

    </div>

    <div v-if="displayMode === '3_3' && confirmed">
      <!-----------------------------3×3布局--------------------------->
      <el-row type="flex" justify="left">

        <el-col :span="8">
          <h4 v-if="selected_Monitors[0]" >{{selected_Monitors[0].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video  id="myPlayer1_1" style="color: #82848a" muted height="300px" width="400px" autoplay   controls controlsList='nosetting noremote nofootbar' >
            <source  v-if="selected_Monitors[0]" :src="selected_Monitors[0].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="8">
          <h4 v-if="selected_Monitors[1]" >{{selected_Monitors[1].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video    id="myPlayer1_2" style="color: #82848a" muted height="300px" width="400px" autoplay controls controlsList='nosetting noremote footbar' >
            <source  v-if="selected_Monitors[1] " :src="selected_Monitors[1].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="8">
          <h4 v-if="selected_Monitors[2]" >{{selected_Monitors[2].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video    id="myPlayer1_3" style="color: #82848a" muted height="300px" width="400px" autoplay controls controlsList='nosetting noremote footbar' >
            <source  v-if="selected_Monitors[2] " :src="selected_Monitors[2].url" type="rtmp/flv"/>
          </video>
        </el-col>

      </el-row>

      <el-row type="flex" justify="left" style="padding: 20px 0">

        <el-col :span="10">
          <h4 v-if="selected_Monitors[3]" >{{selected_Monitors[3].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video  id="myPlayer2_1" style="color: #82848a" muted height="300px" width="400px" autoplay    controls controlsList='nosetting noremote nofootbar' >
            <source  v-if="selected_Monitors[3]" :src="selected_Monitors[3].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="10">
          <h4 v-if="selected_Monitors[4]" >{{selected_Monitors[4].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video    id="myPlayer2_2" style="color: #82848a" muted height="300px" width="400px" autoplay controls controlsList='nosetting noremote footbar' >
            <source  v-if="selected_Monitors[4] " :src="selected_Monitors[4].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="10">
          <h4 v-if="selected_Monitors[5]" >{{selected_Monitors[5].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video    id="myPlayer2_3" style="color: #82848a" muted height="300px" width="400px" autoplay controls controlsList='nosetting noremote footbar' >
            <source  v-if="selected_Monitors[5] " :src="selected_Monitors[5].url" type="rtmp/flv"/>
          </video>
        </el-col>

      </el-row>

      <el-row type="flex" justify="left" style="padding: 20px 0">

        <el-col :span="10">
          <h4 v-if="selected_Monitors[6]" >{{selected_Monitors[6].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video  id="myPlayer3_1" style="color: #82848a" muted height="300px" width="400px" autoplay   controls controlsList='nosetting noremote nofootbar' >
            <source  v-if="selected_Monitors[6]" :src="selected_Monitors[6].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="10">
          <h4 v-if="selected_Monitors[7]" >{{selected_Monitors[7].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video    id="myPlayer3_2" style="color: #82848a" muted height="300px" width="400px" autoplay controls controlsList='nosetting noremote footbar' >
            <source  v-if="selected_Monitors[7] " :src="selected_Monitors[7].url" type="rtmp/flv"/>
          </video>
        </el-col>
        <el-col :span="10">
          <h4 v-if="selected_Monitors[8]" >{{selected_Monitors[8].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video    id="myPlayer4_3" style="color: #82848a" muted height="300px" width="400px" autoplay controls controlsList='nosetting noremote footbar' >
            <source  v-if="selected_Monitors[8] " :src="selected_Monitors[8].url" type="rtmp/flv"/>
          </video>
        </el-col>

      </el-row>

    </div>

    <div v-if="displayMode === 'control' && confirmed">
                          <!--------------------      控制模式     ---------------- -->
      <el-row type="flex" justify="middle">

        <el-col :span="10" :offset="3">
          <h4 v-if="selected_Monitors[0]" >{{selected_Monitors[0].name}}</h4>
          <h4 v-else style="color: gray">无视频源</h4>
          <video  id="C_myPlayer" style="color: #82848a" muted height="500px" width="800px" autoplay   controls controlsList='nosetting noremote nofootbar' >
            <source  v-if="selected_Monitors[0]" :src="selected_Monitors[0].url" type="rtmp/flv"/>
          </video>
        </el-col>

      </el-row>





    <el-row type="flex"  style="margin-top: 20px"><span style="font-size: 20px;color:black;fontFamily:'Microsoft yahei';margin-top: 10px;alignment: left">云台控制</span></el-row>

    <el-row type="flex" style="alignment: left;width: 30%" justify="center">
      <el-col>
        <el-row>
          <img class="tr_odd" src="../../assets/circle_arrow_top.png" style="width:50px"  @mousedown="mousedown(0)" @mouseup="mouseup()">
        </el-row>
        <el-row>
          <img class="tr_odd" src="../../assets/circle_arrow_left.png" style="width:50px" @mousedown="mousedown(2)" @mouseup="mouseup()">
          <img class="tr_odd" src="../../assets/player_stop_circle.png" style="width:50px" @click="control(-1)">
          <img class="tr_odd" src="../../assets/circle_arrow_right.png" style="width:50px" @mousedown="mousedown(3)" @mouseup="mouseup()">
        </el-row>
        <el-row>
          <img class="tr_odd" src="../../assets/circle_arrow_bottom.png" style="width:50px" @mousedown="mousedown(1)" @mouseup="mouseup()">
        </el-row>
      </el-col>
      <el-col type="flex" justify="left">
        <el-row type="flex" justify="center" style="margin-top: 55px" >
          <img class="tr_odd" src="../../assets/circle_plus.png" style="width:50px" @mousedown="mousedown(8)" @mouseup="mouseup()">
          <img class="tr_odd" src="../../assets/circle_minus.png" style="width:50px" @mousedown="mousedown(9)" @mouseup="mouseup()">
        </el-row>

      </el-col>
    </el-row>

    </div>








<!--              <el-row type="flex" justify="left">-->
<!--            -->
<!--                <el-col :span="10">-->
<!--                  <video id="myPlayer1" style="color: #82848a" muted height="300px" width="400px" autoplay  playsInline webkit-playsinline controls controlsList='nosetting noremote nofootbar' >-->
<!--                    <source src="rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398" type="rtmp/flv"/>-->
<!--            &lt;!&ndash;        rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398&ndash;&gt;-->
<!--                  </video>-->
<!--                </el-col>-->
<!--                <el-col :span="10">-->
<!--                  <video id="myPlayer2" style="color: #82848a" muted height="300px" width="400px" autoplay controls controlsList='nosetting noremote footbar' >-->
<!--                    <source src="ezopen://open.ys7.com/f01018a141094b7fa138b9d0b856507b.live" type="rtmp/flv"/>-->
<!--                  </video>-->
<!--                </el-col>-->
<!--            -->
<!--              </el-row>-->
    <!--
  <el-row justify="left" style="width: 70%;margin-top: 20px">
      <swiper :options="swiperOption">
         slides
        <swiper-slide  v-for="(item,index) in swiperimages" :key="index">
          <img :src="item.src"/>
        </swiper-slide>
        <swiper-slide><img :src=swiperimages[0].src height="100" id="cctv1" @click="onMessage(1)"></swiper-slide>
        <swiper-slide><img :src=swiperimages[1].src height="100" @click="onMessage(2)"></swiper-slide>
        <swiper-slide><img :src=swiperimages[2].src height="100" @click="onMessage(3)"></swiper-slide>
        <swiper-slide><img :src=swiperimages[3].src height="100" @click="onMessage(4)"></swiper-slide>
        <swiper-slide><img :src=swiperimages[4].src height="100" @click="onMessage(5)"></swiper-slide>


        <div class="swiper-pagination"  slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
  </el-row>
  -->


  </div>
</template>

<script>
  import Ezuikit from '../../../static/EZUIKit-JavaScript-master/ezuikit.js'
  import 'swiper/dist/css/swiper.css'
  import {swiper,swiperSlide} from '../../../dist/vue-awesome-swiper'
  import swiperimage1 from '../../assets/swiper1.jpg'
  import swiperimage2 from '../../assets/swiper2.jpg'
  import swiperimage3 from '../../assets/swiper3.jpg'
  import swiperimage4 from '../../assets/swiper4.jpg'
  import swiperimage5 from '../../assets/swiper5.jpg'
  import play from '../../assets/play.png'
  import pause from '../../assets/pause.png'
  import circle_top from '../../assets/circle_arrow_top.png'
  import circle_bottom from '../../assets/circle_arrow_bottom.png'
  import circle_left from '../../assets/circle_arrow_left.png'
  import circle_right from '../../assets/circle_arrow_right.png'
  import circle_zoomin from '../../assets/circle_plus.png'
  import circle_zoomout from '../../assets/circle_minus.png'
  import circle_stop from '../../assets/player_stop_circle.png'
  import qs from 'qs'
  import axios from 'axios'

  import LivePlayer from '@liveqing/liveplayer'
  export default {
    name: "cctvPage",
    components: {
      swiper,
      swiperSlide,
      LivePlayer
    },
    data() {
      return {
        // displayMode:"monitoring",
          confirmed:false,
          select_Limit:0,//摄像头可选数量
          selected_Monitors:[],//已选摄像头
          temp_selected:[],//保存选择更改前结果(摄像头及地址)
          displayValue:[],//模式选择结果
          displayMode:"",//显示模式（2×2,3×3，监控之一）
          temp_displayMode:"",//保存选择更改前结果(显示模式)
          options:[{
              value:"monitoring",
              label:"监控模式",
          children:[{
                  value:"2_2",
              label:"2×2显示"
          },{
                  value:"3_3",
                  label:"3×3显示"
          }
          ]
          },{
              value:"control",
              label:"控制模式"
          }],
        cameraUrls:[
              // {id:'摄像头1',infos:{url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',location:"基地1"}},
              // {id:'摄像头2',infos:{url:'ezopen://open.ys7.com/f01018a141094b7fa138b9d0b856507b.live',location:"基地2"}},
              // {id:'摄像头3',infos:{url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',location:"基地3"}},
              // {id:'摄像头4',infos:{url:'ezopen://open.ys7.com/f01018a141094b7fa138b9d0b856507b.live',location:"基地4"}},
              // {id:'摄像头5',infos:{url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',location:"基地5"}},
              // {id:'摄像头6',infos:{url:'ezopen://open.ys7.com/f01018a141094b7fa138b9d0b856507b.live',location:"基地6"}},
              // {id:'摄像头7',infos:{url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',location:"基地7"}},
              // {id:'摄像头8',infos:{url:'ezopen://open.ys7.com/f01018a141094b7fa138b9d0b856507b.live',location:"基地8"}},
              // {id:'摄像头9',infos:{url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',location:"基地9"}}

            {name:'摄像头1',url:'rtmp://rtmp01open.ys7.com/openlive/7b054c561ba843178984899500ee6042',direction:0, speed: 1, CameraID:1},
            {name:'摄像头2',url:'rtmp://rtmp01open.ys7.com/openlive/a66771fc1a7144bbbad2f0cda4e3f718',direction:0, speed: 1, CameraID:2},
            {name:'摄像头3',url:'rtmp://rtmp01open.ys7.com/openlive/5692ebc4e51447699030c509b4b22252',direction:0, speed: 1, CameraID:3},
            {name:'摄像头4',url:'rtmp://rtmp01open.ys7.com/openlive/9ec584b9849f4caf984223494d248606',direction:0, speed: 1, CameraID:4},
            {name:'摄像头5',url:'rtmp://rtmp01open.ys7.com/openlive/97af5ab93a8841af8dc342c0f43d1e56',direction:0, speed: 1, CameraID:5},
            {name:'摄像头6',url:'rtmp://rtmp01open.ys7.com/openlive/1af1b2083cbd462793ca6c4e6fc5070e',direction:0, speed: 1, CameraID:6},
            {name:'摄像头7',url:'rtmp://rtmp01open.ys7.com/openlive/6f1f452c79534c3facf07338dcc58c71',direction:0, speed: 1, CameraID:7},
            {name:'摄像头8',url:'rtmp://rtmp01open.ys7.com/openlive/5e82c7d87ce945319efc7c93b0819ac4',direction:0, speed: 1, CameraID:8},
            {name:'摄像头9',url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',direction:0, speed: 1, CameraID:9},
            {name:'摄像头10',url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',direction:0, speed: 1, CameraID:10}
        ],
        isPlay:[
          {isplay: false},
          {isplay: false},
          {isplay: false},
          {isplay: false},
          {isplay: false},
        ],
        swiperimages:[
          {src:play},
          {src:play},
          {src:play},
          {src:play},
          {src:play},
        ],

        swiperOption: {//swiper3
          //width: 230,
          height:150,
          slidesPerView: 4,
          spaceBetween: 10,
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
        direction:0,
        speed: 1,
        CameraID:1



      }
    },
    methods:{
        //根据多选框结果决定显示的组件
        handleChange(value) {
            this.temp_displayMode = value[value.length-1]
            this.temp_selected = []
            if(this.temp_displayMode === "2_2")
                {
                    this.select_Limit = 4
                }
            else if(this.temp_displayMode === "3_3")
                {
                    this.select_Limit = 9
                }
            else
               {
                   this.select_Limit = 1
               }
        },
        //按下确定按钮后，组件刷新
        change_mode(){
            this.confirmed = false
            this.selected_Monitors = this.temp_selected
            this.displayMode = this.temp_displayMode
            this.$nextTick(() => {
                this.confirmed = true
            })

        },
        //添加摄像头
        add_camera(){

        },
      onMessage: function (id) {
        this.$message({message: '点击成功 ' + id, type: 'success'})
        if(this.isPlay[id-1].isplay === false){
          this.isPlay[id-1].isplay = true
          this.swiperimages[id-1].src = pause

        }else{
          this.isPlay[id-1].isplay = false
          this.swiperimages[id-1].src = play
        }
        //this.isPlay[0]?play:pause

      },

      //与数据库中的camera表进行交互的方法，调试摄像头时主要关注这部分code
      control: function (value) {

        if(value === -1){
          // stop
          let param = {CameraID:this.selected_Monitors[0].CameraID,direction: this.selected_Monitors[0].direction};
          this.$api.ipcamera.stopControl(param).then((res) => {
            if (res.code === 200) {
              // 转换数据
              console.log("停止成功")
            } else {
              this.$notify.error({
                title: '错误',
                message: res.msg
              })
            }
          }).catch(function (res) {
            console.log(res)
          })

        }else{
          // value = direction
          this.selected_Monitors[0].direction = value
          console.log(value)
          let param = {
            CameraID:this.selected_Monitors[0].CameraID,
            direction: this.selected_Monitors[0].direction,
            speed: this.selected_Monitors[0].speed
          };

          this.$api.ipcamera.startControl(param).then((res) => {
            if (res.code === 200) {
              // 转换数据
              console.log("控制成功")

            } else {
              this.$notify.error({
                title: '错误',
                message: res.msg
              })
            }
          }).catch(function (res) {
            console.log(res)
          })

          //延时发送停止

        }
      },
      getAccessToken(){

      },
      mousedown(value){
        if(value === -1){

        }else{
          console.log("Go")
          this.control(value)
        }

      },
      mouseup(){
        console.log("Stop")
        this.control(-1)
      }


    },
    updated() {
        //根据监控模式的选择(2×2 ， 3×3 ，控制模式)进行组件刷新

        if(this.displayMode === "2_2") {
            for (let i = 0; i < 4; i++) {
                new Ezuikit.EZUIPlayer('myPlayer'+String(i+1) );
            }
        }
        else if(this.displayMode === "3_3"){
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    new Ezuikit.EZUIPlayer('myPlayer'+String(i+1)+'_'+String(j+1) );
                }
            }

        }
        else if(this.displayMode === "control"){
          new Ezuikit.EZUIPlayer('C_myPlayer' )
        }

    },
  }
</script>

<style lang="scss" scoped>
  .myPlayer_contain {
    width: 600px;
    height: 400px;
  }
  .headCls{background-color:#ccc;}    /* 标题背景色 */
  .tr_even{background-color:#EBF8FF}  /* 偶数行背景色 */
  .tr_odd{background-color:#FFFFFF}   /* 奇数行背景色 */
  .tr_even:hover,.tr_odd:hover{background:radial-gradient(50% 50%,yellow, white);}      /* 通过CSS实现鼠标悬停高亮色 */
</style>
