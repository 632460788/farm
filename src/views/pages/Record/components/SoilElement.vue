<!--<template>-->
<!--    <div id="SoilElement"></div>-->
<!--</template>-->

<!--<script>-->
<!--    import echarts from "echarts"-->
<!--    export default {-->
<!--        name: "SoilElement",-->
<!--        props:{-->
<!--        soilEntropyInfoValue_20cm:{-->
<!--          type:Array,-->
<!--          required:true-->
<!--        },-->
<!--        soilEntropyInfoValue_40cm:{-->
<!--          type:Array,-->
<!--          required:true-->
<!--        },-->
<!--        soilEntropyInfoValue_60cm:{-->
<!--          type:Array,-->
<!--          required:true-->
<!--        },-->
<!--        soilEntropyInfoValue_80cm:{-->
<!--          type:Array,-->
<!--          required:true-->
<!--        },-->
<!--        legendList:{-->
<!--          type:Array,-->
<!--          required:true-->
<!--        },-->
<!--      },-->
<!--      methods:{-->
<!--          draw:function () {-->
<!--            var dom = document.getElementById("SoilElement");-->
<!--            var myChartSoil = echarts.init(dom);-->
<!--            var Value_20cm = this.soilEntropyInfoValue_20cm.slice(0,10);-->
<!--            var Value_40cm = this.soilEntropyInfoValue_40cm.slice(0,10);-->
<!--            var Value_60cm = this.soilEntropyInfoValue_60cm.slice(0,10);-->
<!--            var Value_80cm = this.soilEntropyInfoValue_80cm.slice(0,10);-->
<!--            let option = {-->
<!--              title:{-->
<!--                // text:'\n      土壤微量元素含量信息 (单位：ppm)',-->
<!--                textStyle:{-->
<!--                  color:'#FFFFFF',        //颜色-->
<!--                  fontStyle:'normal',     //风格-->
<!--                  fontWeight:'normal',    //粗细-->
<!--                  fontFamily:'Microsoft yahei',   //字体-->
<!--                  fontSize:20,     //大小-->
<!--                  align:'center',   //水平对齐-->
<!--                  left: '50'-->
<!--                },-->
<!--              },-->
<!--              tooltip: {-->
<!--                trigger: 'axis',-->
<!--                axisPointer: {-->
<!--                  type: 'shadow'-->
<!--                }-->
<!--              },-->
<!--              legend: {-->
<!--                data: ['土壤微量元素含量20厘米','土壤微量元素含量40厘米','土壤微量元素含量60厘米','土壤微量元素含量80厘米'],-->
<!--                orient:'vertical',-->
<!--                textStyle:{//图例文字的样式-->
<!--                  color:'auto',-->
<!--                  fontSize:12-->
<!--                },-->
<!--                itemGap: 10,-->
<!--                itemHeight:12,-->
<!--                itemWidth:20,-->
<!--                //top: '10',-->
<!--                //left:'100',-->
<!--                right:'5%',-->
<!--                bottom:'15%'-->
<!--              },-->
<!--              grid: {-->
<!--                x: '2%',-->
<!--                y: '10%',-->
<!--                x2: '8%',-->
<!--                y2: '2%',-->
<!--                containLabel: true-->
<!--              },-->
<!--              xAxis: {-->
<!--                type: 'value',-->
<!--                boundaryGap: [0, 0.01],-->
<!--                splitLine:{show: false},-->
<!--                axisLine: {-->
<!--                  lineStyle: {-->
<!--                    type: 'solid',-->
<!--                    color: '#fff',//左边线的颜色-->
<!--                    width:'2'//坐标线的宽度-->
<!--                  }-->
<!--                },-->
<!--                axisLabel: {-->
<!--                  textStyle: {-->
<!--                    color: '#fff',//坐标值得具体的颜色-->
<!--                  }-->
<!--                }-->
<!--              },-->
<!--              yAxis: {-->
<!--                type: 'category',-->
<!--                data: this.legendList.slice(-11,-1),-->
<!--                axisLine: {-->
<!--                  lineStyle: {-->
<!--                    type: 'solid',-->
<!--                    color: '#fff',//左边线的颜色-->
<!--                    width:'2'//坐标线的宽度-->
<!--                  }-->
<!--                },-->
<!--                axisLabel: {-->
<!--                  textStyle: {-->
<!--                    color: '#fff',//坐标值得具体的颜色-->

<!--                  }-->
<!--                }-->
<!--              },-->
<!--              series: [-->
<!--                {-->
<!--                  name: '土壤微量元素含量20厘米',-->
<!--                  type: 'bar',-->
<!--                  data: Value_20cm[0].slice(-11,-1),-->
<!--                  itemStyle:{-->
<!--                    normal:{-->
<!--                      color:'#0566E8',-->
<!--                    }-->
<!--                  },-->
<!--                },-->
<!--                {-->
<!--                  name: '土壤微量元素含量40厘米',-->
<!--                  type: 'bar',-->
<!--                  data: Value_40cm[0].slice(-11,-1),-->
<!--                  itemStyle:{-->
<!--                    normal:{-->
<!--                      color:'#00ffff',-->
<!--                    }-->
<!--                  },-->
<!--                },-->
<!--                {-->
<!--                  name: '土壤微量元素含量60厘米',-->
<!--                  type: 'bar',-->
<!--                  data: Value_60cm[0].slice(-11,-1),-->
<!--                  itemStyle:{-->
<!--                    normal:{-->
<!--                      color:'#ffff00',-->
<!--                    }-->
<!--                  },-->
<!--                },-->
<!--                {-->
<!--                  name: '土壤微量元素含量80厘米',-->
<!--                  type: 'bar',-->
<!--                  data: Value_80cm[0].slice(-11,-1),-->
<!--                  itemStyle:{-->
<!--                    normal:{-->
<!--                      color:'#ff0066',-->
<!--                    }-->
<!--                  },-->
<!--                }-->
<!--              ]-->
<!--            };-->
<!--            myChartSoil.setOption(option,true);-->
<!--          }-->
<!--      },-->
<!--      mounted() {-->
<!--          this.draw()-->
<!--      }-->
<!--    }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->

