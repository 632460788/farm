<template>
  <div>
    <div style="text-align: left">
    <el-upload :multiple='false' :before-upload="beforeUpload" action='' :limit="1"
               :on-exceed="handleExceed" :on-success="readExcel" :http-request="uploadFile">
      <el-button  type="primary">上传文件<i class="el-icon-upload el-icon--right"></i></el-button>
    </el-upload>
    </div>
    <!--表格栏-->
    <el-table :data="lotList" :highlight-current-row="highlightCurrentRow" v-loading="loading" height="250"
              element-loading-text="加载中" :stripe="true" style="width:100%;" ref="LotLocation">
      <el-table-column v-for="column in columns" header-align="center" align="center"
                       :prop="column.prop" :label="column.label" :width="column.width" :min-width="column.minWidth"
                       :fixed="column.fixed" :key="column.prop" :type="column.type" :formatter="column.formatter"
                       :sortable="column.sortable==null?true:column.sortable">
      </el-table-column>
      <el-table-column label="选择" min-width="185" fixed="right" header-align="center" align="center">
        <template slot-scope="scope">
          <kt-button icon="fa fa-trash" label="删除" :size="size" type="danger"
                     @click="handleDelete(scope.$index, scope.row)"/>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import XLSX from 'xlsx';
  import KtButton from "@/views/Core/KtButton"

  export default {
    name: "excelDisplay",
    components: {KtButton},
    data() {
      return {
        tableData: '',
        tableHeader: '',
        tableTitle: '',
        lotList: [],
        columns: []
      }
    },
    methods: {
      beforeUpload(file) {
        const isText = file.type === 'application/vnd.ms-excel'
        const isTextComputer = file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        this.readExcel(file)
        return (isText | isTextComputer)
      },
      // 上传文件个数超过定义的数量
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件!`)
      },
      // 列表显示上传文件内容
      readExcel(file) {// 解析Excel
        let _this = this;
        // 通过DOM取文件数据
        var f = file;
        var reader = new FileReader();
        FileReader.prototype.readAsBinaryString = function (f) {
          var binary = "";
          var wb; //读取完成的数据
          var outData;
          var reader = new FileReader();
          reader.onload = function (e) {
            var bytes = new Uint8Array(reader.result);
            var length = bytes.byteLength;
            for (var i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            var XLSX = require('xlsx');
            wb = XLSX.read(binary, {type: 'binary'});
            outData = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);//outData就是你想要的东西
            this.da = [...outData]
            let arr = []
            this.da.map(v => {
              let obj = {}
              obj.lng = v.经度
              obj.lat = v.纬度
              arr.push(obj)
            })
            _this.lotList = arr
          }
          reader.readAsArrayBuffer(f);
        }

        reader.readAsBinaryString(f);
      },
      // 自定义上传动作
      uploadFile(item) {
        // 子节点向父节点传值
      },
      // 处理表格列过滤显示
      initColumns: function () {
        this.columns = [
          {prop: "lng", label: "经度", minWidth: 100},
          {prop: "lat", label: "纬度", minWidth: 100},
        ]
      },
      // 删除操作
      handleDelete: function (index, row) {
        this.$confirm('确认删除选中记录吗？', '提示', {
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.$refs.LotLocation.delete(row);
          this.loading = false
        }).catch(() => {
        })
      }
    },
    mounted() {
      this.initColumns()
    }
  }
</script>

<style scoped>

</style>
