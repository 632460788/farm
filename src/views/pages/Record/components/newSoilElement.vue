<template>

  <div class="container" id="container" style="position:relative; height:100%;width: 100%;scroll-behavior: auto;overflow-y: auto;" >

<!--    <div style="position:relative;width: 20%;padding: 5px 0 0 0  ">-->
<!--      <span style="display:inline-block;font-size: 0.8em;color: black;fontFamily:'Microsoft yahei';">地块编号:  </span>-->
<!--      <el-select v-model="LotID" placeholder="选择地块编号"  size="small" style="position:relative;width: 35%;">-->
<!--        <el-option v-for="item in getLotList(lotPathList)" :key="item.lotID" :label="item.lotName"-->
<!--                   :value="item.lotID" ></el-option>-->
<!--      </el-select>-->
<!--      <el-button type="primary" icon="el-icon-search" size="small" style="margin-left: 10%" @click="search">搜索</el-button>-->
<!--    </div>-->



    <br>
    <br>




    <el-row style="position:relative;width: 100%;height: 30%" :gutter="40">

      <el-col :span="6" style="width: 33%;height: 100%;margin: 0 auto">
        <div id="elementBar1" style="width: 100%;height: 95%;"></div>
        <div style="position: relative;top: -5%">
          <span style="font-size: 10px;color: black;font-Family:'Microsoft yahei'">元素名称:  </span>
          <el-select v-model="elementId[0]"  size="mini" style="position:relative;width: 25%;" @change="elementChange('elementBar1',elementId[0])">
            <el-option v-for="(item,index) in legendTempList" :key="index" :label="item"
                       :value="index" ></el-option>
          </el-select>
        </div>

      </el-col>

      <el-col :span="6" style="width: 33%;height: 100%">
        <div id="elementBar2" style="width: 100%;height: 95%"></div>
        <div style="position: relative;top: -5%;">
          <span style="font-size: 10px;color: black;font-Family:'Microsoft yahei'">元素名称:  </span>
          <el-select v-model="elementId[1]"  size="mini" style="position:relative;width: 25%;" @change="elementChange('elementBar2',elementId[1])">
            <el-option v-for="(item,index) in legendTempList" :key="index" :label="item"
                       :value="index" ></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="6" style="width: 33%;height: 100%">
        <div id="elementBar3" style="width: 100%;height: 95%"></div>
        <div style="position: relative;top: -5%">
          <span style="font-size: 10px;color: black;font-Family:'Microsoft yahei'">元素名称:  </span>
          <el-select v-model="elementId[2]"  size="mini" style="position:relative;width: 25%;" @change="elementChange('elementBar3',elementId[2])">
            <el-option v-for="(item,index) in legendTempList" :key="index" :label="item"
                       :value="index" ></el-option>
          </el-select>
        </div>
      </el-col>

      <el-col :span="6" style="width: 33%;height: 100%">
        <div id="elementBar4" style="width: 100%;height: 95%"></div>
        <div style="position: relative;top: -5%">
          <span style="font-size: 10px;color: black;font-Family:'Microsoft yahei'">元素名称:  </span>
          <el-select v-model="elementId[3]"  size="mini" style="position:relative;width: 25%;" @change="elementChange('elementBar4',elementId[3])">
            <el-option v-for="(item,index) in legendTempList" :key="index" :label="item"
                       :value="index" ></el-option>
          </el-select>
        </div>
      </el-col>

    </el-row>

    <el-row style="position:relative;width: 100%;height: 30%" :gutter="40">

      <el-col :span="6" style="width: 33%;height: 100%">
        <div id="elementBar5" style="width: 100%;height: 95%"></div>
        <div style="position: relative;top: -5%">
          <span style="font-size: 10px;color: black;font-Family:'Microsoft yahei'">元素名称:  </span>
          <el-select v-model="elementId[4]"  size="mini" style="position:relative;width: 25%;" @change="elementChange('elementBar5',elementId[4])">
            <el-option v-for="(item,index) in legendTempList" :key="index" :label="item"
                       :value="index" ></el-option>
          </el-select>
        </div>

      </el-col>

      <el-col :span="6" style="width: 33%;height: 100%">
        <div id="elementBar6" style="width: 100%;height: 95%"></div>
        <div style="position: relative;top: -5%">
          <span style="font-size: 10px;color: black;font-Family:'Microsoft yahei'">元素名称:  </span>
          <el-select v-model="elementId[5]"  size="mini" style="position:relative;width: 25%;" @change="elementChange('elementBar6',elementId[5])">
            <el-option v-for="(item,index) in legendTempList" :key="index" :label="item"
                       :value="index" ></el-option>
          </el-select>
        </div>
      </el-col>
    </el-row>

    <div id="box1" class="pie" style="display: inline-block;width: 30%;"></div>
    <div id="box2" class="pie" style="display: inline-block;width: 30%"></div>
    <div id="box3" class="pie" style="display: inline-block;width: 30%"></div>
    <div id="box4" class="pie" style="display: inline-block;width: 30%"></div>
    <div id="box5" class="pie" style="display: inline-block;width: 30%"></div>
    <div id="box6" class="pie" style="display: inline-block;width: 30%"></div>


    <!--  <div>-->
    <!--    <div id="elementBar5" style="float:left;width: 25%;height: 40%"></div>-->
    <!--  </div>-->
    <!--  <div>-->
    <!--    <div id="elementBar6" style="float:left;width: 25%;height: 40%"></div>-->
    <!--  </div>-->
    <!--  <div>-->
    <!--    <div id="elementBar7" style="float:left;width: 25%;height: 40%"></div>-->
    <!--  </div>-->
    <!--  <div>-->
    <!--    <div id="elementBar8" style="float:left;width: 25%;height: 40%"></div>-->
    <!--  </div>-->

    <!--    <div id="elementBar1" style="float:left;width: 25%;height: 40%"></div>-->
    <!--    <div id="elementBar2" style="float:left;width: 25%;height: 40%"></div>-->
    <!--    <div id="elementBar3" style="float:left;width: 25%;height: 40%"></div>-->
    <!--    <div id="elementBar4" style="float:left;width: 25%;height: 40%"></div>-->
    <!--    <div id="elementBar5" style="float:left;width: 25%;height: 40%"></div>-->
    <!--    <div id="elementBar6" style="float:left;width: 25%;height: 40%"></div>-->
    <!--    <div id="elementBar7" style="float:left;width: 25%;height: 40%"></div>-->
    <!--    <div id="elementBar8" style="float:left;width: 25%;height: 40%"></div>-->



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
        boxes:['box1','box2','box3','box4','box5','box6','box7'],
        elementBars:['elementBar1','elementBar2','elementBar3','elementBar4',
          'elementBar5','elementBar6','elementBar7','elementBar8',],
      }

    },
    mounted() {
      this.loadSoilEntropyInfo();
    },
    methods:{
      search(){
        this.loadSoilEntropyInfo()
      }
      ,
      elementChange(chartId,dataIndex){
        var chartValue = [this.soilEntropyInfoValue["20cm"][0][dataIndex],this.soilEntropyInfoValue["40cm"][0][dataIndex],
          this.soilEntropyInfoValue["60cm"][0][dataIndex],this.soilEntropyInfoValue["80cm"][0][dataIndex]]
        var id = dataIndex % 4
        switch (chartId) {
          case 'elementBar1':
          case 'elementBar5':
            this.bar(chartId,chartValue,'#7494f6')
            break
          case 'elementBar2':
          case 'elementBar6':
            this.bar(chartId,chartValue,'#db2220')
            break
          case 'elementBar3':
          case 'elementBar7':
            this.bar(chartId,chartValue,'#eba935')
            break
          case 'elementBar4':
          case 'elementBar8':
            this.bar(chartId,chartValue,'#4d862b')
            break

        }
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
          this.pie(averageValue, this.OxideElement[i], this.boxes[i], ['#7494f6', '#d5d6da']);

        }
      },
      toFixed:function (str,xlen){
        //var a = str +"";
        //return a.substring(0,str.indexOf(".") + xlen);
        return str.toFixed(xlen)
      },
      drawElementBar(){
        for (let i = 0; i < 6; i++) {
          var chartValue = [this.soilEntropyInfoValue["20cm"][0][this.elementId[i]],this.soilEntropyInfoValue["40cm"][0][this.elementId[i]],
            this.soilEntropyInfoValue["60cm"][0][this.elementId[i]],this.soilEntropyInfoValue["80cm"][0][this.elementId[i]]]
          var id = i % 4
          switch (id) {
            case 0:
              this.bar(this.elementBars[i],chartValue,'#7494f6')
              break
            case 1:
              this.bar(this.elementBars[i],chartValue,'#db2220')
              break
            case 2:
              this.bar(this.elementBars[i],chartValue,'#eba935')
              break
            case 3:
              this.bar(this.elementBars[i],chartValue,'#4d862b')
              break

          }
        }
      },
      bar(elementId,chartValue,color){
        var dom = document.getElementById(elementId);
        var myChartSoil = echarts.init(dom);

        let option = {
          xAxis: {
            type: 'category',
            data: ['20cm', '40cm', '60cm', '80cm'],
            boundaryGap:true,
            axisLine:{
              show:false,
              lineStyle:{
                color:'#52585f'
              }
            },
            axisTick:{
              alignWithLabel: true,
              lineStyle:{
                color:'#b2b5b7'
              }
            }
          },
          yAxis: {
            name:'单位：ppm',
            offset:-5,
            type: 'value',
            splitNumber:2,
            axisLine:{
              show:false
            },
            axisTick:{
              show:false,
            },
            axisLabel:{
              fontSize:10
            }
          },
          series: [{
            data: chartValue,
            type: 'bar',
            barWidth: 24
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
      pie: function(pieData, pieName, box, colors ){
        const that = this;
        var dom = document.getElementById(box);
        var myChart = echarts.init(dom);

        const data = pieData;
        const name = pieName;
        const option = {
          grid: {
            top: 5,
            bottom: 5,
          },
          color: colors,
          series: [{
            name: 'valueOfMarket',
            type: 'pie',
            center: ['50%', '50%'], // 饼图的圆心坐标
            radius: ['60%', '75%'],
            avoidLabelOverlap: false,
            hoverAnimation: false,
            label: { //  饼图图形上的文本标签
              normal: { // normal 是图形在默认状态下的样式
                show: true,
                position: 'center',
                color: '#5e5e5e',
                fontSize: 14,
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
                }

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
  .pie {
    height:150px;
  }
  /*隐藏div的滚动条*/
  .container::-webkit-scrollbar {display:none}
</style>

