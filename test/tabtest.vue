<template>
  <div style="margin-top:10px;">
    <el-tabs type="card" @tab-click="handleClick">
      <el-tab-pane label="基本信息" ></el-tab-pane>
      <el-tab-pane label="水量查询" ></el-tab-pane>
      <el-tab-pane label="异常记录"></el-tab-pane>
    </el-tabs>
    <div v-if="tabType == 0">
      <div class="leftdatalis">
        <ul class="detalis">
          <li><span>水表序列号：</span><strong>{{allDatas.uuid}}</strong></li>
          <li class="threeName">
            <span>房源名称：</span><strong>{{allDatas.homeName}}</strong>
            <span>楼层：</span><strong>{{allDatas.floorName}}</strong>
            <span>房间号：</span><strong>{{allDatas.roomName}}</strong>
          </li>
          <li>
            <span>产品类型：</span>
            <strong v-if="allDatas.meterType == 1">光电直读湿式冷水表</strong>
            <strong v-if="allDatas.meterType == 2">光电直读干式热水表</strong>
          </li>
          <li><span>绑定时间：</span><strong>{{allDatas.createdAt}}</strong></li>
          <li><span>更新时间：</span><strong>{{allDatas.meterUpdatedAt}}</strong></li>
          <li>
            <span>水表读数：</span>
            <strong class="lastAmount">{{allDatas.lastAmount}}</strong>
            <el-button type="primary" @click="getWaterDetails(0)">刷新</el-button>
          </li>
          <li><span>当月累计水表量：</span><strong style="color:red">{{allDatas.meterAmount}}</strong></li>
          <li>
            <span>通讯状态：</span>
            <strong v-if="allDatas.onoffStatus == 1" styFle="color:green">在线</strong>
            <strong v-if="allDatas.onoffStatus == 2" style="color:gray">离线</strong>
          </li>
          <li><span>绑定网关：</span><strong>{{allDatas.gatewayUuid}}</strong></li>
        </ul>
      </div>
    </div>
    <div v-if="tabType == 1">
      <div class="block">
        <span class="demonstration">选择日期：</span>
        <el-date-picker
          v-model="value7"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2">
        </el-date-picker>
        <el-button type="primary" @click='submit'>查询</el-button>
      </div>
      <div class="table">
        <el-button class='export' type="primary" @click="recordsClick">导出到表格</el-button>
        <el-table
          :data="ExportDatas"
          border
          style="width: 100%; height:50%">
          <el-table-column
            prop="smartWatermeterId"
            label="水表序列号">
          </el-table-column>
          <el-table-column
            prop="createdAt"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="deviceAmount"
            label="水表读数(吨)">
          </el-table-column>
          <el-table-column
            prop="dayAmount"
            label="增量读数(吨)">
          </el-table-column>
        </el-table>
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page.pageNumber"
          :page-size="page.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="page.total">
        </el-pagination>
      </div>
    </div>
    <div v-if="tabType == 2">
      <el-table
        :data="exceptionDatas"
        border
        style="width: 100%; height:50%">
        <el-table-column
          prop="apartmentName"
          label="时间">
        </el-table-column>
        <el-table-column
          prop="onoffStatus"
          label="通讯状态">
          <template scope="scope">
            <span v-if="scope.row.exceptionType== 7" style="color:red;">水表设备离线</span>
            <span v-if="scope.row.exceptionType== 8" style="color:green;">水表设备在线</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="page.pageNumber"
        :page-size="page.pageSize"
        layout="total, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
  </div>

</template>
<script>
  import { runEnv } from './../../config/environment'//url
  export default {
    data() {
      return {
        value7: '',
        formVal:{},
        tabType: 0,
        ExportDatas:[],//tab1数据
        allDatas:[],//tab0数据
        exceptionDatas:[],//tab2

        page: {
          pageNumber: 1,
          total: 0,
          pageSize: 10
        },
      };
    },
    methods: {
      handleClick(tab, e) {//点击选项卡
        this.tabType = tab.index;
        var _val = tab.index;//
        this.getWaterDetails(_val);
      },
      getWaterDetails(val){//tab0
        if(val == 0){
          var _url = 'dizhi 1';
          this.datas.dataRequestBodyVO.dt = {
            type:this.$route.query.type,
            uuid:this.$route.query.id,
          }
        }
        if(val==1){//tab1
          var _url = 'dizhi2/filter';
          this.datas.dataRequestBodyVO.dt = {
            watermeterRecordManagerVO:{
              smartWatermeterId:this.$route.query.watermeterId,
              startTime:this.formVal.startTime,
              endTime:this.formVal.endTime,
              page:this.page.pageNumber,
              rows:this.page.pageSize
            }
          }
        }
        if(val == 2){
          var _url = 'dizhi3watermeter';
          this.datas.dataRequestBodyVO.dt = {
            exceptionVO:{
              daviceId:this.$route.query.watermeterId,//传参id
              page:this.page.pageNumber,
              rows:this.page.pageSize
            }
          }
        };
// console.log(_url)
        $.ajax({
          headers: {
            "Content-Type": "application/json"
          },
          method: "post",
          url: runEnv.api_url+_url,
          dataType: "json",
          data: JSON.stringify(this.datas)//参数数据从Gatewaytable中取的
        }).then(res => {
          console.log(res);
          if(val==0){
            this.allDatas = res.dataResponseBodyVO.dt.watermeterManagerDetailVO;
          }
          if(val==1){
            this.ExportDatas = res.dataResponseBodyVO.dt.watermeterRecordManagerVOList.list;
            this.page.total = res.dataResponseBodyVO.dt.watermeterRecordManagerVOList.total;
          }
          if(val==2){//异常记录
            this.exceptionDatas = res.dataResponseBodyVO.dt.exceptionVOS.list;
            this.page.total = res.dataResponseBodyVO.dt.exceptionVOS.total;
          }
        });
      },

      formatDate(time){
        var tmpDate =new Date(time);
        return tmpDate.getFullYear() + "-" + String(tmpDate.getMonth() + 1) + "-" + String(tmpDate.getDate());
      },

    created(){
      this.getWaterDetails(0);
    }
  };
</script>
