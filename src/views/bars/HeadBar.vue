<template>
  <div class="headbar" style="background:#1890ff">
    <!-- 系统标题 -->
    <span class="sys-name" @click="router.push('/')">枳壳种植管理平台</span>

    <!-- 工具栏 -->
    <span class="toolbar">

<!--      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#FFFFFF"-->
<!--               :active-text-color="themeColor" mode="horizontal">-->
          <el-menu class="el-menu-demo" background-color="#1890ff" text-color="#FFFFFF"
                   :active-text-color="themeColor" mode="horizontal">
        <el-menu-item index="1" @click="$router.push('/')"><i class="al-icon-firsthome-fill" style="font-size:20px;color: #ee9900"></i></el-menu-item>
        <el-menu-item index="4" @click="showFullScreen"><img :src=fullSimg height="20px" /></el-menu-item>
<!--2020-4-11 3lines       -->
<!--        <el-menu-item index="2">-->
<!--          &lt;!&ndash; 主题切换 &ndash;&gt;-->
<!--          <theme-picker class="theme-picker" :default="themeColor" @onThemeChange="onThemeChange"></theme-picker>-->
<!--        </el-menu-item>-->
        <el-menu-item index="3" v-popover:popover-personal>
          <!-- 用户信息 -->
          <span class="user-info"><img src="../../assets/user.png" />{{user.name}}</span>
          <el-popover ref="popover-personal" placement="bottom-end" trigger="click" :visible-arrow="false">
            <personal-panel :user="user"></personal-panel>
          </el-popover>
        </el-menu-item>
      </el-menu>
    </span>
    <span class="toolbar">
<!--      <el-menu class="el-menu-demo" :background-color="themeColor" text-color="#FFFFFF"-->
<!--               :active-text-color="themeColor" mode="horizontal">-->
        <el-menu class="el-menu-demo" background-color="#1890ff" text-color="#FFFFFF"
                 active-text-color="#1890ff" mode="horizontal">
        <el-menu-item index="5">
          <!-- 主题切换 -->
          <iframe name="weather_inc"  src="https://i.tianqi.com/index.php?c=code&id=72&icon=1&num=3&color=%23FFFFFF&py=tongnan"
                  width="150" height="22px" frameborder="0" marginwidth="0" marginheight="0"
                  scrolling="no" float="right"></iframe>
        </el-menu-item>

      </el-menu>


    </span>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  import ThemePicker from "../components/ThemePicker"
  import Action from "../components/Toolbar"
  import PersonalPanel from "../Core/PersonalPanel"
  import fullscreenImg from '../../assets/fullscreen.png'
  import userimg from '../../assets/user.png'
  import {getIFrameUrl, getIFramePath} from '../../utils/iframe'


  export default {
    components: {
      ThemePicker,
      Action,
      PersonalPanel
    },
    data() {
      return {
        user: {
          name: "",
          role: "",
          avatar: userimg,
          registerInfo: ""
        },
        activeIndex: '1',
        langVisible: false,
        nowTime: '',
        isFullScreen: false,
        fullSimg: fullscreenImg,
        refreshTimes: 0

      }
    },
    methods: {
      // 切换主题
      onThemeChange: function (themeColor) {
        this.$store.commit('setThemeColor', themeColor)
      },
      showFullScreen: function () {
        if(this.$showFullScreen.flag){
          this.refreshTimes += 1
          this.$router.push({
            path:'/record/bigScreen',
            query:{
              refreshTimes: this.refreshTimes
            }
          })

        }
        else {
          this.$showFullScreen.flag = true
          let path = '/record/bigScreen'
          this.$router.push(path);
        }

        // if (this.isFullScreen === false){
        //   this.isFullScreen = true
        //   var el = document.documentElement;
        //   var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
        //   if(typeof rfs != "undefined" && rfs) {
        //     rfs.call(el);
        //   };
        // }
        // else {
        //   this.isFullScreen = false
        //   if (document.exitFullscreen) {
        //     document.exitFullscreen();
        //   }
        //   else if (document.mozCancelFullScreen) {
        //     document.mozCancelFullScreen();
        //   }
        //   else if (document.webkitCancelFullScreen) {
        //     document.webkitCancelFullScreen();
        //   }
        //   else if (document.msExitFullscreen) {
        //     document.msExitFullscreen();
        //   }
        //   if(typeof cfs != "undefined" && cfs) {
        //     cfs.call(el);
        //   }
        // }


      }
    },
    mounted() {
      this.sysName = "枳壳种植管理平台"
      var user = sessionStorage.getItem("user")
      if (user) {
        this.user.name = user
        if (sessionStorage.getItem("avatar") === '')
          this.user.avatar = require("@/assets/user.png")
        else {
          this.user.avatar = sessionStorage.getItem("avatar")
        }
        this.user.role = sessionStorage.getItem("role")
        this.user.registerInfo = sessionStorage.getItem("registerInfo")
      }
    },
    computed: {
      ...mapState({
        themeColor: state => state.app.themeColor
      })
    }
  }
</script>

<style scoped lang="scss">
  .headbar {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    height: 60px;
    line-height: 60px;
    border-color: rgba(180, 190, 190, 0.8);
    border-left-width: 1px;
    border-left-style: solid;
  }

  .navbar {
    float: left;
  }

  .toolbar {
    float: right;
  }

  .lang-item {
    font-size: 16px;
    padding-left: 8px;
    padding-top: 8px;
    padding-bottom: 8px;
    cursor: pointer;
  }

  .lang-item:hover {
    font-size: 18px;
    background: #b0d6ce4d;
  }

  .user-info {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    float: right;

    img {
      width: 40px;
      height: 40px;
      border-radius: 10px;
      margin: 10px 0px 10px 10px;
      float: right;
    }
  }

  .badge {
    line-height: 18px;
  }

  .position-left {
    left: 200px;
  }

  .position-collapse-left {
    left: 65px;
  }

  .sys-name {
    font-family: "Arial", "Microsoft YaHei UI", sans-serif;
    font-size: 25px;
    text-align: left;
    margin: 0 15px 0 25px;
    color: #FFFFFF;
    float: left;
  }
</style>
