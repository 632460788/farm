<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size" :rules="queryFormRules" ref="filters">

        <el-form-item label="地块" prop="role" :span="15">
          <el-select v-model="filters.LotID"    placeholder="选择地块"  :clearable=true :span="15">
            <el-option v-for="item in getLotList(lotPathList)" :key="item.lotID" :label="item.lotName"
                       :value="item.lotID" :span="15"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="起始日期">
          <el-col :span="15">
            <el-date-picker type="date" placeholder="选择日期" auto-complete="off" v-model="filters.start" style="width: 100%;"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="结束日期">
          <el-col :span="15">
            <el-date-picker type="date" placeholder="选择日期" auto-complete="off" v-model="filters.end" style="width: 100%;"></el-date-picker>
          </el-col>

        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" label="查找" type="primary" @click="findPageByDate"/>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-plus" label="添加" type="primary" @click="handleAdd"/>
        </el-form-item>
      </el-form>
    </div>
    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">
      <el-form :inline="true" :size="size">
        <el-form-item>
          <el-button-group>
            <el-tooltip content="刷新" placement="top">
              <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>
            </el-tooltip>
            <el-tooltip content="列显示" placement="top">
              <el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>
            </el-tooltip>
          </el-button-group>
        </el-form-item>
      </el-form>
      <!--表格显示列界面-->
      <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"
                                  @handleFilterColumns="handleFilterColumns">
      </table-column-filter-dialog>
    </div>
    <!--表格内容栏-->
    <kt-table :data="pageResult" :columns="filterColumns"
              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">
    </kt-table>

    <!--新增编辑界面-->
    <!--     TODO 可优化新增编辑界面-->
    <el-dialog :title="operation?'新增浇灌记录':'编   辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="120px" :rules="dataFormRules" ref="dataForm" :size="size"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="!operation">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="浇灌水量(吨)" prop="stere">
          <el-input v-model="dataForm.stere" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="浇灌时长(小时)" prop="duration">
          <el-input v-model="dataForm.duration" auto-complete="off" ></el-input>
        </el-form-item>

        <el-form-item label="地块" prop="LotID" style="width: 100%;">
          <el-select v-model="dataForm.LotID"    multiple  placeholder="选择地块"   style="width: 100%;">
            <el-option v-for="item in getLotList(lotPathList)" :key="item.lotID" :label="item.lotName"
                       :value="item.lotID" ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="浇灌时间" prop="time">
          <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.datetime1" :clearable=false style="width: 100%;"></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="dataForm.datetime2" :clearable=false style="width: 100%;"></el-time-picker>
          </el-col>
        </el-form-item>


        <el-form-item label="操作人员" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="备    注" prop="note">
          <el-input type="textarea" v-model="dataForm.note" auto-complete="off"></el-input>
        </el-form-item>


      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :size="size" @click.native="dialogVisible = false">取消</el-button>
        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import KtTable from "@/views/Core/KtTable"
  import KtButton from "@/views/Core/KtButton"
  import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog"
  import {mapState} from "vuex";
  import LotLive from "../Live/LotLive.vue";

  export default {
    name: "IrrigMng",
    components: {
      KtTable,
      KtButton,
      TableColumnFilterDialog,
      LotLive
    },
    data() {
      return {
        size: 'small',
        filters: {
          start: '',
          end:'',
          LotID:''
        },
        lotMap:{},
        columns: [],
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 10},
        pageResult: {},

        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        dataFormRules: {
          //
          stere: [
            // {required: true, message: '请输入浇灌水量' , trigger: 'blur'},
            {
              pattern: /^(-?\d+)(\.\d+)?$/,  //正则
              message: '请验证输入格式'
            }
          ],
          duration: [
            {required: true, message: '请输入浇灌时长', trigger: 'blur'},
            {
              pattern: /^(-?\d+)(\.\d+)?$/,  //正则
              message: '请验证输入格式',
              trigger: 'blur'
            }

          ],
          // time: [
          //   {required: true, message: '请输入浇灌时间'}
          // ],
          LotID: [
            {required: true, message: '请输入地块', trigger: 'blur'}
          ],
          note: [
            {required: true, message: '请输入浇灌时间', trigger: 'blur'}

          ],
          name: [
            {required: true, message: '请输入操作人员', trigger: 'blur'}
          ],
        },
        queryFormRules: {
          start: [
            {required: true, message: '请选择查询起始日期', trigger: 'blur'}
          ],
          end: [
            {required: true, message: '请选择查询结束日期', trigger: 'blur'}
          ]
        },
        // 新增编辑界面数据
        dataForm: {
          datetime1: '',
          datetime2: '',
          lotID: [],
          LotName:'',
          stere: '',
          duration:'',
          note: '备注',
          name: ''
        },
        jobs: ["除草", "铺地膜", "修枝"],
        nameList: [],
        LotID: 6,
        LotList: [],
      }
    },
    methods: {
      // 获取分页数据
      isNULL: function(obj){
        if (!obj && typeof(obj)!="undefined" && obj!=0){
          return true
        }
        else
          return false

      },
      findPageByDate: function(){


        if ((this.filters.LotID === '' || this.isNULL(this.filters.LotID)) && (this.filters.start === '' || this.isNULL(this.filters.start)) && (this.filters.end === '' || this.isNULL(this.filters.end))){
          this.$message({message: '请设置查询条件 ', type: 'error'})
        }
        else{

          let params = {}
          if(this.filters.LotID !== '' && this.isNULL(this.filters.LotID) !== true){
            //修改地块单选为多选，查询参数形式为{LotID:'id1,id2,id3...'}
            params.LotID = this.filters.LotID
            // for (let i = 1; i < this.filters.LotID.length; i++) {
            //   params.LotID += ','+this.filters.LotID[i]
            // }

          }
          if(this.filters.end === '' || this.isNULL(this.filters.end)){
            if(this.filters.start !== '' && this.isNULL(this.filters.start) !== true){
              params.start = this.getFormatDate(this.filters.start);
            }
          }else{

            if(this.filters.start === '' || this.isNULL(this.filters.start) ){
              this.$message({message: '请设置起始时间 ', type: 'error'})
            }else{
              if(this.filters.start.getTime() > this.filters.end.getTime()){
                this.$message({message: '请设置合理时间区间 ', type: 'error'})
              }else {
                // 正常
                params.end = this.getFormatDate(this.filters.end);
                params.start = this.getFormatDate(this.filters.start);
              }
            }
          }
          //params:{'LotID':{1,2}}
          console.log("params")
          console.log(params)
          this.$api.irrigation.findPageByDate(params).then((res) => {

            if (res.code === 400 || res.data === undefined){
              this.$message({message: '查询失败 ', type: 'error'})
            }else{
              res.data.content = res.data;
              res.data.pageNum = 1
              res.data.pageSize = 10
              res.data.totalSize = res.data.content.length
              //this.nameList = this.getNameList(res.data);
              let lotList = this.getLotList(this.lotPathList);
              console.log("lotList")
              console.log(lotList)
              console.log(res.data)
              // for(var i=0;i<res.data.totalSize;i++){
              //   res.data.content[i].lotName = lotList[res.data.content[i].regionId-1].lotName
              //   res.data.content[i].LotID = res.data.content[i].regionId
              // }
              for(var i=0;i<res.data.totalSize;i++){

                let lotName = ""
                let tempArray = res.data.content[i].regionId.split(",")
                lotName = lotList[tempArray[0]-1].lotName

                for (let j = 1; j < tempArray.length; j++) {
                  lotName+= ","+lotList[tempArray[j]-1].lotName

                }
                res.data.content[i].lotName = lotName

                res.data.content[i].LotID = res.data.content[i].regionId
              }


              this.pageResult = res.data
              console.log("user")
              console.log(this.pageResult)
            }

          })
        }




      },
      findPage: function (data) {

        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        //this.pageRequest.columnFilters = {name: {name: 'name', value: this.filters.name}}
        //this.pageRequest.sensorType=this.filters.sensorType
        //this.$api.dailyjobs.findPage(this.pageRequest).then((res) => {    正确URL，目前测试
        this.$api.irrigation.findPage(null).then((res) => {

          //测试数据
          //res.data.content[0].id = 1;
          //res.data.content[0].datetime1 = '2019-06-30';
          //res.data.content[0].datetime2 = '21:02:30';
          //res.data.content[0].lotID = 3;
          //res.data.content[0].jobs = "除草";
          //res.data.content[0].name = '张三';
          //res.data.content[0].note = "雇佣临时除草工人5人，上午10点到下午4点，完成地块B-6的杂草清除";

          ///res.data.content[1].id = 1;
          //res.data.content[1].datetime1 = '2019-06-30';
          //res.data.content[1].datetime2 = '21:02:30';
          //res.data.content[1].lotID = 3;
          // res.data.content[1].jobs = "除草";
          //res.data.content[1].name = '张三';
          //res.data.content[1].note = "雇佣临时除草工人5人，上午10点到下午4点，完成地块B-6的杂草清除";

          res.data.content = res.data;
          res.data.pageNum = 1
          res.data.pageSize = 10
          res.data.totalSize = res.data.content.length
          //this.nameList = this.getNameList(res.data);
          let lotList = this.getLotList(this.lotPathList);
          console.log("lotList")
          console.log(lotList)
          console.log(res.data)

          // alert(JSON.stringify(res.data))
          for(var i=0;i<res.data.totalSize;i++){

            let lotName = ""
            let tempArray = res.data.content[i].regionId.split(",")
            lotName = lotList[tempArray[0]-1].lotName

            for (let j = 1; j < tempArray.length; j++) {
              lotName+= ","+lotList[tempArray[j]-1].lotName

            }
            res.data.content[i].lotName = lotName

            res.data.content[i].LotID = res.data.content[i].regionId
          }
          this.pageResult = res.data
          console.log("user")
          console.log(this.pageResult)

        }).then(data != null ? data.callback : '')


      },

      // 批量删除
      handleDelete: function (data) {

        console.log(data.params)
        let id = []
        for (var i =0;i<data.params.length;i++){
          id.push(data.params[i].id)
        }
        let param = {id: id};
        console.log(param)
        try{
          this.$api.irrigation.batchDelete(param).then(data !== null ? data.callback : '')

        }
        catch (e) {
          this.$message({message: '操作失败, ', type: 'error'})
        }




      },
      // 显示新增界面
      handleAdd: function () {
        this.dialogVisible = true
        this.operation = true
        this.dataForm = {
          datetime1: '',
          datetime2: '',
          LotID:[],
          stere:'',
          duration:'',
          note: '备注',
          name: '',
          IsAdd: true
        }
      },
      // 显示编辑界面
      handleEdit: function (params) {

        this.dialogVisible = true
        this.operation = false
        //params.row.datetime2 = params.row.datetime1 + " " + params.row.datetime2
        this.dataForm = Object.assign({}, params.row)
        console.log(this.dataForm)
        this.dataForm.datetime2 = params.row.datetime1 + " " + params.row.datetime2
        this.dataForm.IsAdd = false
        //element多选下拉框回显数据时只显示value，此处将id用地块名表示，编辑时进行转换
        //注意数据类型转换


        this.dataForm.LotID = this.dataForm.lotName.split(',')

        console.log(this.lotMap)
        delete this.dataForm.lotName
        delete this.dataForm.regionId



      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true

              if(this.dataForm.stere === ''){
                  this.dataForm.stere = '0'
              }
              let lotID = (typeof this.dataForm.LotID[0] === "number")?this.dataForm.LotID[0]:this.lotMap[this.dataForm.LotID[0]]
              for (let i = 1; i < this.dataForm.LotID.length; i++) {
                let temp = (typeof this.dataForm.LotID[i] === "number")?this.dataForm.LotID[i]:this.lotMap[this.dataForm.LotID[i]]
                lotID += ","+temp
              }
              let params = Object.assign({}, this.dataForm)
              params.LotID = lotID
              console.log("编辑")
              console.log(params)

              if (this.dataForm.datetime1 instanceof Date){
                params.datetime1 = this.getFormatDate(this.dataForm.datetime1);
              }
              if (this.dataForm.datetime2 instanceof Date){
                params.datetime2 = this.getFormatTime2(this.dataForm.datetime2);
              }else {
                params.datetime2 = params.datetime2.substr(params.datetime2.indexOf(" ")+1,8)
              }

              console.log("编辑")
              console.log(params)

              this.$api.irrigation.save(params).then((res) => {
                this.editLoading = false
                if (res.code === 200) {
                  this.$message({message: '操作成功', type: 'success'})
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
                } else {
                    this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.findPage(null)
              }).catch((error)=>{
                  this.$message({message: error, type: 'error'})
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()

              })


            })
          }
        })
      },
      // 处理表格列过滤显示
      displayFilterColumnsDialog: function () {
        this.$refs.tableColumnFilterDialog.setDialogVisible(true)
      },
      // 处理表格列过滤显示
      handleFilterColumns: function (data) {
        this.filterColumns = data.filterColumns
        this.$refs.tableColumnFilterDialog.setDialogVisible(false)
      },
      //获得时间参数
      getFormatTime: function(D){
        var yyyy = D.getFullYear();  //获取四位数字表示的年份
        /*获取月份，+1是因为getMonth方法返回的0(一月份)-11（十二月份）*/
        var mm = D.getMonth()+1;

        var dd = D.getDate();     //获取日期
        var hh = D.getHours();    //获取小时数
        var min = D.getMinutes();   //获取分钟数
        var ss = D.getSeconds();    //获取秒
        //分隔符
        var sep1 = "-";
        var sep2 = ":";
        //用"0"补位不足两位数的时间
        mm = (mm<10)?("0"+mm):mm;

        dd = (dd<10)?("0"+dd):dd;

        hh = (hh<10)?("0"+hh):hh;

        min = (min<10)?("0"+min):min;

        ss = (ss<10)?("0"+ss):ss;

        var format = yyyy+sep1+mm+sep1+dd+" "+hh+sep2+min+sep2+ss;
        return format;

      },
      //获得时间参数
      getFormatDate: function(D){
        var yyyy = D.getFullYear();  //获取四位数字表示的年份
        /*获取月份，+1是因为getMonth方法返回的0(一月份)-11（十二月份）*/
        var mm = D.getMonth()+1;

        var dd = D.getDate();     //获取日期
        //分隔符
        var sep1 = "-";
        //用"0"补位不足两位数的时间
        mm = (mm<10)?("0"+mm):mm;

        dd = (dd<10)?("0"+dd):dd;
        var format = yyyy+sep1+mm+sep1+dd;
        return format;

      },
      //获得时间参数
      getFormatTime2: function(D){
        var hh = D.getHours();    //获取小时数
        var min = D.getMinutes();   //获取分钟数
        var ss = D.getSeconds();    //获取秒
        //分隔符
        var sep2 = ":";
        //用"0"补位不足两位数的时

        hh = (hh<10)?("0"+hh):hh;

        min = (min<10)?("0"+min):min;

        ss = (ss<10)?("0"+ss):ss;

        var format = hh+sep2+min+sep2+ss;
        return format;

      },
      // 处理表格列过滤显示
      initColumns: function () {
        this.columns = [
          {prop: "id", label: "ID", minWidth: 50},
          {prop: "datetime1", label: "日期", minWidth: 120},
          {prop: "datetime2", label: "时间", minWidth: 100},
          {prop: "lotName", label: "地块", minWidth: 120},
          {prop: "stere", label: "浇灌水量(吨)", minWidth: 120},
          {prop: "duration", label: "浇灌时长(小时)", minWidth: 120},
          {prop: "name", label: "操作人员", minWidth: 120},
          {prop: "note", label: "备注", minWidth: 100},
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns));
      },

      querySearch(queryString, cb) {
        var nameList = this.nameList;
        var results = queryString ? nameList.filter(this.createFilter(queryString)) : nameList;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (nameList) => {
          return (nameList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      getNameList(data) {
        let nameList = [];
        for (let i = 0; i < data.length; i++) {
          var obj = {};
          obj.value = data[i].name;
          nameList.push(obj);
        }
        return nameList;
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
          let name = lotPathList[i].name
          let index = lotPathList[i].id
          this.lotMap[name] = index
        }

        return LotList
      },
      // selectChange(val){
      //   this.$forceUpdate()
      // }
    },
    mounted() {
      this.initColumns();
      // this.getLotList(this.lotPathList)
      // LotLive.methods.getLotList(lotPathList)

    },
    computed: {
      ...mapState({
        lotPathList: state => state.lot.allLotLocList
      }),
    }
  }
