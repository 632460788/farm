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
      <div class="screenColumn" style="width:29%">
        <!-- 气象信息、土壤温湿度行 -->
        <div class="screenBlock" style="display:flex;flex-direction:row;width:100%; height:18%">
          <!-- 气象表 -->
          <div style="height:100%; width: 46.8%;display:flex;flex-direction:column; justify-content: space-around">
            <div style="height:47%; display:flex; flex-direction:column; justify-content: space-between">
              <div class="label" style="width:100%;height:23.75%;font-size:32px" >气象信息</div>
              <div style="height:62.5%; width:100%;display:flex;justify-content:start;flex-direction:row">
                <!-- 风速 -->
                <div class="el-icon-wind-power" style="width:46%;font-size:80px">{{windPower}} m/s</div>
                <!-- 最大风速 -->
                <div class="el-icon-wind-power" style="width:46%;flex:1;font-size:80px">{{maxWindPower}} m/s</div>
              </div>
            </div>
            <div style="height: 47%; display:flex; flex-direction:column; justify-content: space-around">
              <div class="label" style="width:100%;height:23.75%;font-size:32px">土壤温湿度</div>
              <div style="height:62.5%; width:100%;display:flex;justify-content:start;flex-direction:row">
                <!-- 土壤温度 -->
                <div class="el-icon-sunny" style="width:46%;font-size:80px">{{temperature}} ℃</div>
                <!-- 土壤湿度 -->
                <div class="el-icon-cloudy" style="width:46%;font-size:80px">{{humidity}} %</div>
              </div>
            </div>
          </div>

          <!-- 玫瑰图 -->
          <div style="height:100%;width:50%">
            <Rose/>
          </div>
        </div>

        <!-- 柱状图行 -->
        <div class="screenBlock" style="width:100%; height:22.5%">
          <new-soil-element
            style="width: 100%;"
            v-if="refresh"
            :key="containerKey">
          </new-soil-element>
        </div>

        <!-- 环形图行 -->
        <div class="screenBlock" style="width:100%; height:23%">
          <div style="width:100%; display:flex;height:50%;flex-direction:row; justify-content:space-around">
            <Oxide
              v-for="item in 3"
              style="width: 32%;height: 100%"
              :OxideId="item-1"
              :pieData="averageValue[item-1]"
              :pie-name="OxideElement[item-1]"
              :colors="['#e3a802','#018ce3']"
              v-if="averageValue[item-1] > 0 && refresh"
              :key="containerKey"/>
          </div>
          <div style="width:100%; display:flex; height:50%;flex-direction:row; justify-content:space-around">
            <Oxide
              v-for="item in 3"
              style="width: 32%;height:100%"
              :OxideId="item+2"
              :pieData="averageValue[item+2]"
              :pie-name="OxideElement[item+2]"
              :colors="['#e3a802','#018ce3']"
              v-if="averageValue[item-1] > 0 && refresh"
              :key="containerKey"/>
          </div>
        </div>
        <!-- 日历行 -->
        <div class="screenBlock" style="width:100%; height:34.5%">
          <MaintenanceCalendar/>
        </div>
      </div>

      <!-- 中列 -->
      <div class="screenColumn" style="width:39%">

        <!-- 地图 -->
        <div class="screenBlock" style="width:100%;height:62%">
          <Map
            @map_current_id="activeLands"/>
        </div>

        <!-- 散点图 -->
        <div style="width:100%;height:34.5%" class="screenBlock">
          <Scatter></Scatter>
        </div>
      </div>

      <!-- 右列 -->
      <div class="screenColumn" style="width:29%">
        <!-- 新闻资讯行 -->
        <div style="width:100%;height:34%" class="screenBlock">
          <News/>
        </div>

        <!-- 产地价格行 -->
        <div style="width:100%;height:31.5%" class="screenBlock">
          <PriceTrend/>
        </div>

        <!-- 市场价格行 -->
        <div style="width:100%;height:31.5%" class="screenBlock">
          <PriceTrend/>
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
  import PriceTrend from "./components/PriceTrend"
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
      PriceTrend
    },
    data() {
      return {
        //add
        windPower: 5,
        maxWindPower: 10,
        temperature: 23,
        humidity: 15,
        containerKey:1,
        OxideIds:[0,1,2,3,4,5],
        averageValue:[],
        refresh:true,


        locIDList: [],
        sensorLocList: [],
        sensorIDList: [],
        sensorNameList: [],
        LotID: 6,
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
        OxideElement:['SiO2', 'Al2O3', 'K2O','MgO','CaO', 'Na2O','Fe2O3'],
        boxes:['box1','box2','box3','box4','box5','box6','box7'],
        isthisFullScreen: false,
        MoiCap:{},
        Moi845:{},
        MoiTem1:{},
        MoiTem2:{}

      }
    },
    mounted() {
      this.loadSoilEntropyInfo();
    },
    methods:{
      activeLands(data){
        // data 为当前 active 的地块 id
        // console.log(data)
      },
      loadSoilEntropyInfo() {
        let param = {LotID: this.LotID};
        this.$api.lot.findSoilEntropyByLotID(param).then((res) => {
          // 根据不同土壤的测量深度进行划分

          if(res.code === 200)
          {
            console.log("返回成功")
            this.soilEntropyInfoValue["20cm"] = new Array();
            this.soilEntropyInfoValue["40cm"] = new Array();
            this.soilEntropyInfoValue["60cm"] = new Array();
            this.soilEntropyInfoValue["80cm"] = new Array();

            //depthsoilOxideValue
            this.depthsoilOxideValue["20cm"] = new Array();
            this.depthsoilOxideValue["40cm"] = new Array();
            this.depthsoilOxideValue["60cm"] = new Array();
            this.depthsoilOxideValue["80cm"] = new Array();

            //res.data[i].soilEntropyInfo.splice(62,7)

            let i = 0;
            for(i=0;i<res.data.length;i++){

              //获取氧化物数据
              let OxiValue = res.data[i].soilEntropyInfo.slice(52,59)
              console.log(OxiValue)
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
                      //console.log(this.legendTempList[ii])
                      //console.log(soilEntropyInfo[jj].elemName)
                      //console.log(soilEntropyInfo[jj].elemValue)
                      if(soilEntropyInfo[jj].elemValue > 0){
                        tempsoilEntropyInfoValue.push(soilEntropyInfo[jj].elemValue)
                      }else{
                        tempsoilEntropyInfoValue.push(0)
                      }
                      //tempsoilEntropyInfoValue.push(soilEntropyInfo[jj].elemValue>0?soilEntropyInfo[jj].elemValue>0:0)
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

            //console.log("绘制条形图")
            //legendTempList.push("SO<sub>2</sub>")
            //soilEntropyInfoValue.push(100.2)
            // console.log("结果")
            // console.log(this.depthsoilOxideValue)
            // console.log(this.depthsoilOxideValue["20cm"][0])
            // console.log(this.depthsoilOxideValue["40cm"][0])
            // console.log(this.depthsoilOxideValue["60cm"][0])
            // console.log(this.depthsoilOxideValue["80cm"][0])

            //edit!
            //this.drawSoilPie(this.legendTempList);
            //绘制环形图
            this.drawCirclePie()


          }else {
            this.$message({message: '查询土壤微量元素数据失败 ', type: 'error'})
          }

        }).catch(function (res) {
        })
      },
      drawCirclePie(){
        for(var i=0;i<7;i++){
          // console.log("绘制环形图")
          var averageValue = this.depthsoilOxideValue["20cm"][i] + this.depthsoilOxideValue["40cm"][i] + this.depthsoilOxideValue["60cm"][i] + this.depthsoilOxideValue["80cm"][i]
          // console.log(averageValue)
          averageValue = averageValue / 4
          // console.log(averageValue)
          averageValue = averageValue.toFixed(1)
          // console.log("平均值" + averageValue)
          this.averageValue.push(averageValue)

          /*edit!*/
          //this.pie(averageValue, this.OxideElement[i], this.boxes[i], ['#00ffff', '#0A164F']);

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
        var fullscreen = document.getElementById("container");

        var fullbtn = document.getElementById("fullbtn");
        const  that = this
        if(this.isthisFullScreen === false){
          this.launchIntoFullscreen(fullscreen)
          this.isthisFullScreen = true;
          fullbtn.innerHTML = "退出全屏"
          this.$nextTick(()=>{
            this.containerKey = new Date().getTime()
            this.refresh = false
            setInterval(function ()
            {that.refresh = true},1500)
          })

          this.showAnimation(true)

        }else{
          this.isthisFullScreen = false;
          this.exitFullscreen()
          this.$nextTick(()=>{
            this.containerKey = new Date().getTime()
            this.refresh = false
            setInterval(function ()
            {that.refresh = true},1500)
          })

          fullbtn.innerHTML = "全屏展示"
          this.showAnimation(false)
          this.containerKey = new Date().getTime()

        }

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
      },
      showAnimation(start){
        // 定时获取传感器参数
        if(start === true){
          this.saveLotID = this.LotID;

          this.timer = setInterval(() => {
            this.LotID = this.randomNum(3,12)
            this.loadSoilEntropyInfo();
          }, 5 * 1000)
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
    watch: {
      'LotID': {
        handler(newVal, oldVal) {
          console.error(newVal + ' ' + oldVal)
          if (newVal !== oldVal) {
            //
            this.loadSoilEntropyInfo()
          }
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
    padding: 1.5rem;
    margin: 1.5rem;
  }
  #title{
    background-color:#282b2f;
    width:98.5%;
    height:11%;
    font-size:80px;
    padding-left: 4rem;
    display:flex;
    align-items:center;
    overflow-x: hidden;
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
