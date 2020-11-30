<template>
  <div id="Maintenance"></div>
</template>

<script>
  import echarts from "echarts"
    export default {
        name: "Maintenance",
      data(){
          return{
            pageResult:{},
            dates:[],
            jobs:[]
          }
      },
      methods:{
          draw:function () {
            //获取养护作业时间 作业内容（种类）
            this.$api.dailyjobs.findPage(null).then((res) => {
              this.pageResult = res.data
              for (let i = 0; i < this.pageResult.length ; i++) {
                this.dates.push(this.pageResult[i].datetime1)
                this.jobs.push(this.pageResult[i].jobs)
              }
            }).then(()=>{
              var dom = document.getElementById("Maintenance")
              var myChart = echarts.init(dom)
              var tempArray = []
              //创建临时数组，元素为作业时间及作业内容
              for (let i = 0; i < this.dates.length; i++) {
                  tempArray.push({date:this.dates[i],job:this.jobs[i]})
              }
              //将数组元素按照作业时间升序排序
              tempArray.sort(function (a,b) {
                  return new Date(a.date).getTime() - new Date(b.date).getTime()
              })

              var new_dates = []
              var new_jobs = [[],[],[]]
              var temp_date = 0
              //将排序后的临时数组中同一时间的作业次数累加
              for (let i = 0; i < tempArray.length; i++) {
                if(tempArray[i].date === temp_date){
                  switch (tempArray[i].job) {
                    case "除草":new_jobs[0][new_jobs[0].length-1]++
                          break
                    case "铺地膜": new_jobs[1][new_jobs[1].length-1]++
                          break
                    case "修枝":
                    case "剪枝":new_jobs[2][new_jobs[2].length-1]++
                          break
                    default:break
                  }
                }
                else {
                  new_dates.push(tempArray[i].date)
                  new_jobs[0].push(0)
                  new_jobs[1].push(0)
                  new_jobs[2].push(0)
                  switch (tempArray[i].job) {
                    case "除草": new_jobs[0][new_jobs[0].length-1]++
                          break
                    case "铺地膜": new_jobs[1][new_jobs[1].length-1]++
                          break
                    case "修枝":
                    case "剪枝":new_jobs[2][new_jobs[2].length-1]++
                          break
                    default:break
                  }
                  temp_date = tempArray[i].date
                }
              }
              //去掉日期的年份
              for (let i = 0; i < new_dates.length ; i++) {
                new_dates[i] = new_dates[i].substr(5)
              }
            let option = {
              // title: {
              //   text: '养护作业',
              //   // subtext: '数据来自网络'
              // },
              tooltip: {
                trigger: 'axis',
                axisPointer: {
                  type: 'shadow'
                }
              },
              legend: {
                data: ['除草', '铺地膜','修枝'],
                orient:'vertical',
                textStyle:{
                  color:'auto',
                  fontSize:13
                },
                top:'10%',
                right:'5%',
                itemGap: 10,
                itemHeight:13,
                itemWidth:20,
              },
              grid: {
                x: '3%',
                y: '10%',
                x2: '3%',
                y2: '3%',
                containLabel: true
              },
              xAxis: {
                type: 'value',
                boundaryGap: [0, 0.01],
                splitLine:{show: false},
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#fff',//左边线的颜色
                    width:'2'//坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#fff',//坐标值得具体的颜色
                  }
                }
              },
              yAxis: {
                type: 'category',
                data: new_dates,
                axisLine: {
                  lineStyle: {
                    type: 'solid',
                    color: '#fff',//左边线的颜色
                    width:'2'//坐标线的宽度
                  }
                },
                axisLabel: {
                  textStyle: {
                    color: '#fff',//坐标值得具体的颜色
                  }
                }
              },
              series: [
                {
                  name: '除草',
                  type: 'bar',
                  data: new_jobs[0],
                  color:"#FF0067",
                },
                {
                  name: '铺地膜',
                  type: 'bar',
                  data: new_jobs[1],
                  color:"#EBB77F",
                },{
                  name: '修枝',
                  type: 'bar',
                  data: new_jobs[2],
                  color:'#00FFEA',
                }
              ]
            }
            myChart.setOption(option, true)
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
