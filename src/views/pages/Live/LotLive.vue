<template>
  <div>
    <!--      TODO 地块选择-->
    <el-row type="flex" justify="right" style="margin-bottom: 20px;margin-left: 15px">
      <span style="line-height: 15px;padding-top: 15px;padding-right: 10px">地块选择: </span>
      <el-select label="地块选择" v-model="LotID">
        <el-option v-for="item in getLotList(lotPathList)" :key="item.lotID" :label="item.lotName"
                   :value="item.lotID"></el-option>
      </el-select>
    </el-row>
    <el-row type="flex" justify="space-around">
      <el-col :span="9" >
        <el-card :body-style="{padding:'5px'}" shadow="hover">
          <div slot="header" class="clearfix">
            <span style="line-height: 15px;">地块位置</span>
          </div>
          <map-panel class="map-contain" height="350px" :lot-path-list="locIDList" :sensor-list="sensorLocList"></map-panel>
        </el-card>
      </el-col>
      <el-col :span="14">

        <el-row type="flex" justify="space-around">
          <el-card  shadow="hover" style="width: 800px">
        <div style="height: 500px;width: 100%">
          <el-tabs v-model="activeName" class="sensor_tabs" :stretch="true">
            <el-tab-pane v-if="sensorGbyType.ST15.length>0" label="土壤张力" name="ST15">
              <div id="ST15" class="dashboard-contain"></div>
            </el-tab-pane>
            <el-tab-pane v-if="sensorGbyType.ST0E.length>0" label="土壤湿度845"
                                       name="ST0E">
            <div id="ST0E" class="dashboard-contain"></div>
          </el-tab-pane>
            <el-tab-pane v-if="sensorGbyType.ST20.length>0" label="土壤湿度电容"
                         name="ST20">
              <div id="ST20" class="dashboard-contain"></div>
            </el-tab-pane>
            <el-tab-pane v-if="sensorGbyType.ST24.length>0" label="土壤温度" name="ST24">
              <div id="ST24" class="dashboard-contain"></div>
            </el-tab-pane>
          </el-tabs>
        </div>
          </el-card>
        </el-row>
        <el-row type="flex" justify="space-around">

        </el-row>
        <el-row type="flex" justify="space-around">
          <el-col :span="20">
            <span style="height:60px;"></span>
            <!--        实时数据显示-->

            <el-row type="flex" justify="space-around">
              <el-col>
                <div class="live-block"><span style="height:30%;line-height: 20px;">土壤湿度计845</span>
                  <div style="height:70%;font-size: 25px;text-align: center;vertical-align: center">{{liveData.ST0E + " %VOL"}}</div>
                </div>
              </el-col>
              <el-col>
                <div class="live-block"><span style="height:30%;line-height: 20px;">土壤湿度计电容</span>
                  <div style="height:70%;font-size: 25px;text-align: center;vertical-align: middle">{{liveData.ST20 + " %VOL"}}</div>
                </div>
              </el-col>
              <el-col>
                <div class="live-block"><span style="height:30%;line-height: 20px;">土壤温度计</span>
                  <div style="height:70%;font-size: 25px;text-align: center;vertical-align: middle">{{liveData.ST24 + " ℃"}}</div>
                </div>
              </el-col>
            </el-row>

            <el-row type="flex" justify="space-around">
              <el-col>
                <div class="live-block"><span style="height:30%;line-height: 20px;">土壤张力30公分</span>
                  <div style="height:70%;font-size: 25px;text-align: center;vertical-align: middle">{{liveData.ST1530 + " CBAR"}}
                  </div>
                </div>
              </el-col>
              <el-col>
                <div class="live-block"><span style="height:30%;line-height: 20px;">土壤张力60公分</span>
                  <div style="height:70%;font-size: 25px;text-align: center;vertical-align: middle">{{liveData.ST1560+ " CBAR"}}
                  </div>
                </div>
              </el-col>
              <el-col>
                <div class="live-block"><span style="height:30%;line-height: 20px;">土壤张力90公分</span>
                  <div style="height:70%;font-size: 25px;text-align: center;vertical-align: middle">{{liveData.ST1590+ " CBAR"}}
                  </div>
                </div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>

      </el-col>
    </el-row>



  </div>
