<template>
  <div id="root">
    <!-- 标题 -->
    <div style="display:flex; flex-direction: row; align-items:center; justify-content: start">
      <span style="font-size:50px">产地价格</span>&nbsp;
      <span style="font-size:35px;margin-left: 30px;">{{ showData.place }}&nbsp;&nbsp;{{showData.time}}</span>
    </div>

    <div style="display:flex;justify-content:space-around;">
      <div style="display:flex;width:32.5%;border-style: solid; border-width: 5px;" :class="{rise: showData.todayPrice > showData.yestodayPrice , down: showData.todayPrice < showData.yestodayPrice}">
        <!-- 今日价格 -->
        <div class="gravity_center" style="font-size:120px;flex:1">
          {{ showData.todayPrice }}
        </div>

        <!-- 昨日价格、涨跌幅 -->
        <div class="gravity_center" style="flex-direction:column;font-size:32px;flex:1">
          <span>昨日: {{ showData.yestodayPrice}}</span>
          <span v-if="showData.todayPrice === '暂无'"> -- </span>
          <span v-else-if="showData.todayPrice > showData.yestodayPrice" >涨幅: {{ (showData.todayPrice - showData.yestodayPrice) / showData.yestodayPrice * 100}}%</span>
          <span v-else-if="showData.todayPrice === showData.yestodayPrice"> 价格无变动 </span>
          <span v-else>跌幅: {{(showData.todayPrice - showData.yestodayPrice) / showData.yestodayPrice * 100}} %</span>
        </div>
      </div>

      <div id="priceTable" style="width:55%;display:flex;justify-content: space-between;border-top-style: solid; border-top-width: 5px;border-bottom-style: solid; border-bottom-width: 5px;">
        <div>
          <div style="opacity:0">占位用</div>
          <div style="font-size:32px">最高:</div>
          <div style="font-size:32px">最低:</div>
        </div>
        <div>
          <div style="font-size:32px">近一周</div>
          <div style="font-size:24px">{{  showData.priceTable.week.highest   }}</div>
          <div style="font-size:24px">{{  showData.priceTable.week.lowest  }}</div>

        </div>
        <div>
          <div style="font-size:32px">近半年</div>
          <div style="font-size:24px">{{  showData.priceTable.halfYear.highest  }}</div>
          <div style="font-size:24px">{{  showData.priceTable.halfYear.lowest }}</div>
        </div>
        <div>
          <div style="font-size:32px">近一年</div>
          <div style="font-size:24px">{{  showData.priceTable.year.highest   }}</div>
          <div style="font-size:24px">{{  showData.priceTable.year.lowest  }}</div>
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
            :id="item.id"
            >

          </div>
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
    name: "PriceTrend2",
    data: function(){
      return{
        carouselIndex: -1,
        charts:[],
        priceInfo:[],
        showData:{},
        priceId:0,
        chartData:[]
      }
    },
    created:   async function () {
      await this.getAreaPrice()
      this.showData = this.priceInfo[this.priceId]
      this.chartData = this.showData["chartData"]
      //目前的问题：created和mounted之间的异步问题，mounted并非是在created之后进行，可能会提前

      let $chars =
        'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
      let maxPos = $chars.length
      let pwd = ''
      for (let i = 0; i < 32; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
      }
      for (let j = 0; j < this.chartData.length; j++) {
        this.chartData[j].id = pwd + j
      }

      this.timer = setInterval(this.changePriceId, 15000)
      this.timer2 = setInterval(this.longTimeRefresh, 1800000)


    },
    destroyed(){
      clearInterval(this.timer);
      clearInterval(this.timer2);

    },
    updated() {
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
      async longTimeRefresh() {
        await this.getAreaPrice()
        this.showData = this.priceInfo[this.priceId]
        this.chartData = this.showData["chartData"]

        let $chars =
          'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        let maxPos = $chars.length
        let pwd = ''
        for (let i = 0; i < 32; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        for (let j = 0; j < this.chartData.length; j++) {
          this.chartData[j].id = pwd + j
        }
      },
      changePriceId:function(){
        this.priceId  = (this.priceId + 1)%(this.priceInfo.length)
        this.showData = this.priceInfo[this.priceId]
        this.chartData  =  this.showData["chartData"]


        let $chars =
          'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'
        let maxPos = $chars.length
        let pwd = ''
        for (let i = 0; i < 32; i++) {
          pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
        }
        for (let j = 0; j < this.chartData.length; j++) {
          this.chartData[j].id = pwd + j
        }



      },
      dateSort:function (a,b) {
        let timeA = new Date(Object.keys(a)[0]).getTime()
        let timeB = new Date(Object.keys(b)[0]).getTime()
        return timeA - timeB
      }
      ,
       getAreaPrice:async function () {
        let param = {time: 365};
        await this.$api.price.findAreaPriceByTime(param).then((res) => {

          if (res.code === 200)
          {

            let now = new Date()
            now.setDate(now.getDate())
            let yestoday = new Date()
            yestoday.setDate(yestoday.getDate() - 1)
            let todayDate = ""
            let yestodayDate = ""

            let WeekAgo = new Date()
            WeekAgo.setDate(now.getDate()-7)
            let WeekAgoTime = WeekAgo.getTime()

            let  halfYearAgo = new Date()
            halfYearAgo.setDate(now.getDate()-183)
            let  halfYearAgoTime = halfYearAgo.getTime()

            let  yearAgo = new Date()
            yearAgo.setDate(now.getDate()-365)
            let yearAgoTime = yearAgo.getTime()

            todayDate = now.getFullYear() +'-'+ ((now.getMonth() + 1)<9?'0'+(now.getMonth() + 1):(now.getMonth() + 1)) +'-'+ ((now.getDate() < 9)?'0'+now.getDate():now.getDate())
            yestodayDate = yestoday.getFullYear() +'-'+ ((yestoday.getMonth() + 1)<9?'0'+(yestoday.getMonth() + 1):(yestoday.getMonth() + 1)) +'-'+ ((yestoday.getDate() < 9)?'0'+yestoday.getDate():yestoday.getDate())



            let tempPriceDict = {}
            let returnPriceDict = {}
            if (res.data.areaPrice.length !== 0) {
              //tempPriceInfo  [{"area":...,"date":...,"price":...},{}]
              let tempPriceInfo = res.data.areaPrice
              for (let i = 0; i < tempPriceInfo.length ; i++) {
                let date = tempPriceInfo[i]["date"]

                let price = tempPriceInfo[i]["price"]
                if(Object.keys(tempPriceDict).indexOf(tempPriceInfo[i]["area"]) === -1){
                    tempPriceDict[tempPriceInfo[i]["area"]] = {}
                    tempPriceDict[tempPriceInfo[i]["area"]][date] = price
                  }
                  else {
                    tempPriceDict[tempPriceInfo[i]["area"]][date] = price
                  }
              }
            }


            //tempPriceDict:{"江津市":{"2021-03-30":12,....},}
            for (let key in tempPriceDict) {
              returnPriceDict[key] = {}
              returnPriceDict[key].place =  key
              returnPriceDict[key].time  = todayDate
              returnPriceDict[key].todayPrice = tempPriceDict[key][todayDate]?tempPriceDict[key][todayDate]:"暂无"
              returnPriceDict[key].yestodayPrice = tempPriceDict[key][yestodayDate]?tempPriceDict[key][yestodayDate]:"暂无"

              let weekPrice = []
              let halfYearPrice = []
              let yearPrice = []

              let weekPriceObjectArray = []
              let halfYearPriceObjectArray = []
              let yearPriceObjectArray = []

              for(let timeKey in tempPriceDict[key]){
                let time = new Date(timeKey).getTime()
                if (WeekAgoTime < time ) {
                  weekPrice.push(parseFloat(tempPriceDict[key][timeKey]))
                  weekPriceObjectArray.push({[timeKey]:tempPriceDict[key][timeKey]})

                }
                if (halfYearAgoTime < time ) {
                  halfYearPrice.push(parseFloat(tempPriceDict[key][timeKey]))
                  halfYearPriceObjectArray.push({[timeKey]:tempPriceDict[key][timeKey]})

                }
                if (yearAgoTime < time ) {
                  yearPrice.push(parseFloat(tempPriceDict[key][timeKey]))
                  yearPriceObjectArray.push({[timeKey]:tempPriceDict[key][timeKey]})

                }
              }


              returnPriceDict[key].priceTable = {
                week: { highest: Math.max(...weekPrice), lowest: Math.min(...weekPrice) },
                halfYear: { highest: Math.max(...halfYearPrice), lowest:Math.min(...halfYearPrice) },
                year: { highest: Math.max(...yearPrice), lowest: Math.min(...yearPrice) }
              }

              weekPriceObjectArray.sort(this.dateSort)
              halfYearPriceObjectArray.sort(this.dateSort)
              yearPriceObjectArray.sort(this.dateSort)

              let weekData =  {}
              let halfYearData = {}
              let yearData = {}

              for (let i = 0; i < weekPriceObjectArray.length; i++) {
                Object.assign(weekData,weekPriceObjectArray[i])
              }
              for (let i = 0; i < halfYearPriceObjectArray.length; i++) {
                Object.assign(halfYearData,halfYearPriceObjectArray[i])
              }
              for (let i = 0; i < yearPriceObjectArray.length; i++) {
                Object.assign(yearData,yearPriceObjectArray[i])
              }

              returnPriceDict[key].chartData
                = [{
                  title: "价格变化",
                  subtitle: "近一周数据",

                  data: weekData
                },
                {
                  title: "价格变化",
                  subtitle: "近半年数据",

                  data: halfYearData

                },
                {
                  title: "价格变化",
                  subtitle: "近一年数据",

                  data:yearData

                }
              ]
              this.priceInfo.push(returnPriceDict[key])
            }



          }
        });

      },


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
