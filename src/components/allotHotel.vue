<template>
  <div class="allot">
    <div class="allot_box">
        <el-dialog
    title="提示"
    :visible.sync="message"
    width="30%">
     <p>酒店列表</p>
      <div class="search_box">
        酒店名:
        <el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
        <el-button size="small" type="primary">搜索</el-button>
        <el-button size="small" type="success">确定</el-button>
        <el-button size="small" type="info">取消</el-button>
      </div>
      <div class="hotel_list">
        <el-table
          ref="multipleTable"
          border
          :data="tableData3.slice((currentPage-1)*PageSize,currentPage*PageSize)"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column label="日期" width="120">
            <template slot-scope="scope">
              <img class="hotel_img" :src="scope.row.scr" alt />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120"></el-table-column>
          <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
        <el-pagination
          v-if="tableData3.length > 3"
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="3"
          :total="tableData3.length"
        ></el-pagination>
      </div>
</el-dialog>
     
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      input: "",
      PageSize:3,
      dialogVisible:false,
      currentPage:1,
      tableData3: [
        {
          scr: require("../assets/hotel_pic@2x.png"),
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          scr: require("../assets/hotel_pic@2x.png"),
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          scr: require("../assets/hotel_pic@2x.png"),
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          scr: require("../assets/hotel_pic@2x.png"),
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ],
      multipleSelection: []
    };
  },
  props:['message'],
  created() {
      console.log(this.message)
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val){
      this.PageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val){
      this.currentPage = val
      console.log(val)
    },
  }
};
</script>
<style scoped>
.el-pagination{
  position: absolute;
  left: 150px;
  bottom: 30px;
}
.el-input {
  width: 150px;
  margin-left: 20px;
}
.el-button {
  margin-left: 20px;
}
/* .allot {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.5);
}
.allot_box {
  width: 35%;
  height: 500px;
  border-radius: 5px;
  position: absolute;
  background: #ffffff;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  margin: auto;
} */
.allot_box p {
  font-size: 14px;
  padding-left: 20px;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid rgb(224, 223, 223);
}
.search_box {
  padding-left: 20px;
  margin-top: 20px;
}
.hotel_list {
  margin: 20px;
}
.hotel_img {
  width: 100px;
  height: 50px;
}
</style>
