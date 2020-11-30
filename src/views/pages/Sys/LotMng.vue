<template>
  <!--  TODO 土地管理：地块位置，地块的土壤墒情信息-->
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :size="size">
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
      <el-form :model="lotForm" label-width="100px" :rules="lotFormRules" ref="sensorForm" :size="size"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="!operation">
          <el-input v-model="lotForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="地块名称" prop="name">
          <el-input v-model="lotForm.name" auto-complete="off" placeholder="地块名称"></el-input>
        </el-form-item>
        <!-- <el-form-item label="地块位置" prop="location">
        <excel-display></excel-display>
        </el-form-item>
        <el-form-item label="土壤墒情信息" prop="soilMoisture">-->
          <!--         TODO 土壤墒情信息上传信息
        </el-form-item>-->
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
  import ExcelDisplay from "@/views/Core/excelDisplay"

  export default {
    components: {
      KtTable,
      KtButton,
      TableColumnFilterDialog,
      ExcelDisplay
    },
    data() {
      return {
        size: 'small',
        columns: [],
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 10},
        pageResult: {},

        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        // 新增编辑界面数据
        lotForm: {
          id: 0,
          name: '',
          location: [],
          soilMoisture: {}
        },
        lotFormRules: {},



      }
    },
    methods: {
      // 获取分页数据
      findPage: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        this.$api.lot.findAllLotLoc().then((res) => {
          let temp = new Object()
          temp.content = res.data
          temp.pageNum = 1
          temp.pageSize = 10
          temp.totalSize = res.data.length

          this.pageResult = temp
          console.log("Lotmmm")
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
          {prop: "name", label: "地块名称", minWidth: 100},
          //{prop: "sensorName", label: "", minWidth: 100},
          //{prop: "lng", label: "经度", minWidth: 100},
          //{prop: "lat", label: "纬度", minWidth: 100},
        ]
        this.filterColumns = JSON.parse(JSON.stringify(this.columns));
        console.log(this.filterColumns)
      },
      importf(obj) {
        let _this = this;
        let inputDOM = this.$refs.fileUpload;   // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];
        var rABS = false; //是否将文件读取为二进制字符串
        var f = this.file;
        var reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var rABS = false; //是否将文件读取为二进制字符串
          var pt = this;
          var wb; //读取完成的数据
          var outdata;
          var reader = new FileReader();
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }

            var XLSX = require('xlsx');
            if (rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            // outdata就是你想要的东西 excel导入的数据
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            // excel 数据再处理
            let arr = []
            outdata.map(v => {
              let obj = {}
              obj.account = v.登录账号
              obj.name = v.姓名
              obj.department = v.部门
              obj.secondDepartment = v.二级部门
              obj.status = v.状态
              obj.id = v.id
              arr.push(obj)
            })
            _this.accountList = [...arr];
            console.log(_this.accountList);
            _this.reload();
          }
          reader.readAsArrayBuffer(f);
        }

        if (rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      fileExceed() {
        this.$alert('仅能上传一个文档！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${action}`
            });
          }
        });
      },
      // 请求成功
      importSuccess(res) {
        // 后端的返回码--上传成功
        if (res.code === 200) {
          // 显示√图标
          let e = document.getElementsByClassName('el-upload-list__item-status-label');
          e[0].setAttribute('style', 'display:block !important')
          // 成功提示
          this.$message.success('上传成功');
          // 重新调用列表请求（代码略）
          this.findPage();
          // 后端的返回码--上传失败
        } else {
          // 隐藏√图标
          let e = document.getElementsByClassName('el-upload-list__item-status-label');
          e[0].setAttribute('style', 'display:none !important')
          // 失败提示--及后端返回的失败详情
          this.$message.error({
            dangerouslyUseHTMLString: true,
            duration: 4500,
            message: '<br/>请删除上传失败的文件，修改后重新上传'
          });
        }
      },

      // 请求失败
      importError(err) {
        this.$message.error({
          dangerouslyUseHTMLString: true,
          duration: 4500,
          message: '上传出现异常，请稍后重试' + ',<br/><br/>异常原因：' + err
        });
      },

    },

    mounted() {
      this.initColumns()
    }
  }
</script>

<style scoped>

</style>