</script>

<style scoped>

</style>

































<!--<template>-->
<!--  <div class="page-container">-->
<!--    &lt;!&ndash;工具栏&ndash;&gt;-->
<!--    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">-->
<!--      <el-form :inline="true" :model="filters" :size="size" :rules="queryFormRules" ref="filters">-->

<!--        <el-form-item label="地块" prop="role" :span="15">-->
<!--          <el-select v-model="filters.LotID" placeholder="选择地块"  :clearable=true :span="15">-->
<!--            <el-option v-for="item in getLotList(lotPathList)" :key="item.lotID" :label="item.lotName"-->
<!--                       :value="item.lotID" :span="15"></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="起始日期">-->
<!--          <el-col :span="15">-->
<!--            <el-date-picker type="date" placeholder="选择日期" auto-complete="off" v-model="filters.start" style="width: 100%;"></el-date-picker>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="结束日期">-->
<!--          <el-col :span="15">-->
<!--            <el-date-picker type="date" placeholder="选择日期" auto-complete="off" v-model="filters.end" style="width: 100%;"></el-date-picker>-->
<!--          </el-col>-->

<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <kt-button icon="fa fa-search" label="查找" type="primary" @click="findPageByDate"/>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <kt-button icon="fa fa-plus" label="添加" type="primary" @click="handleAdd"/>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--    </div>-->
<!--    <div class="toolbar" style="float:right;padding-top:10px;padding-right:15px;">-->
<!--      <el-form :inline="true" :size="size">-->
<!--        <el-form-item>-->
<!--          <el-button-group>-->
<!--            <el-tooltip content="刷新" placement="top">-->
<!--              <el-button icon="fa fa-refresh" @click="findPage(null)"></el-button>-->
<!--            </el-tooltip>-->
<!--            <el-tooltip content="列显示" placement="top">-->
<!--              <el-button icon="fa fa-filter" @click="displayFilterColumnsDialog"></el-button>-->
<!--            </el-tooltip>-->
<!--          </el-button-group>-->
<!--        </el-form-item>-->
<!--      </el-form>-->
<!--      &lt;!&ndash;表格显示列界面&ndash;&gt;-->
<!--      <table-column-filter-dialog ref="tableColumnFilterDialog" :columns="columns"-->
<!--                                  @handleFilterColumns="handleFilterColumns">-->
<!--      </table-column-filter-dialog>-->
<!--    </div>-->
<!--    &lt;!&ndash;表格内容栏&ndash;&gt;-->
<!--    <kt-table :data="pageResult" :columns="filterColumns"-->
<!--              @findPage="findPage" @handleEdit="handleEdit" @handleDelete="handleDelete">-->
<!--    </kt-table>-->

