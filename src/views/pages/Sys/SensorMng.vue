<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <el-select v-model="filters.sensorType" :placeholder="filters.sensorName" style="width: 100%;">
            <el-option v-for="item in sensorList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <kt-button icon="fa fa-search" label="查找" type="primary" @click="findPage(null)"/>
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
            <!--            <el-tooltip content="导出" placement="top">-->
            <!--              <el-button icon="fa fa-file-excel-o"></el-button>-->
            <!--            </el-tooltip>-->
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

    <!--     TODO 可优化新增编辑界面-->
    <!--新增编辑界面-->
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible"
               :close-on-click-modal="false">
      <el-form :model="sensorForm" label-width="100px" :rules="sensorFormRules" ref="sensorForm" :size="size"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="!operation">
          <el-input v-model="sensorForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="寄存器编号" prop="registerID">
          <el-select v-model="sensorForm.registerID" :placeholder="sensorForm.registerID" style="width: 100%;">
            <el-option v-for="item in registerList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传感器类型" prop="sensorType">
          <el-select v-model="sensorForm.sensorType" :placeholder="sensorForm.sensorType" style="width: 100%;">
            <el-option v-for="item in sensorList" :key="item.id" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="传感器位置" required>
          <el-col :span="11">
            <el-form-item prop="lng">
              <el-input v-model="sensorForm.lng" placeholder="经度"></el-input>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="lat">
              <el-input v-model="sensorForm.lat" placeholder="纬度"></el-input>
            </el-form-item>
          </el-col>
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

  export default {
    components: {
      KtTable,
      KtButton,
      TableColumnFilterDialog
    },
    data() {
      return {
        size: 'small',
        filters: {
          sensorName: '传感器类型',
          sensorType: '15'
        },
        columns: [],
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 10},
        pageResult: {},

        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        // 新增编辑界面数据
        sensorForm: {
          id: 0,
          registerID: '',
          sensorType: '',
          lng: '',
          lat: ''
        },
        registerList: [
          {
            id: 8100,
            name: '传感器 0'
          },
          {
            id: 8101,
            name: '传感器 1'
          },
          {
            id: 8102,
            name: '传感器 2'
          }
        ],
        sensorList: [
          {
            id: '15',
            name: '土壤张力'
          }, {
            id: '24',
            name: '土壤湿度计 485'
          }, {
            id: '20',
            name: '土壤湿度计电容'
          }, {
            id: '0E',
            name: '土壤温度计'
          }
        ],
        sensorFormRules: {}

      }
    },
    methods: {
      // 获取分页数据
      findPage: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        //this.filters.sensorType
        console.log("Page .......")
        //this.pageRequest.pageNum = 1
        console.log(this.pageRequest.pageNum)
        console.log(this.pageRequest.pageSize)
        this.pageRequest.sensorType=this.filters.sensorType
        console.log(this.pageRequest.sensorType)

        //this.pageRequest.columnFilters = {name: {name: 'sensorType', value: this.filters.sensorType}}
        this.$api.sensor.findSensorBySType(this.pageRequest).then((res) => {

          for(var i=0;i<res.data.content.length;i++){
            res.data.content[i].lat = res.data.content[i].locPoint.lat;
            res.data.content[i].lng = res.data.content[i].locPoint.lng;
          }
          this.pageResult = res.data
          console.log("sensor")
          console.log(this.pageResult)

        }).then(data != null ? data.callback : '')


      },

      // 批量删除
      handleDelete: function (data) {
        this.$api.user.batchDelete(data.params).then(data !== null ? data.callback : '')
      },
      // 显示新增界面
      handleAdd: function () {
        this.dialogVisible = true
        this.operation = true
        this.sensorForm = {
          id: 0,
          registerID: '',
          sensorType: '',
          lng: '',
          lat: ''
        }
      },
      // 显示编辑界面
      handleEdit: function (params) {
        this.dialogVisible = true
        this.operation = false
        this.sensorForm = Object.assign({}, params.row)
      },
      // 编辑
      submitForm: function () {
        this.$refs.sensorForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              let params = Object.assign({}, this.sensorForm)
              console.log("params: " + params)
              this.$api.sensor.addSensorInfo(params).then((res) => {
                this.editLoading = false
                if (res.code === 200) {
                  this.$message({message: '操作成功', type: 'success'})
                  this.dialogVisible = false
                  this.$refs['sensorForm'].resetFields()
                } else {
                  this.$message({message: '操作失败, ' + res.msg, type: 'error'})
                }
                this.findPage(null)
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
      // 处理表格列过滤显示
      initColumns: function () {
        this.columns = [
          {prop: "id", label: "ID", minWidth: 50},
          // {prop: "registerID", label: "寄存器编号", minWidth: 100},
          {prop: "registerName", label: "寄存器编号", minWidth: 100},
          // {prop: "sensorType", label: "传感器类型", minWidth: 100},
          {prop: "sensorName", label: "传感器类型", minWidth: 100},
          {prop: "lng", label: "经度", minWidth: 100},
          {prop: "lat", label: "纬度", minWidth: 100},
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns));
      }
    },

    mounted() {
      this.initColumns()
    }
  }
</script>

<style scoped>

</style>
