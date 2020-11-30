<template>
  <div class="toolbar" :style="toolbarStyle" @click="onClick">
    <li :style="iconStyle" :class="icon"></li>
  </div>
</template>

<script>
  export default {
    name: 'Toolbar',
    props: {
      toolbarStyle: {
        type: String,
        default: 'width:60px;display:inline-block;'
      },
      icon: {
        type: String,
        default: 'fa fa-home fa-lg'
      },
      iconStyle: {
        type: String,
        default: 'color:#fff;'
      },
      onClick: {
        type: Function,
        default: null
      }
    },
    data() {
      return {
      }
    },
    methods: {
    }
  }
</script>
<style scoped lang="scss">
  .action:hover {
    background: #636b6931;
  }
</style>
