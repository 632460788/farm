<template>
  <div id="root" style="width:100%;height: 100%">
    <el-calendar style="width:100%;height: 100%">
      <template
        slot="dateCell"
        slot-scope="{date, data}">
          <div class="calendar-cell" :key="data.day">
            <div >
              <div class="el-icon-eleme"></div>
              <div class="el-icon-eleme"></div>
            </div>
            <div style="justify-content: center">{{data.day.split("-")[2]}}</div>
            <div>
              <div class="el-icon-eleme"></div>
              <div class="el-icon-eleme"></div>
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

            "2020-12-14":[true, true, true, true]
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
  .calendar-cell > {
    width:100%;
    height:100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding: 0;
  }
</style>
