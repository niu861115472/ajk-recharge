<template>
  <div class="power-monitor">
    <div class="tip">
      <p>{{title}}</p>
    </div>
    <!-- 主机列表 -->
    <div class="hotel-list" v-show="show">
      <div class="hotel-name">
        所属酒店：
        <el-select v-model="value" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <span style="marginLeft:50px"></span>
        房间选择：
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
      <div class="house-list">
        <el-table :data="tableData" stripe border style="width: 72%">
          <el-table-column fixed prop="name" label="线路名称" width="180"></el-table-column>
          <el-table-column prop="id" label="电流" width="120"></el-table-column>
          <el-table-column prop="type" label="电压" width="120"></el-table-column>
          <el-table-column prop="isOnline" label="温度" width="120"></el-table-column>
          <el-table-column prop="isOnline" label="漏电" width="120"></el-table-column>
          <el-table-column prop="isOnline" label="功率" width="120"></el-table-column>
          <el-table-column prop="deviceStatus" label="状态" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="open">打开</el-button>
              <el-button type="text" size="small" @click="close">关闭</el-button>
              <el-button @click="changeHost(scope.row)" type="text" size="small">编辑</el-button>
            </template>
          </el-table-column>
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
    <!-- 编辑主机 -->
    <div class="edit-host" v-show="show1">
      <div>
        线路名称：
        <el-input class="host-id-input" v-model="input" placeholder="请输入内容"></el-input>
      </div>
      <div>
        最大电流：
        <el-input class="host-id-input" v-model="input" placeholder="请输入电流"></el-input>
      </div>
      <div>
        过压值：
        <span style="marginLeft:15px"></span>
        <el-input class="host-id-input" v-model="input" placeholder="请输入电流"></el-input>
      </div>
      <div>
        欠压值：
        <span style="marginLeft:15px"></span>
        <el-input class="host-id-input" v-model="input" placeholder="请输入电流"></el-input>
      </div>
      <div>
        锁定手动：
        <span style="marginLeft:15px"></span>
        <el-radio v-model="radio" label="1">关闭</el-radio>
        <el-radio v-model="radio" label="2">开启</el-radio>
      </div>
      <div>
        漏电预警值：
        <el-input class="host-id-input" v-model="input" placeholder="请输入预警值，单位mA"></el-input>
      </div>
      <div>
        漏电动作值：
        <el-input class="host-id-input" v-model="input" placeholder="请输入预警值，单位mA"></el-input>
      </div>
      <div class="operate-btn">
        <div class="search-btn" @click="save">保存</div>
        <div class="search-btn" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      show1: false,
      radio: "1",
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
          id: "12345667",
          type: "龙坞403",
          isOnline: "在线",
          deviceStatus: "lan"
        },
        {
          name: "XX酒店-101",
          id: "12345667",
          type: "龙坞403",
          isOnline: "在线",
          deviceStatus: "lan"
        },
        {
          name: "XX酒店-101",
          id: "12345667",
          type: "龙坞403",
          isOnline: "在线",
          deviceStatus: "lan"
        },
        {
          name: "XX酒店-101",
          id: "12345667",
          type: "龙坞403",
          isOnline: "在线",
          deviceStatus: "lan"
        }
      ],
      value: "",
      PageSize: 10,
      currentPage: 1,
      title: "电源监控",
      input: ""
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
    },
    changeHost() {
      this.show = false;
      this.show1 = true;
    },
    save() {
      this.show = true;
      this.show1 = false;
    },
    cancel() {
      this.show = true;
      this.show1 = false;
    },
    open() {
      this.$confirm("此操作将打开该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "打开成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    close(){
        this.$confirm("此操作将关闭该设备, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "关闭成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    }
  }
};
</script>
<style lang="less" scoped>
.power-monitor {
  height: 90%;
  overflow-y: scroll;
  .el-pagination {
    width: 400px;
    position: relative;
    left: 250px;
    top: 20px;
  }
  .tip {
    position: fixed;
    z-index: 999;
    width: 90%;
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
  .edit-host,
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
  .edit-host {
    div {
      margin-bottom: 15px;
      .host-id-input {
        width: 215px;
        // margin-left: 20px;
      }
    }
  }
}
</style>