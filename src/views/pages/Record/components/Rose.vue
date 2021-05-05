<template>
  <div id="root" style="height: 100%;width:100%;">

    <div class="screenBlock" style="display:flex;flex-direction:row;width:100%;margin-left: 20px">
      <!-- 气象表 -->
      <div style="height:100%; width: 100%;display:flex;flex-direction:column; justify-content: space-around">
        <div class="label" style="width:100%;height:15%;font-size:50px" >土壤张力</div>
        <div style="height:85%; display:flex; flex-direction:column; justify-content: center">
          <div style="height:100%; width:100%;display:flex;justify-content:start;flex-direction:row">
            <!-- 土壤湿度1 -->
            <div style="width:50%;font-size:60px"><img src="../../../../assets/icon/pressure.png" alt=""> {{liveData.ST1530}} <span style="font-size:60px;display: block">CBAR</span></div>
            <!-- 土壤湿度2 -->
            <div style="width:50%;font-size:60px"><img src="../../../../assets/icon/pressure.png" alt=""> {{liveData.ST1560}} <span style="font-size:60px;display: block">CBAR</span></div>
            <div style="width:50%;font-size:60px"><img src="../../../../assets/icon/pressure.png" alt=""> {{liveData.ST1590}} <span style="font-size:60px;display: block">CBAR</span></div>

          </div>
        </div>


      </div>
    </div>



  </div>
</template>
<style>
</style>

<script>
  import echarts from "echarts"
  export default{
    name: "Rose",
    props:{
      LotID:String
    },
    data: function(){
      return{
        chart: {},
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
        // LotID: 4,
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
    mounted: function(){

      this.drawChart()

    },
    async created(){
      await this.loadSensorLotData()
      window.addEventListener("resize", ()=>{
        this.$nextTick(
          ()=>{
            this.chart.resize()
          }
        )
      })
    },

    methods:{

      clearSensorGbyType(){
        this.sensorGbyType.ST15 = []
        this.sensorGbyType.ST20 = []
        this.sensorGbyType.ST24 = []
        this.sensorGbyType.ST0E = []
      },
      async changeLotID() {
        this.clearSensorGbyType();
        await this.loadSensorLotData();

      },
      loadSensorLotData: async function () {
        let param = {LotID: this.LotID};
        await this.$api.sensor.findSensorByLotID(param).then(async (res) => {
          if (res.data !== undefined) {
            this.sensorLocList = res.data.SensorList;

            this.sensorNameList = []
            for (let i = 0; i < this.sensorLocList.length; i++) {
              if (this.sensorLocList[i].sensorType === '15') {
                this.sensorNameList.push(this.sensorLocList[i].sensorName + this.sensorLocList[i].subType)
                this.sensorIDList.push(this.sensorLocList[i].id);
              }
              // else {
              //   this.sensorNameList.push(this.sensorLocList[i].sensorName)
              // }
            }
          } else {
            this.sensorNameList = []
            this.sensorLocList = []
          }

          this.initSensorGbyType(this.sensorLocList);
          await this.loadSensorTData();
          // console.log('初始化echart折线图')
        }).catch(function (res) {
        });
      },
      async loadSensorTData() {
        if (this.sensorIDList !== null && this.sensorIDList.length > 0) {
          let param = {sensorID: this.sensorIDList, needTodayData: false};
          await this.$api.sensor.getSensorLive(param).then((res) => {
            this.dataFormatEchart(res.data);
          }).catch(function (res) {
          });
        }
      },
      initSensorGbyType(sensorList) {
        this.sensorIDList = []
        for (let i = 0; i < sensorList.length; i++) {
          this.sensorIDList.push(sensorList[i].id);
          var sensorType = 'ST' + sensorList[i].sensorType;

          if (!this.sensorGbyType.hasOwnProperty(sensorType)) {
            eval('sensorGbyType.' + sensorType + '=[]');
          }
          let obj = {};
          obj.id = sensorList[i].id;
          obj.name = this.sensorNameList[i];
          obj.type = 'line';
          obj.data = [];
          this.sensorGbyType[sensorType].push(obj)
        }
      },
      dataFormatEchart(data) {

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
                  liveData[last].value = this.toFixed(liveData[last].value,2)
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
      toFixed:function (str,xlen){
        return str.toFixed(xlen)
      }

    }
  }
</script>
