<template>

  <div class="container" id="container" >
    <div class="row" >
      <div class="col">
        <div id="elementBar1"></div>
      </div>
      <div class="col">
        <div id="elementBar2"></div>
      </div>
      <div class="col">
        <div id="elementBar3"></div>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div id="elementBar4"></div>
      </div>
      <div class="col">
        <div id="elementBar5" ></div>
      </div>
      <div class="col">
        <div id="elementBar6"></div>
      </div>
    </div>



  </div>


</template>

<script>
  import echarts from 'echarts'
  import {mapState} from "vuex";
  import KtButton from "@/views/Core/KtButton"



  export default {
    name: "newSoilElement",
    components: {
      echarts,
      KtButton
    },
    props:{
      LotID:String,
      legendTempList:[],
      soilEntropyInfoValue:{
      },
    },
    data() {
      return {
        bars:[],
        locIDList: [],
        sensorLocList: [],
        sensorIDList: [],
        sensorNameList: [],
        // LotID: 6,
        elementId:[
          20,21,22,23,24,25,26,27
        ],
        saveLotID: 6,
        LotList: [],
        // 按传感器类型划分，列表中的每一个对象为echart中对应的值
        hour: '',
        legend_echarts:[],
        data_echarts:[],
        depthsoilOxideValue:{
          '20cm':[],
          '40cm':[],
          '60cm':[],
          '80cm':[],
        },
        OxideElement:['SiO₂', 'Al₂O₃', 'K₂O','MgO','CaO', 'Na₂O','Fe₂O₃'],
        elementBars:['elementBar1','elementBar2','elementBar3','elementBar4',
          'elementBar5','elementBar6','elementBar7','elementBar8',],
      }

    },
    mounted() {
      this.drawElementBar()
      this.onResize()
    },
    created(){
      // this.timer = setInterval(this.changeLotID,3000)
      window.addEventListener("resize", ()=>{
        this.onResize()
      })
    },
    destroyed() {
      // clearInterval(this.timer);
    },
    watch: {
      'LotID': {
        handler(newVal, oldVal) {
          if (newVal !== oldVal) {
            //
            this.changeLotID()
          }
        }
      }
    },
    methods:{
      onResize: function(){
        this.$nextTick(
          ()=>{
            this.bars.forEach(
              item=>{
                item.resize()
              }
            )
          }
        )

      },
      changeLotID(){
        this.drawElementBar()
      }
      ,
      drawElementBar(){
        //需要传入chartValue-从异步请求中获得，legendTempList-

        for (let i = 0; i < 6; i++) {
          var chartValue = [this.soilEntropyInfoValue["20cm"][0][this.elementId[i]],this.soilEntropyInfoValue["40cm"][0][this.elementId[i]],
            this.soilEntropyInfoValue["60cm"][0][this.elementId[i]],this.soilEntropyInfoValue["80cm"][0][this.elementId[i]]]
          var id = i
          switch (id) {

            case 0:
              this.bar(this.elementBars[i],chartValue,'#109bdc',  this.legendTempList[this.elementId[i]])
              break
            case 1:
              this.bar(this.elementBars[i],chartValue,'#ff4d4f', this.legendTempList[this.elementId[i]])
              break
            case 2:
              this.bar(this.elementBars[i],chartValue,'#fbb900', this.legendTempList[this.elementId[i]])
              break
            case 3:
              this.bar(this.elementBars[i],chartValue,'#c27ae9', this.legendTempList[this.elementId[i]])
              break
            case 4:
              this.bar(this.elementBars[i],chartValue,'#8fd914', this.legendTempList[this.elementId[i]])
              break
            case 5:
              this.bar(this.elementBars[i],chartValue,'#226792', this.legendTempList[this.elementId[i]])
              break

          }
        }
      },
      bar(elementId,chartValue,color, title){
        var dom = document.getElementById(elementId);
        var myChartSoil = echarts.init(dom);
        this.bars.push(myChartSoil)

        let option = {
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          title: {
            text: "元素名称:" + title,
            x:'center',
            textStyle:{
              fontSize: 32,
              color: "#ffffff"
            },
            // bottom:"20%"
          },
          xAxis: {
            type: 'category',
            data: ['20cm', '40cm', '60cm', '80cm'],
            boundaryGap:true,
            axisLine:{
              show:false,
              lineStyle:{
                color:'#fff'
              }
            },
            axisTick:{
              alignWithLabel: true,
              lineStyle:{
                color:'#fff'
              }
            },
            axisLabel:{
              fontSize:32,
              color: "#FFFFFF"
            }
          },
          yAxis: {
            splitLine: {
                lineStyle: {
                    type: 'dashed',
                    width: 3
                }
            },
            name:'ppm',
            type: 'value',
            splitNumber:2,
            axisLine:{
              show:false,
              lineStyle:{
                color:'#fff',
                width:1
              },
            },
            axisTick:{
              show:true,
            },
            axisLabel:{
              show:true,
              fontSize:32,
              color: "#FFFFFF",
              margin:1
            },
            nameTextStyle:{
              fontSize: 32,
              color: "#FFFFFF"
            }
          },
          series: [{
            data: chartValue,
            type: 'bar',
            barWidth: 24,
          }],

          color:color
        };
        myChartSoil.setOption(option,true);
      }
      ,
    },
    computed: {
      ...mapState({
        lotPathList: state => state.lot.allLotLocList
      }),
    }
  }
</script>

<style scoped>
  .row{
    display: flex;
    justify-content: space-around;
    align-items: center;
    height: 48%;
    width: 100%;
  }
  .col{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 100%;
    width: 32%;
  }
  .col span{
    font-size: 10px;
    color: black;
    font-Family:'Microsoft yahei';
  }
  .col div{
    width: 100%;
    height: 95%;
  }

  #container{
    display:flex;
    flex-direction:column;
    height:100%;
    width: 100%;
  }
  /*隐藏div的滚动条*/
  .container::-webkit-scrollbar {display:none}
</style>
