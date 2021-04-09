<template>
  <div id="root" style="width:100%;height: 100%">

    <div id="container_newMaintenance" style="width:100%;height: 100%;   color: #fff;background-color: #282b2f">
  <!--    <div id="Irrigcontainer" style="position:relative;height: 100%;">-->

  <!--    </div>-->
    </div>
  </div>

</template>

<script>
  import echarts from "echarts"
  export default {
    name: "newMaintenance",
    data(){
      return{
        tempPageResult:{},
        irrigPageResult: [],
        maintenPageResult: [],
        fertiPageResult: [],
        dates:[],
        scatterData:[],
        pieDatas:{}
      }
    },
    methods:{
      async getData() {

       // await this.$api.irrigation.findPage(null).then((res) => {
       //    res.data.content = res.data;
       //    this.tempPageResult = res.data
       //    for (let i = 0; i < this.tempPageResult.length; i++) {
       //      this.irrigPageResult.push({"time":new Date(this.tempPageResult[i].datetime1).getTime()})
       //      var tempTime = new Date(this.tempPageResult[i].datetime1).getTime()
       //      var time = echarts.format.formatTime('yyyy-MM-dd', tempTime)
       //      if(this.pieDatas[time]){
       //        this.pieDatas[time]["irrigation"] += 1
       //      }
       //      else {
       //        this.pieDatas[time] = {}
       //        this.pieDatas[time]["irrigation"] = 1
       //      }
       //      this.dates.push(new Date(this.tempPageResult[i].datetime1).getTime())
       //    }
       //  })


        // await this.$api.fertilization.findPage(null).then((res) => {
        //   res.data.content = res.data;
        //   this.tempPageResult = res.data
        //   for (let i = 0; i < this.tempPageResult.length; i++) {
        //     this.fertiPageResult.push({"time":new Date(this.tempPageResult[i].datetime1).getTime()})
        //     var tempTime = new Date(this.tempPageResult[i].datetime1).getTime()
        //     var time = echarts.format.formatTime('yyyy-MM-dd', tempTime)
        //     if(this.pieDatas[time]){
        //       this.pieDatas[time]["fertilization"] += 1
        //     }
        //     else {
        //       this.pieDatas[time] = {}
        //       this.pieDatas[time]["fertilization"] = 1
        //     }
        //     this.dates.push(new Date(this.tempPageResult[i].datetime1).getTime())
        //   }
        // })

        await  this.$api.dailyjobs.findPage(null).then((res) => {
          res.data.content = res.data;
          let tempPageResult = res.data
          for (let i = 0; i < tempPageResult.length; i++) {
            this.maintenPageResult.push({"time":new Date(tempPageResult[i].datetime1).getTime()})
            var tempTime = new Date(tempPageResult[i].datetime1).getTime()
            var time = echarts.format.formatTime('yyyy-MM-dd', tempTime)
            var LotID = tempPageResult[i]["regionId"]
            // if(this.pieDatas[time] === undefined) {
            //   this.pieDatas[time] = {}
            // }
            // switch () {
            //
            // }
            let jobs = tempPageResult[i]["jobs"]
            if(this.pieDatas[LotID] === undefined){
              this.pieDatas[LotID] = {}
              this.pieDatas[LotID][time] = {}
              this.pieDatas[LotID][time][jobs] = 1
            }
            else{
              if(this.pieDatas[LotID][time] === undefined) {
                this.pieDatas[LotID][time] = {}
                this.pieDatas[LotID][time][jobs] = 1
              }
              else{
                if(this.pieDatas[LotID][time][jobs] === undefined){
                  this.pieDatas[LotID][time][jobs] = 1
                }
                else {
                  this.pieDatas[LotID][time][jobs] += 1
                }
              }
            }
            // if(this.pieDatas[time]){
            //   this.pieDatas[time]["management"] += 1
            // }
            // else {
            //   this.pieDatas[time] = {}
            //   this.pieDatas[time]["management"] = 1
            // }
            this.dates.push(new Date(tempPageResult[i].datetime1).getTime())
          }
        })
        alert(JSON.stringify(this.pieDatas))
      },

      draw:function () {

        function  getPieSeries(scatterData, chart) {
          return echarts.util.map(scatterData, function (item, index) {
            var center = chart.convertToPixel('calendar', item);
            var pieRadius = 30;
            return {
              id: index + 'pie',
              type: 'pie',
              center: center,
              label: {
                normal: {
                  formatter: '{c}',
                  position: 'inside'
                }
              },
              radius: pieRadius,
              data: [
                {name: '浇灌', value: Math.round(Math.random() * 24)},
                {name: '施肥', value: Math.round(Math.random() * 24)},
                {name: '养护', value: Math.round(Math.random() * 24)}
              ]
            };
          });
        }


        var date = Math.min(...this.dates);
        var end = Math.max(...this.dates);
        var dayTime = 3600 * 24 * 1000;
        var data = [];
        for (var time = date; time < end; time += dayTime) {
          data.push([
            echarts.format.formatTime('yyyy-MM-dd', time),
            Math.floor(Math.random() * 10000)
          ]);
        }

        var dom = document.getElementById("container_newMaintenance");
        var myChart = echarts.init(dom);

        var cellSize = [80, 80];
        var option = {
          tooltip: {},
          legend: {
            data: ['施肥', '浇灌', '养护'],
            bottom: 20
          },
          calendar: {
            top: 'middle',
            left: 'center',
            orient: 'vertical',
            cellSize: cellSize,
            yearLabel: {
              show: false,
              textStyle: {
                fontSize: 30
              }
            },
            dayLabel: {
              margin: 20,
              firstDay: 1,
              nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
            },
            monthLabel: {
              show: false
            },
            range: ['2019-05']
          },
          series: [{
            id: 'label',
            type: 'scatter',
            coordinateSystem: 'calendar',
            symbolSize: 1,
            label: {
              normal: {
                show: true,
                formatter: function (params) {
                  return echarts.format.formatTime('dd', params.value[0]);
                },
                offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
                textStyle: {
                  color: '#000',
                  fontSize: 14
                }
              }
            },
            data: data
          }]
        }
        myChart.setOption(option, true);
        myChart.setOption({
          series: getPieSeries(data, myChart)
        });

      }
    },
    mounted() {
      this.getData()
      // this.draw()

    }
  }
</script>

<style scoped>

</style>
