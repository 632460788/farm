<template>
    <div id="camera" v-show="imagesLoaded">
<!--      导航栏部分-->
      <div class="head">
        <div class="nav">
          <div class="container">
            <div class="logo">
              <!--              <span>LOGO</span>-->
            </div>

            <ul id="main">
              <li @click="directToHome">首页</li>
              <li>智慧种植
                <ul class="drop">
                  <div>
                    <li @click="directToSubpage(SubpagePath[0])">园区监控</li>
                    <li @click="directToSubpage(SubpagePath[1])">测土配方</li>
                    <li @click="directToSubpage(SubpagePath[2])">病虫害识别</li>
                    <li @click="directToSubpage(SubpagePath[3])">产品追溯</li>
                    <li @click="directToSubpage(SubpagePath[4])">种植知识库</li>
                  </div>
                </ul>
              </li>
              <li @click="directToSubpage(SubpagePath[5])" >关于我们</li>
              <li @click="directToLogin">后台登录</li>
              <div id="marker"></div>
            </ul>
          </div>
        </div>
        <img id="nav-image" src="../../../assets/CameraImage2.png" style="display:block; width: 100%;min-width:1200px;left: 0;">


      </div>



<!--      监控页面部分-->


          <div class="block"  style="top:30px; position: relative">
            <!--      监控模式选择栏      -->
<!--            显示监控界面-->

            <el-dialog
              title="园区监控"
              :visible.sync="cameraDialogVisible"
              width="1500px"
              height="80%"
              top="2%"
              center
              @close='closeDialog'
              @opened = 'openDialog'
            >
              <div style="background-color: rgb(28,29,36)">
              <el-divider></el-divider>
              <el-row gutter="10">
<!--                左侧监控布局-->
                <el-col :span="19">
                  <div style="height: 810px;">
                    <div v-if="showMode === 'single' && confirmed">
                      <video   v-if="selectedDevices[0]" id="myPlayer1" style="color: #82848a" muted height="800px" width="1150px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                        <source    v-if="selectedDevices[0]" :src="selectedDevices[0].url" type="rtmp/flv"/>
                      </video>
                    </div>
                    <div v-if="showMode === 'four' && confirmed">
                      <el-row>
                        <el-col :span="12">
                          <div style="height:400px;border: black 2px solid">
                            <video    id="myPlayer4_1" style="color: #82848a" muted height="400px" width="580px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source    v-if="selectedDevices[0]" :src="selectedDevices[0].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                        <el-col :span="12" >
                          <div style="height:400px;border: black 2px solid">
                            <video      id="myPlayer4_2" style="color: #82848a" muted height="400px" width="580px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source    v-if="selectedDevices[1]" :src="selectedDevices[1].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="12" >
                          <div style="height:400px;border: black 2px solid">
                            <video    id="myPlayer4_3" style="color: #82848a" muted height="400px" width="580px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source    v-if="selectedDevices[2]" :src="selectedDevices[2].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                        <el-col :span="12" >
                          <div style="height:400px;border: black 2px solid">
                            <video     id="myPlayer4_4" style="color: #82848a" muted height="400px" width="580px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source    v-if="selectedDevices[3]" :src="selectedDevices[3].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                    <div v-if="showMode === 'nine' && confirmed">
                      <el-row>
                        <el-col :span="8">
                          <div style="height:267px;border: black 2px solid">
                            <video    id="myPlayer9_1" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source   v-if="selectedDevices[0]"  :src="selectedDevices[0].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>

                        <el-col :span="8" >
                          <div style="height:267px;border: black 2px solid">
                            <video    id="myPlayer9_2" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source   v-if="selectedDevices[1]"  :src="selectedDevices[1].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                        <el-col :span="8" >
                          <div style="height:267px;border: black 2px solid">
                            <video    id="myPlayer9_3" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source    v-if="selectedDevices[2]" :src="selectedDevices[2].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                      </el-row>
                      <el-row>
                        <el-col :span="8">
                          <div style="height:267px;border: black 2px solid">
                            <video    id="myPlayer9_4" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source   v-if="selectedDevices[3]"  :src="selectedDevices[3].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>

                        <el-col :span="8" >
                          <div style="height:267px;border: black 2px solid">
                            <video    id="myPlayer9_5" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source   v-if="selectedDevices[4]" :src="selectedDevices[4].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>

                        <el-col :span="8" >
                          <div style="height:267px;border: black 2px solid">
                            <video    id="myPlayer9_6" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source   v-if="selectedDevices[5]"  :src="selectedDevices[5].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                      </el-row>

                      <el-row>
                        <el-col :span="8">
                          <div style="height:266px;border: black 2px solid">
                            <video    id="myPlayer9_7" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source    v-if="selectedDevices[6]"  :src="selectedDevices[6].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>

                        <el-col :span="8" >
                          <div style="height:266px;border: black 2px solid">
                            <video    id="myPlayer9_8" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source   v-if="selectedDevices[7]"  :src="selectedDevices[7].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>

                        <el-col :span="8" >
                          <div style="height:266px;border: black 2px solid">
                            <video    id="myPlayer9_9" style="color: #82848a" muted height="266px" width="376px" autoplay   controls controlsList='nosetting noremote nofootbar' >
                              <source   v-if="selectedDevices[8]"  :src="selectedDevices[8].url" type="rtmp/flv"/>
                            </video>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </el-col>
