<template>
  <div id="root" ref="NewsRoot">
    <div v-for="item in news">

      <div style="display:flex" @click="onTitleClick(item)">{{item.title}}</div>

      <div class="scroll" >
        <span class="scroll-item" :data-text="item.content">{{item.content}}</span>

      </div>

    </div>
  </div>
</template>
<script>
  export default {
    name: "News",
    props: {
      news:{
        type: Array,
        default: function(){
          return[
            {
              title: "[市场快讯]玉林市场枳壳库存有量行情表现平淡",
              url: "https://www.baidu.com",
              content: "枳壳，产区、市场库存有量，市场近期少见上批量的货源走动，行情表现平淡，现江西统货价格在18-19元之间，后市继续走平。"
            },
            {
              title: "[产地快讯]湖南省益阳市资阳区枳壳走动不是很快",
              url: "https://www.baidu.com",
              content: "湖南省益阳市资阳区枳壳待售货源有量，近期虽有商问价，但整体走动不是很快，行情疲软运行，目前本地含量达标货价格为15元左右；不合格货价格偏低，报价在8.5元左右。"
            }
          ]
        }
      }
    },
    mounted: function(){
      // this.calScroll()
    },
    methods:{
      onTitleClick: function(item){
        window.open(item.url, "_blank")
      },
      calScroll: function(){
        /* animation: scroll 12s linear infinite; */
        let doms = document.getElementsByClassName("scroll-item")
        let rootWidth = this.$refs.NewsRoot.clientWidth
        for( var k = 0; k < doms.length; k++){
          let scrollWidth = doms[k].scrollWidth
          if( parseFloat(scrollWidth) / rootWidth > 0.9 ){
            let styleValue = "animation: scroll " +doms[k].innerHTML.length * 0.5+"s linear infinite;"
            // alert(doms[k].style.cssText)
            // doms[k].style.cssText  += styleValue
            alert(doms[k].style.cssText
            )
            doms[k].style.cssText

            = styleValue
            alert(doms[k].style.cssText)
          }
        }
      }
    }
  }
</script>
<style scoped>
  #root {
    height: 100%;
    width: 100%;
  }
  .scroll{
    height: 50px;
    line-height: 50px;
    white-space: nowrap;
    overflow: hidden;
		width: 100%;
  }
  .scroll span{
  	display: inline-block;/*inline样式不能使用动画*/
    animation: scroll 12s linear infinite;
  }
	.scroll span:after{
		position: absolute;
  	left: 100%;
  	content: attr(data-text);
  	margin-left: 4em;
	}
	@keyframes scroll {
		from {
			transform: translateX(calc(0%));
		}
		to {
			transform: translateX(calc(-100% - 4em)); /*总长的一半再加上margin-left的一半*/
		}
	}
</style>