<!--    &lt;!&ndash;新增编辑界面&ndash;&gt;-->
<!--    &lt;!&ndash;     TODO 可优化新增编辑界面&ndash;&gt;-->
<!--    <el-dialog :title="operation?'新增浇灌记录':'编   辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">-->
<!--      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"-->
<!--               label-position="right">-->
<!--        <el-form-item label="ID" prop="id" v-if="!operation">-->
<!--          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="浇灌水量" prop="kind">-->
<!--          <el-input v-model="dataForm.stere" auto-complete="off" ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="浇灌时长（小时）" prop="quantity">-->
<!--          <el-input v-model="dataForm.duration" auto-complete="off" ></el-input>-->
<!--        </el-form-item>-->

<!--        <el-form-item label="地块" prop="LotID" style="width: 100%;">-->
<!--          <el-select v-model="dataForm.LotID" placeholder="选择地块"  style="width: 100%;">-->
<!--            <el-option v-for="item in getLotList(lotPathList)" :key="item.lotID" :label="item.lotName"-->
<!--                       :value="item.lotID" ></el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="浇灌时间">-->
<!--          <el-col :span="11">-->
<!--            <el-date-picker type="date" placeholder="选择日期" v-model="dataForm.datetime1" :clearable=false style="width: 100%;"></el-date-picker>-->
<!--          </el-col>-->
<!--          <el-col class="line" :span="2">-</el-col>-->
<!--          <el-col :span="11">-->
<!--            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="dataForm.datetime2" :clearable=false style="width: 100%;"></el-time-picker>-->
<!--          </el-col>-->
<!--        </el-form-item>-->


