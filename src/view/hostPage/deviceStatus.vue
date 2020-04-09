<template>
  <div class="device-status">
    <div class="tip">
      <p>{{title}}</p>
    </div>
    <!-- 设备列表 -->
    <div class="hotel-list">
      <div class="hotel-name">
        房间选择：
        <el-select v-model="value" placeholder="请选择房间">
          <el-option
            v-for="item in options"
            :key="item.roomId"
            :label="item.roomName + item.roomNo"
            :value="item.roomId"
            @click.native="selectId(item.roomId)"
          ></el-option>
        </el-select>
        <div class="search-btn" @click="search">搜索</div>
      </div>
      <div class="house-list">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane label="设备状态" name="first">
            <el-table :data="tableData" stripe border style="width: 71%">
              <el-table-column prop="deviceName" label="名称" width="240"></el-table-column>
              <el-table-column prop="type" label="类型" width="150"></el-table-column>
              <el-table-column label="开关" width="120">
                <template slot-scope="scope">
                    <span v-if="scope.row.open == 0">关</span>
                    <span v-else>开</span>
                </template>
              </el-table-column>
              <el-table-column prop="power" label="电量" width="120">-</el-table-column>
              <el-table-column prop="powerStatus" label="电池状态" width="120">-</el-table-column>
              <el-table-column prop="lineStatus" label="在网状态" width="120">-</el-table-column>
              <el-table-column prop="date" label="上报时间">-</el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="设备控制" name="second">
            <el-table :data="tableData" stripe border style="width: 47%">
              <el-table-column prop="deviceName" label="名称" width="450"></el-table-column>
              <el-table-column prop="switch" label="开关">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.switch" @change="change(scope.$index,scope.row)"></el-switch>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="1"
        ></el-pagination> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1: false,
      options: [],
      tableData: [],
      value: "",
      value1: true,
      PageSize: 10,
      currentPage: 1,
      title: "设备状态",
      input: "",
      activeName: "first",
      roomId:''
    };
  },
  mounted() {
    this.getAddHostList()
  },
  methods: {
    handleClick(tab, event) {
      console.log(this.tableData);
    },
    change: function(index, row) {
      console.log(index, row);
      const val = row.switch == true ? 'open' : 'close'
      this.deviceControl(row.type,val,row.deviceId)
    },
    selectId(id){
      this.roomId = id
    },
    search(){
      this.getDeviceList(this.roomId)
    },
    //获取房间列表
    getAddHostList() {
      this.$rcuApi.getAddHostList().then(res => {
        this.options = res.result;
        this.getDeviceList(res.result[0].roomId)
      });
    },
    getDeviceList(roomId){
      this.$rcuApi.getDevicesList({
        roomId:roomId
      }).then(res=>{
        this.tableData = res.devices
      })
    },
  //设备控制
    deviceControl(type,val,deviceId){
      this.$rcuApi.deviceControl({
        type:type,
        op:'switch',
        val:val,
        deviceId:deviceId
      }).then(res=>{
      })
    }
  }
};
</script>
<style lang="less">
.device-status {
  .el-tabs__header {
    margin: 0;
    // border-bottom: none
  }
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
      margin-right: 50px;
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
  .el-tabs__content{
    height: 600px;
    overflow-y: scroll;
  }
  .hotel-name {
    .host-id-input {
      width: 215px;
    }
  }
}
</style>