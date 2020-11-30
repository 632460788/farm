<template>
    <div :id="'SoilTension'+graphId"></div>
</template>

<script>
  import echarts from "echarts"
    export default {
        name: "SoilTension",
        props:{
          graphId:String
        },
        methods:{
          handle:function () {

            var dom = document.getElementById("SoilTension"+this.graphId)
            var myChart = echarts.init(dom)
            let param = {}
            var locName = null
            var sensors = []
            var sensorValue = []
            switch (this.graphId) {
              case "1":param = {sensorID:[1,2,3], needTodayData: false};
                locName = "A-1";
                break;
              case "2":param = {sensorID:[6,7,8], needTodayData: false};
                locName = "A-3";
                break;
              case "3":param = {sensorID:[18,19,20], needTodayData: false};
                locName = "C-1";
                break;
              case "4":param = {sensorID:[26,27,28], needTodayData: false};
                locName = "D-1";
                break;
            }
            this.$api.sensor.getSensorLive(param).then((res) => {
              var data =  res.data
              for (let i = 0; i < data.length; i++){
                let sensorType = 'ST' + data[i].sensorType;
                let subType = (data[i].subType !== '0') ? sensorType + data[i].subType : sensorType
                let liveData = data[i].sensorData;
                let last = liveData.length - 1
                liveData[last].value = this.toFixed(liveData[last].value,2)
                      //由于部分传感器数据为负值，无法显示，统一将value上调40
                      switch (subType) {
                        case 'ST1530':
                          sensors.push("土壤张力30公分")
                          sensorValue.push(Number(liveData[last].value) + 40)
                          break;
                        case 'ST1560':
                          sensors.push("土壤张力60公分")
                          sensorValue.push(Number(liveData[last].value) + 40)
                          break;
                        case 'ST1590':
                          sensors.push("土壤张力90公分")
                          sensorValue.push(Number(liveData[last].value) + 40)
                          break;
                      }
                    }

              var dataStyle = {
                normal: {
                  label: {show:false},
                  labelLine: {show:false}
                }
              };
              var placeHolderStyle = {
                normal : {
                  color: 'rgba(0,0,0,0)',
                  label: {show:false},
                  labelLine: {show:false}
                },
                emphasis : {
                  color: 'rgba(0,0,0,0)'
                }
              };
              let option = {
                title: {
                  text: locName,
                  x: 'center',
                  y: 'center',
                  itemGap: 20,
                  textStyle : {
                    color : 'rgba(30,144,255,0.8)',
                    fontFamily : '微软雅黑',
                    fontSize : 15,
                    fontWeight : 'bolder'
                  }
                },
                // legend: {
                //   orient : 'vertical',
                //   x : dom.offsetWidth / 2,
                //   y : 45,
                //   itemGap:12,
                //   data:sensors
                // },
                series : [
                  {
                    name:'1',
                    type:'pie',
                    clockWise:false,
                    radius : ['30%', '50%'],
                    itemStyle : dataStyle,
                    //color:"#FF0067",
                    color:'#00FFEA',
                    data:[
                      {
                        value:sensorValue[0],
                        name:sensors[0]
                      },
                      {
                        value:100-sensorValue[0],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                      }
                    ]
                  },
                  {
                    name:'2',
                    type:'pie',
                    clockWise:false,
                    radius : ['50%', '70%'],
                    itemStyle : dataStyle,
                    color:"#EBB77F",
                    data:[
                      {
                        value:sensorValue[1],
                        name:sensors[1]
                      },
                      {
                        value:100-sensorValue[1],
                        name:'invisible',
                        itemStyle : placeHolderStyle
                      }
                    ]
                  },
                  {
                    name:'3',
                    type:'pie',
                    clockWise:false,
                    radius : ['70%', '90%'],
                    itemStyle : dataStyle,
                    //color:'#00FFEA',
                    color:"#FF0067",
                    data:[
                      {
                        value:sensorValue[2],
                        name:sensors[2]
                      },
                      {
                        value:100-sensorValue[2],//此处改动2020-5-26
                        name:'invisible',
                        itemStyle : placeHolderStyle
                      }
                    ]
                  }
                ]
              };

              myChart.setOption(option,true)






            }).catch(function (res) {
            });
          },
      toFixed:function (str,xlen){
        //var a = str +"";
        //return a.substring(0,str.indexOf(".") + xlen);
        return str.toFixed(xlen)
      }
      },
      mounted() {
          this.handle()
      }
    }
</script>

<style scoped>

</style>
