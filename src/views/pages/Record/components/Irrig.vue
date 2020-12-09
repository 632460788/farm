<template>
    <div id="Irrig">
      <div id="Irrigcontainer" style="position:relative;height: 100%;">

      </div>
    </div>
</template>

<script>
  import echarts from "echarts"
    export default {
        name: "Irrig",
      data(){
          return{
            pageResult: {},
            dates:[],
            stere:[]
          }
      },
      methods:{
        draw:function () {
          this.$api.irrigation.findPage(null).then((res) => {
            res.data.content = res.data;
            this.pageResult = res.data
            for (let i = 0; i < this.pageResult.length; i++) {
              this.dates.push(new Date(this.pageResult[i].datetime1).getTime())
              this.stere.push(this.pageResult[i].stere)
            }
            // alert(this.pageResult[2].datetime1)
            // alert(this.pageResult[2].datetime2)
            // alert(this.pageResult[2].stere)
          }).then(() => {

            var dom = document.getElementById("Irrigcontainer")
            var myCharts = echarts.init(dom)
            var graphData = []
            var tempArray = []
            for (let i = 0; i < this.dates.length; i++) {
              tempArray.push({date:this.dates[i],stere:this.stere[i]})
            }
            tempArray.sort(function (a,b) {
              return a.date - b.date
            })
            var new_dates = []
            var new_stere = []
            var temp_date = 0
            for (let i = 0; i < tempArray.length; i++) {
              if (temp_date === tempArray[i].date)
              {
                new_stere[new_stere.length-1]+= tempArray[i].stere
              }
              else {
                new_dates.push(tempArray[i].date)
                new_stere.push(tempArray[i].stere)
                temp_date = tempArray[i].date
              }
            }
            for (let i = 0; i < this.dates.length; i++) {
              graphData.push([new_dates[i], new_stere[i]])
            }
            let option = {
              tooltip: {
                position: 'top'
              },

              // visualMap: [{
              //   min: 0,
              //   max: 1000,
              //   calculable: true,
              //   seriesIndex: [2, 3, 4],
              //   orient: 'horizontal',
              //   left: '0%',
              //   bottom: 1000,
              //   inRange: {
              //     color: ['grey'],
              //     opacity: [0, 0.1]
              //
              //   }
              // }],

              calendar: [
                {
                  grid:{
                    x:"20%",
                    y:"20%",
                    x2:"20%",
                    y2:"20%"
                  },
                  orient: 'vertical',
                  yearLabel: {
                    margin: 4,
                    color:'#fff',
                    fontSize:2,
                    show:false
                  },
                  monthLabel: {
                    nameMap: 'cn',
                    margin: 10,
                    color:'#fff',
                    show:false
                  },
                  dayLabel: {
                    firstDay: 1,
                    nameMap: 'cn',
                    margin: 10,
                    color:'#fff'
                  },
                  cellSize: "45",
                  range: '2020-05',
                  borderColor: 'rgba(235,183,127,0.5)',
                  itemStyle: {
                    normal: {
                      color: 'rgba(19,30,100,0.6)',
                      borderWidth: 1,
                      borderColor: 'rgba(235,183,127,0.5)',
                    }
                  }
                }],

              series: [{
                type: 'effectScatter',
                color:"#00FFEA",
                edgeSymbol: ['none', 'arrow'],
                coordinateSystem: 'calendar',
                symbolSize: function (val) {
                  return val[1];
                },
                calendarIndex: 0,
                data: graphData
              }]
            }
            myCharts.setOption(option, true)
          })
        }
      },
      mounted() {
          this.draw()
      }
    }
</script>

<style scoped>

</style>
