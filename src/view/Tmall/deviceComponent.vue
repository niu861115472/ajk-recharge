<template>
  <div class="host">
    <div class="tip">
      <p>{{title}}</p>
      <div @click="addHost" v-show="show">添加</div>
    </div>
    <!-- 主机列表 -->
    <div class="hotel-list" v-show="show">
      <div class="hotel-name">
        酒店名称：
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            @click.native="selectHotelId(item.id)"
          ></el-option>
        </el-select>
        <div class="search-btn" @click="search">搜索</div>
      </div>
      <div class="house-list">
        <el-table :data="tableData" stripe border style="width: 72%">
          <el-table-column fixed prop="hotelName" label="酒店名称" width="280"></el-table-column>
          <el-table-column prop="tvName" label="频道名称" width="250"></el-table-column>
          <el-table-column prop="tvNum" label="频道" width="250"></el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="changeHost(scope.row)" type="text" size="small">修改</el-button>
              <el-button @click="handleDelete(scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加主机 -->
    <div class="add-host" v-show="show1">
      <div>
        选择酒店：
        <el-select v-model="value2" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            @click.native="selectHotelId(item.id)"
          ></el-option>
        </el-select>
      </div>
      <div>
        选择频道：
        <el-select v-model="value1" filterable placeholder="请选择">
          <el-option v-for="(item,index) in options1" :key="index" :label="item" :value="item"></el-option>
        </el-select>
      </div>
      <div>
        频道（数值）：
        <el-input class="host-id-input" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div class="operate-btn">
        <div class="search-btn" @click="save">保存</div>
        <div class="search-btn" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import { list } from "../../assets/data";
export default {
  data() {
    return {
      show: true,
      show1: false,
      options: [],
      options1: [],
      tableData: [],
      value: "",
      value1: "",
      value2: "",
      PageSize: 10,
      currentPage: 1,
      total: 0,
      title: "电视频道",
      input: "",
      hotelId: "",
      isType: "",
      id: ""
    };
  },
  mounted() {
    this.options1 = list;
    this.getAddHotelList();
    this.getTmallHotelTvList();
  },
  methods: {
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTmallHotelTvList();
      console.log(val);
    },
    selectHotelId(id) {
      console.log(id);
      this.hotelId = id;
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //添加主机
    addHost() {
      this.show = false;
      this.show1 = true;
      this.title = "添加频道";
      this.value2 = "";
      this.value1 = "";
      this.input = "";
      this.isType = '1'
    },
    //修改主机
    changeHost(row) {
      this.show = false;
      this.show1 = true;
      this.title = "修改频道";
      console.log(row);
      this.value2 = row.hotelName;
      this.value1 = row.tvName;
      this.input = row.tvNum;
      this.hotelId = row.hotelId;
      this.id = row.id;
      this.isType = "2";
    },
    //保存
    save() {
      let data = {
        hotelId: this.hotelId,
        tvName: this.value1,
        tvNum: this.input,
        type: this.isType == "2" ? "2" : "1",
        id: this.id
      };
      this.addOrUpdateTmallTv(data);
    },
    handleDelete(row) {
      this.isType = "3";
      let data = {
        id: row.id,
        type: this.isType
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addOrUpdateTmallTv(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addOrUpdateTmallTv(data) {
      this.$api.addOrUpdateTmallTv(data).then(res => {
        if (res.success) {
          this.getTmallHotelTvList()
          if (this.isType == "2") {
            this.show = true;
            this.show1 = false;
          }
          if (this.isType == "3") {
            this.$message({
              type: "success",
              message: "删除成功!"
            });
          }
        }
        alert(res.msg);
      });
    },
    cancel() {
      this.show = true;
      this.show1 = false;
      this.title = "电视频道";
      this.hotelId = ''
    },
    search() {
      console.log(this.hotelId);
      this.getTmallHotelTvList();
    },
    //获取搜索酒店列表
    getAddHotelList() {
      this.$api.getTmallHotelList().then(res => {
        this.options = res.result;
      });
    },
    //获取频道列表
    getTmallHotelTvList() {
      this.$api
        .getTmallHotelTvList({
          hotelId: this.hotelId,
          pageNo: this.currentPage,
          pageSize: "10"
        })
        .then(res => {
          this.tableData = res.result;
          this.total = res.records;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.host {
  .el-pagination {
    width: 400px;
    position: relative;
    left: 250px;
    top: 20px;
  }
  .tip {
    position: fixed;
    z-index: 999;
    width: 86.5%;
    display: flex;
    justify-content: space-between;
    color: #666666;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dddada;
    font-size: 13px;
    padding-left: 15px;
    background: #ffffff;
    div {
      width: 55px;
      height: 28px;
      cursor: pointer;
      display: inline-block;
      margin-right: 90px;
      margin-top: 5px;
      line-height: 28px;
      text-align: center;
      color: #ffffff;
      border-radius: 5px;
      background: rgb(84, 82, 177);
    }
  }
  .add-host,
  .hotel-list {
    width: 90%;
    position: relative;
    top: 70px;
    padding: 30px;
    background: #ffffff;
    border-radius: 10px;
    margin: 0px 20px 20px 20px;
  }
  .search-btn {
    width: 80px;
    height: 35px;
    cursor: pointer;
    display: inline-block;
    margin-left: 50px;
    line-height: 35px;
    text-align: center;
    color: #ffffff;
    border-radius: 5px;
    background: rgb(84, 82, 177);
  }
  .house-list {
    width: 100%;
    margin-top: 30px;
  }
  .add-host {
    div {
      margin-bottom: 15px;
      .host-id-input {
        width: 215px;
        margin-left: 20px;
      }
    }
  }
}
</style>