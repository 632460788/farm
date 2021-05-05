<template>
  <div :id="'Oxide'+OxideId" style="width: 100%; height: 100%;" ></div>
</template>

<script>
  import echarts from "echarts"
  export default {
    name: "Oxide",
    props:{
      OxideId:{
        type:Number,
        required:true
      },
      pieData:{
        type:String,
        required: true
      },
      pieName:{
        type:String,
        required:true
      },
      colors:{
        type:Array,
        required:true
      }
    },
    data: function(){
      return {
        chart: {}
      }
    },
    methods:{
      drawPie:function () {
        var dom = document.getElementById("Oxide"+this.OxideId);
        var myChart = echarts.init(dom);
        this.chart = myChart;
        const data = this.pieData;
        const name = this.pieName;
        const option = {
          grid: {

          },
          color: this.colors,
          series: [{
            name: 'valueOfMarket',
            type: 'pie',
            center: ['50%', '50%'], // 饼图的圆心坐标
            radius: ['75%', '93%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: { //  饼图图形上的文本标签
              normal: { // normal 是图形在默认状态下的样式
                show: true,
                position: 'center',
                color: '#FFFFFF',
                fontSize: 32,
                fontWeight: 'bold',
                formatter: '{b}\n\n{c}%' // {b}:数据名； {c}：数据值； {d}：百分比
              }
            },
            data: [
              {
                value: data,
                name: name,
                label: {
                  normal: {
                    show: true
                  }
                },

              },
              {
                value: 100 - data,
                name: '',
                label: {
                  normal: {
                    show: false
                  }
                }
              }
            ]
          }]
        }
        myChart.setOption(option,true);
        myChart.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: 1
        });

      }
    },
    mounted() {
      this.drawPie()

    },
    created(){
      window.addEventListener("resize", ()=>{
        this.$nextTick(
          ()=>{
            this.chart.resize()
          }
        )
      })
    },
    watch: {
      'pieData': {
        handler(newVal, oldVal) {
          if (newVal !== oldVal) {
            //
            this.drawPie()
          }

        }
      }
    }

  }


</script>

<style scoped>

</style>
