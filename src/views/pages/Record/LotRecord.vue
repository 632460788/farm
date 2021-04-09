<template>
  <div class="page-container">
    <!-- 选择时间范围 -->
    <!--      目前问题：80天时间内，可以显示每一种传感器的数据并绘制图像
              但是，不能同时显示所有传感器的图像
    -->
    <div style="padding-top:10px;padding-left:15px;padding-right:15px;">
      <el-form :inline="true" :model="lotQueryCondition" size="small">
        <el-row>
          <el-col :span="4">
            <el-form-item label="地块编号">
              <el-input style="width: 8vw" v-model="lotQueryCondition.lotID" placeholder="输入地块编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="传感器编号">
              <el-input style="width: 8vw" v-model="lotQueryCondition.sensorID" placeholder="输入传感器编号"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="传感器类型">
              <el-select style="width: 8vw" v-model="lotQueryCondition.sensorName">
                <el-option v-for="item in allSensorType" :key="item.id" :label="item.chName" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6" :offset="3">
            <el-form-item label="时间范围">
              <el-date-picker style="width: 16vw" v-model="lotQueryCondition.duration" type="daterange"
                              range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item>
              <el-button icon="fa fa-search" type="primary" @click="queryByCondition()" :loading="isSearching"> 查询</el-button>
            </el-form-item>
            <el-form-item>
              <el-button icon="fa fa-times" @click="clearQueryCondition()"> 重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <SocialChat></SocialChat>

    <div v-if="isShowChart" id="line_container" style="height: 500px;width: 100%"> </div>
    <!--表格-->
    <div v-if="isShowTable">
      <el-row>
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          style="margin-top:30px;width: 100%;font-size: small" stripe
          :default-sort = "{prop: 'date', order: 'descending'}">
          <el-table-column header-align="center" align="center" prop="id" label="ID" sortable min-width="150"></el-table-column>
          <el-table-column header-align="center" align="center" prop="lotNum" label="地块号" sortable min-width="150"></el-table-column>
          <el-table-column header-align="center" align="center" prop="sensorId" label="传感器编号" sortable min-width="150"></el-table-column>
          <el-table-column header-align="center" align="center" prop="sensorName" label="传感器类型" sortable min-width="150"></el-table-column>
          <el-table-column header-align="center" align="center" prop="sensorValue" label="传感器值" sortable min-width="150"></el-table-column>
          <el-table-column header-align="center" align="center" prop="time" label="时间" sortable min-width="150"></el-table-column>
        </el-table>
      </el-row>

      <!--分页-->
      <el-row type="flex" justify="end" style="margin-top:10px">
        <!-- current-page：默认当前页；page-size：每页总条数；layout：组件布局；total：总条数-->
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="currentPage"
          :page-size=pageSize
          layout="total, prev, pager, next"
          :total=totalRecordNum>
        </el-pagination>
      </el-row>
    </div>

  </div>
</template>

