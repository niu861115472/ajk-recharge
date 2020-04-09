<template>
  <div class="power-host">
    <div class="tip">
      <p>{{title}}</p>
      <div @click="addHost" v-show="show">添加</div>
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
        主机状态：
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
          <el-table-column fixed prop="name" label="所属酒店" width="180"></el-table-column>
          <el-table-column prop="id" label="SN码" width="180"></el-table-column>
          <el-table-column prop="type" label="设备名称" width="180"></el-table-column>
          <el-table-column prop="isOnline" label="状态" width="120"></el-table-column>
          <el-table-column prop="deviceStatus" label="上网方式" width="120"></el-table-column>
          <el-table-column fixed="right" label="操作" width="280">
            <template slot-scope="scope">
              <el-button @click="changeHost(scope.row)" type="text" size="small">修改</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >删除</el-button>
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
    <!-- 添加主机 -->
    <div class="add-host" v-show="show1">
      <div>
        酒店名称：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        S N 码 ：
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
      <div>
        主机名称：
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
export default {
  data() {
    return {
      show: true,
      show1: false,
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
      title: "电源主机",
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
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //添加主机
    addHost() {
      this.show = false;
      this.show1 = true;
      this.title = "添加主机";
    },
    //修改主机
    changeHost() {
      this.show = false;
      this.show1 = true;
      this.title = "修改主机";
    },
    //保存
    save() {
      this.show = true;
      this.show1 = false;
      this.title = "电源主机";
    },
    cancel() {
      this.show = true;
      this.show1 = false;
      this.title = "电源主机";
    }
  }
};
</script>
<style lang="less" scoped>
.power-host {
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
        // margin-left: 20px;
      }
    }
  }
}
</style>