<!--                右侧菜单布局-->
                <el-col :span="5">
                  <div  style="height:800px;border-left: 1px solid black; ">
<!--                    视图控制栏-->
                    <div class="show_mode" style="height: 200px; border-top: 2px solid black;border-bottom: 2px solid black;margin-bottom: 20px;background-color: rgb(32,34,42)">
<!--                      文字栏-->
                      <div style="height: 30px;border-bottom: 2px solid; background-color: rgb(38,41,51); color: rgb(164,164,161);font-size: 15px">
                        <span style="display: block; left: 5px;top:3px;position: relative">视图控制</span>
                      </div>

                      <el-row :gutter="20">
                        <el-col id="single" :span="12" style="text-align: center;top:10px;position: relative;padding-bottom: 10px;">
                            <img id="single_img" class="mode_icon" src="../../../assets/single-origin.png" @click="changeShowMode(1)"  >
                            <span style="display: block;">单画面</span>
                        </el-col>
                        <el-col  id="four" :span="12" style="text-align: center;top:10px;position: relative">
                          <img  id="four_img" class="mode_icon" src="../../../assets/four-origin.png" @click="changeShowMode(4)">
                          <span style="display: block"> 四画面</span>
                        </el-col>
                      </el-row>

                      <el-row :gutter="20">
                      <el-col id="nine" :span="12" style="text-align: center;top:10px;position: relative;padding-bottom: 10px">
                        <img  id="nine_img" class="mode_icon" src="../../../assets/nine-origin.png" @click="changeShowMode(9)">
                        <span style="display: block;top:-2px;position: relative">九画面</span>
                      </el-col>
                      <el-col :span="12" style="text-align: center;top:10px;position: relative">
                        <img  id="quanping_img"  class="mode_icon" src="../../../assets/quanping-origin.png">
                        <span style="display: block">全屏</span>
                      </el-col>
                      </el-row>
                    </div>

<!--                    设备类型（无人机或摄像头）选择栏-->
<!--                    <div class="type_select" style="height: 100px; border-top: 2px solid black;border-bottom: 2px solid black;margin-bottom: 20px;background-color: rgb(32,34,42)">-->
<!--                      <div style="height: 30px;border-bottom: 2px solid; background-color: rgb(38,41,51); color: rgb(164,164,161);font-size: 15px">-->
<!--                        <span style="display: block; left: 5px;top:3px;position: relative">设备类型</span>-->
<!--                      </div>-->
<!--                      <el-row :gutter="40">-->
<!--                        <el-col :span="12">-->
<!--                          <el-radio v-model="device_type" label="normal">普通监控</el-radio>-->
<!--                        </el-col>-->
<!--&lt;!&ndash;                        <el-col :span="12">&ndash;&gt;-->
<!--&lt;!&ndash;                          <el-radio v-model="device_type" label="wurenji">无人机监控</el-radio>&ndash;&gt;-->
<!--&lt;!&ndash;                        </el-col>&ndash;&gt;-->
<!--                      </el-row>-->
<!--                    </div>-->

