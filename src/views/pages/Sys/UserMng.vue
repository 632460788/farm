<template>
  <div class="page-container">
    <!--工具栏-->
    <div class="toolbar" style="float:left;padding-top:10px;padding-left:15px;">
      <el-form :inline="true" :model="filters" :size="size">
        <el-form-item>
          <!--          <el-input v-model="filters.name" placeholder="用户名"></el-input>-->
          <el-autocomplete class="inline-input" v-model="filters.name" placeholder="用户名"
                           :fetch-suggestions="querySearch"></el-autocomplete>
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
    <el-dialog :title="operation?'新增':'编辑'" width="40%" :visible.sync="dialogVisible" :close-on-click-modal="false">
      <el-form :model="dataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size"
               label-position="right">
        <el-form-item label="ID" prop="id" v-if="!operation">
          <el-input v-model="dataForm.id" :disabled="true" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="name">
          <el-input v-model="dataForm.name" auto-complete="off" :disabled="!operation"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="dataForm.password" type="password" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="dataForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="dataForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="dataForm.role" :placeholder="dataForm.role" style="width: 100%;">
            <el-option v-for="item in roles" :key="item" :label="item" :value="item"></el-option>
          </el-select>
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
  //开启loading


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
          name: ''
        },
        columns: [],
        filterColumns: [],
        pageRequest: {pageNum: 1, pageSize: 10},
        pageResult: {},

        operation: false, // true:新增, false:编辑
        dialogVisible: false, // 新增编辑界面是否显示
        editLoading: false,
        dataFormRules: {
          name: [
            {required: true, message: '请输入用户名', trigger: 'blur'}
          ]
        },
        // 新增编辑界面数据
        dataForm: {
          name: '',
          password: '123456',
          email: 'test@qq.com',
          mobile: '13889700023',
          userRoles: '',
          IsAdd: true
        },
        roles: ["管理员", "普通用户"],
        nameList: []
      }
    },
    methods: {
      // 获取分页数据
      findPage: function (data) {
        if (data !== null) {
          this.pageRequest = data.pageRequest
        }
        //this.pageRequest.columnFilters = {name: {name: 'name', value: this.filters.name}}
        //this.pageRequest.sensorType=this.filters.sensorType
        this.$api.user.findPage(this.pageRequest).then((res) => {
          this.pageResult = res.data;
          this.nameList = this.getNameList(res.data.content);

          console.log("user")
          console.log(this.pageResult)

        }).then(data != null ? data.callback : '')


      },

      // 批量删除
      handleDelete: function (data) {

        // console.log(data.params)
        let id = []
        for (var i =0;i<data.params.length;i++){
          id.push(data.params[i].id)
        }
        let param = {id: id};
        try{
          this.$api.user.batchDelete(param).then(data !== null ? data.callback : '',data !== null ? data.callback : '')

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
          name: '',
          password: '',
          email: 'test@qq.com',
          mobile: '13889700023',
          role: '',
          IsAdd: true
        }
      },
      // 显示编辑界面
      handleEdit: function (params) {
        this.dialogVisible = true
        this.operation = false

        this.dataForm = Object.assign({}, params.row)
        this.dataForm.IsAdd = false
        delete this.dataForm.createBy
        delete this.dataForm.lastUpdateBy
        delete this.dataForm.createTime
        delete this.dataForm.lastUpdateTime

      },
      // 编辑
      submitForm: function () {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            this.$confirm('确认提交吗？', '提示', {}).then(() => {
              this.editLoading = true
              let params = Object.assign({}, this.dataForm)
              // console.log(JSON.stringify(params))
              // alert(JSON.stringify(params))
              this.$api.user.save(params).then((res) => {
                this.editLoading = false
                if (res.code === 200) {
                  this.$message({message: '操作成功', type: 'success'})
                  this.dialogVisible = false
                  this.$refs['dataForm'].resetFields()
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
          {prop: "name", label: "用户名", minWidth: 120},
          {prop: "role", label: "角色", minWidth: 100},
          {prop: "email", label: "邮箱", minWidth: 120},
          {prop: "mobile", label: "手机", minWidth: 100},
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
      }
    },
    mounted() {
      this.initColumns();
    }
  }
</script>

<style scoped>

</style>
