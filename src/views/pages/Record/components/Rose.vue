<template>
  <div id="root" style="height: 100%;width:100%">
    <div id="RoseChart" style="height:100%;width:100%;"></div>
  </div>
</template>
<style>
</style>

<script>
  import echarts from "echarts"
  export default{
    name: "Rose",
    props:{
      chartData:{
        type: Array,
        default: function(){
          return[
                {value:10, name:'北京'},
                {value:5, name:'上海'},
                {value:15, name:'广州'},
                {value:25, name:'福建'},
                {value:20, name:'厦门'},
                {value:35, name:'武汉'},
                {value:30, name:'青岛'},
                {value:40, name:'南京'}
            ]
        }
      },
      title:{ type:String, default: "玫瑰图"}
    },
    data: function(){
      return{
        chart: {}
      }
    },
    mounted: function(){
      this.drawChart()
      window.addEventListener("resize", ()=>{
        this.$nextTick(
          ()=>{
            this.chart.resize()
          }
        )
      })
    },
    methods:{
      drawChart: function(){
        let legends = []
        this.chartData.forEach(
          item =>{
            legends.push(item.name)
          }
        );

        var option = {
          title : {
            text: this.title,
            x:'center'
          },
          grid: {
            top:50
          },
          tooltip : {
            trigger: 'item',
            //提示框的数据样式显示
            formatter:"{a}<br/>占比是{b}：{c} ({d}%) "
          },
          //图例相关内容的说明
          legend: {
            orient:'vertical',
            right:"right",
            top:"center",
            data: legends
          },
          toolbox: {
            show:true,//是否显示工具栏组件
            feature:{
              mark:{show: true},
              dataView: {show: true, readOnly: false},
              magicType: {
                show: true,
                type: ['pie', 'funnel']
              },
              //配置项还原
              restore : {show: true},
              //保存为图片
              saveAsImage : {show: true}
            }
          },
          calculable : true,//手柄拖拽调整选中的范围
          series : [
            {
              name: '半径模式',
              type: 'pie',

              roseType: 'radius',
              label: {
                show: false
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              data: this.chartData
            }
          ]
        }

        var dom = document.getElementById("RoseChart");
        var myChart = echarts.init(dom);
        this.chart = myChart
        myChart.setOption(option)
      }
    }
  }
</script>
