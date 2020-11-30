<template>
  <div id="Identification" v-show="imagesLoaded">
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
      <img id="nav-image" src="../../../assets/diseaseIdentificationImage3.png" style="display:block; width: 100%;min-width:1200px;left: 0;">

    </div>



    <div class="information" style="background-color: white;">
      <div class="container" >

        <el-row>
          <el-col :span="12" class="module">
            <div style="top: 100px;position: relative;" >

              <p style="text-align: right;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/AI-icon.png" style="top: 15px;left:-5px;position: relative">技术简介</p>
              <br>
              <p style="text-align: right; color: rgba(184,184,184,1);top: 20px;position: relative">结合人工智能技术，针对海量植物病虫害的典型例图进行训练学习，形成基于卷积神经网络的植物病虫害自动识别引擎，利用该引擎对病虫害进行自动识别</p>
            </div>
          </el-col>
          <el-col :span="12" class="module">
            <div >
              <img src="../../../assets/TechArch.jpg" alt="2" style="width: 450px;height: 300px;padding: 80px 0">
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
              <img src="../../../assets/OnlineIdentification.png" alt="2" style="width: 500px;height: 353px;position: relative;top: 80px">
            </div>
          </el-col>
          <el-col :span="12" class="module">
            <div style="top: 100px;position: relative;" >
              <p style="text-align: left;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/diseaseIdentification-icon2.png" style="top: 15px;position: relative;margin-right: 10px">在线识别</p>
              <br>
              <p style="text-align: left; color: rgba(184,184,184,1);top: 20px;position: relative">移动端应用部署病虫害识别引擎，可实时上传病虫害图片，数秒内即可实现病虫害精准识别，并为种植户提供解决方案</p>
            </div>
          </el-col>

        </el-row>
      </div>

    </div>

    <div class="information" style="background-color: white;">
      <div class="container" >

        <el-row>
          <el-col :span="12" class="module">
            <div style="top: 100px;position: relative;" >

              <p style="text-align: right;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/knowledgeGraph-icon2.png" style="top: 15px;left:-5px;position: relative">病虫害知识库</p>
              <br>
              <p style="text-align: right; color: rgba(184,184,184,1);top: 20px;position: relative">建立在线病虫害知识库，种植户可实时查询病虫害信息，并获取详细的技术指导</p>
            </div>
          </el-col>
          <el-col :span="12" class="module">
            <div >
              <img src="../../../assets/knowledgeGraphImage2.png" alt="2" style="width: 500px;height: 333px;padding: 80px 0">
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
    var box = document.getElementsByClassName('module');
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
        name: "Identification",
        data(){
            return{
                SubpagePath:['camera','SoilTesting','Identification','ProductTracing','KnowledgeBase','AboutUs'],
                imagesLoaded:false,

            }
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
    /*width: 1920px;*/
    /*height: 5000px;*/
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
  .quick_link a:hover{
    cursor: pointer;
  }
</style>