<script>

  import echarts from 'echarts'
  import {mapState} from "vuex";
  import LotLive from '../Live/LotLive';

  export default {
    data() {
      return {
        isShowTable: false,
        isShowChart: false,
        isSearching: false,
        lotQueryCondition: {
          lotID: '',
          sensorID: '',
          sensorName: '',
          duration: ''
        },
        tableData: [],
        currentPage: 1,
        pageSize: 10,
        totalRecordNum:0,
        allSensorType:{
          soilTension30:{
            name: "soilTension30",
            sensorType:"15",
            subType:"30",
            chName:"土壤张力30公分"
          },
          soilTension60:{
            name: "soilTension60",
            sensorType:"15",
            subType:"60",
            chName:"土壤张力60公分"
          },
          soilTension90:{
            name: "soilTension90",
            sensorType:"15",
            subType:"90",
            chName:"土壤张力90公分"
          },
          soilMoiCap:{
            name: "soilMoiCap",
            sensorType:"20",
            subType:"0",
            chName:"土壤湿度电容"
          },
          soilMoi485:{
            name: "soilMoi485",
            sensorType:"0E",
            subType:"0",
            chName:"土壤湿度485"
          },
          soilMoiTem:{
            name: "soilMoiTem",
            sensorType:"24",
            subType:"0",
            chName:"土壤温度计"
          }
        },
        legend_echarts:[],
        data_echarts:[]
      }
    },
    methods: {
      // 初始化表格数据
      //initTableData: function () {

      /*****************由于数据接收问题，对allTime标签对应的时间进行更改，涉及allTime-allSensor和allTime-数据量极多的传感器  将alltime改成70***************************************************/
      // let oldDate = new Date("2020-8-7")
      // let newDate = new Date()
      // let interval = parseInt((newDate-oldDate) / (1000*60*60*24))
      // console.log(interval)
      // let param = {
      //   time: interval,
      //   sensorType: 15,
      //   subType: 90
      // };
      // this.$api.lot.findLotRecordByTimeAndSensor(param).then((res) => {
      //   this.selectTimeAndSensor(res);
      // });
      //},

      clearQueryCondition(){
        let condition;
        for (condition in this.lotQueryCondition) {
          this.lotQueryCondition[condition] = '';
        }
      },

      queryByCondition() {
        this.isSearching = true

        let param = {
          lotID: this.lotQueryCondition.lotID,
          sensorID: this.lotQueryCondition.sensorID,
          sensorType: this.allSensorType[this.lotQueryCondition.sensorName].sensorType,
          subType: this.allSensorType[this.lotQueryCondition.sensorName].subType,
          timeInterval: this.lotQueryCondition.duration==='' ? '' : this.lotQueryCondition.duration[0].getTime()+","+this.lotQueryCondition.duration[1].getTime(),
        };

        this.$api.lot.findLotRecordByMultiConditions(param).then((res) => {
          if (res.data === undefined) {
            this.$notify.error({title: '错误', message: '未查询到数据'});
            return;
          }
          this.tableData = res.data;
          this.currentPage = 1;
          this.totalRecordNum = res.data.length;
          // this.formatLineData()
          // this.drawLineCharts()
        });

        this.isShowTable = true
        this.isSearching = false
      },

      // 当前页改变时触发，传入当前页码
      handleCurrentChange(currentPage) {
        this.currentPage = currentPage;
        console.log("页码" + currentPage)
      },

      // 选择时间和传感器范围
      /*selectSensorRange:function(label){
        this.radio2 = label;
        console.log(this.radio2)
        if(this.radio1 !=="allTime" ){
          //<时间+传感器类型>条件
          if(label==="allSensor"){

            let param = {time: this.radio1};

            this.$api.lot.findLotRecordByTime(param).then((res) => {
              this.selectTimeAndSensor(res);
            })
          }else {

            let param = {
              time: this.radio1,
              sensorType: this.allSensorType[this.radio2].sensorType,
              subType: this.allSensorType[this.radio2].subType
            };
            this.$api.lot.findLotRecordByTimeAndSensor(param).then((res) => {
              this.selectTimeAndSensor(res);
            });
          }
        }else{
          //只有<传感器>条件
          if(label==="allSensor"){

            /!*****************由于数据接收问题，对allTime标签对应的时间进行更改，涉及allTime-allSensor和allTime-数据量极多的传感器  将alltime改成70***************************************************!/
            let oldDate = new Date("2020-8-7")
            let newDate = new Date()
            let interval = parseInt((newDate-oldDate)/(1000*60*60*24))
            let param = {time: interval};
            this.$api.lot.findLotRecordByTime(param).then((res) => {
              this.selectTimeAndSensor(res);
            });

            // this.$api.lot.findAllLotRecord().then((res) => {
            //   this.selectTimeAndSensor(res);
            // })
          }else{


            /!*****************由于数据接收问题，对allTime标签对应的时间进行更改，涉及allTime-allSensor和allTime-数据量极多的传感器  将alltime改成70***************************************************!/
            let oldDate = new Date("2020-8-7")
            let newDate = new Date()
            let interval = parseInt((newDate-oldDate)/(1000*60*60*24))
            let param = {time:interval,sensorType:this.allSensorType[this.radio2].sensorType,subType:this.allSensorType[this.radio2].subType};
            this.$api.lot.findLotRecordByTimeAndSensor(param).then((res)=>{
              console.log(res.data)
              this.selectTimeAndSensor(res);
            });
            // let param = {sensorType:this.allSensorType[this.radio2].sensorType,subType:this.allSensorType[this.radio2].subType};
            // this.$api.lot.findLotRecordBySensor(param).then((res)=>{
            //   this.selectTimeAndSensor(res);
            // });
          }

        }
      },*/

      //选择范围的功能函数
      selectTimeAndSensor:function (res) {
        if (res.data === undefined) {
          this.$notify.error({title: '错误', message: '未查询到数据'});
          return;
        }
        this.tableData = res.data;
        this.currentPage = 1;
        this.totalRecordNum = res.data.length;
        this.formatLineData()
        this.drawLineCharts()

      },
      formatLineData: function(){

        //初始化legend 和 内容
        this.legend_echarts = []
        this.data_echarts = []

        // 获得数据中 传感器 数量 和 sensorId 和 传感器类型，作为legend
        var i = 0;
        let exist_id = [];
        let sensor_num = 0;
        for(i=0;i<this.tableData.length;i++){

          //整理数据
          let obj = {};
          obj.name = this.tableData[i].time;
          obj.value = [this.tableData[i].time, this.tableData[i].sensorValue.replace(/,/g, "")]; // Bug 温度大于1000，采用逗号分隔，有错

          let sensorID = this.tableData[i].lotNum +":"+this.tableData[i].sensorName;
          //let sensorID = 'SID' + this.tableData[i].sensorId;
          if( exist_id.indexOf(this.tableData[i].sensorId) === -1 ){ // 添加新元素
            exist_id.push(this.tableData[i].sensorId);
            sensor_num += 1;

            //添加一个对象
            let it = {};
            it.name = sensorID;
            it.data = [];
            it.type = 'line';
            this.data_echarts.push(it);

            this.legend_echarts.push(this.tableData[i].lotNum +":"+this.tableData[i].sensorName);
            this.data_echarts[sensor_num-1].data.push(obj);

          }else {
            this.data_echarts[exist_id.indexOf(this.tableData[i].sensorId)].data.push(obj);
          }

        }

        // 遍历返回数据，为每一个传感器 生成一个数据列表，时间，传感器值

        // console.log("数据整理结果")
        // console.log(this.legend_echarts)
        // console.log(this.data_echarts)


      },
      drawLineCharts: function () {
        //画折线图
        console.log("画折线图")

        var dom = document.getElementById("line_container");
        var myChart = echarts.init(dom);

        let option = {
          title: {
            text: '传感器数据曲线'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            "itemGap": 15,
            'itemWidth':5,
            top: '30',
            left:'40',
            right:'30',
            //'orient':'vertical',
            data:this.legend_echarts
          },
          grid: {
            left: '0%',
            right: '4%',
            bottom: '3%',
            top:'5%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            splitLine: {show: false},
            type: 'time',

          },
          dataZoom: [{
            type: 'inside', xAxisIndex: [0], filterMode: 'empty'
          }, {
            type: 'slider', xAxisIndex: [0], filterMode: 'empty'
          }],
          yAxis: {
            type: 'value',
            boundaryGap: [0, '100%'],
            splitLine: {show: false},
            axisLabel: {formatter: '{value}'}
          },
          series: this.data_echarts
        };

        if (option && typeof option === "object") {
          myChart.setOption(option);
        }
        myChart.setOption(option,true);
        //myChart.setOption({
        //  series: this.data_echarts
        //});
      }
    },

    mounted() {
      // this.initTableData()
    },
    computed: {
      ...mapState({
        lotPathList: state => state.lot.allLotLocList
      }),
    }
  }
</script>

<style scoped>
  .content-class{
    margin:5px;
  }
  .el-row{
    font-size:small;
    align:middle; /*垂直居中*/
  }
  .elrow1{
    margin-left:20px;
    margin-top:20px;
  }
  .elrow2{
    margin-left:20px;
    margin-top:15px;
  }
</style>
