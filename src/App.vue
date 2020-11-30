<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  created () {
    // 在页面加载时读取sessionStorage
    if (sessionStorage.getItem('store')) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))))
    }
    // 在页面刷新时将store保存到sessionStorage里
    window.addEventListener('beforeunload', () => {
      sessionStorage.setItem('store', JSON.stringify(this.$store.state))
    })

    let that = this;
    document.onkeydown =function(e){
      e = window.event || e;
      if(that.$route.path=='/login'&&(e.code=='Enter'||e.code=='enter')){//验证在登录界面和按的键是回车键enter
        that.submitForm('login');//登录函数
      }
    }
  }

}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.bg-img{
  position: fixed;
  height: 100%; width: 100%;
  background-color: #09153D;
  /*background-color: rgba(9, 21, 61, .88);
  background-image: url(./assets/login-farm.png);*/
  background-repeat: no-repeat;
  background-size: 100% 100%;
  overflow-x: hidden;
  overflow-y: auto;

  /*opacity: 100%;*/
}

</style>
