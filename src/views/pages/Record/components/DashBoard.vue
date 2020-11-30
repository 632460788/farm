<template>
    <div :id="'DashBoard' +DashBoardId"></div>
</template>

<script>
  import echarts from "echarts"
    export default {
        name: "DashBoard",
        props:{
            DashBoardId:{
              type:String,
              required:true
            }
            // sensorValue:{
            //   type:Number,
            //   required: true
            // },
            // sensorName:{
            //   type:String,
            //   required:true
            // },
            // sensorId:{
            //     type:Number,
            //     required:true
            // }
        },
        methods:{
            draw:function () {
              var dom = document.getElementById("DashBoard"+this.DashBoardId)
              var myCharts = echarts.init(dom)
              let param = {}
              /************************由于目前无法获取传感器，只能显示数据库中已有数据，正确的格式应将time设置为1***************************************/
              let oldDate = new Date("2020-8-7")
              let newDate = new Date()
              let interval = parseInt((newDate-oldDate)/(1000*60*60*24))
              switch (this.DashBoardId) {

                case "1" : param = {time:interval, sensorType:"20", subType:"0"};
                break;
                case "2": param = {time:interval, sensorType:"0E", subType:"0"};
                break;
                case "3":case "4": param = {time:interval, sensorType:"24", subType:"0"};
                break;

                default: break;
              }
              this.$api.lot.findLotRecordByTimeAndSensor(param).then((res)=>{
                var temp = {}
                var tableData = res.data;

                if(this.DashBoardId === "3"){
                  for (let i = 0; i < tableData.length; i++) {
                      if (tableData[i].sensorId === '4' || tableData[i].sensorId === 4) {
                        temp.sensorValue = tableData[i].sensorValue
                        temp.sensorName = tableData[i].sensorName
                        temp.sensorId = tableData[i].sensorId
                        break
                      }
                  }

                }
                else if (this.DashBoardId === "4") {

                  for (let i = 0; i < tableData.length; i++) {

                    if (tableData[i].sensorId === '21' || tableData[i].sensorId === 21) {
                      temp.sensorValue = tableData[i].sensorValue
                      temp.sensorName = tableData[i].sensorName
                      temp.sensorId = tableData[i].sensorId
                      break
                    }
                  }

                }
                else {
                  temp.sensorValue = tableData[0].sensorValue
                  temp.sensorName = tableData[0].sensorName
                  temp.sensorId = tableData[0].sensorId
                }
                let option = {
                  // backgroundColor: '#1b1b1b',
                  series: [
                    {
                      name: '业务指标',
                      type: 'gauge',
                      radius: '50%',
                      axisLine: {            // 坐标轴线
                        lineStyle: {       // 属性lineStyle控制线条样式
                          color: [[0.25, 'lime'],[0.6, '#1e90ff'],[1, '#ff4500']],
                          width: 10,
                          // shadowColor : '#fff', //默认透明
                          shadowBlur: 1
                        }
                      },
                      axisLabel: {            // 坐标轴小标记
                        textStyle: {       // 属性lineStyle控制线条样式
                          //fontWeight: 'bolder',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                        }
                      },
                      axisTick: {            // 坐标轴小标记
                        show: false,
                        length :5,        // 属性length控制线长
                        lineStyle: {       // 属性lineStyle控制线条样式
                          color: 'auto',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                        }
                      },
                      splitLine: {           // 分隔线
                        length :10,         // 属性length控制线长
                        lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                          width:5,
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10
                        }
                      },
                      title : {
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: 'bolder',
                          fontSize: 10,
                          fontStyle: 'italic',
                          color: '#fff',
                          shadowColor : '#fff', //默认透明
                          shadowBlur: 10,
                        },
                        offsetCenter: [0, '75%'], // title 位置
                      },
                      pointer: {
                        width:5,//指针的宽度
                        length:"60%", //指针长度，按照半圆半径的百分比
                        shadowColor : '#ccc', //默认透明
                        shadowBlur: 5
                      },
                      detail: {formatter:'{value}',
                        offsetCenter: [0, '40%'],       // x, y，单位px
                        textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                          fontWeight: 'bolder',
                          color: '#00ffea',
                          fontSize: 25,
                        }},
                      data: [{value: temp.sensorValue, name: temp.sensorName+'-'+temp.sensorId}]

                    }
                  ]
                }
                myCharts.setOption(option,true)

                // alert(tableData[0].time +' '+tableData[0].sensorValue+' '+tableData[0].sensorName+' '+tableData[0].sensorId)


              });


            }
        },
      mounted() {
          this.draw()
      }
    }
</script>

<style scoped>

</style>
