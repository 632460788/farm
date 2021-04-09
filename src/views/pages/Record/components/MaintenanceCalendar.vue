<template>
  <div id="root" style="width:100%;height: 100%">
    <el-calendar
      style="width:100%;height: 100%; font-size: 32px; color: #fff;background-color: #282b2f" >
      <template
        slot="dateCell"
        slot-scope="{date, data}">
          <div class="calendar-cell"  :key="data.day">
            <div v-if="currentMonthDay.indexOf(data.day) !== -1" style="justify-content: center;font-size: 32px;  color: #fff">
              {{data.day.split("-")[2]}}
            </div>
            <div v-else style="justify-content: center;font-size: 32px; color: #616161">
              {{data.day.split("-")[2]}}
            </div>
            <div v-if="typeof(calendar[data.day]) !== 'undefined'">
              <div v-show="calendar[data.day][0]" style="width:40%" ><img src="../../../../assets/weeding.jpg" alt=""></div>
              <div v-show="calendar[data.day][1]" style="width:40%" ><img src="../../../../assets/laying.jpg" alt=""></div>
              <div v-show="calendar[data.day][2]" style="width:40%" ><img src="../../../../assets/cut.jpg" alt=""></div>
            </div>

<!--            <div v-if="typeof(calendar[data.day]) !== 'undefined'">-->
<!--              -->
<!--              <div v-show="calendar[data.day][3]" style="width:40%;" class="el-icon-bottom-left"></div>-->
<!--            </div>-->
          </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
  import echarts from "echarts"
  export default{
    name: "MaintenanceCalendar",
    props:{
      lotID:String
      // calendar:{
      //   type: Object,
      //   default: function(){
      //     // key : 日期, value: 四项养护作业是否完成, 依次为 左上，右上，右下，左下
      //     return{
      //       // "2020-12-14":[true,true, true]
      //       ...this.pieDatas['1']
      //   }
      //   }
      // }
    },
    data: function(){
      return {
        firstDay: 7,
        pieDatas: {},
        // lotID:6,
        calendar:{
        },
        currentMonthDay:[],
        startDate:"",
        endDate:""
      }
    },

    mounted() {
      // setInterval(this.changeLotID,1000)
      // if (this.timer) {
      //   clearInterval(this.timer);
      // } else {
      // }
    },
    destroyed(){
      // clearInterval(this.timer);

    },
    async created(){
      await this.getData()
      if(this.pieDatas[this.lotID] !== undefined){
        this.calendar = this.pieDatas[this.lotID]
      }
      else this.calendar = {}
      this.getNowMonthDays()
      // this.timer = setInterval(this.changeLotID,1000)
    },
    methods:{

      getNowMonthDays() {
        let now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        var d = new Date(year, month, 0);

        let current_month_num = d.getDate()
        for (let i = 1; i <= current_month_num; i++) {
          var day = new Date(year, month -1, i);
          let everyDay = echarts.format.formatTime('yyyy-MM-dd', day.getTime());

          this.currentMonthDay.push(everyDay);
        }
    }
      ,
      getMonthRange(){
        var now = new Date(); //当前日期
        var nowMonth = now.getMonth(); //当前月
        var nowYear = now.getFullYear(); //当前年
        //本月的开始时间
        var monthStartDate = new Date(nowYear, nowMonth, 1);
        this.startDate = echarts.format.formatTime('yyyy-MM-dd', monthStartDate.getTime())
        //本月的结束时间
        var monthEndDate = new Date(nowYear, nowMonth+1, 0);
        this.endDate = echarts.format.formatTime('yyyy-MM-dd', monthEndDate.getTime())

      },
      changeLotID(){
        // this.lotID = (this.lotID % 33) + 1
        if(this.pieDatas[this.lotID] !== undefined){
         this.calendar = this.pieDatas[this.lotID]
        }
        else this.calendar = {}
      },
      async getData() {
        await  this.$api.dailyjobs.findPage(null).then((res) => {
          res.data.content = res.data;
          let tempPageResult = res.data
          for (let i = 0; i < tempPageResult.length; i++) {
            var tempTime = new Date(tempPageResult[i].datetime1).getTime()
            var time = echarts.format.formatTime('yyyy-MM-dd', tempTime)
            var LotID = tempPageResult[i]["regionId"]
            let jobs = tempPageResult[i]["jobs"]
            if(this.pieDatas[LotID] === undefined){
              this.pieDatas[LotID] = {}
              this.pieDatas[LotID][time] = [false,false,false]

            }
            else if(this.pieDatas[LotID][time] === undefined){
              this.pieDatas[LotID][time] = [false,false,false]
            }
            switch (jobs) {
              case "除草":
                this.pieDatas[LotID][time][0] = true
                break
              case "铺地膜":
                this.pieDatas[LotID][time][1] = true
                break
              case "修枝":
                this.pieDatas[LotID][time][2] = true
                break
              default:break
            }

          }
        })
        // alert(JSON.stringify(this.pieDatas[1]["2019-07-01"]))
        // alert(typeof this.pieDatas[1]["2019-07-01"].toArray())

      },

    },
    watch: {
      'lotID': {
        handler(newVal, oldVal) {
          if (newVal !== oldVal) {
            //
            this.changeLotID()
          }
        }
      }
    }
  }
</script>
<style scoped>
  .calendar-cell > div{
    width: 100%;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .calendar-cell {
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0;
  }

</style>
<style >
.el-calendar__button-group{
      display: none;
}
.el-calendar__title{
  font-size: 32px;
  color: #ffffff;
}
.is-selected{
  background-color: #282b2f
}
.el-calendar-table td.is-selected {
  background-color: inherit !important;
}


.el-calendar-table .el-calendar-day:hover {
  background-color: inherit !important;
}
.el-calendar-table thead th{
    color: #ffffff;
    font-size: 32px;
}
</style>