<!--                    设备选择栏-->
                    <div class="device_choose" style="height: 580px; border-top: 2px solid black;border-bottom: 2px solid black;background-color: rgb(32,34,42)">
                      <div style="height: 30px;border-bottom: 2px solid; background-color: rgb(38,41,51); color: rgb(164,164,161);font-size: 15px">
                        <el-row>
                          <el-col :span="12">
                            <span style="display: inline-block; position: relative;top: 5px;left: 5px">可用设备</span>
                          </el-col>
                          <el-col :span="12" style="text-align: center">
                            <span id="select_button" @click="change_mode" style="display: inline-block;position: relative;top: 5px;border: 1px solid #47BACE;padding: 1px;border-radius: 1px"> 确定</span>
                          </el-col>
                        </el-row>


                      </div>
<!--                      可用设备列表-->
                      <div  class="scrollbar" style="overflow: scroll;height: 550px">
<!--                        普通监控-->
                          <div   :id="item.id" class="defaultStyle " v-if="device_type === 'normal' " v-for="item in cameraUrls" @click="changeSelected(item.id)" style="height: 80px;">
                            <img src="../../../assets/camera-icon.png" alt="" class="device_icon">
                            <span class="device_name">{{item.name}}</span>
                          </div>
<!--                        无人机监控-->
<!--                        <div class="defaultStyle" v-if="device_type === 'wurenji' " v-for="item in wurenjiUrls" style="height: 80px">-->
<!--                          <img src="../../../assets/wurenji-icon.png" alt="" class="device_icon">-->
<!--                          <span class="device_name">{{item.name}}</span>-->
<!--                        </div>-->
                      </div>
                    </div>
                  </div>
                </el-col>
              </el-row>
              </div>
            </el-dialog>


      </div>

      <div class="information" style="background-color: white;">
        <div class="container" >

          <el-row>
            <el-col :span="12" class="module">
              <div style="top: 100px;position: relative;" >

                <p style="text-align: right;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/Camera-icon2.png" style="top: 15px;left:-5px;position: relative">实时监控</p>
                <br>
                <p style="text-align: right; color: rgba(184,184,184,1);top: 20px;position: relative">种植园区内装有多个监控设备，可实时监控基地种植情况，极大地减小了现场维护成本，减轻灾害天气对作物的影响</p>
                <br>
                <span class="cameraButton " @click="cameraDialogVisible = true" >查看监控
                  <div style="display:inline-block;width: 9px;height: 9px;border-top: 2px solid rgba(216,217,219,1);border-right: 2px solid rgba(216,217,219,1);transform: rotate(45deg);"></div>
                </span>
              </div>
            </el-col>
            <el-col :span="12" class="module">
              <div >
                <img src="../../../assets/BaseCamera.png" alt="2" style="width: 450px;height: 353px;padding: 54px 0">
              </div>

            </el-col>
          </el-row>
        </div>
      </div>
      <div class="information" style="background-color: #f5f5f5;">
        <div class="container" >
        <el-row>
          <el-col :span="12" class="module">
            <div >
              <img src="../../../assets/planeImage.png" alt="2" style="width: 600px;height: 470px;">
            </div>
          </el-col>
          <el-col :span="12" class="module">
            <div style="top: 100px;position: relative;" >
              <p style="text-align: left;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/plane-icon2.png" style="top: 15px;position: relative;margin-right: 10px">无人机监控</p>
              <br>
              <p style="text-align: left; color: rgba(184,184,184,1);top: 20px;position: relative">除了引进喷药等作业无人机外，还配置了监控专用无人机，可近距离监测作物生长情况，实现作物健康状况的远程评估</p>
            </div>
          </el-col>

        </el-row>
        </div>

      </div>

