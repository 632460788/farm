<template>
  <!--  TODO 网关记录：网关记录统计，包括功能有：-->
  <!--  TODO 查询功能：按一天之内，一周之内，一个月之内，选定日期查询-->
  <!--  TODO 导出功能：将所选记录进行导出-->
  <div id="root" style="background-color:#16191d">
    <!-- 标题栏 -->
    <div id="title" >
      玮益生态农业枳壳大数据平台
    </div>
    <div class="container" id="container">
      <!-- <el-button id="fullbtn" @click="showFullScreen() " style="color:#fff;float: right;background-color: #09153D">全屏展示</el-button> -->
      <!-- 左列 -->
      <div class="screenColumn" style="width:29.3%;">
        <!-- 气象信息、土壤温湿度行 -->
        <div class="screenBlock" style="display:flex;flex-direction:row;width:100%; height:18%">
          <!-- 气象表 -->
          <div style="height:100%; width: 53%;display:flex;flex-direction:column; justify-content: space-around">

            <div style="height:47%; display:flex; flex-direction:column; justify-content: space-between">
              <div class="label" style="width:100%;height:23.75%;font-size:50px;margin: 0 0 10px 20px " >土壤湿度</div>
              <div style="height:62.5%; width:100%;display:flex;justify-content:start;flex-direction:row">
                <!-- 土壤湿度1 -->
                <!--                <div class="el-icon-wind-power" style="width:50%;font-size:80px"> {{humidity1}}<span style="font-size:60px">m/s</span></div>-->
                <div style="width:50%;font-size:80px"><img src="../../../assets/icon/humidity.png" alt=""> {{humidity1}} <span style="font-size:60px">%</span></div>
                <!-- 土壤湿度2 -->
                <!--                <div class="el-icon-wind-power" style="width:50%;font-size:80px"> {{humidity2}}<span style="font-size:60px">m/s</span></div>-->
                <div style="width:50%;font-size:80px"><img src="../../../assets/icon/humidity.png" alt=""> {{humidity2}} <span style="font-size:60px">%</span></div>
              </div>
            </div>


            <div style="height: 47%; display:flex; flex-direction:column; justify-content: space-around">
              <div class="label" style="width:100%;height:23.75%;font-size:50px;margin: 0 0 10px 20px">土壤温度</div>
              <div style="height:62.5%; width:100%;display:flex;justify-content:start;flex-direction:row">
                <!-- 土壤温度1 -->
                <div style="width:50%;font-size:80px"><img src="../../../assets/icon/temperature.png" alt=""> {{temperature1}} <span style="font-size:60px">℃</span></div>
                <!-- 土壤温度2 -->
                <div style="width:50%;font-size:80px"><img src="../../../assets/icon/temperature.png" alt=""> {{temperature2}} <span style="font-size:60px">℃</span></div>
              </div>
            </div>
          </div>

          <!-- 玫瑰图 -->
          <div style="height:100%;width:50%">
            <Rose :LotID="LotID"/>
          </div>
        </div>

        <!-- 柱状图行 -->
        <div class="screenBlock" style="width:100%; height:22.5%">
          <div style="width:100%;font-size:50px;margin-bottom: 10px" >土壤墒情</div>
          <new-soil-element
            style="width: 100%;"
            v-if="refresh"
            :key="containerKey" :LotID="LotID" :legend-temp-list="legendTempList" :soil-entropy-info-value="soilEntropyInfoValue">
          </new-soil-element>
        </div>

        <!-- 环形图行 -->
        <!--        :colors="['#e3a802','#018ce3']"-->
        <div class="screenBlock" style="width:100%; height:23%">
          <div style="width:100%;font-size:50px;margin-bottom: 10px" >土壤氧化物含量</div>
          <div style="width:100%; display:flex;height:50%;flex-direction:row; justify-content:space-around">
            <Oxide
              v-for="item in 3"
              style="width: 32%;height: 100%"
              :OxideId="item-1"
              :pieData="averageValue[item-1]"
              :pie-name="OxideElement[item-1]"
              :colors="['#109bdc','#203d50']"
              v-if="averageValue[item-1] >= 0 && refresh"
              :key="containerKey2"/>
          </div>
          <div style="width:100%; display:flex; height:50%;flex-direction:row; justify-content:space-around">
            <Oxide
              v-for="item in 3"
              style="width: 32%;height:100%"
              :OxideId="item+2"
              :pieData="averageValue[item+2]"
              :pie-name="OxideElement[item+2]"
              :colors="['#8fd914','#203d50']"
              v-if="averageValue[item-1] >= 0 && refresh"
              :key="containerKey2"/>
          </div>
        </div>
        <!-- 日历行 -->
        <div class="screenBlock" style="width:100%; height:32.5%">
          <div style="width:100%;font-size:50px;margin-bottom: 10px" >养护作业记录</div>
          <div style="width:100%;">
            <div  style="width:10%;display: inline-block;float: right" ><img src="../../../assets/weeding.jpg" alt=""><span style="font-size:32px;position: relative;top:-7px"> 除草</span></div>
            <div  style="width:10%;display: inline-block;float: right" ><img src="../../../assets/laying.jpg" alt=""><span style="font-size:32px;position: relative;top:-7px"> 铺地膜</span></div>
            <div  style="width:10%;display: inline-block;float: right" ><img src="../../../assets/cut.jpg" alt=""><span style="font-size:32px;position: relative;top:-7px"> 剪枝</span></div>
          </div>
          <MaintenanceCalendar  :lotID="LotID"/>
        </div>
      </div>

      <!-- 中列 -->
      <div class="screenColumn" style="width:39.5%;">

        <!-- 地图 62%-->
        <div class="screenBlock" style="width:100%;height:52%;">
          <div style="width:100%;font-size:50px;margin-bottom: 10px" >地块分布</div>
          <Map
            @map_current_id="activeLands" :lotNameDict="lotNameDict" :lot-id="LotID"/>
        </div>

        <!--  地块和天气    -->
        <div class="screenBlock" style="width:100%;height:13.5%;display:flex;flex-direction:row">

          <div style="width: 30%;height: 100%;">
              <span style="display: block;font-size: 50px;margin: 20px auto">地块名</span>
            <div style="width:100%;font-size:80px;margin:60px auto"><img src="../../../assets/icon/land.png" alt=""> {{lotNameDict[LotID]}} </div>
          </div>

          <div style="width: 40%;height: 100%;">
                <!-- 主题切换 -->
                <span style="display: block; font-size: 50px;margin: 20px auto"> 昨日天气</span>