<!--        <el-form-item label="操作人员" prop="name">-->
<!--          <el-input v-model="dataForm.name" auto-complete="off" ></el-input>-->
<!--        </el-form-item>-->
<!--        <el-form-item label="备    注" prop="note">-->
<!--          <el-input type="textarea" v-model="dataForm.note" auto-complete="off"></el-input>-->
<!--        </el-form-item>-->


<!--      </el-form>-->
<!--      <div slot="footer" class="dialog-footer">-->
<!--        <el-button :size="size" @click.native="dialogVisible = false">取消</el-button>-->
<!--        <el-button :size="size" type="primary" @click.native="submitForm" :loading="editLoading">提交</el-button>-->
<!--      </div>-->
<!--    </el-dialog>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->

<!--  import KtTable from "@/views/Core/KtTable"-->
<!--  import KtButton from "@/views/Core/KtButton"-->
<!--  import TableColumnFilterDialog from "@/views/Core/TableColumnFilterDialog"-->
<!--  import {mapState} from "vuex";-->
<!--  import LotLive from "../Live/LotLive.vue";-->

<!--  export default {-->
<!--    name: "IrrigMng",-->
<!--    components: {-->
<!--      KtTable,-->
<!--      KtButton,-->
<!--      TableColumnFilterDialog,-->
<!--      LotLive-->
<!--    },-->
<!--    data() {-->
<!--      return {-->
<!--        size: 'small',-->
<!--        filters: {-->
<!--          start: '',-->
<!--          end:'',-->
<!--          LotID:''-->
<!--        },-->
<!--        columns: [],-->
<!--        filterColumns: [],-->
<!--        pageRequest: {pageNum: 1, pageSize: 10},-->
<!--        pageResult: {},-->

<!--        operation: false, // true:新增, false:编辑-->
<!--        dialogVisible: false, // 新增编辑界面是否显示-->
<!--        editLoading: false,-->
<!--        dataFormRules: {-->
<!--          name: [-->
<!--            {required: true, message: '请输入操作人员', trigger: 'blur'}-->
<!--          ],-->
<!--          stere: [-->
<!--            {required: true, message: '请输入浇灌水量', trigger: 'blur'}-->
<!--          ],-->
<!--          duration: [-->
<!--            {required: true, message: '请输入浇灌时长', trigger: 'blur'}-->
<!--          ]-->
<!--        },-->
<!--        queryFormRules: {-->
<!--          start: [-->
<!--            {required: true, message: '请选择查询起始日期', trigger: 'blur'}-->
<!--          ],-->
<!--          end: [-->
<!--            {required: true, message: '请选择查询结束日期', trigger: 'blur'}-->
<!--          ]-->
<!--        },-->
<!--        // 新增编辑界面数据-->
<!--        dataForm: {-->
<!--          datetime1: '',-->
<!--          datetime2: '',-->
<!--          lotID: '',-->
<!--          LotName:'',-->
<!--          stere: '',-->
<!--          duration:'',-->
<!--          note: '备注',-->
<!--          name: ''-->
<!--        },-->
<!--        jobs: ["除草", "铺地膜", "修枝"],-->
<!--        nameList: [],-->
<!--        LotID: 6,-->
<!--        LotList: [],-->
<!--      }-->
<!--    },-->
<!--    methods: {-->
<!--      // 获取分页数据-->
<!--      isNULL: function(obj){-->
<!--        if (!obj && typeof(obj)!="undefined" && obj!=0){-->
<!--          return true-->
<!--        }-->
<!--        else-->
<!--          return false-->

<!--      },-->
<!--      findPageByDate: function(){-->


<!--        if ((this.filters.LotID === '' || this.isNULL(this.filters.LotID)) && (this.filters.start === '' || this.isNULL(this.filters.start)) && (this.filters.end === '' || this.isNULL(this.filters.end))){-->
<!--          this.$message({message: '请设置查询条件 ', type: 'error'})-->
<!--        }-->
<!--        else{-->

<!--          let params = {}-->
<!--          if(this.filters.LotID !== '' && this.isNULL(this.filters.LotID) !== true){-->
<!--            params.LotID = this.filters.LotID-->
<!--          }-->
<!--          if(this.filters.end === '' || this.isNULL(this.filters.end)){-->
<!--            if(this.filters.start !== '' && this.isNULL(this.filters.start) !== true){-->
<!--              params.start = this.getFormatDate(this.filters.start);-->
<!--            }-->
<!--          }else{-->

<!--            if(this.filters.start === '' || this.isNULL(this.filters.start) ){-->
<!--              this.$message({message: '请设置起始时间 ', type: 'error'})-->
<!--            }else{-->
<!--              if(this.filters.start.getTime() > this.filters.end.getTime()){-->
<!--                this.$message({message: '请设置合理时间区间 ', type: 'error'})-->
<!--              }else {-->
<!--                // 正常-->
<!--                params.end = this.getFormatDate(this.filters.end);-->
<!--                params.start = this.getFormatDate(this.filters.start);-->
<!--              }-->
<!--            }-->
<!--          }-->
<!--          console.log("params")-->
<!--          console.log(params)-->

<!--          this.$api.irrigation.findPageByDate(params).then((res) => {-->

<!--            if (res.code === 400 || res.data === undefined){-->
<!--              this.$message({message: '查询失败 ', type: 'error'})-->
<!--            }else{-->
<!--              res.data.content = res.data;-->
<!--              res.data.pageNum = 1-->
<!--              res.data.pageSize = 10-->
<!--              res.data.totalSize = res.data.content.length-->
<!--              //this.nameList = this.getNameList(res.data);-->
<!--              let lotList = this.getLotList(this.lotPathList);-->
<!--              console.log("lotList")-->
<!--              console.log(lotList)-->
<!--              console.log(res.data)-->
<!--              for(var i=0;i<res.data.totalSize;i++){-->
<!--                res.data.content[i].lotName = lotList[res.data.content[i].regionId-1].lotName-->
<!--                res.data.content[i].LotID = res.data.content[i].regionId-->
<!--              }-->



<!--              this.pageResult = res.data-->
<!--              console.log("user")-->
<!--              console.log(this.pageResult)-->
<!--            }-->

<!--          })-->
<!--        }-->




<!--      },-->
<!--      findPage: function (data) {-->
<!--        if (data !== null) {-->
<!--          this.pageRequest = data.pageRequest-->
<!--        }-->
<!--        //this.pageRequest.columnFilters = {name: {name: 'name', value: this.filters.name}}-->
<!--        //this.pageRequest.sensorType=this.filters.sensorType-->
<!--        //this.$api.dailyjobs.findPage(this.pageRequest).then((res) => {    正确URL，目前测试-->
<!--        this.$api.irrigation.findPage(null).then((res) => {-->

<!--          //测试数据-->
<!--          //res.data.content[0].id = 1;-->
<!--          //res.data.content[0].datetime1 = '2019-06-30';-->
<!--          //res.data.content[0].datetime2 = '21:02:30';-->
<!--          //res.data.content[0].lotID = 3;-->
<!--          //res.data.content[0].jobs = "除草";-->
<!--          //res.data.content[0].name = '张三';-->
<!--          //res.data.content[0].note = "雇佣临时除草工人5人，上午10点到下午4点，完成地块B-6的杂草清除";-->

<!--          ///res.data.content[1].id = 1;-->
<!--          //res.data.content[1].datetime1 = '2019-06-30';-->
<!--          //res.data.content[1].datetime2 = '21:02:30';-->
<!--          //res.data.content[1].lotID = 3;-->
<!--          // res.data.content[1].jobs = "除草";-->
<!--          //res.data.content[1].name = '张三';-->
<!--          //res.data.content[1].note = "雇佣临时除草工人5人，上午10点到下午4点，完成地块B-6的杂草清除";-->

<!--          res.data.content = res.data;-->
<!--          res.data.pageNum = 1-->
<!--          res.data.pageSize = 10-->
<!--          res.data.totalSize = res.data.content.length-->
<!--          //this.nameList = this.getNameList(res.data);-->
<!--          let lotList = this.getLotList(this.lotPathList);-->
<!--          console.log("lotList")-->
<!--          console.log(lotList)-->
<!--          console.log(res.data)-->
<!--          for(var i=0;i<res.data.totalSize;i++){-->
<!--            res.data.content[i].lotName = lotList[res.data.content[i].regionId-1].lotName-->
<!--            res.data.content[i].LotID = res.data.content[i].regionId-->
<!--          }-->

<!--          this.pageResult = res.data-->
<!--          console.log("user")-->
<!--          console.log(this.pageResult)-->

<!--        }).then(data != null ? data.callback : '')-->


<!--      },-->

<!--      // 批量删除-->
<!--      handleDelete: function (data) {-->

<!--        console.log(data.params)-->
<!--        let id = []-->
<!--        for (var i =0;i<data.params.length;i++){-->
<!--          id.push(data.params[i].id)-->
<!--        }-->
<!--        let param = {id: id};-->
<!--        console.log(param)-->
<!--        try{-->
<!--          this.$api.irrigation.batchDelete(param).then(data !== null ? data.callback : '')-->
<!--        }-->
<!--        catch (e) {-->
<!--          this.$message({message: '操作失败, ', type: 'error'})-->
<!--        }-->




<!--      },-->
<!--      // 显示新增界面-->
<!--      handleAdd: function () {-->
<!--        this.dialogVisible = true-->
<!--        this.operation = true-->
<!--        this.dataForm = {-->
<!--          datetime1: '',-->
<!--          datetime2: '',-->
<!--          LotID:'',-->
<!--          stere:'',-->
<!--          duration:'',-->
<!--          note: '备注',-->
<!--          name: '',-->
<!--          IsAdd: true-->
<!--        }-->
<!--      },-->
<!--      // 显示编辑界面-->
<!--      handleEdit: function (params) {-->
<!--        this.dialogVisible = true-->
<!--        this.operation = false-->

<!--        //params.row.datetime2 = params.row.datetime1 + " " + params.row.datetime2-->
<!--        this.dataForm = Object.assign({}, params.row)-->
<!--        console.log(this.dataForm)-->

<!--        this.dataForm.datetime2 = params.row.datetime1 + " " + params.row.datetime2-->
<!--        this.dataForm.IsAdd = false-->
<!--        delete this.dataForm.lotName-->
<!--        delete this.dataForm.regionId-->

<!--      },-->
<!--      // 编辑-->
<!--      submitForm: function () {-->
<!--        this.$refs.dataForm.validate((valid) => {-->
<!--          if (valid) {-->
<!--            this.$confirm('确认提交吗？', '提示', {}).then(() => {-->
<!--              this.editLoading = true-->
<!--              let params = Object.assign({}, this.dataForm)-->

<!--              console.log("编辑")-->
<!--              console.log(params)-->

<!--              if (this.dataForm.datetime1 instanceof Date){-->
<!--                params.datetime1 = this.getFormatDate(this.dataForm.datetime1);-->
<!--              }-->
<!--              if (this.dataForm.datetime2 instanceof Date){-->
<!--                params.datetime2 = this.getFormatTime2(this.dataForm.datetime2);-->
<!--              }else {-->
<!--                params.datetime2 = params.datetime2.substr(params.datetime2.indexOf(" ")+1,8)-->
<!--              }-->
<!--              //params.datetime1 = this.getFormatDate(this.dataForm.datetime1);-->
<!--              //params.datetime2 = this.getFormatTime2(this.dataForm.datetime2);-->
<!--              //this.dataForm.IsAdd = false-->
<!--              console.log("编辑")-->
<!--              console.log(params)-->


<!--              this.$api.irrigation.save(params).then((res) => {-->
<!--                this.editLoading = false-->
<!--                if (res.code === 200) {-->
<!--                  this.$message({message: '操作成功', type: 'success'})-->
<!--                  this.dialogVisible = false-->
<!--                  this.$refs['dataForm'].resetFields()-->
<!--                } else {-->
<!--                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})-->
<!--                }-->
<!--                this.findPage(null)-->
<!--              })-->

<!--            })-->
<!--          }-->
<!--        })-->
<!--      },-->
<!--      // 处理表格列过滤显示-->
<!--      displayFilterColumnsDialog: function () {-->
<!--        this.$refs.tableColumnFilterDialog.setDialogVisible(true)-->
<!--      },-->
<!--      // 处理表格列过滤显示-->
<!--      handleFilterColumns: function (data) {-->
<!--        this.filterColumns = data.filterColumns-->
<!--        this.$refs.tableColumnFilterDialog.setDialogVisible(false)-->
<!--      },-->
<!--      //获得时间参数-->
<!--      getFormatTime: function(D){-->
<!--        var yyyy = D.getFullYear();  //获取四位数字表示的年份-->
<!--        /*获取月份，+1是因为getMonth方法返回的0(一月份)-11（十二月份）*/-->
<!--        var mm = D.getMonth()+1;-->

<!--        var dd = D.getDate();     //获取日期-->
<!--        var hh = D.getHours();    //获取小时数-->
<!--        var min = D.getMinutes();   //获取分钟数-->
<!--        var ss = D.getSeconds();    //获取秒-->
<!--        //分隔符-->
<!--        var sep1 = "-";-->
<!--        var sep2 = ":";-->
<!--        //用"0"补位不足两位数的时间-->
<!--        mm = (mm<10)?("0"+mm):mm;-->

<!--        dd = (dd<10)?("0"+dd):dd;-->

<!--        hh = (hh<10)?("0"+hh):hh;-->

<!--        min = (min<10)?("0"+min):min;-->

<!--        ss = (ss<10)?("0"+ss):ss;-->

<!--        var format = yyyy+sep1+mm+sep1+dd+" "+hh+sep2+min+sep2+ss;-->
<!--        return format;-->

<!--      },-->
<!--      //获得时间参数-->
<!--      getFormatDate: function(D){-->
<!--        var yyyy = D.getFullYear();  //获取四位数字表示的年份-->
<!--        /*获取月份，+1是因为getMonth方法返回的0(一月份)-11（十二月份）*/-->
<!--        var mm = D.getMonth()+1;-->

<!--        var dd = D.getDate();     //获取日期-->
<!--        //分隔符-->
<!--        var sep1 = "-";-->
<!--        //用"0"补位不足两位数的时间-->
<!--        mm = (mm<10)?("0"+mm):mm;-->

<!--        dd = (dd<10)?("0"+dd):dd;-->
<!--        var format = yyyy+sep1+mm+sep1+dd;-->
<!--        return format;-->

<!--      },-->
<!--      //获得时间参数-->
<!--      getFormatTime2: function(D){-->
<!--        var hh = D.getHours();    //获取小时数-->
<!--        var min = D.getMinutes();   //获取分钟数-->
<!--        var ss = D.getSeconds();    //获取秒-->
<!--        //分隔符-->
<!--        var sep2 = ":";-->
<!--        //用"0"补位不足两位数的时-->

<!--        hh = (hh<10)?("0"+hh):hh;-->

<!--        min = (min<10)?("0"+min):min;-->

<!--        ss = (ss<10)?("0"+ss):ss;-->

<!--        var format = hh+sep2+min+sep2+ss;-->
<!--        return format;-->

<!--      },-->
<!--      // 处理表格列过滤显示-->
<!--      initColumns: function () {-->
<!--        this.columns = [-->
<!--          {prop: "id", label: "ID", minWidth: 50},-->
<!--          {prop: "datetime1", label: "日期", minWidth: 120},-->
<!--          {prop: "datetime2", label: "时间", minWidth: 100},-->
<!--          {prop: "lotName", label: "地块", minWidth: 120},-->
<!--          {prop: "stere", label: "浇灌水量", minWidth: 120},-->
<!--          {prop: "duration", label: "浇灌时长", minWidth: 120},-->
<!--          {prop: "name", label: "操作人员", minWidth: 120},-->
<!--          {prop: "note", label: "备注", minWidth: 100},-->
<!--        ]-->
<!--        this.filterColumns = JSON.parse(JSON.stringify(this.columns));-->
<!--      },-->