<!-- 底部内容-->
      <div class="other">
        <div class="container" style="width: 1200px;height: 100%;margin: 0 auto;">
          <!--            底部二维码-->
          <div class="QRcode" style="width: 40%;height: 100%;float: left">

            <div class="codebox" style="float: left;width:130px;margin-left:10%;height:130px;margin-top:30px;text-align: center">
              <img src="../../../assets/WeChatQR.png" style="width: 100%;height: 100%">
              <span style="margin-top:5px;font-size: 10px;color: #646464;text-align: center"> 枳壳智慧种植小程序</span>
            </div>

            <div class="codebox" style="float: left;width:130px;height:130px;margin-left: 40px;margin-top:30px;text-align: center">
              <img src="../../../assets/appQRcode.png" style="width: 100%;height: 100%">
              <span style="margin-top:5px;font-size: 10px;color: #646464;text-align: center"> 枳壳智慧种植APP</span>
            </div>


          </div>
          <!--            底部快速访问-->
          <div class="quick_link" style="width: 30%;height: 100%;float: left;line-height: 200%">
            <div style="margin-left: 50px;margin-top: 15px">
              <span style="color: #dfdfdf"> 快速访问</span>
              <br>
              <div style="color: #505050;">
                <a @click="directToHome">首页</a>
                <br>
                <a @click="directToSubpage(SubpagePath[5])">关于我们</a>
                <br>
                <a @click="directToSubpage(SubpagePath[0])">技术详情</a>
                <br>
                <a @click="directToLogin" >后台登录</a>
              </div>
            </div>
          </div>
          <!--            联系我们-->
          <div class="address" style="width: 30%;height: 100%;float: left">
            <div style="margin-top: 20px">
              <span style="color: #dfdfdf"> 联系我们</span>
              <br>
              <div style="line-height: 200%;margin-top: 10px;color: #646464">
                <span>公司名称:重庆玮益生态农业科技有限公司</span>
                <br>
                <span>地&nbsp;  &nbsp; &nbsp; 址:重庆市潼南区双江镇</span>
                <br>
                <span>联系电话:15823870508 周先生</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="footer">
        <div class="container">
            <span style="font-size: 15px;line-height: 1.125;top: 20px;position: relative;color: #505050">
                @2020 重庆市玮益生态农业科技有限公司 版权所有 渝公网安备50022302000309号</span>
        </div>
      </div>

      </div>
</template>

