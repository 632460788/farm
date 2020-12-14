<template>
  <div id="root" style="width:100%;height: 100%">
    <el-calendar
      style="width:100%;height: 100%;  font-size: 32px; color: #fff;background-color: #282b2f">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
          <div class="calendar-cell" :key="data.day">
            <div v-if="typeof(calendar[data.day]) !== 'undefined'">
              <div v-show="calendar[data.day][0]" style="width:40%" class="el-icon-eleme"></div>
              <div v-show="calendar[data.day][1]" style="width:40%" class="el-icon-eleme"></div>
            </div>
            <div style="justify-content: center; font-size: 32px; color: #fff">
              {{data.day.split("-")[2]}}
            </div>
            <div v-if="typeof(calendar[data.day]) !== 'undefined'">
              <div v-show="calendar[data.day][2]" style="width:40%" class="el-icon-eleme"></div>
              <div v-show="calendar[data.day][3]" style="width:40%;" class="el-icon-eleme"></div>
            </div>
          </div>
      </template>
    </el-calendar>
  </div>
</template>
<script>
  export default{
    name: "MaintenanceCalendar",
    props:{
      calendar:{
        type: Object,
        default: function(){
          // key : 日期, value: 四项养护作业是否完成, 依次为 左上，右上，右下，左下
          return{

            "2020-12-14":[true, true, false, true]
          }
        }
      }
    },
    data: function(){
      return {
        firstDay: 7
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
<style>
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
</style>
