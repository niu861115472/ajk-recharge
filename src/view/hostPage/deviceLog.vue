<template>
  <div class="device-log">
    <div class="tip">
      <p>{{title}}</p>
    </div>
    <!-- 主机列表 -->
    <div class="hotel-list" v-show="show">
      <div class="hotel-name">
        选择酒店：
        <el-select filterable v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="marginLeft:50px"></span>
        房间选择：
        <el-select filterable v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="marginLeft:50px"></span>
        选择设备：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <div class="search-btn">搜索</div>
      </div>
      <div class="time-search">
        选择时间：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div class="house-list">
        <el-table :data="tableData" stripe border style="width: 72%">
          <el-table-column fixed prop="name" label="设备名称" width="300"></el-table-column>
          <el-table-column fixed prop="id" label="ID" width="150"></el-table-column>
          <el-table-column prop="date" label="最新上报时间" width="250"></el-table-column>
          <el-table-column prop="active" label="上报原因"></el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="tableData.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show:true,
      show1:false,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      tableData: [
        {
          name: "XX酒店-101",
          date:'2019-09-01  08：23：41',
          active:'开门，开门方式：卡片'
        },
        {
          name: "XX酒店-101",
          date:'2019-09-01  08：23：41',
          active:'开'
        },
        {
          name: "XX酒店-101",
          date:'2019-09-01  08：23：41',
          active:'开门，开门方式：卡片'
        },
        {
          name: "XX酒店-101",
          date:'2019-09-01  08：23：41',
          active:'关'
        },
      ],
      value: "",
      PageSize: 10,
      currentPage: 1,
      title:'设备管理',
      input:''
    };
  },
  methods: {
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      console.log(val);
    }
  }
};
</script>
<style lang="less" scoped>
.device-log {
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
  .time-search{
    margin-top: 15px;
  }
  .add-host{
    div{
      margin-bottom: 15px;
      .host-id-input{
        width: 215px;
        margin-left: 20px;
      }
    }
  }
}
</style>