<script>
    import Ezuikit from '../../../../static/EZUIKit-JavaScript-master/ezuikit.js'
    import 'swiper/dist/css/swiper.css'
    import {swiper,swiperSlide} from '../../../../dist/vue-awesome-swiper'
    import LivePlayer from '@liveqing/liveplayer'


    Array.prototype.indexOf = function(val) {
        for (var i = 0; i < this.length; i++) {
            if (this[i] === val) return i;
        }
        return -1;
    };

    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index, 1);
        }
    };
    var box = document.getElementsByClassName('module');
    //获取元素的top绝对位置
    function getElementTop(element){
        var actualTop = element.offsetTop;
        var current = element.offsetParent;
        while (current !== null){
            actualTop += current.offsetTop;
            current = current.offsetParent;
        }
        return actualTop;
    }

    document.addEventListener('scroll',function(){

        //滚动条高度+视窗高度 = 可见区域底部高度
        var visibleBottom = window.scrollY + document.documentElement.clientHeight;
        //可见区域顶部高度
        var visibleTop = window.scrollY;

        for (var i = 0; i < box.length; i++) {
            var centerY = getElementTop(box[i])
            if(centerY>visibleTop&&centerY<visibleBottom)
                box[i].classList.add("come-in");
        }
    })

    export default {
        name: "camera",
        components: {
            swiper,
            swiperSlide,
            LivePlayer
        },
        data(){
            return{
                // displayMode:"monitoring",
                IsNew:true,
                showLimit:1,
                selectedDevices:[],
                temp_selected:[],//保存选择更改前结果(摄像头及地址)
                showMode:'',
                device_type:"normal",
                cameraDialogVisible:false,
                temp_showMode:'single',
                SubpagePath:['camera','SoilTesting','Identification','ProductTracing','KnowledgeBase','AboutUs'],
                imagesLoaded:false,
                confirmed:false,
                displayValue:[],//模式选择结果
                cameraUrls:[
                    {videoId:'video1',id:'camera1',name:'摄像头1',url:'rtmp://rtmp01open.ys7.com/openlive/7b054c561ba843178984899500ee6042',direction:0, speed: 1, CameraID:1,selected:false},
                    {videoId:'video2',id:'camera2',name:'摄像头2',url:'rtmp://rtmp01open.ys7.com/openlive/a66771fc1a7144bbbad2f0cda4e3f718',direction:0, speed: 1, CameraID:2,selected:false},
                    {videoId:'video3',id:'camera3',name:'摄像头3',url:'rtmp://rtmp01open.ys7.com/openlive/5692ebc4e51447699030c509b4b22252',direction:0, speed: 1, CameraID:3,selected:false},
                    {videoId:'video4',id:'camera4',name:'摄像头4',url:'rtmp://rtmp01open.ys7.com/openlive/9ec584b9849f4caf984223494d248606',direction:0, speed: 1, CameraID:4,selected:false},
                    {videoId:'video5',id:'camera5',name:'摄像头5',url:'rtmp://rtmp01open.ys7.com/openlive/97af5ab93a8841af8dc342c0f43d1e56',direction:0, speed: 1, CameraID:5,selected:false},
                    {videoId:'video6',id:'camera6',name:'摄像头6',url:'rtmp://rtmp01open.ys7.com/openlive/1af1b2083cbd462793ca6c4e6fc5070e',direction:0, speed: 1, CameraID:6,selected:false},
                    {videoId:'video7',id:'camera7',name:'摄像头7',url:'rtmp://rtmp01open.ys7.com/openlive/6f1f452c79534c3facf07338dcc58c71',direction:0, speed: 1, CameraID:7,selected:false},
                    {videoId:'video8',id:'camera8',name:'摄像头8',url:'rtmp://rtmp01open.ys7.com/openlive/5e82c7d87ce945319efc7c93b0819ac4',direction:0, speed: 1, CameraID:8,selected:false},
                    {videoId:'video9',id:'camera9',name:'摄像头9',url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',direction:0, speed: 1, CameraID:9,selected:false},
                    {videoId:'video10',id:'camera10',name:'摄像头10',url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',direction:0, speed: 1, CameraID:10,selected:false}
                ],
                wurenjiUrls:[
                    {id:'wurenji1',name:'摄像头1',url:'rtmp://rtmp01open.ys7.com/openlive/fb30605e51e6416fa7bb79ced83c1398',direction:0, speed: 1, CameraID:1,selected:false},

                ],




            };

        },
        methods:{
            directToHome(){
                let path = '/introduction'
                this.$router.push(path);
            },
            directToLogin(){
                const routeURL = this.$router.resolve({
                    path: '/login',

                })
                window.open(routeURL.href, '_blank')
            },
            directToSubpage(subpath){
                let path = '/introduction/' + subpath
                this.$router.push(path);
            },
            changeShowMode(value){
                document.getElementById('single_img').src = require("../../../assets/single-origin.png")
                document.getElementById('four_img').src = require("../../../assets/four-origin.png")
                document.getElementById('nine_img').src = require('../../../assets/nine-origin.png')
                document.getElementById('quanping_img').src = require('../../../assets/quanping-origin.png')
                switch (value) {
                    case 1:
                        this.temp_showMode = 'single'
                        document.getElementById('single_img').src = require('../../../assets/single-selected.png')
                        break
                    case 4:
                        this.temp_showMode = 'four'
                        document.getElementById('four_img').src = require('../../../assets/four-selected.png')
                        break
                    case 9:
                        this.temp_showMode = 'nine'
                        document.getElementById('nine_img').src = require('../../../assets/nine-selected.png')
                        break
                    default:
                        break
                }
                this.showLimit = value
                this.temp_selected = []
                let notSelected = document.getElementsByClassName('banStyle');
                for (let i = 0; i !== notSelected.length ; ) {
                    notSelected[i].classList.add('defaultStyle')
                    notSelected[i].classList.remove('banStyle')
                }
                notSelected = document.getElementsByClassName('selectedStyle');
                for (let i = 0; i !== notSelected.length ; ) {
                    notSelected[i].classList.add('defaultStyle')
                    notSelected[i].classList.remove('selectedStyle')
                }

            },
            //点击设备后，改变设备栏的背景色，并将设备信息传入数组中
            changeSelected(id){
                let box = document.getElementById(id);
                let styleMode = box.classList[0];
                switch (styleMode) {
                    case 'defaultStyle': {
                        let cameraInfo = {}
                        if (this.device_type === 'normal') {
                            for (let i = 0; i < this.cameraUrls.length; i++) {
                                if (this.cameraUrls[i].id === id) {
                                    this.cameraUrls[i].selected = true
                                    cameraInfo = this.cameraUrls[i]
                                    break
                                }
                            }
                        } else {
                            for (let i = 0; i < this.wurenjiUrls.length; i++) {
                                if (this.wurenjiUrls[i].id === id) {
                                    this.wurenjiUrls[i].selected = true
                                    cameraInfo = this.wurenjiUrls[i]
                                    break
                                }
                            }
                        }
                        this.temp_selected.push(cameraInfo)
                        box.classList.add('selectedStyle')
                        box.classList.remove('defaultStyle')
                        if (this.temp_selected.length === this.showLimit ) {

                            let notSelected = document.getElementsByClassName('defaultStyle');
                            for (let i = 0; i !== notSelected.length ; ) {
                                notSelected[i].classList.add('banStyle')
                                notSelected[i].classList.remove('defaultStyle')


                            }
                        }
                        break
                    }
                    case 'banStyle': {
                        break
                    }
                    case 'selectedStyle': {
                        box.classList.add('defaultStyle')
                        box.classList.remove('selectedStyle')
                        var cameraInfo = {}
                        if (this.device_type === 'normal') {
                            for (let i = 0; i < this.cameraUrls.length; i++) {
                                if (this.cameraUrls[i].id === id) {
                                    this.cameraUrls[i].selected = false
                                    cameraInfo = this.cameraUrls[i]
                                    break
                                }
                            }
                        }
                        else
                            {
                            for (let i = 0; i < this.wurenjiUrls.length; i++) {
                                if (this.wurenjiUrls[i].id === id) {
                                    this.wurenjiUrls[i].selected = false
                                    cameraInfo = this.wurenjiUrls[i]
                                    break
                                }
                            }
                        }

                        if (this.temp_selected.length === this.showLimit) {

                            let notSelected = document.getElementsByClassName('banStyle');

                            for (let i = 0; i !== notSelected.length; ) {
                                notSelected[i].classList.add('defaultStyle')
                                notSelected[i].classList.remove('banStyle')

                            }
                        }
                        this.temp_selected.remove(cameraInfo)
                    break
                    }
                    default:
                        break

                }
            },
            change_mode(){
                this.confirmed = false
                this.selectedDevices = this.temp_selected
                this.showMode = this.temp_showMode
                this.$nextTick(() => {
                    this.confirmed = true
                })

            },
            DialogInit(){
                this.showLimit = 1
                this.selectedDevices = []
                this.temp_selected = []
                this.showMode= ''
                this.device_type = "normal"
                let notSelected = document.getElementsByClassName('banStyle');
                for (let i = 0; i !== notSelected.length ; ) {
                    notSelected[i].classList.add('defaultStyle')
                    notSelected[i].classList.remove('banStyle')
                }
                notSelected = document.getElementsByClassName('selectedStyle');
                for (let i = 0; i !== notSelected.length ; ) {
                    notSelected[i].classList.add('defaultStyle')
                    notSelected[i].classList.remove('selectedStyle')
                }
            },
            closeDialog(){
                this.DialogInit()
            },
            //打开对话框后，默认显示-单画面 摄像头1
            openDialog(){
                    this.changeShowMode(1)
                    this.changeSelected(this.cameraUrls[0].id)
                    this.change_mode()
            }

        },

        updated() {
                if (this.showMode === "single") {
                    new Ezuikit.EZUIPlayer('myPlayer1');
                } else if (this.showMode === "four") {
                    for (let i = 1; i <= 4; i++) {
                        new Ezuikit.EZUIPlayer('myPlayer4_' + String(i));
                    }
                } else if (this.showMode === "nine") {
                    for (let j = 1; j <= 9; j++) {
                        new Ezuikit.EZUIPlayer('myPlayer9_' + String(j));
                    }
                }
        },
      mounted() {
        let imgList = document.getElementById('nav-image');
        imgList.onload = () => {
          this.imagesLoaded = true;
        }
        setTimeout(() => {
          if (!this.imagesLoaded) {
            this.imagesLoaded = !this.imagesLoaded;
          }
        }, 5000)

      }

    }
</script>

<style  scoped>
  *{

    margin:0;
    padding:0;
    list-style:none;
    font-family: "微软雅黑";
  }

  a{
    text-decoration: none;
    color:#646464;
  }
  a:hover{
    color: #c17326;
  }
#select_button:hover{
  cursor: pointer;
}
  .head{
    width: 100%;
  }
  .head .nav{
    width: 100%;
    height: 150px;
    position: absolute;
  }

  .head .nav .container{
    height: 100%;
    width: 1200px;
    margin: 0 auto;
  }
  .head .nav .logo{
    color: white;
    font-size: 60px;
    float: left;
  }


   .cameraButton {
     width: 200px;
     height: 20px;
     display: block;
     top: 20px;
     left: 450px;
     position: relative;
     font-size: 16px;
     transition: all 0.2s;
   }

  .cameraButton:hover{
    color: #5292c1;
    cursor: pointer;
  }




  #main {
    float: right;
    position: relative;
    list-style: none;
    color: whitesmoke;
    font-weight: 400;
    font-size: 0;
    text-transform: uppercase;
    display: block;
    padding: 0;
    margin: 20px auto;
  }
  #main li {
    font-size: 1.2rem;
    display: inline-block;
    position: relative;
    padding: 15px 0;
    text-align: center;
    cursor: pointer;
    z-index: 5;
    min-width: 120px;
  }
  li {
    margin: 0;
  }
  #main li:hover{
    cursor: pointer;
  }
  .drop {
    overflow: hidden;
    list-style: none;
    position: absolute;
    padding: 0;
    width: 100%;
    left: 0;
    top: 48px;
  }
  .drop div {
    -webkit-transform: translate(0, -100%);
    -moz-transform: translate(0, -100%);
    -ms-transform: translate(0, -100%);
    transform: translate(0, -100%);
    -webkit-transition: all 0.5s 0.1s;
    -moz-transition: all 0.5s 0.1s;
    -ms-transition: all 0.5s 0.1s;
    transition: all 0.5s 0.1s;
    position: relative;
  }
  .drop li {
    display: block;
    padding: 0;
    width: 100%;
    background: rgba(215,215,215,0.3);
    /*background: rgba(169,169,169,0.5);*/
    transition: all 0.7s;
  }
  .drop li:hover{
    background-color: rgba(215,215,215,0.6);
    cursor: pointer;
  }
  #marker {
    height: 1px;
    background: rgba(240,240,240,0.3) !important;
    position: absolute;
    bottom: 0;
    width: 120px;
    z-index: 2;
    -webkit-transition: all 0.35s;
    -moz-transition: all 0.35s;
    -ms-transition: all 0.35s;
    transition: all 0.35s;
  }
  #main li:nth-child(1):hover ul div {
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  #main li:nth-child(1):hover ~ #marker {
    -webkit-transform: translate(0px, 0);
    -moz-transform: translate(0px, 0);
    -ms-transform: translate(0px, 0);
    transform: translate(0px, 0);
  }

  #main li:nth-child(2):hover ul div {
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  #main li:nth-child(2):hover ~ #marker {
    -webkit-transform: translate(120px, 0);
    -moz-transform: translate(120px, 0);
    -ms-transform: translate(120px, 0);
    transform: translate(120px, 0);
  }

  #main li:nth-child(3):hover ul div {
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  #main li:nth-child(3):hover ~ #marker {
    -webkit-transform: translate(240px, 0);
    -moz-transform: translate(240px, 0);
    -ms-transform: translate(240px, 0);
    transform: translate(240px, 0);
  }

  #main li:nth-child(4):hover ul div {
    -webkit-transform: translate(0, 0);
    -moz-transform: translate(0, 0);
    -ms-transform: translate(0, 0);
    transform: translate(0, 0);
  }
  #main li:nth-child(4):hover ~ #marker {
    -webkit-transform: translate(360px, 0);
    -moz-transform: translate(360px, 0);
    -ms-transform: translate(360px, 0);
    transform: translate(360px, 0);
  }


  .Camera .container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    border-left: 1px solid rgba(169,169,169,0.5);
    border-right: 1px solid rgba(169,169,169,0.5);
  }
  .information{
    height: 500px;
    width: 100%;
    min-width: 1200px;
  }
  .information .container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
  }


  .other{
    height: 230px;
    width: 100%;
    min-width: 1200px;
    left: 0;
    background-color: #363636;
  }
  .other .container{
    width: 70%;
    height: 100%;
    margin: 0 auto;
  }


  .footer{
    height: 70px;
    width: 100%;
    min-width: 1200px;
    /*top: 4930px;*/
    left: 0;
    background-color: #272727;
  }
  .footer .container{
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }

  .defaultStyle{
    /*background-color: rgba(0, 94, 0, 0.5);*/
  }
  .defaultStyle:hover{
    cursor: pointer;
  }
  .banStyle{
    background-color: rgba(168, 168, 168, 0.3);
  }
  .selectedStyle{
    background-color: rgba(86, 152, 59, 0.8);
  }

  .come-in:nth-child(1) {
    transform: translateX(-20%);
    animation: come-in 1s cubic-bezier(0, -0.01, 0, 0.99) forwards;
  }
  .come-in:nth-child(2) {
    transform: translateX(20%);
    animation: come-in 1s cubic-bezier(0, -0.01, 0, 0.99) forwards;
  }
  @keyframes come-in {
    from{
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  .mode_icon:hover{
    transform: scale(1.05);
    cursor: pointer;
  }
  .mode_icon{
    transition: all .2s ease;
  }
  .device_icon{
    top: 20px;
    left: 10px;
    position: relative;
  }
  .device_name{
    top: 10px;
    left: 15px;
    position: relative;
    color: #bfbfbf;
  }

  .myPlayer_contain {
    width: 600px;
    height: 400px;
  }
  .headCls{background-color:#ccc;}    /* 标题背景色 */
  .tr_even{background-color:#EBF8FF}  /* 偶数行背景色 */
  .tr_odd{background-color:#FFFFFF}   /* 奇数行背景色 */
  .tr_even:hover,.tr_odd:hover{background:radial-gradient(50% 50%,yellow, white);}      /* 通过CSS实现鼠标悬停高亮色 */

  .quick_link a:hover{
    cursor: pointer;
  }
 div.scrollbar::-webkit-scrollbar {
    /*滚动条整体样式*/
    width : 15px;  /*高宽分别对应横竖滚动条的尺寸*/
    height: 0px;
  }
  div.scrollbar::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    background   : #535353;
  }
  div.scrollbar::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    box-shadow   : inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background   : #ededed;
  }
</style>