<!--            <div style="width:100%;font-size:80px"><img src="../../../assets/icon/humidity.png" alt=""> {{lotNameDict[LotID]}} </div>-->

          </div>

          <div style="width: 40%;height: 100%;">
            <!-- 主题切换 -->
            <span style="display: block; font-size: 50px;margin: 20px auto"> 今日天气</span>
<!--            <div style="width:100%;font-size:80px"><img src="../../../assets/icon/humidity.png" alt=""> {{lotNameDict[LotID]}} </div>-->

          </div>

        </div>

        <!-- 散点图 -->
        <div style="width:100%;height:31.5%" class="screenBlock">
          <Scatter></Scatter>
        </div>
      </div>

      <!-- 右列 -->
      <div class="screenColumn" style="width:29.3%;">
        <!-- 新闻资讯行 -->
        <div style="width:100%;height:34%" class="screenBlock">
          <div style="width:100%;font-size:50px;margin-bottom: 10px" >新闻资讯</div>
          <News/>
        </div>

        <!-- 市场价格行 -->
        <div style="width:100%;height:31.5%" class="screenBlock">
          <PriceTrend1/>
        </div>

        <!-- 产地价格行 -->
        <div style="width:100%;height:31.5%" class="screenBlock">
          <PriceTrend2/>
        </div>

      </div>

    </div>

  </div>


</template>

