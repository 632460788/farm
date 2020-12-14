<template>
  <div id="root">
    <!-- 标题 -->
    <div style="display:flex; flex-direction: row; align-items:center; justify-content: start">
      <span style="font-size:32px">{{ title }}</span>&nbsp;&nbsp;
      <span style="font-size:24px;">{{ place }}&nbsp;&nbsp;{{time}}</span>
    </div>

    <!-- 指示牌 -->
    <div style="display:flex;justify-content:space-around">
      <div style="display:flex;width:32.5%" :class="{rise: todayPrice > yestodayPrice, down: todayPrice < yestodayPrice}">
        <!-- 今日价格 -->
        <div class="gravity_center" style="font-size:120px;flex:1">
          {{ todayPrice }}
        </div>

        <!-- 昨日价格、涨跌幅 -->
        <div class="gravity_center" style="flex-direction:column;font-size:32px;flex:1">
          <span>昨日: {{ yestodayPrice}}</span></br>
          <span v-if="todayPrice > yestodayPrice">涨幅: {{ (todayPrice - yestodayPrice) / yestodayPrice * 100}}%</span>
          <span v-if="todayPrice === yestodayPrice"> -- </span>
          <span v-else>跌幅: {{(todayPrice - yestodayPrice) / yestodayPrice * 100}} %</span>
        </div>
      </div>

      <div id="priceTable" style="width:63.5%;display:flex;justify-content: space-between">
        <div>
          <div style="opacity:0">占位用</div>
          <div style="font-size:32px">最高:</div>
          <div style="font-size:32px">最低:</div>
        </div>
        <div>
          <div style="font-size:32px">近一周</div>
          <div style="font-size:24px">{{  priceTable.week.highest   }}</div>
          <div style="font-size:24px">{{  priceTable.week.lowest  }}</div>

        </div>
        <div>
          <div style="font-size:32px">近一月</div>
          <div style="font-size:24px">{{  priceTable.month.highest  }}</div>
          <div style="font-size:24px">{{  priceTable.month.lowest }}</div>
        </div>
        <div>
          <div style="font-size:32px">近一年</div>
          <div style="font-size:24px">{{  priceTable.year.highest   }}</div>
          <div style="font-size:24px">{{  priceTable.year.lowest  }}</div>
        </div>
      </div>
    </div>

    <!-- chart 轮播 -->

    <div class="block" ref="carousel" style="flex:1">
      <div class="slide" ref="slide">
        <div class="slide-auto wrapper" ref="wrapper">
          <div
            :key="item.id"
            v-for="item in chartData"
            class="item"
            :id="item.id"> </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .rise{
    color: #FF3333
  }
  .down{
    color: #66FF33
  }
  #root{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  #priceTable>div{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }
  .gravity_center{
    display:flex;
    justify-content:center;
    align-items:center;
  }
  .slide {
    position: relative;
    width: 600px;
    height: 200px;
    text-align: center;
    font-family: Arial;
    color: #FFF;
    overflow: hidden;
  }

  .slide .wrapper{
    padding: 0;
    width: 1800px;
    transition: all 0.5s;
  }

  .slide .item{
    float: left;
    width: 600px;
    height: 200px;
    list-style: none;
    font-size: 36px;
  }

  /*//自动播放*/
  .slide .slide-auto {
    animation: marginLeft 10.5s infinite;
  }


  @keyframes marginLeft {
    0% {
        margin-left: 0;
    }

    28.5% {
        margin-left: 0;
    }

    33.3% {
        margin-left: -100%;
    }

    62% {
        margin-left: -100%;
    }

    66.7% {
        margin-left: -200%;
    }

    95.2% {
        margin-left: -200%;
    }

    100% {
        margin-left: 0;
    }
  }
</style>

