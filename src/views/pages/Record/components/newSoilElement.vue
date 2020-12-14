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
    data() {
      return {
        bars:[],
        locIDList: [],
        sensorLocList: [],
        sensorIDList: [],
        sensorNameList: [],
        LotID: 6,
        elementId:[
          20,21,22,23,24,25,26,27
        ],
        saveLotID: 6,
        LotList: [],
        // 按传感器类型划分，列表中的每一个对象为echart中对应的值
        hour: '',
        legend_echarts:[],
        data_echarts:[],
        legendTempList:[],
        soilEntropyInfoValue:{
          '20cm':[],
          '40cm':[],
          '60cm':[],
          '80cm':[],
        },
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
      this.loadSoilEntropyInfo();
      window.addEventListener("resize", ()=>{
        this.onResize()
      })
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
      search(){
        this.loadSoilEntropyInfo()
      }

      ,
      loadSoilEntropyInfo() {
        let param = {LotID: this.LotID};
        this.$api.lot.findSoilEntropyByLotID(param).then((res) => {
          // 根据不同土壤的测量深度进行划分
          if(res.code === 200)
          {
            console.log("返回成功")
            this.soilEntropyInfoValue["20cm"] = [];
            this.soilEntropyInfoValue["40cm"] = [];
            this.soilEntropyInfoValue["60cm"] = [];
            this.soilEntropyInfoValue["80cm"] = [];

            //depthsoilOxideValue
            this.depthsoilOxideValue["20cm"] = [];
            this.depthsoilOxideValue["40cm"] = [];
            this.depthsoilOxideValue["60cm"] = [];
            this.depthsoilOxideValue["80cm"] = [];


            let i = 0;
            for(i=0;i<res.data.length;i++){

              //获取氧化物数据
              let OxiValue = res.data[i].soilEntropyInfo.slice(52,59)
              // console.log(OxiValue)
              for(var oi=0;oi < OxiValue.length;oi++){
                switch (res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2)) {
                  case '20cm':
                    this.depthsoilOxideValue['20cm'].push(OxiValue[oi].elemValue)
                    break;
                  case '40cm':
                    this.depthsoilOxideValue['40cm'].push(OxiValue[oi].elemValue)
                    break;
                  case '60cm':
                    this.depthsoilOxideValue['60cm'].push(OxiValue[oi].elemValue)
                    break;
                  case '80cm':
                    this.depthsoilOxideValue['80cm'].push(OxiValue[oi].elemValue)
                    break;

                }
              }


              //删除氧化物数据，以及一些 类似Fe-C数据



              res.data[i].soilEntropyInfo.splice(52,18)

              let soilEntropyInfo = res.data[i].soilEntropyInfo
              // console.log(JSON.stringify(soilEntropyInfo))
              //从小到大排序
              let tempsoilEntropyInfoValue = [];

              if (i === 0){
                soilEntropyInfo.sort(function(a,b){
                  return a.elemValue-b.elemValue});
                this.legendTempList = [];
              }else {

                for (var ii = 0; ii< soilEntropyInfo.length;ii++){
                  for (var jj =0;jj < soilEntropyInfo.length;jj++){
                    if (soilEntropyInfo[jj].elemName === this.legendTempList[ii]){
                      if(soilEntropyInfo[jj].elemValue > 0){
                        tempsoilEntropyInfoValue.push(soilEntropyInfo[jj].elemValue)
                      }else{
                        tempsoilEntropyInfoValue.push(0)
                      }
                      break
                    }
                  }
                }

              }


              //获得legenddata

              //soilEntropyInfo[soilEntropyInfo.length-1].elemValue = 900
              for (let item in soilEntropyInfo) {
                if(typeof (soilEntropyInfo[item].elemName) !== 'undefined') {
                  if (i === 0) {
                    this.legendTempList.push(soilEntropyInfo[item].elemName);

                    if (soilEntropyInfo[item].elemValue < 0) {
                      soilEntropyInfo[item].elemValue = 0
                    }
                    tempsoilEntropyInfoValue.push(soilEntropyInfo[item].elemValue)
                  }
                }
              }


              // console.log(res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2))

              switch (res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2)) {
                case '20cm':
                  this.soilEntropyInfoValue['20cm'].push(tempsoilEntropyInfoValue)
                  break;
                case '40cm':
                  this.soilEntropyInfoValue['40cm'].push(tempsoilEntropyInfoValue)
                  break;
                case '60cm':
                  this.soilEntropyInfoValue['60cm'].push(tempsoilEntropyInfoValue)
                  break;
                case '80cm':
                  this.soilEntropyInfoValue['80cm'].push(tempsoilEntropyInfoValue)
                  break;

              }

            }
            // this.drawSoilPie(this.legendTempList);
            //绘制环形图
            this.drawCirclePie()
            this.drawElementBar()



          }else {
            this.$message({message: '查询土壤微量元素数据失败 ', type: 'error'})
          }

        }).catch(function (res) {
        })
      },
      drawCirclePie(){
        for(var i=0;i<6;i++){
          console.log("绘制环形图")
          var averageValue = this.depthsoilOxideValue["20cm"][i] + this.depthsoilOxideValue["40cm"][i] + this.depthsoilOxideValue["60cm"][i] + this.depthsoilOxideValue["80cm"][i]
          console.log(averageValue)
          averageValue = averageValue / 4
          console.log(averageValue)
          averageValue = averageValue.toFixed(1)
          console.log("平均值" + averageValue)

        }
      },
      toFixed:function (str,xlen){
        return str.toFixed(xlen)
      },
      drawElementBar(){
        for (let i = 0; i < 6; i++) {
          var chartValue = [this.soilEntropyInfoValue["20cm"][0][this.elementId[i]],this.soilEntropyInfoValue["40cm"][0][this.elementId[i]],
            this.soilEntropyInfoValue["60cm"][0][this.elementId[i]],this.soilEntropyInfoValue["80cm"][0][this.elementId[i]]]
          var id = i % 2
          switch (id) {
            case 0:
              this.bar(this.elementBars[i],chartValue,'#e3a802', this.elementId[i])
              break
            case 1:
              this.bar(this.elementBars[i],chartValue,'#018ce3', this.elementId[i])
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
            }
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
            offset:-10,
            type: 'value',
            splitNumber:2,
            axisLine:{
              show:false
            },
            axisTick:{
              show:false,
            },
            axisLabel:{
              fontSize:32,
              color: "#FFFFFF"
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
      drawSoilPie(legendData) {
        var dom = document.getElementById("bar_container");
        var myChartSoil = echarts.init(dom);

        var  chartValue = [this.soilEntropyInfoValue["20cm"][0][0],this.soilEntropyInfoValue["40cm"][0][0],
          this.soilEntropyInfoValue["60cm"][0][0],this.soilEntropyInfoValue["80cm"][0][0]]

        let option = {
          xAxis: {
            type: 'category',
            data: ['20cm', '40cm', '60cm', '80cm']
          },
          yAxis: {
            type: 'value',
            splitNumber:2
          },
          series: [{
            data: chartValue,
            type: 'bar'
          }],

          color:'#7494f6'
        };

        myChartSoil.setOption(option,true);
      },
      getLotList(lotPathList) {
        if(lotPathList === undefined){
          console.log("还未加载数据")
        }
        let LotList = []
        for (let i = 0; i < lotPathList.length; i++) {
          LotList.push({
            lotID: lotPathList[i].id,
            lotName: lotPathList[i].name
          })
        }
        return LotList
      },
      showAnimation(start){
        // 定时获取传感器参数
        if(start === true){
          this.saveLotID = this.LotID;

          this.timer = setInterval(() => {
            this.LotID = this.randomNum(3,12)
            this.loadSoilEntropyInfo();
          }, 3 * 1000)
        }
        else{
          this.LotID = this.saveLotID;
          clearInterval(this.timer);
        }
      },
      //生成从minNum到maxNum的随机数
      randomNum: function(minNum,maxNum){
        switch(arguments.length){
          case 1:
            return parseInt(Math.random()*minNum+1,10);
            break;
          case 2:
            return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
            break;
          default:
            return 0;
            break;
        }
      }

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
