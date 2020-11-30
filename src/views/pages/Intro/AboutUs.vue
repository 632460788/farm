<template>
  <div id="AboutUs" v-show="imagesLoaded">
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
      <img id="nav-image" src="../../../assets/aboutUsImage2.png" style="display:block; width: 100%;min-width:1200px;left: 0;">

    </div>

    <div class="intro" style="width: 100%">
<!--          项目简介-->
        <div class="content-wrap module" >
            <h2 class="title" style="display: block;margin: 30px 0;color: rgb(101,102,104);">枳壳智慧种植简介</h2>
            <dl>
              <dd>枳壳智慧种植承建重庆潼南区2000余亩现代枳壳(中药材)高新技术示范基地的智慧农业建设，主要围绕枳壳智慧种植信息管理系统、智慧枳壳种植知识库构建、智慧枳壳种植大数据分析平台等方面进行。主体内容可以概括为3个部分：智慧枳壳种植数据采集硬件部分、智慧枳壳种植数据管理软件部分（PC端、手机APP、微信小程序）和枳壳种植技术手册。</dd>
              <br>
              <dd style="line-height: 30px">枳壳智慧种植重点：<br>
                （1）智慧种植数据采集：通过多种传感器实现对种植园区土壤相关数据、作物水肥量、病虫害、园区气候条件等的监测并将相应数据传给枳壳种植管理系统。<br>
                （2）智慧种植数据管理:通过枳壳智慧种植管理系统长期的数据搜集与分析建立分布式数据库，并部署为云端数据库。<br>
                （3）通过云端服务器向不同节点用户提供云计算服务，追踪枳壳的生长数据、病虫害数据、产量数据、销售状况、产业链供给状况等，利用区块链技术全方位多视角打造枳壳智慧种植，建设农业与互联网深度融合的种植信息化服务平台。<br>
              </dd>
              <br>
              <dd>
                手机APP、微信小程序等还利用图像识别、大数据分析等多项信息技术，实现农业数字化种植和精细化养殖，提升农业企业的数字化和智能化水平，推动人工智能和现代特色农业的相结合。
              </dd>
            </dl>
        </div>

<!-- 项目内容-->
      <div class="content-wrap module" >
            <h2 class="title" style="display: block;margin: 30px 0;color: rgb(101,102,104);">互联网+农业</h2>
            <dl >
              <dd>1.种植信息智能采集：实现土壤环境（包括土壤温度、湿度、张力等）信号的自动监测，实时掌握气候环境变化</dd>
              <br>
              <dd>2.提供历史数据存储、检索等功能</dd>
              <br>
              <dd>3.网页端、手机APP、微信小程序远程查看：实时查看种植园区土壤环境变化，观察实时视频，管理每日养护、浇灌、施肥作业情况</dd>
              <br>
              <dd>4.视频监控子系统：种植园区内装有多个监控设备，并配备无人机巡逻，全方位、实时监控种植情况</dd>
              <br>
              <dd>5.产品溯源子系统：利用区块链技术构建枳壳产品溯源子系统，实现枳壳绿色种植、生产、交易全流程的安全、公开、透明</dd>
              <br>
              <dd>6.病虫害识别引擎：在移动端应用提供病虫害识别引擎，实时上传病虫害图片，数秒内实现病虫害精准识别，并为种植户提供解决方案</dd>
              <br>
              <dd>7.病虫害知识库：建立在线病虫害知识库，种植户可实时查询病虫害信息，并获取详细的技术指导</dd>
              <br>
              <dd>8.枳壳种植知识库：建立可在线查询的枳壳专用种植手册，涵盖枳壳生命周期内的所有种植知识，为种植户提供全面的枳壳种植技术指导</dd>
            </dl>
        </div>


<!--      现场图片-->
        <div class="content-wrap " >
            <h2 class="title module" style="display: block;margin: 30px 0;color: rgb(101,102,104);">现场照片</h2>
            <div class="card-columns" style="width: 100%;">
              <el-row class="module">
                <el-col :span="8">
                  <div class="img_container" >
                    <img class="card-img " src="../../../assets/base1.png" style="display: inline;">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_container" >
                    <img class="card-img " src="../../../assets/base2.jpg" style="display: inline;">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_container" >
                    <img  class="card-img " src="../../../assets/base3.jpg" style="display: inline;">
                  </div>
                </el-col>
              </el-row>
              <el-row class="module">
                <el-col :span="8">
                  <div class="img_container" >
                    <img class="card-img " src="../../../assets/base8.png" style="display: inline;">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_container" >
                    <img class="card-img " src="../../../assets/base5.png" style="display: inline;">
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="img_container" >
                    <img class="card-img " src="../../../assets/base6.png" style="display: inline;">
                  </div>
                </el-col>
              </el-row>


            </div>
        </div>
<!--      平台截图-->
        <div class="content-wrap " >
          <h2 class="title module" style="display: block;margin: 30px 0;color: rgb(101,102,104);">平台截图</h2>
          <div class="card-columns" >
            <el-row class="module" gutter="20">
              <el-col :span="16">
                <div  style="width: 750px;height: 600px;margin-right: 20px;margin-top:5px;display: inline-block;">
                  <img class="card-img " src="../../../assets/DataPlacing.png" style="display: inline;">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="img_container2" >
                  <img class="card-img " src="../../../assets/MobileImage1.png" style="display: inline;">
                </div>
              </el-col>

            </el-row>
            <el-row class="module">
              <el-col :span="8">
                <div class="img_container2" >
                  <img class="card-img " src="../../../assets/MobileImage2.png" style="display: inline;">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="img_container2" >
                  <img class="card-img " src="../../../assets/WechatImage1.png" style="display: inline;">
                </div>
              </el-col>
              <el-col :span="8">
                <div class="img_container2" >
                  <img class="card-img " src="../../../assets/WechatImage2.png" style="display: inline;">
                </div>
              </el-col>
            </el-row>


          </div>
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
        name: "AboutUs",
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

  .content-wrap{
    text-align: left;
    width:1200px;
    margin: 200px auto;
    color: rgb(141,142,144);
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



  dd{
    line-height:26px;
  }


  .img_container{
    width: 360px;
    height: 300px;
    margin-right: 20px;
    margin-top:5px;
    display: inline-block;
  }
  .card-img{
    max-height: 100%;
    max-width: 100%;
  }
  .img_container2{
    width: 360px;
    height: 500px;
    margin-right: 20px;
    margin-top:5px;
    display: inline-block;
  }

  .come-in {
    transform: translateY(20%);
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