<!--      querySearch(queryString, cb) {-->
<!--        var nameList = this.nameList;-->
<!--        var results = queryString ? nameList.filter(this.createFilter(queryString)) : nameList;-->
<!--        // 调用 callback 返回建议列表的数据-->
<!--        cb(results);-->
<!--      },-->
<!--      createFilter(queryString) {-->
<!--        return (nameList) => {-->
<!--          return (nameList.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);-->
<!--        };-->
<!--      },-->
<!--      getNameList(data) {-->
<!--        let nameList = [];-->
<!--        for (let i = 0; i < data.length; i++) {-->
<!--          var obj = {};-->
<!--          obj.value = data[i].name;-->
<!--          nameList.push(obj);-->
<!--        }-->
<!--        return nameList;-->
<!--      },-->
<!--      getLotList(lotPathList) {-->
<!--        if(lotPathList === undefined){-->
<!--          console.log("还未加载数据")-->
<!--        }-->
<!--        let LotList = []-->
<!--        for (let i = 0; i < lotPathList.length; i++) {-->
<!--          LotList.push({-->
<!--            lotID: lotPathList[i].id,-->
<!--            lotName: lotPathList[i].name-->
<!--          })-->
<!--        }-->
<!--        return LotList-->
<!--      },-->
<!--    },-->
<!--    mounted() {-->
<!--      this.initColumns();-->
<!--      //LotLive.methods.getLotList(lotPathList)-->

<!--    },-->
<!--    computed: {-->
<!--      ...mapState({-->
<!--        lotPathList: state => state.lot.allLotLocList-->
<!--      }),-->
<!--    }-->
<!--  }-->
<!--</script>-->

<!--<style scoped>-->

<!--</style>-->