<script>
  import echarts from "echarts"
  export default {
    name: "PriceTrend",
    props:{
      id: {type: String, required: true, default: "test"},
      weekData: {type: Array, required: true},
      monthData:{ type: Array, required: true},
      yearData: {type: Array, required: true},
      title: {type: String, default: "产地价格"},
      place: {type: String, default: "安国药市"},
      time: {type: String, default: "2020年2月28日"},
      todayPrice: { type: Number, default: 1},
      yestodayPrice: { type: Number, default: 2},
      priceTable: {
        type: Object,
        default: function(){
          return {
            week: { highest: 14.17, lowest: 14.17 },
            month: { highest: 14.17, lowest: 14.17 },
            year: { highest: 14.17, lowest: 14.17 }
          }
        }
      },
      chartData: {
        type: Array,
        default: function(){
          return [
            {
              title: "价格变化",
              subtitle: "近一周数据",

              data: {
                "周一":96.24,
                "周二":81.31
              }
            },
            {
              title: "价格变化",
              subtitle: "近一月数据",

              data: {
                "1号": 96.34,
                "2号": 96.35
              }

            },
            {
              title: "价格变化",
              subtitle: "近一年数据",

              data:{
                "1-1": 96.24,
                "1-2": 11.35
              }

            }
          ]
        }
      }

    },
    data: function(){
      return{
        carouselIndex: -1,
        charts:[]
      }
    },
    created: function(){

      let $chars =
      'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < 32; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      for(let j = 0; j < this.chartData.length; j++){
        this.chartData[j].id = pwd + j
      }
    },
    mounted: function(){


      this.chartData.forEach(
        item => {
          this.drawChart(item.id, item)
        }
      )
      this.onResize()
      window.addEventListener("resize", ()=>{
        this.$nextTick(
          ()=>{
            this.onResize()
          }
        )
      })
    },
    methods:{
      drawChart: function(id, data){
        let chart = echarts.init(document.getElementById(id))
        this.charts.push(chart)
        let xData = []
        let yData = []
        for(let k in data.data){
          xData.push(k)
          yData.push(data.data[k])
        }
        let option = {
            title: [
              {
                text: data.title,
                left: 'center',
                textStyle:{
                  fontSize: 48,
                  color: "#ffffff"
                },
              },{
                text: data.subtitle,
                left: "75%",
                textStyle:{
                  fontSize: 32,
                  color: "#8e8f92"
                }
              }
            ],
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: xData,
                axisLabel:{
                  fontSize:32,
                  color: "#FFFFFF"
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        width: 3
                    }
                }
              }
            ],
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            yAxis: [{
                name:'元',
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        width: 3
                    }
                },
                splitNumber:2,
                axisLine:{
                  show:false
                },
                // axisTick:{
                //   show:false,
                // },
                axisLabel:{
                  fontSize:32,
                  color: "#FFFFFF"
                },
                nameTextStyle:{
                  fontSize: 32,
                  color: "#FFFFFF"
                }
            }],

            series: [
              {
                name: 'line',
                type: 'line',
                smooth: true,
                lineStyle:{
                  normal:{
                    width: 5,
                    color: "#018ce3"
                  }
                },
                data: yData
              },
            ]
        }
        chart.setOption(option)
        chart.resize()
      },
      handleChange: function(index){
        this.carouselIndex = index
      },
      onResize: function(){
        let width = this.$refs.carousel.offsetWidth
        let height = this.$refs.carousel.offsetHeight
        let slide = this.$refs.slide
        slide.style.width = width + "px"
        slide.style.height = height + "px"
        let wrapper = this.$refs.wrapper
        wrapper.style.width = width * 3 + "px"
        wrapper.style.height = height * 3 + "px"

        let doms = document.getElementsByClassName("item")
        for(var key = 0; key<doms.length; key++){
          doms[key].style.width = width + "px"
          doms[key].style.height = height + "px"
        }
        this.charts.forEach(item =>{
          item.resize()
        })
      }

    }
  }
</script>