</template>

<script>
  import MapPanel from '../../Core/MapPanel'
  import VePie from 'v-charts/lib/pie.common'
  import echarts from 'echarts'
  import {mapState} from "vuex";

  export default {
    name: "LotLive",
    components: {
      MapPanel,
      VePie
    },
    data() {
      return {
        locIDList: [],
        sensorLocList: [],
        sensorIDList: [],
        sensorNameList: [],
        liveData: {
          'ST1530': 0.0,
          'ST1560': 0.0,
          'ST1590': 0.0,
          'ST0E': 0.0,
          'ST20': 0.0,
          'ST24': 0.0
        },
        activeName: 'ST15',
        LotID: 6,
        LotList: [],
        // 按传感器类型划分，列表中的每一个对象为echart中对应的值
        sensorGbyType: {
          'ST15': [],
          'ST20': [],
          'ST24': [],
          'ST0E': []
        },
        hour: '',

      }
    },
    mounted() {
      this.loadLotData();
      this.loadSensorLotData();
      //this.loadSoilEntropyInfo();
      // 定时获取传感器参数
      if (this.timer) {
        clearInterval(this.timer);
      } else {
        this.timer = setInterval(() => {
          this.getSensorLiveData();
        }, 29 * 60 * 1000)
      }// 29分钟发送一次：29 * 60 * 1000
    },
    computed: {
      ...mapState({
        lotPathList: state => state.lot.allLotLocList
      }),
    },
    watch: {
      'LotID': {
        handler(newVal, oldVal) {
          console.error(newVal + ' ' + oldVal)
          if (newVal !== oldVal) {
            this.clearSensorGbyType();
            this.loadLotData();
            this.loadSensorLotData();
            //this.loadSoilEntropyInfo();

            // 定时获取传感器参数
            if (this.timer) {
              clearInterval(this.timer);
              this.timer = setInterval(() => {
                this.getSensorLiveData();
              }, 29 * 60 * 1000)
            } else {
              this.timer = setInterval(() => {
                this.getSensorLiveData();
              }, 29 * 60 * 1000)
            }// 29分钟发送一次：29 * 60 * 1000
          }
        }
      }
    },
    methods: {
      loadSensorLotData: function () {
        let param = {LotID: this.LotID};
        this.$api.sensor.findSensorByLotID(param).then((res) => {

          if(res.data !== undefined){
            this.sensorLocList = res.data.SensorList;
            //转换坐标
            // var i;
            // for( i=0;i<this.sensorLocList.length;i++){
            //   this.sensorLocList[i].locPoint.lat += 0.0058716465
            //   this.sensorLocList[i].locPoint.lng += 0.006510953
            // }

            this.sensorNameList = []
            for (let i = 0; i < this.sensorLocList.length; i++) {
              this.sensorIDList.push(this.sensorLocList[i].id);
              if (this.sensorLocList[i].sensorType === '15') {
                this.sensorNameList.push(this.sensorLocList[i].sensorName + this.sensorLocList[i].subType)
              } else {
                this.sensorNameList.push(this.sensorLocList[i].sensorName)
              }
            }
          }
          else {
            this.sensorNameList = []
            this.sensorLocList = []
          }
          console.log(this.sensorNameList)

          this.initSensorGbyType(this.sensorLocList);
          this.loadSensorTData();
          console.log('初始化echart折线图')
        }).catch(function (res) {
        });
      },
      loadLotData() {
        let param = {LotID: this.LotID};
        this.$api.lot.findLotLocByID(param).then((res) => {
          this.locIDList = [];
          this.locIDList.push(res.data);

          //坐标转化
          // var i,j;
          // for( i=0;i<this.locIDList.length;i++){
          //   var point_length = this.locIDList[i].locList.length;
          //   for( j=0;j<point_length;j++){
          //     this.locIDList[i].locList[j].lat += 0.0032716465
          //     this.locIDList[i].locList[j].lng += 0.010110953
          //   }
          // }

        }).catch(function (res) {
        });
      },
      loadSoilEntropyInfo() {
        let param = {LotID: this.LotID};
        this.$api.lot.findSoilEntropyByLotID(param).then((res) => {
          let tempSoilEntropyInfo = res.data.soilEntropyInfo
          //替换土壤墒情json数据的键
          let soilEntropyInfo = tempSoilEntropyInfo.map(function (item) {
            return {
              name: item.elemName,
              value: item.elemValue
            }
          });

          //获得legenddata
          let legendTempList = [];
          for (let i in tempSoilEntropyInfo) {
            legendTempList.push(tempSoilEntropyInfo[i]['elemName']);
          }
          this.drawSoilPie(legendTempList, soilEntropyInfo);
        }).catch(function (res) {
        })
      },
      initSensorGbyType(sensorList) {
        this.sensorIDList = new Array()
        for (let i = 0; i < sensorList.length; i++) {
          this.sensorIDList.push(sensorList[i].id);
          var sensorType = 'ST' + sensorList[i].sensorType;
          if (!this.sensorGbyType.hasOwnProperty(sensorType)) {
            eval('sensorGbyType.' + sensorType + '=[]');
          }
          let obj = {};
          obj.id = sensorList[i].id;
          //obj.name = sensorList[i].sensorName;
          obj.name = this.sensorNameList[i];
          obj.type = 'line';
          obj.data = [];
          this.sensorGbyType[sensorType].push(obj)
        }
      },
      // 转换数据今天 00:00:00 - 至目前为止的数据
      loadSensorTData() {
        if (this.sensorIDList !== null && this.sensorIDList.length > 0) {
          let param = {sensorID: this.sensorIDList, needTodayData: true};
          this.$api.sensor.getSensorLive(param).then((res) => {
            this.dataFormatEchart(res.data);
            // console.log(this.sensorGbyType)
            this.drawST15Line()
            this.drawST20Line()
            this.drawST24Line()
            this.drawST0ELine()
          }).catch(function (res) {
          });
        }
      },
      // 获取传感器的实时数据
      getSensorLiveData() {
        console.log("[][] "+this.sensorIDList)
        let param = {sensorID: this.sensorIDList, needTodayData: false};
        this.$api.sensor.getSensorLive(param).then((res) => {
          if (res.code === 200) {
            // 转换数据
            this.dataFormatEchart(res.data);
            // 更新实时折线图显示
            this.drawST15Line()
            this.drawST20Line()
            this.drawST24Line()
            this.drawST0ELine()
          } else {
            this.$notify.error({
              title: '错误',
              message: '获取地块数据失败'
            })
          }
        }).catch(function (res) {
          // console.log(res)
        })
      },
      clearSensorGbyType(){
        this.sensorGbyType.ST15 = []
        this.sensorGbyType.ST20 = []
        this.sensorGbyType.ST24 = []
        this.sensorGbyType.ST0E = []
      },

      // 处理数据为echart模式
      dataFormatEchart(data) {

        var myDate = new Date()
        for (let i = 0; i < data.length; i++) {
          let sensorType = 'ST' + data[i].sensorType;
          let subType = (data[i].subType !== '0') ? sensorType + data[i].subType : sensorType
          let id = data[i].id;
          if (!this.sensorGbyType.hasOwnProperty(sensorType)) {
            this.$notify.error({title: '错误', message: '传输数据有误，请检查对应传感器'});
            break;
          } else {
            let list = this.sensorGbyType[sensorType];
            for (let j = 0; j < list.length; j++) {
              if (list[j].id === id) {
                let liveData = data[i].sensorData;
                if (liveData.length < 1) {
                  this.$notify.error({title: '错误', message: '传感器' + list[j].name + '数据缺失'});
                  break;
                } else {
                  // 为测试
                  //let obj = {}
                  //let time = myDate.toLocaleDateString() + " " + myDate.toLocaleTimeString('chinese', {hour12: false});
                  //let value = liveData[0].value + Math.round((Math.random() * 10) * 100) / 100;
                  //obj.name = time;
                  //obj.value = [time, value];
                  //this.sensorGbyType[sensorType][j].data.push(obj);
                  // end

                  // 实际项目用
                   for (let k = 0; k < liveData.length; k++) {
                     let obj = {};
                     obj.name = liveData[k].time;
                     obj.value = [liveData[k].time, liveData[k].value];
                     this.sensorGbyType[sensorType][j].data.push(obj);
                   }

                  let last = liveData.length - 1
                  // 设置折线窗口起始值和终止值
                  let hour = liveData[last].time.split(":").shift();
                  if (hour !== this.hour) this.hour = hour;

                  // 截取小数点后两位num.toFixed(2)
                  console.log(liveData[last].value)
                  liveData[last].value = this.toFixed(liveData[last].value,2)
                  console.log(liveData[last].value)
                    switch (subType) {
                    case 'ST1530':
                       this.liveData.ST1530 = liveData[last].value;
                      //this.liveData.ST1530 = value;// 测试
                      break;
                    case 'ST1560':
                       this.liveData.ST1560 = liveData[last].value;
                      //this.liveData.ST1560 = value;// 测试

                      break;
                    case 'ST1590':
                       this.liveData.ST1590 = liveData[last].value;
                      //this.liveData.ST1590 = value;// 测试

                      break;
                    case 'ST20':
                       this.liveData.ST20 = liveData[last].value;
                      //this.liveData.ST20 = value;// 测试


                      break;
                    case 'ST24':
                       this.liveData.ST24 = liveData[last].value;
                      //this.liveData.ST24 = value; // 测试

                      break;
                    case 'ST0E':
                      this.liveData.ST0E = liveData[last].value;
                      console.log(liveData)
                      //this.liveData.ST0E = value;

                      break;
                  }
                }
              }
            }
          }
        }
      },
      drawST15Line() {

        if (this.sensorGbyType.ST15.length <= 0){
          console.log("张力数据为空")
          return;
        }

        let myChart15 = echarts.init(document.getElementById('ST15'));
        let option = {
          tooltip: {
            trigger: 'axis',
            //axisPointer: {animation: false}
          },
          legend: {
            data: this.sensorNameList
          },
          dataZoom: [{
            type: 'inside', xAxisIndex: [0], filterMode: 'empty'
          }, {
            type: 'slider', xAxisIndex: [0], filterMode: 'empty'
          }
          ],
          xAxis: {
            type: 'time',
            splitLine: {show: false}
          },
          yAxis: {
            type: 'value',
            name: "cBar",
            boundaryGap: [0, '100%'],
            splitLine: {show: false},
            axisLabel: {formatter: '{value}'}
          },
          series: this.sensorGbyType.ST15
        };
        if (myChart15.getOption() !== undefined) {
          myChart15.setOption({
            legend: {data:this.sensorNameList},
            series: this.sensorGbyType.ST15
          })
        } else {
          myChart15.setOption(option);
        }
      },
      drawST20Line() {
        if (this.sensorGbyType.ST20.length <= 0 ){
          console.log("电容湿度数据为空")
          return;
        }

        let myChart20 = echarts.init(document.getElementById('ST20'));
        let option20 = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {animation: false}
          },
          legend: {
            data: this.sensorNameList
          },
          dataZoom: [{
            type: 'inside', xAxisIndex: [0], filterMode: 'empty'
          }, {
            type: 'slider', xAxisIndex: [0], filterMode: 'empty'
          }], xAxis: {
            type: 'time',
            splitLine: {show: false}
          },
          yAxis: {
            type: 'value',
            name: "%vol/土壤容积含水量",
            boundaryGap: [0, '100%'],
            splitLine: {show: false},
            axisLabel: {formatter: '{value}'}
          },
          series: this.sensorGbyType.ST20
        };

        if (myChart20.getOption() !== undefined) {
          myChart20.setOption({
            legend: {data:this.sensorNameList},
            series: this.sensorGbyType.ST20
          })
        } else {
          myChart20.setOption(option20);
        }
      },
      drawST0ELine() {

        if (this.sensorGbyType.ST0E.length <= 0 ){
          console.log("845湿度数据为空")
          return;
        }

        let myChart0E = echarts.init(document.getElementById('ST0E'));
        let option0E = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {animation: false}
          },
          legend: {
            data: this.sensorNameList
          },
          dataZoom: [{
            type: 'inside', xAxisIndex: [0], filterMode: 'empty'
          }, {
            type: 'slider', xAxisIndex: [0], filterMode: 'empty'
          }], xAxis: {
            type: 'time',
            splitLine: {show: false}
          },
          yAxis: {
            type: 'value',
            name: "%vol/土壤容积含水量",
            boundaryGap: [0, '100%'],
            splitLine: {show: false},
            axisLabel: {formatter: '{value}'}
          },
          series: this.sensorGbyType.ST0E
        };

        if (myChart0E.getOption() !== undefined) {
          myChart0E.setOption({
            legend: {data:this.sensorNameList},
            series: this.sensorGbyType.ST0E
          })
        } else {
          myChart0E.setOption(option0E);
        }
      },
      drawST24Line() {


        if (this.sensorGbyType.ST24.length <= 0){
          // console.log("温度数据为空")
          return;
        }
        // console.log("绘制温度曲线")
        let myChart24 = echarts.init(document.getElementById('ST24'));
        let option24 = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {animation: false}
          },
          legend: {
            data: this.sensorNameList
          },
          dataZoom: [{
            type: 'inside', xAxisIndex: [0], filterMode: 'empty'
          }, {
            type: 'slider', xAxisIndex: [0], filterMode: 'empty'
          }], xAxis: {
            type: 'time',
            splitLine: {show: false}
          },
          yAxis: {
            type: 'value',
            name: "℃/摄氏度",
            splitLine: {show: false},
            axisLabel: {formatter: '{value}'}
          },
          series: this.sensorGbyType.ST24
        };

        if (myChart24.getOption() !== undefined) {
          myChart24.setOption({
            legend: {data:this.sensorNameList},
            series: this.sensorGbyType.ST24
          })
        } else {
          myChart24.setOption(option24);
        }
      },
      drawSoilPie(legendData, seriesData) {

        var myChartSoil = echarts.init(document.getElementById('soil'));
        let option = {
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          legend: {
            type: 'scroll',
            data: legendData//this.soilEntropy.legenddata
          },
          series: [
            {
              name: '土地墒情1',
              type: 'pie',
              radius: '40%',
              center: ['25%', '50%'],
              data: seriesData, //this.soilEntropy.soilEntropyInfo,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            },
            {
              name: '土地墒情2',
              type: 'pie',
              radius: '40%',
              center: ['75%', '50%'],
              data: seriesData, //this.soilEntropy.soilEntropyInfo,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        };
        myChartSoil.setOption(option);

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
      toFixed:function (str,xlen){
        //var a = str +"";
        //return a.substring(0,str.indexOf(".") + xlen);
        return str.toFixed(xlen)
      }
    },
    destroyed() {
      clearInterval(this.timer);
    }


  }
</script>

<style lang="scss" scoped>
  .dashboard-contain {
    width: 800px;
    height: 380px;
    vertical-align: middle;
    text-align: center;
    margin: 0;
  }

  .sensor_tabs {
    top: 60px;
    right: 50px;
    padding-left: 0px;
    padding-right: 2px;
    z-index: 1020;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    background: rgb(255, 253, 255);
    border-color: rgba(200, 206, 206, 0.5);
    // border-left-width: 1px;
    // border-left-style: solid;
    border-bottom-width: 1px;
    border-bottom-style: solid;
  }

  .soil-contain {
    width: 590px;
    height: 300px;
    vertical-align: middle;
    text-align: center;
    margin: 0;
  }

  .map-contain {
    width: auto;
    height: auto;
    vertical-align: middle;
  }

  .live-block {
    width: 80%;
    height: 100px;
    background-color: #F0F0F0;
    vertical-align: middle;
    padding: 10px;
    margin: 20px;
    padding-top: 30px;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    font-size: 15px;
  }
</style>
