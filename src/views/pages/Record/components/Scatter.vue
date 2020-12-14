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
        chart: {}
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
    methods:{
      drawChart: function(){
        let chart = echarts.init(document.getElementById("chart"))
        this.chart = chart
        var myRegression = ecStat.regression('polynomial', this.chartData, 3)

        myRegression.points.sort(function(a, b) {
            return a[0] - b[0];
        })

        let option = {

            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            title: {
                text: this.chartTitle,
                left: 'center',
                x:'center',
                textStyle:{
                  fontSize: 48,
                  color: "#ffffff"
                }
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        width: 3
                    }
                },
                splitNumber: 20
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    lineStyle: {
                        type: 'dashed',
                        width: 3
                    }
                }
            },
            series: [
              {
                name: 'scatter',
                type: 'scatter',
                symbolSize: 60,

                itemStyle:{
                    color: "#018ce3"
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
                data: this.chartData
              },
              {
                name: 'line',
                type: 'line',
                smooth: true,
                showSymbol: false,
                data: myRegression.points,
                lineStyle:{
                  normal:{
                    width: 5
                  }
                },
                markPoint: {
                    itemStyle: {
                        color: 'transparent',
                    },
                    label: {
                        show: true,
                        position: 'left',
                        formatter: myRegression.expression,
                        color: '#333',
                        fontSize: 32
                    },
                    data: [{ coord: myRegression.points[myRegression.points.length - 1] }]
                }
            }]
        }

        chart.setOption(option)
      }
    }
  }
</script>