<script>
  import echarts from 'echarts'
  import {mapState} from "vuex";
  import Oxide from "./components/Oxide"
  import Maintenance from "./components/Maintenance"

  import Irrig from "./components/Irrig"
  import Price from "./components/Price"
  import SoilElement from "./components/SoilElement"
  import SoilTension from "./components/SoilTension"
  import DashBoard from "./components/DashBoard"
  import newSoilElement from "./components/newSoilElement"
  import newMaintenance from "./components/newMaintenance"

  import Map from "./components/Map"
  import Scatter from "./components/Scatter"
  import PriceTrend1 from "./components/PriceTrend1"
  import PriceTrend2 from "./components/PriceTrend2"
  import News from "./components/News"
  import Rose from "./components/Rose"
  import MaintenanceCalendar from "./components/MaintenanceCalendar"


  export default {
    name: "BigScreen",
    components: {
      MaintenanceCalendar,
      Rose,
      echarts,
      Maintenance,
      Map,
      News,
      Irrig,
      Oxide,
      Price,
      SoilElement,
      SoilTension,
      DashBoard,
      newSoilElement,
      newMaintenance,
      Scatter,
      PriceTrend1,
      PriceTrend2
    },
    data() {
      return {
        //add
        humidity1: 0,
        humidity2: 0,
        temperature1: 0,
        temperature2: 0,
        containerKey:1,
        containerKey2:2,
        OxideIds:[0,1,2,3,4,5],
        averageValue:[],
        refresh:true,
        refreshTimes:0,
        todayForcast:{},
        tomorrowForcast:{},
        lotNameDict: {},
        sensorLocList: [],
        sensorIDList: [],
        sensorNameList: [],
        LotID: 10,
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
        soilOxideValue:{
          'Si':[],
          'Al':[],
          'K':[],
          'Mg':[],
          'Ca':[],
          'Na':[],
          'Fe':[]
        },
        depthsoilOxideValue:{
          '20cm':[],
          '40cm':[],
          '60cm':[],
          '80cm':[],
        },
        OxideElement:['SiO₂', 'Al₂O₃', 'K₂O','MgO','CaO', 'Na₂O','Fe₂O₃'],
        boxes:['box1','box2','box3','box4','box5','box6','box7'],
        isthisFullScreen: false,
        MoiCap:{},
        Moi845:{},
        MoiTem1:{},
        MoiTem2:{},
        allSoilEntropy:{}

      }
    },

    updated(){
      this.refreshTimes = this.$route.query.refreshTimes

    },
    destroyed(){
      clearInterval(this.timer);
      clearInterval(this.timer2)
      this.$showFullScreen.flag = false
    },
    async created(){
      this.forcast()
      this.refreshTimes = this.$route.query.refreshTimes
      if (this.$route.query.refreshTimes !== undefined) {
        this.showFullScreen()
      }
      await this.loadSoilEntropyInfo();
      await this.loadSoilTemperature();
      await this.getLotNameDict()
      this.depthsoilOxideValue = this.allSoilEntropy[this.LotID].tempDepthsoilOxideValue
      this.soilEntropyInfoValue =  this.allSoilEntropy[this.LotID].tempSoilEntropyInfoValue
      this.drawCirclePie()
      this.timer = setInterval(this.changeLotID,3000)
      this.timer2 = setInterval(this.longTimeRefresh,1800000)

    },
    methods:{
      forcast(){
        this.$axios({
          url: 'https://www.baidu.com',
          method: 'get'
        }).then(function(res){
        }).catch(function (error) {
          alert(error);
        });

        // alert(JSON.stringify(response))
      }
      ,
      activeLands(data){
        // data 为当前 active 的地块 id
        // console.log(data)
      },
       longTimeRefresh() {
         this.loadSoilEntropyInfo();
         this.loadSoilTemperature();
         this.getLotNameDict()
      }
      ,
      changeLotID(){
        this.LotID = (this.LotID % 33) +1
        this.depthsoilOxideValue = this.allSoilEntropy[this.LotID].tempDepthsoilOxideValue
        this.soilEntropyInfoValue =  this.allSoilEntropy[this.LotID].tempSoilEntropyInfoValue
        this.drawCirclePie()
      },
      async getLotNameDict() {
        await this.$api.lot.findAllLotLoc().then((res) => {
          for (let i = 0; i <= res.data.length ; i++) {
            this.lotNameDict[i+1] = res.data[i]["name"]
          }
        }).catch(function (res) {
        })
      },
      loadSoilTemperature(){
        let param = {}
        let oldDate = new Date("2020-8-7")
        let newDate = new Date()
        let interval = parseInt(( newDate - oldDate)/(1000*60*60*24))
        let _this = this
        for (let i = 1; i <= 4; i++) {


          switch (i) {

            case 1 :
              param = {time:interval, sensorType:"20", subType:"0"};
              this.$api.lot.findLotRecordByTimeAndSensor(param).then((res)=>{
                let tableData = res.data;
                _this.humidity1 = tableData[0].sensorValue

              });

              break;
            case 2:
              param = {time:interval, sensorType:"0E", subType:"0"};
              this.$api.lot.findLotRecordByTimeAndSensor(param).then((res)=>{
                let tableData = res.data;
                _this.humidity2 = tableData[0].sensorValue

              });
              break;
            case 3:
              param = {time:interval, sensorType:"24", subType:"0"};
              this.$api.lot.findLotRecordByTimeAndSensor(param).then((res)=>{
                let tableData = res.data;
                for (let i = 0; i < tableData.length; i++) {
                  if (tableData[i].sensorId === '4' || tableData[i].sensorId === 4) {
                    _this.temperature1 = tableData[i].sensorValue
                    break
                  }
                }

              });
              break;
            case 4:
              param = {time:interval, sensorType:"24", subType:"0"};
              this.$api.lot.findLotRecordByTimeAndSensor(param).then((res)=>{
                let tableData = res.data;
                for (let i = 0; i < tableData.length; i++) {

                  if (tableData[i].sensorId === '21' || tableData[i].sensorId === 21) {
                    _this.temperature2 = tableData[i].sensorValue
                    break
                  }
                }
              });
              break;

            default: break;
          }

        }

      }
      ,
      loadSoilEntropyInfo() {
        // let param = {LotID: this.LotID};
        this.$api.lot.findAllSoilEntropy().then((res) =>{
          if(res.code === 200){
            for (let LotId = 0; LotId < 33; LotId++) {
              let tempSoilEntropyInfoValue = {}

              tempSoilEntropyInfoValue["20cm"] = [];
              tempSoilEntropyInfoValue["40cm"] = [];
              tempSoilEntropyInfoValue["60cm"] = [];
              tempSoilEntropyInfoValue["80cm"] = [];

              //depthsoilOxideValue
              let tempDepthsoilOxideValue = {}
              tempDepthsoilOxideValue["20cm"] = [];
              tempDepthsoilOxideValue["40cm"] = [];
              tempDepthsoilOxideValue["60cm"] = [];
              tempDepthsoilOxideValue["80cm"] = [];

              for(let i=0;i<res.data.length;i++){
                if(res.data[i].lotID !== LotId)
                  continue

                //获取氧化物数据
                let OxiValue = res.data[i].list.slice(52,59)
                console.log(OxiValue)
                for(var oi=0;oi < OxiValue.length;oi++){
                  switch (res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2)) {
                    case '20cm':
                      tempDepthsoilOxideValue['20cm'].push(OxiValue[oi].elemValue)
                      break;
                    case '40cm':
                      tempDepthsoilOxideValue['40cm'].push(OxiValue[oi].elemValue)
                      break;
                    case '60cm':
                      tempDepthsoilOxideValue['60cm'].push(OxiValue[oi].elemValue)
                      break;
                    case '80cm':
                      tempDepthsoilOxideValue['80cm'].push(OxiValue[oi].elemValue)
                      break;
                    default:
                      break
                  }
                }


                //删除氧化物数据，以及一些 类似Fe-C数据



                res.data[i].list.splice(52,18)
                let soilEntropyInfo = res.data[i].list

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
                  if(i === 0){
                    this.legendTempList.push(soilEntropyInfo[item].elemName);

                    if (soilEntropyInfo[item].elemValue < 0){
                      soilEntropyInfo[item].elemValue = 0
                    }
                    tempsoilEntropyInfoValue.push(soilEntropyInfo[item].elemValue)
                  }
                }

                // console.log(res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2))

                switch (res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2)) {
                  case '20cm':
                    tempSoilEntropyInfoValue['20cm'].push(tempsoilEntropyInfoValue)
                    break;
                  case '40cm':
                    tempSoilEntropyInfoValue['40cm'].push(tempsoilEntropyInfoValue)
                    break;
                  case '60cm':
                    tempSoilEntropyInfoValue['60cm'].push(tempsoilEntropyInfoValue)
                    break;
                  case '80cm':
                    tempSoilEntropyInfoValue['80cm'].push(tempsoilEntropyInfoValue)
                    break;
                  default:break

                }

              }

              this.allSoilEntropy[LotId] = {tempSoilEntropyInfoValue:tempSoilEntropyInfoValue,tempDepthsoilOxideValue:tempDepthsoilOxideValue}

            }

          }
        }).catch()

        // this.$api.lot.findSoilEntropyByLotID(param).then((res) => {
        //   // 根据不同土壤的测量深度进行划分
        //
        //   if(res.code === 200)
        //   {
        //     console.log("返回成功")
        //     this.soilEntropyInfoValue["20cm"] = new Array();
        //     this.soilEntropyInfoValue["40cm"] = new Array();
        //     this.soilEntropyInfoValue["60cm"] = new Array();
        //     this.soilEntropyInfoValue["80cm"] = new Array();
        //
        //     //depthsoilOxideValue
        //     this.depthsoilOxideValue["20cm"] = new Array();
        //     this.depthsoilOxideValue["40cm"] = new Array();
        //     this.depthsoilOxideValue["60cm"] = new Array();
        //     this.depthsoilOxideValue["80cm"] = new Array();
        //
        //     //res.data[i].soilEntropyInfo.splice(62,7)
        //
        //     for(let i=0;i<res.data.length;i++){
        //
        //       //获取氧化物数据
        //       let OxiValue = res.data[i].soilEntropyInfo.slice(52,59)
        //       console.log(OxiValue)
        //       for(var oi=0;oi < OxiValue.length;oi++){
        //         switch (res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2)) {
        //           case '20cm':
        //             this.depthsoilOxideValue['20cm'].push(OxiValue[oi].elemValue)
        //             break;
        //           case '40cm':
        //             this.depthsoilOxideValue['40cm'].push(OxiValue[oi].elemValue)
        //             break;
        //           case '60cm':
        //             this.depthsoilOxideValue['60cm'].push(OxiValue[oi].elemValue)
        //             break;
        //           case '80cm':
        //             this.depthsoilOxideValue['80cm'].push(OxiValue[oi].elemValue)
        //             break;
        //
        //         }
        //       }
        //
        //
        //       //删除氧化物数据，以及一些 类似Fe-C数据
        //
        //
        //
        //       res.data[i].soilEntropyInfo.splice(52,18)
        //       let soilEntropyInfo = res.data[i].soilEntropyInfo
        //
        //       //从小到大排序
        //       let tempsoilEntropyInfoValue = [];
        //
        //       if (i === 0){
        //         soilEntropyInfo.sort(function(a,b){
        //           return a.elemValue-b.elemValue});
        //         this.legendTempList = [];
        //       }else {
        //
        //         for (var ii = 0; ii< soilEntropyInfo.length;ii++){
        //           for (var jj =0;jj < soilEntropyInfo.length;jj++){
        //             if (soilEntropyInfo[jj].elemName === this.legendTempList[ii]){
        //               //console.log(this.legendTempList[ii])
        //               //console.log(soilEntropyInfo[jj].elemName)
        //               //console.log(soilEntropyInfo[jj].elemValue)
        //               if(soilEntropyInfo[jj].elemValue > 0){
        //                 tempsoilEntropyInfoValue.push(soilEntropyInfo[jj].elemValue)
        //               }else{
        //                 tempsoilEntropyInfoValue.push(0)
        //               }
        //               //tempsoilEntropyInfoValue.push(soilEntropyInfo[jj].elemValue>0?soilEntropyInfo[jj].elemValue>0:0)
        //               break
        //             }
        //           }
        //         }
        //
        //       }
        //
        //       //获得legenddata
        //
        //       //soilEntropyInfo[soilEntropyInfo.length-1].elemValue = 900
        //       for (let item in soilEntropyInfo) {
        //         if(i === 0){
        //           this.legendTempList.push(soilEntropyInfo[item].elemName);
        //
        //           if (soilEntropyInfo[item].elemValue < 0){
        //             soilEntropyInfo[item].elemValue = 0
        //           }
        //           tempsoilEntropyInfoValue.push(soilEntropyInfo[item].elemValue)
        //         }
        //       }
        //
        //       // console.log(res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2))
        //
        //       switch (res.data[i].sampleIdentification.substring(res.data[i].sampleIdentification.indexOf('c')-2)) {
        //         case '20cm':
        //           this.soilEntropyInfoValue['20cm'].push(tempsoilEntropyInfoValue)
        //           break;
        //         case '40cm':
        //           this.soilEntropyInfoValue['40cm'].push(tempsoilEntropyInfoValue)
        //           break;
        //         case '60cm':
        //           this.soilEntropyInfoValue['60cm'].push(tempsoilEntropyInfoValue)
        //           break;
        //         case '80cm':
        //           this.soilEntropyInfoValue['80cm'].push(tempsoilEntropyInfoValue)
        //           break;
        //
        //       }
        //
        //     }
        //
        //     //绘制环形图
        //     this.drawCirclePie()
        //
        //
        //   }
        //   // else {
        //   //   this.$message({message: '查询土壤微量元素数据失败 ', type: 'error'})
        //   // }
        //
        // }).catch(function (res) {
        // })
      },
      drawCirclePie(){
        if(this.depthsoilOxideValue["20cm"].length === 0 ){

        }
        else {
          this.averageValue = []
          for(let i=0;i<7;i++){
            // console.log("绘制环形图")
            let averageValue = this.depthsoilOxideValue["20cm"][i] + this.depthsoilOxideValue["40cm"][i] + this.depthsoilOxideValue["60cm"][i] + this.depthsoilOxideValue["80cm"][i]
            // console.log(averageValue)
            averageValue = averageValue / 4
            // console.log(averageValue)
            averageValue = averageValue.toFixed(1)
            // console.log("平均值" + averageValue)
            this.averageValue.push(averageValue)

            /*edit!*/
            //this.pie(averageValue, this.OxideElement[i], this.boxes[i], ['#00ffff', '#0A164F']);

          }
        }

      },
      toFixed:function (str,xlen){
        //var a = str +"";
        //return a.substring(0,str.indexOf(".") + xlen);
        return str.toFixed(xlen)
      },
      drawSoilPie(legendData) {
        var dom = document.getElementById("bar_container");
        var myChartSoil = echarts.init(dom);

        let option = {
          title:{
            text:'\n      土壤微量元素含量信息 (单位：ppm)',
            textStyle:{
              color:'#FFFFFF',        //颜色
              fontStyle:'normal',     //风格
              fontWeight:'normal',    //粗细
              fontFamily:'Microsoft yahei',   //字体
              fontSize:20,     //大小
              align:'center',   //水平对齐
              left: '50'
            },
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          legend: {
            data: ['土壤微量元素含量20厘米','土壤微量元素含量40厘米','土壤微量元素含量60厘米','土壤微量元素含量80厘米'],
            textStyle:{//图例文字的样式
              color:'#ccc',
              fontSize:16
            },
            "itemGap": 30,
            'itemWidth':40,
            top: '60',
            left:'100',
            right:'30',
            bottom:'30'
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            top: '3%',
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
            data: legendData,
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
              name: '土壤微量元素含量20厘米',
              type: 'bar',
              data: this.soilEntropyInfoValue["20cm"][0],
              itemStyle:{
                normal:{
                  color:'#0566E8',
                }
              },
              //markPoint : {
              //  data : [
              //    {type : 'max', name: '最大值'},
              //    {type : 'min', name: '最小值'}
              //  ]
              //},
              //markLine : {
              // data : [
              //   {type : 'average', name: '平均值'}
              //]
              //}
            },
            {
              name: '土壤微量元素含量40厘米',
              type: 'bar',
              data: this.soilEntropyInfoValue["40cm"][0],
              itemStyle:{
                normal:{
                  color:'#00ffff',
                }
              },
              //markPoint : {
              //  data : [
              //    {type : 'max', name: '最大值'},
              //    {type : 'min', name: '最小值'}
              //  ]
              //},
              //markLine : {
              // data : [
              //   {type : 'average', name: '平均值'}
              //]
              //}
            },
            {
              name: '土壤微量元素含量60厘米',
              type: 'bar',
              data: this.soilEntropyInfoValue["60cm"][0],
              itemStyle:{
                normal:{
                  color:'#ffff00',
                }
              },
              //markPoint : {
              //  data : [
              //    {type : 'max', name: '最大值'},
              //    {type : 'min', name: '最小值'}
              //  ]
              //},
              //markLine : {
              // data : [
              //   {type : 'average', name: '平均值'}
              //]
              //}
            },
            {
              name: '土壤微量元素含量80厘米',
              type: 'bar',
              data: this.soilEntropyInfoValue["80cm"][0],
              itemStyle:{
                normal:{
                  color:'#ff0066',
                }
              },
              //markPoint : {
              //  data : [
              //    {type : 'max', name: '最大值'},
              //    {type : 'min', name: '最小值'}
              //  ]
              //},
              //markLine : {
              // data : [
              //   {type : 'average', name: '平均值'}
              //]
              //}
            }
          ]
        };
        myChartSoil.setOption(option,true);
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
            label: { //  饼图图形上的文本标签gg
              normal: { // normal 是图形在默认状态下的样式
                show: true,
                position: 'center',
                color: '#FFFFFF',
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
      launchIntoFullscreen: function(element) {
        if(element.requestFullscreen){
          element.requestFullscreen();
        }
        else if(element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        }
        else if(element.webkitRequestFullscreen) {
          element.webkitRequestFullscreen();
        }
        else if(element.msRequestFullscreen) {
          element.msRequestFullscreen();
        }
      },
      exitFullscreen: function() {
        if(document.exitFullscreen) {
          document.exitFullscreen();
        } else if(document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if(document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        }
      },
      showFullScreen(){
        var fullscreen = document.getElementById("root");
        this.launchIntoFullscreen(fullscreen)

        // var fullbtn = document.getElementById("fullbtn");
        // const  that = this
        // if(this.isthisFullScreen === false){
        //   this.launchIntoFullscreen(fullscreen)
          //注释了下面这一行，目前只能用esc退出全屏
          // this.isthisFullScreen = true;
          // fullbtn.innerHTML = "退出全屏"
          // this.$nextTick(()=>{
          //   this.containerKey = new Date().getTime()
          //   this.refresh = false
          //   setInterval(function ()
          //   {that.refresh = true},1500)
          // })

          // this.showAnimation(true)

        // }else{
        //   this.isthisFullScreen = false;
        //   this.exitFullscreen()
        //   this.$nextTick(()=>{
        //     this.containerKey = new Date().getTime()
        //     this.refresh = false
        //     setInterval(function ()
        //     {that.refresh = true},1500)
        //   })

          // fullbtn.innerHTML = "全屏展示"
          // this.showAnimation(false)
          // this.containerKey = new Date().getTime()

        // }

      },

      ctrlFullScreen(){
        var element = document.getElementById("container");

        var fullbtn = document.getElementById("fullbtn");

        if (element.requestFullScreen)
          return element.requestFullScreen();
        if (element.webkitRequestFullScreen)
          return element.webkitRequestFullScreen();
        if (element.mozRequestFullScreen)
          return element.mozRequestFullScreen();
        if (element.msRequestFullScreen)
          return element.msRequestFullScreen();
        if (element.oRequestFullScreen)
          return element.oRequestFullScreen();

        if(this.isthisFullScreen === false){
          this.launchIntoFullscreen(fullscreen)
          this.isthisFullScreen = true;
          fullbtn.innerHTML = "退出全屏"
          fullbtn.visible = false;
          //this.showAnimation(true)
        }else{
          this.isthisFullScreen = false;
          this.exitFullscreen()
          fullbtn.innerHTML = "全屏展示"
          fullbtn.visible = true;
          //this.showAnimation(false)
        }

      },

      thisshowFullScreen: function () {
        if (this.isthisFullScreen === false){
          this.isthisFullScreen = true
          var el = document.getElementById("container");
          var rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullscreen;
          if(typeof rfs != "undefined" && rfs) {
            rfs.call(el);
          };
        }
        else {
          this.isthisFullScreen = false
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
          else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          }
          else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
          }
          else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
          if(typeof cfs != "undefined" && cfs) {
            cfs.call(el);
          }
        }
      }

    },
    watch: {
      'refreshTimes':{
        handler(newVal, oldVal) {
          if (newVal !== oldVal) {
            //
            this.showFullScreen()
          }
        }
      }


    },
    computed: {
      ...mapState({
        lotPathList: state => state.lot.allLotLocList
      }),


    },

  }
</script>
<style scoped>

  #root{
    color:#ffffff;
    font-family:'Microsoft YaHei';
    width:100%;
    height:100%;
    display:flex;
    flex-direction:column;
    justify-content:space-around;

  }
  .screenBlock{
    background-color: #282b2f;
    padding: 1.5rem 0;
    margin: 1.5rem 0;
  }
  #title{
    background-color:#282b2f;
    width:97%;
    height:11%;
    font-size:150px;
    margin: 0 auto;
    display:flex;
    align-items:center;
    justify-content: center;
    /*overflow-x: hidden;*/
  }
  /*隐藏div的滚动条*/
  #container{
    width: 100%;
    height: 87%;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: nowrap;
    justify-content: space-around;
    /*margin: 0 auto;*/
    scroll-behavior: auto;
    overflow: hidden;
   }

  .screenColumn{
    height: 100%;
    display: flex;
    flex-direction: column;
  }
  .screenColumn>div{
    width: 100%;
    display:flex;
    flex-direction:column;
    justify-content: space-around;
    align-items: center;
  }
  .label{
    text-align: left;
  }
</style>
