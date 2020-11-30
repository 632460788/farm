<template>
  <div id="ProductTracing" v-show="imagesLoaded">
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
      <img id="nav-image" src="../../../assets/productTraing2.png" style="display:block; width: 100%;min-width:1200px;left: 0;">

    </div>
<!--    <div id="img_text" style="position: relative;width: 100%;height: 500px">-->
<!--      <div class="mask" style="position: absolute;">-->
<!--        <img src="../../../assets/productTraing2.png" class="background_IMG" >-->
<!--      </div>-->
<!--      <div class="container">-->
<!--        <div class="text" style="position: absolute;">-->
<!--          <span style="font-size: 36px;display:block;position:relative;top:100px;left: 20px;text-align: left;color: rgba(216,217,219,1)"> 产品溯源</span>-->
<!--          <div style="position:relative;top:150px;left: 40px;width: 500px ;text-align: left">-->
<!--            <p style="display:block;font-size: 26px;color: rgba(216,217,219,0.8);margin: 20px 0"> 全流程安全 透明</p>-->
<!--            <p style="display:block;font-size: 16px;color: rgba(216,217,219,0.7);margin: 20px 0"> 利用区块链技术构建绿色枳壳系统，实现枳壳绿色种植、生产、交易全流程的安全、公开、透明</p>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <!--      监控页面部分-->
<!--    <div class="Camera">-->
<!--      <div class="container">-->

<!--        <div class="block"  style="top:30px; position: relative">-->
<!--          &lt;!&ndash;      监控模式选择栏      &ndash;&gt;-->
<!--          &lt;!&ndash;            显示监控界面&ndash;&gt;-->

<!--        </div>-->

<!--      </div>-->
<!--    </div>-->

    <div class="information" style="background-color: white;">
      <div class="container" >

        <el-row >
          <el-col :span="12" class="module">
            <div style="top: 100px;position: relative;" >

              <p style="text-align: right;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/blockChain-icon.png" style="top: 15px;left:-5px;position: relative">技术简介</p>
              <br>
              <p style="text-align: right; color: rgba(184,184,184,1);top: 20px;position: relative">结合区块链技术，将枳壳产品的培育、交易、运输等信息进行记录，根据业务不同划分成不同的区块链，实现产品溯源</p>
            </div>
          </el-col>
          <el-col :span="12" class="module">
            <div >
              <img src="../../../assets/blockChainTech.jpg" alt="2" style="width: 500px;height: 313px;padding: 54px 0;position: relative;top: 30px">
            </div>

          </el-col>
        </el-row>
      </div>
    </div>
    <div class="information" style="background-color: #f5f5f5;">
      <div class="container" >
        <el-row >
          <el-col :span="12" class="module">
            <div >
              <img src="../../../assets/blockChainTechArch.png" alt="2" style="width: 500px;height: 280px;position: relative;top:130px">
            </div>
          </el-col>
          <el-col :span="12" class="module">
            <div style="top: 100px;position: relative;" >
              <p style="text-align: left;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/Arch-icon.png" style="top: 15px;position: relative;margin-right: 10px">技术架构</p>
              <br>
              <p style="display:block;text-align: left; color: rgba(184,184,184,1);top: 30px;margin:20px 0;line-height:26px;position: relative">(1)建立绿色种植生产溯源链，对产品的播种、施肥、培育、收获、加工到产出，形成全培育周期的可溯源生产链，保障农产品种植的透明性和安全性。</p>
              <p style="display:block;text-align: left; color: rgba(184,184,184,1);top: 30px;margin:20px 0;line-height:26px;position: relative">(2)利用多链技术在已有生产链基础上加入交易链。在交易链上流转存证枳壳的培育信息保证产品的真实性，并对产品存储、运输、交易进行存证上链，从而在生产和交易全周期达到透明公开可控。形成完整的绿色枳壳种植区块链系统。</p>
            </div>
          </el-col>

        </el-row>
      </div>

    </div>
    <div class="information" style="background-color: white;">
      <div class="container" >

        <el-row >
          <el-col :span="12" class="module">
            <div style="top: 100px;position: relative;" >

              <p style="text-align: right;font-size: 20px;color: rgba(39,42,45,1)"><img src="../../../assets/Camera-icon3.png" style="top: 15px;left:-5px;position: relative">溯源监测</p>
              <br>
              <p style="text-align: right; color: rgba(184,184,184,1);top: 20px;position: relative">对溯源区块链运行情况进行可视化处理，后台可实时监控产品溯源信息；提供移动端产品溯源应用程序，用户可在线查询枳壳产地等信息，实现商品的快速溯源验证</p>
            </div>
          </el-col>
          <el-col :span="12" class="module">
            <div >
              <img src="../../../assets/blockChainImage.png" alt="2" style="width: 500px;height: 357px;padding: 54px 0;position: relative;top: 30px">
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
        name: "ProductTracing",
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
    margin:0;
    padding:0;
    list-style:none;
    font-family: "微软雅黑";
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




