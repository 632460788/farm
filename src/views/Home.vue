<template>
  <div class="container">
    <head-bar></head-bar>
<!--    <menu-bar></menu-bar>-->
    <nav-bar></nav-bar>
    <main-content></main-content>
  </div>
</template>

<script>
  import mock from '@/mock/index.js'
  import HeadBar from "./bars/HeadBar"
  import NavBar from "./bars/NavBar"
  import MainContent from "./bars/MainContent"

  export default {
    name: 'Home',
    components:{
      HeadBar,
      NavBar,
      MainContent
    }
  }
</script>

<style scoped lang="scss">
  .container {
    position:absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(224, 234, 235, 0.1);
  }
</style>
