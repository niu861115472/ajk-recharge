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
            @click.native="selectHotel(item.id)"
          ></el-option>
        </el-select>
        <span style="marginLeft:50px"></span>
        房间名称：
        <el-select v-model="value1" filterable placeholder="请选择">
          <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
        <span style="marginLeft:50px"></span>
        主机状态：
        <el-select v-model="status" placeholder="请选择">
          <el-option
            v-for="item in hostStatus"
            :key="item.id"
            :label="item.status"
            :value="item.status"
          ></el-option>
        </el-select>
        <div class="search-btn" @click="search">搜索</div>
      </div>
      <div class="house-list">
        <el-table :data="tableData" stripe border style="width: 80%">
          <el-table-column fixed prop="name" label="名称" width="220"></el-table-column>
          <el-table-column prop="serverId" label="ID" width="250"></el-table-column>
          <el-table-column prop="单机" label="类型" width="120">-</el-table-column>
          <el-table-column prop="在线" label="在离线情况" width="120">-</el-table-column>
          <el-table-column prop="正常" label="设备状态" width="120">-</el-table-column>
          <el-table-column fixed="right" label="操作" width="350">
            <template slot-scope="scope">
              <el-button @click="handleSynDevice(scope.row)" type="text" size="small">同步设备</el-button>
              <el-button @click="clearDevice(scope.row)" type="text" size="small">清理设备</el-button>
              <el-button @click="syncHostScence(scope.row)" type="text" size="small">同步情景</el-button>
              <el-button @click="changeHost(scope.row)" type="text" size="small">修改主机</el-button>
              <el-button
                @click.native.prevent="deleteRow(scope.$index, tableData)"
                type="text"
                size="small"
              >删除主机</el-button>
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
            v-for="(item,index) in options"
            :key="index"
            :label="item.name"
            :value="item.name"
            @click.native="selectHotel(item.id)"
          ></el-option>
        </el-select>
      </div>
      <div>
        选择房间：
        <el-select v-model="value3" filterable placeholder="请选择">
          <el-option v-for="item in options1" :key="item.id" :label="item.name" :value="item.name"></el-option>
        </el-select>
      </div>
      <div>
        主机ID：&nbsp;&nbsp;&nbsp;
        <el-select v-model="value4" filterable placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.roomId"
            :label="item.hotelName + item.roomName + item.roomNo"
            :value="item.roomId"
            @click.native="selectId(item.roomId)"
          ></el-option>
        </el-select>
      </div>
      <div>
        是否收费：&nbsp;
        <el-radio v-model="radio" label="0">否</el-radio>
        <el-radio v-model="radio" label="1">是</el-radio>
      </div>
      <div v-if="radio ==1">
        收费方式:&nbsp;&nbsp;&nbsp;&nbsp;
        <el-radio v-model="radio1" label="1">按次</el-radio>
        <el-radio v-model="radio1" label="2">按天</el-radio>
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
      options: [],
      options1: [],
      options2: [],
      hostStatus: [{ id: 1, status: "在线" }, { id: 2, status: "离线" }],
      status: "",
      tableData: [],
      value: "",
      value1: "",
      value2: "",
      value3: "",
      value4: "",
      PageSize: 10,
      currentPage: 1,
      total: 1,
      title: "主机管理",
      input: "",
      serverId: "",
      radio: "0",
      radio1: "1",
      isType: ""
    };
  },
  mounted() {
    this.getHotelList();
    this.getHostList(name);
    this.getAddHostList();
  },
  methods: {
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHostList(name);
      console.log(val);
    },
    deleteRow(index, rows) {
      console.log(index);
      let data = {
        type: "3",
        id: rows[index].id
      };
      this.$confirm("是否同步设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addOrUpdateSmartHost(data);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    syncHostScence(row) {
      this.$confirm("是否同步情景?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
        console.log(row)
          this.$rcuApi.syncHostScene({
              serverId: row.serverId
            })
            .then(res => {
              alert(res.msg)
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          })
        })
    },
    //添加主机
    addHost() {
      this.show = false;
      this.show1 = true;
      this.isType = "1";
      this.title = "添加主机";
      this.value2 = "";
      this.value3 = "";
      this.value4 = "";
      this.radio = "0";
    },
    //修改主机
    changeHost(row) {
      console.log(row);
      this.show = false;
      this.show1 = true;
      this.isType = "2";
      this.title = "修改主机";
      let arr = row.name.split("_");
      this.value2 = arr[0];
      this.value3 = arr[1];
      let arr1 = this.options2.filter(item => {
        return item.roomId == row.serverId;
      });
      this.value4 = arr1[0].roomName + arr1[0].roomNo;
    },
    //选择主机ID
    selectId(id) {
      console.log(id);
      this.serverId = id;
    },
    //保存
    save() {
      let data = {
        name: this.value2 + "_" + this.value3,
        serverId: this.serverId,
        isFree: this.radio,
        chargeWay: this.radio1,
        type: this.isType,
        id: ""
      };
      this.addOrUpdateSmartHost(data);
      this.title = "主机管理";
    },
    cancel() {
      this.show = true;
      this.show1 = false;
      this.title = "主机管理";
    },
    selectHotel(id) {
      console.log(id);
      this.getHouseList(id);
    },
    //搜索
    search() {
      let name = this.value + this.value1;
      this.getHostList(name);
    },
    //同步设备
    handleSynDevice(row) {
      this.$confirm("是否同步设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$rcuApi
            .syncHostDevices({
              id: row.id,
              serverId: row.serverId
            })
            .then(res => {
              alert(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //清理设备
    clearDevice(row) {
      this.$confirm("是否清理设备?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$rcuApi
            .clearHostDevices({
              id: row.id
            })
            .then(res => {
              alert(res.msg);
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消"
          });
        });
    },
    //获取酒店列表
    getHotelList() {
      this.$api.getTmallHotelList().then(res => {
        this.options = res.result;
      });
    },
    //房间下拉数据
    getHouseList(id) {
      this.$api
        .getHotelHouseList({
          hotelId: id
        })
        .then(res => {
          this.options1 = res.result;
        });
    },
    //获取主机列表（主页分页）
    getHostList(name) {
      this.$rcuApi
        .getHostList({
          name: name,
          pageNo: this.currentPage,
          pageSize: "10"
        })
        .then(res => {
          this.tableData = res.result;
          this.total = res.records;
        });
    },
    //获取添加主机列表
    getAddHostList() {
      this.$rcuApi.getAddHostList().then(res => {
        // this.options1 = res.list
        this.options2 = res.result;
      });
    },
    //添加、修改、删除主机
    addOrUpdateSmartHost(data) {
      this.$rcuApi.addOrUpdateSmartHost(data).then(res => {
        if (res.success) {
          this.show = true;
          this.show1 = false;
          this.getHostList(name);
        }
        alert(res.msg);
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