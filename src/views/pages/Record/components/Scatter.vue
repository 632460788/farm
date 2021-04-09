<template>
  <div id="root">
    <div id="chart" style="width:100%;height:100%">
    </div>
  </div>
</template>

<style scoped>
  #root{
    width: 100%;
    height: 100%;
  }
</style>

<script>
  import echarts from "echarts"
  import ecStat from "echarts-stat"
  export default{
    name: "scatter",
    data: function(){
      return {
        chart: {},
        irrigChartData:[],
        fertiChartData:[],
        newChartData:[],
        showIrrigChartData:true,
        minDate:"",
        maxDate:"",
        title:"",
        xAxisName:"",
        yAxisName:"",
        yAxisUnit:"",
        nowDate:"",
        xAxisData:[],
        timeStar:0,
        color:""
      }
    },
    props:{
      chartData:{
        type: Array,
        require: false,
        default: function() {
          return [
            [96.24, 11.35],
            [33.09, 85.11],
            [57.60, 36.61],
            [36.77, 27.26],
            [20.10, 6.72],
            [45.53, 36.37],
            [110.07, 80.13],
            [72.05, 20.88],
            [39.82, 37.15],
            [48.05, 70.50],
            [0.85, 2.57],
            [51.66, 63.70],
            [61.07, 127.13],
            [64.54, 33.59],
            [35.50, 25.01],
            [226.55, 664.02],
            [188.60, 175.31],
            [81.31, 108.68]
          ]
        }
      },
      chartTitle:{
        type: String,
        require: false,
        default: "测试标题"
      }
    },
    mounted: function () {
      this.drawChart()
      window.addEventListener("resize", ()=>{ this.chart.resize()})
    },
    created() {
      this.getData()
      this.getMonthRange()
      this.timer = setInterval(this.changeChartDataType,5000)
    },
    destroyed() {
      clearInterval(this.timer);
    },
    methods:{
      getMonthRange(){
        var now = new Date(); //当前日期
        var nowMonth = now.getMonth(); //当前月
        var nowYear = now.getFullYear(); //当前年
        this.nowDate = nowYear + "年" + (nowMonth + 1) + "月" //获取title的时间信息
        //本月的开始时间
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        //本月的结束时间
        var monthEndDate = new Date(nowYear, nowMonth+1, 0);
        var timeStar=monthStartDate.getTime();
        var timeEnd=monthEndDate.getTime();
        this.timeStar = timeStar
        this.minDate = 1
        this.maxDate = (timeEnd - timeStar)/(3600 * 24 * 1000) + 1
        let dayRange = this.maxDate
        for (let i = 0; i <= dayRange ; i++) {
          this.xAxisData.push(i)
        }

      }
      ,
      changeChartDataType(){
        this.showIrrigChartData = !this.showIrrigChartData
        if(this.showIrrigChartData){
          this.newChartData = this.irrigChartData
          this.title = this.nowDate + "浇灌情况"
          this.xAxisName = "浇灌日期"
          this.yAxisName = "浇灌量（吨）"
          this.color = "#109bdc"
        }
        else {
          this.newChartData = this.fertiChartData
          this.title = this.nowDate + "施肥情况"
          this.xAxisName = "施肥日期"
          this.yAxisName = "施肥量(千克)"
          this.color = '#fbb900'
        }
      }
      ,
      async getData(){
        await this.$api.irrigation.findPage(null).then((res) => {
          res.data.content = res.data;
          let tempPageResult = res.data
          for (let i = 0; i < tempPageResult.length; i++) {
            var tempTime = new Date(tempPageResult[i].datetime1)
            var nowDate = new Date();

            if (( nowDate.getFullYear() === tempTime.getFullYear() ) &&
              ( nowDate.getMonth() === tempTime.getMonth() )){
              let time = Math.floor((tempTime.getTime()-this.timeStar)/(3600 * 24 * 1000)) + 1
              let stere = tempPageResult[i]["stere"]
              this.irrigChartData.push([time,stere])
            }

          }
         })
        await this.$api.fertilization.findPage(null).then((res) => {
          res.data.content = res.data;
          let tempPageResult = res.data
          for (let i = 0; i < tempPageResult.length; i++) {
            var tempTime = new Date(tempPageResult[i].datetime1)
            var nowDate = new Date();

            if (( nowDate.getFullYear() === tempTime.getFullYear() ) &&
              ( nowDate.getMonth() === tempTime.getMonth() )){
              // var time = echarts.format.formatTime('yyyy-MM-dd', tempTime.getTime())
              let time = Math.floor((tempTime.getTime()-this.timeStar)/(3600 * 24 * 1000)) + 1
              let quantity = tempPageResult[i]["quantity"]
              this.fertiChartData.push([time,quantity])
            }
          }
        })
      },
      drawChart: function(chartData,itemcolor){
        let chart = echarts.init(document.getElementById("chart"))
        this.chart = chart
        var myRegression = ecStat.regression('polynomial', this.chartData, 3)

        myRegression.points.sort(function(a, b) {
            return a[0] - b[0];
        })

        let option = {

            grid: {
              left: '3%',
              right: '7%',
              bottom: '3%',
              containLabel: true
            },
            title: {
                text: this.title,
                left: 'center',
                x:'center',
                textStyle:{
                  fontSize: 50,
                  color: "#ffffff",
                  fontWeight:'normal'
                }
            },
            xAxis: {
                type: 'category',
                data:this.xAxisData,
                name:this.xAxisName,
                nameTextStyle:{
                  fontSize:32,
                  color:"#fff",
                },
              axisLabel:{
                fontSize:32,
                color:"#fff",
                interval:0,
              },
                splitLine: {
                  show:true,
                    lineStyle: {
                        type: 'dashed',
                        width: 3
                    }
                },
              minInterval: this.maxDate,
              min:this.minDate,
              max:this.maxDate
            },
            yAxis: {
                type: 'value',
                name:this.yAxisName,
                nameTextStyle:{
                  fontSize:32,
                  color:"#fff",
                  verticalAlign:"bottom"
                },
                axisLabel:{
                  fontSize:32,
                  color:"#fff"
                },
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        width: 3
                    }
                }
            },
            series:
              {
                name: 'scatter',
                type: 'scatter',
                symbolSize: 60,

                itemStyle:{
                    // color: "#109bdc"
                  color:itemcolor
                },
                emphasis: {
                  color:"#e3a802",
                    label: {
                        show: true,
                        position: 'right',
                        color: 'blue',
                        fontSize: 32
                    }
                },
                data: chartData
              }


        }

        chart.setOption(option)
      }
    },
    watch:{
      'newChartData':{
        handler(newVal, oldVal) {
          if (newVal !== oldVal) {
            this.drawChart(this.newChartData,this.color)
          }
        }
      }
    }
  }
</script>
