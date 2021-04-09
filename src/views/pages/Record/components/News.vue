<template>
  <div id="root" ref="NewsRoot" style="justify-content:start">
    <div v-for="item in newsInfo">

      <div style="display:flex;font-size:48px;margin-top:30px;" @click="onTitleClick(item)">[{{item.type}}] {{item.time}} {{item.title}}</div>

      <div class="scroll" style="margin-top:16px" >
        <span class="scroll-item" style="font-size:45px;":data-text="item.content">{{item.content}}</span>

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
              type:"市场快讯",
              title: "玉林市场枳壳库存有量行情表现平淡",
              time:"2020-01-07",
              url: "https://www.baidu.com",
              content: "枳壳，产区、市场库存有量，市场近期少见上批量的货源走动，行情表现平淡，现江西统货价格在18-19元之间，后市继续走平。"
            },
            {
              type:"产地快讯",
              title: "湖南省益阳市资阳区枳壳走动不是很快",
              time:"2020-01-07",
              url: "https://www.baidu.com",
              content: "湖南省益阳市资阳区枳壳待售货源有量，近期虽有商问价，但整体走动不是很快，行情疲软运行，目前本地含量达标货价格为15元左右；不合格货价格偏低，报价在8.5元左右。"
            },
            {
              type:"产地快讯",
              title: "湖南省益阳市资阳区枳壳走动不是很快",
              time:"2020-01-07",
              url: "https://www.baidu.com",
              content: "湖南省益阳市资阳区枳壳待售货源有量，近期虽有商问价，但整体走动不是很快，行情疲软运行，目前本地含量达标货价格为15元左右；不合格货价格偏低，报价在8.5元左右。"
            },
            {
              type:"产地快讯",
              title: "湖南省益阳市资阳区枳壳走动不是很快",
              time:"2020-01-07",
              url: "https://www.baidu.com",
              content: "湖南省益阳市资阳区枳壳待售货源有量，近期虽有商问价，但整体走动不是很快，行情疲软运行，目前本地含量达标货价格为15元左右；不合格货价格偏低，报价在8.5元左右。"
            }
          ]
        }
      }
    },
    data(){
      return {
        newsInfo:[]
      }
    },
  destroyed() {
      clearInterval(this.timer)
  },
    created(){
      this.getNews()
      this.timer = setInterval(this.getNews, 1800000)
    },
    methods:{
      onTitleClick: function(item){
        window.open(item.url, "_blank")
        // let sentence = "【天地网讯】湖南省益阳市资阳区枳壳待售货源有量，近期虽有商问价，但整体走动不是很快，行情疲软运行，目前本地含量达标货价格为15元左右；不合格货价格偏低，报价在8.5元左右。声明：本文是中药材天地网原创资讯，享有著作权及相关知识产权，未经本网站协议授权，任何媒体、网站、个人不得转载、链接或其他方式进行发布；经本网协议授权的转载或引用，必须注明“来源：中药材天地网（www.zyctd.com）”。违者本网站将依法追究法律责任。"
        // let result = sentence.split("声明：本文是中药材天地网原创资讯")[0]
        // alert(result)
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
      },
      sortByDate:function(a, b){
        let time_a = new Date(a["time"])
        let time_b = new Date(b["time"])
        if (time_b.getTime() > time_a.getTime()) {
            return 1
        }
        else
          return -1


      },
      getNews:function () {
        let param = {time: 180};
        this.$api.news.findNewsByTime(param).then((res) => {
          if (res.code === 200)
          {
            if (res.data.newsInfo.length !== 0) {
                let tempNewsInfo = res.data.newsInfo
                tempNewsInfo.sort(this.sortByDate)
              for (let i = 0; i < tempNewsInfo.length && i <= 3 ; i++) {
                    if(tempNewsInfo[i]["type"] !== "品种分析"){
                        let tempInfo = {}

                        tempInfo.type = tempNewsInfo[i]["type"]
                        tempInfo.title = tempNewsInfo[i]["title"]
                        tempInfo.time = tempNewsInfo[i]["time"]
                        tempInfo.url = tempNewsInfo[i]["url"]
                        tempInfo.content = tempNewsInfo[i]["content"].split("声明：本文是中药材天地网原创资讯")[0]
                        this.newsInfo.push(tempInfo)
                    }
                }
            }
          }
          // alert(JSON.stringify(res.data))

        });
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
    animation: scroll 30s linear infinite;
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
