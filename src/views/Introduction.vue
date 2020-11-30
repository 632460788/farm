<template>
    <div id="Introduction" v-show="imagesLoaded">
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
        </div >
        <div>
          <img id="nav-image" src="../assets/nav-background.png" style="display:block; width: 100%;min-width:1200px;left: 0;">

        </div>

      </div>

      <!--    核心技术板块-->
      <div class="tech_background">
        <div class="container" style="text-align: center">
          <span style="font-size: 36px;top: 20px;position: relative">核心技术</span>
          <img class="tech-icon" @click="ScrollTop(2100,500)" src="../assets/plane-icon.png" alt="" style="left: 0;top: 88px;position: absolute">
          <img class="tech-icon" @click="ScrollTop(2600,500)" src="../assets/SoilTesing-icon.png" alt="" style="left: 242px;top: 88px;position: absolute">
          <img class="tech-icon" @click="ScrollTop(3100,500)" src="../assets/diseaseIdentification-icon.png" alt="" style="left: 486px;top: 88px;position: absolute">
          <img class="tech-icon" @click="ScrollTop(3600,500)" src="../assets/productTraing-icon.png" alt="" style="left: 728px;top: 88px;position: absolute">
          <img class="tech-icon" @click="ScrollTop(4100,500)" src="../assets/knowledge-icon.png" alt="" style="left: 971px;top: 88px;position: absolute">
        </div>
      </div>
      <!--基地介绍板块    -->
      <div class="introduction">
        <div class="container">
          <span style="font-size: 36px;left: 490px;top: 51px;position: absolute;display: block;padding-bottom:20px;border-bottom: 2px solid rgb(114,177,99)">种植园区介绍</span>
          <!--                轮播图-->
          <div id="wrapper" >
            <el-carousel :interval="3000" height="650px"  >
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
            </el-carousel>
          </div>
        </div>
      </div>
      <!--技术简介板块-->
      <div class="tech_introduction">
        <div class="container_title">
          <span style="font-size: 36px;left: 526px;top: 70px;position: absolute;display: block;padding-bottom:20px;border-bottom: 2px solid rgb(114,177,99)">技术简介</span>
        </div>
        <div class="wurenji">
          <div class="container">
            <div class="text_introduction module" style="width: 61%;height: 100%;float: left">
              <span style="font-size: 40px;display:block;text-align: left;padding: 30px"> 无人机监控</span>
              <br>
              <span style="font-size: 20px;color:#96969a;display:block;text-align: left;padding-left: 30px">全方位 多角度</span>
              <br>
              <span style="font-size: 26px;display:block;text-align: left"> 种植园区内覆盖多个监控设备，并设置专用安全巡逻无人机，可实时监控作物生长情况</span>
            </div>
            <div class="img_introduction module" style="width: 39%;height: 100%;float: left">
              <img src="../assets/planeImage.png" style="height: 500px;max-width:100% ">
            </div>
            <div class="more module" style="position: absolute;left: 30px; bottom: 20%">
                    <span @click="directToSubpage(SubpagePath[0])" style="font-size: 26px;display: inline-block" >
                        了解更多
                        <div style="display:inline-block;width: 14px;height: 14px;border-top: 2px solid #001e1e;border-right: 2px solid #001e1e;transform: rotate(45deg);"></div>
                    </span>
            </div>
          </div>
        </div>

        <div class="cetupeifang">
          <div class="container">
            <div class="img_introduction module" style="width: 39%;height: 100%;float: left">
              <img src="../assets/SoilTestImage.png" >
            </div>
            <div class="text_introduction module" style="width: 61%;height: 100%;float: left">
              <span style="font-size: 40px;display:block;text-align: right;margin: 30px"> 测土配方</span>
              <br>
              <span style="font-size: 20px;color:#96969a;display:block;text-align: right;padding-right: 30px">科学配方 精准施肥</span>
              <br>
              <span style="font-size: 26px;display:block;text-align: left;padding-left: 100px"> 测土壤养分含量、设置配方、按方施肥。提升枳壳的产量，增加枳壳种植经济效益</span>
            </div>
            <div class="more module" style="position: absolute;right: 30px; bottom: 20%">
                    <span  @click="directToSubpage(SubpagePath[1])" style="font-size: 26px;display: inline-block">
                        了解更多
                        <div style="display:inline-block;width: 14px;height: 14px;border-top: 2px solid #001e1e;border-right: 2px solid #001e1e;transform: rotate(45deg);"></div>
                    </span>
            </div>
          </div>
        </div>
        <div class="bingchonghai">
          <div class="container">
            <div class="text_introduction module" style="width: 61%;height: 100%;float: left">
              <span style="font-size: 40px;display:block;text-align: left;margin: 30px"> 病虫害识别</span>
              <br>
              <span style="font-size: 20px;color:#96969a;display:block;text-align: left;padding-left: 30px">现场拍照 实时识别</span>
              <br>
              <span style="font-size: 26px;display:block;text-align: left">基于人工智能技术，只需拍下病虫害图片，数秒内即可精准识别，并提供个性化解决方案</span>
            </div>
            <div class="img_introduction module" style="width: 39%;height: 100%;float: left">
              <img src="../assets/diseaseIdentification.png" style="height: 500px;max-width:100% ">
            </div>
            <div class="more module" style="position: absolute;left: 30px; bottom: 20%">
                    <span @click="directToSubpage(SubpagePath[2])" style="font-size: 26px;display: inline-block">
                        了解更多
                        <div style="display:inline-block;width: 14px;height: 14px;border-top: 2px solid #001e1e;border-right: 2px solid #001e1e;transform: rotate(45deg);"></div>
                    </span>
            </div>
          </div>
        </div>
        <div class="zhuisu">
          <div class="container">
            <div class="img_introduction module" style="width: 39%;height: 100%;float: left">
              <img src="../assets/productTracing.png" >
            </div>
            <div class="text_introduction module" style="width: 61%;height: 100%;float: left">
              <span style="font-size: 40px;display:block;text-align: right;margin: 30px"> 产品追溯</span>
              <br>
              <span style="font-size: 20px;color:#96969a;display:block;text-align: right;padding-right: 30px"> 生产和交易全周期透明、可控</span>
              <br>
              <span style="font-size: 26px;display:block;text-align: left;padding-left: 100px"> 枳壳质量安全追溯系统以溯源码作为主线，对枳壳从生产到销售各个环节的质量安全数据进行及时采集上传，为消费者提供及时的安全追溯查询服务</span>
            </div>
            <div class="more module" style="position: absolute;right: 30px; bottom: 20%">
                    <span @click="directToSubpage(SubpagePath[3])" style="font-size: 26px;display: inline-block">
                        了解更多
                        <div style="display:inline-block;width: 14px;height: 14px;border-top: 2px solid #001e1e;border-right: 2px solid #001e1e;transform: rotate(45deg);"></div>
                    </span>
            </div>
          </div>
        </div>
        <div class="zhishiku">
          <div class="container">
            <div class="text_introduction module" style="width: 61%;height: 100%;float: left">
              <span style="font-size: 40px;display:block;text-align: left;margin: 30px"> 枳壳种植知识库</span>
              <br>
              <span style="font-size: 20px;color:#96969a;display:block;text-align: left;padding-left: 30px"> 全覆盖 可在线查阅</span>
              <br>
              <span style="font-size: 26px;display:block;text-align: left"> 建立覆盖枳壳生命周期的种植知识库，将有关枳壳种植领域的专门知识和领域专家的经验以可接受的方式传递给农业决策者，提高农业决策的自动化和科学化</span>
            </div>
            <div class="img_introduction module" style="width: 39%;height: 100%;float: left">
              <img src="../assets/knowledgeImage.png" style="height: 500px;max-width:100% ">
            </div>
            <div class="more module" style="position: absolute;left: 30px; bottom: 20%">
                    <span @click="directToSubpage(SubpagePath[4])" style="font-size: 26px;display: inline-block">
                        了解更多
                        <div style="display:inline-block;width: 14px;height: 14px;border-top: 2px solid #001e1e;border-right: 2px solid #001e1e;transform: rotate(45deg);"></div>
                    </span>
            </div>
          </div>
        </div>
      </div>
      <!--页脚部分-->
      <div class="other">
        <div class="container" style="width: 1200px;height: 100%;margin: 0 auto;">
          <!--            底部二维码-->
          <div class="QRcode" style="width: 40%;height: 100%;float: left">

            <div class="codebox" style="float: left;width:130px;margin-left:10%;height:130px;margin-top:30px;text-align: center">
              <img src="../assets/WeChatQR.png" style="width: 100%;height: 100%">
              <span style="margin-top:5px;font-size: 10px;color: #646464;text-align: center"> 枳壳智慧种植小程序</span>
            </div>

            <div class="codebox" style="float: left;width:130px;height:130px;margin-left: 40px;margin-top:30px;text-align: center">
              <img src="../assets/appQRcode.png" style="width: 100%;height: 100%">
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
  import $ from "jquery";

  import swiperimage1 from '../assets/Carousel1.png'
  import swiperimage2 from '../assets/Carousel2.png'
  import swiperimage3 from '../assets/Carousel3.png'
  import swiperimage4 from '../assets/Carousel4.png'
  import swiperimage5 from '../assets/Carousel5.png'

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
        name: "Introduction",
        data(){
            return{
                swiperimages:[
                    {src:swiperimage1},
                    {src:swiperimage2},
                    {src:swiperimage3},
                    {src:swiperimage4},
                    {src:swiperimage5}
                ],
                SubpagePath:['camera','SoilTesting','Identification','ProductTracing','KnowledgeBase','AboutUs'],
              imagesLoaded:false
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
                // const routeURL = this.$router.resolve({
                //     path: '/introduction/camera',
                //
                // })
                // window.open(routeURL.href, '_blank')

                let path = '/introduction/' + subpath
                this.$router.push(path);
                },
            scroll(event){
                allMods.each(function(i, el) {
                    var el = $(el);
                    if (el.visible(true)) {
                        el.addClass("come-in");
                    }
                });
            },
            //点击icon时，平滑滚动至对应版块
            ScrollTop(number = 0, time){
                window.scrollTo({
                    'top': number,
                    'behavior': 'smooth'
                })

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

<style scoped>
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
  .more span{
    transition: all 0.2s;
  }

  .more span:hover{
    color: #5292c1;
    cursor: pointer;
  }

  .more span .arrow{
    transition: all 0.2s;
  }
  .more .arrow:hover{
    border-color: #5292c1;
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
    margin: 10px auto;
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
    top: 55px;

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







  .tech_background{

    width: 100%;
    height: 400px;
    min-width: 1200px;
    background-color: #f5f5f5;
  }
  .tech_background .container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }
  .introduction{
    height: 800px;
    width: 100%;
    min-width: 1200px;
  }
  .introduction .container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }





  .tech_introduction{
    width: 100%;
    min-width: 1200px;

  }
  .tech_introduction .container_title{
    width: 1200px;
    height: 200px;
    margin: 0 auto;

    position: relative;
  }

  .tech_introduction .wurenji{
    width: inherit;
    height: 500px;
    position: relative;
    background-color: #f5f5f5;
  }
  .tech_introduction .cetupeifang{
    width: 100%;
    height: 500px;
    position: relative;
    background-color: white;
  }
  .tech_introduction .bingchonghai{
    width: 100%;
    height: 500px;
    position: relative;
    background-color: #f5f5f5;
  }
  .tech_introduction .zhuisu{
    width: 100%;
    height: 500px;
    position: relative;
    background-color: white;
  }
  .tech_introduction .zhishiku{
    width: 100%;
    height: 500px;
    position: relative;
    background-color: #f5f5f5;
  }
  .tech_introduction .container{
    width: 1200px;
    height: 100%;
    margin: 0 auto;
    position: relative;
  }

  .come-in:nth-child(1) {
    transform: translateX(-20%);
    animation: come-in 1s cubic-bezier(0, -0.01, 0, 0.99) forwards;
  }
  .come-in:nth-child(2) {
    transform: translateX(20%);
    animation: come-in 1s cubic-bezier(0, -0.01, 0, 0.99) forwards;
  }
  .come-in:nth-child(3) {
    animation: myshow 3s cubic-bezier(0, -0.01, 0, 0.99) forwards;
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
  @keyframes  myshow{
    from{
      opacity: 0;
    }
    to{
      opacity: 1;
    }
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
    background-color: #272727;
  }
  .footer .container{
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }




  /*轮播图css*/

  #wrapper{
    width:1200px;
    margin:50px auto;
    height:650px;
    top: 100px;
    position:absolute;
    color:#fff;
    text-shadow:rgba(0,0,0,0.1) 2px 2px 0px;
  }






  .tech-icon:hover{
    transform: scale(1.05);
    cursor: pointer;
  }
  .tech-icon{
    transition: all .5s ease;
  }

  .quick_link a:hover{
    cursor: pointer;
  }

</style>


