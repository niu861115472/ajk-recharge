<template>
  <div class="device">
    <div class="tip">
      <p>{{title}}</p>
    </div>
    <!-- 设备列表 -->
    <div class="hotel-list">
      <div class="hotel-name">
        设备名称：
        <el-input class="host-id-input" v-model="input" placeholder="请输入内容"></el-input>
        <span style="marginLeft:50px"></span>
        设备ID：
        <el-input class="host-id-input" v-model="input" placeholder="请输入内容"></el-input>
        <span style="marginLeft:50px"></span>
        所属类型：
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
        <el-table :data="tableData" stripe border style="width: 68%">
          <el-table-column fixed prop="deviceName" label="设备名称" width="200"></el-table-column>
          <el-table-column prop="deviceId" label="设备ID" width="260"></el-table-column>
          <el-table-column prop="type" label="设备类型" width="150"></el-table-column>
          <el-table-column prop="isOnline" label="所属主机" width="180">上海主机</el-table-column>
          <el-table-column fixed="right" label="操作" width="200">
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
        <!-- <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="tableData.length"
        ></el-pagination> -->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1:false,
      options: [
        {
          value: "选项1",
          label: "开关"
        },
        {
          value: "选项2",
          label: "红外转发器"
        },
        {
          value: "选项3",
          label: "中央空调控制器"
        },
        {
          value: "选项4",
          label: "窗帘"
        },
        {
          value: "选项5",
          label: "情景面板"
        },
        {
          value: "选项6",
          label: "传感器"
        }
      ],
      tableData: [],
      value: "",
      PageSize: 5,
      currentPage: 1,
      title:'设备管理',
      input:''
    };
  },
  mounted() {
    this.getDeviceList()
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
      rows.splice(index, 0);
    },
    //添加主机
    addHost(){
      this.show = false
      this.show1 = true
      this.title = '添加主机'
    },
    //修改主机
    changeHost(){
      this.show = false
      this.show1 = true
      this.title = '修改主机'
    },
    //保存
    save(){
      this.show = true
      this.show1 = false
      this.title = '主机管理'
    },
    cancel(){
      this.show = true
      this.show1 = false
      this.title = '主机管理'
    },
    getDeviceList(){
      this.$rcuApi.getDevicesList({
        roomId:'0020-6666-FFFFFFFFFFFFFFFF'
      }).then(res=>{
        this.tableData = res.list
      })
    },
  }
};
</script>
<style lang="less" scoped>
.device {
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
    height: 600px;
    overflow-y: scroll;
    margin-top: 30px;
  }
  .hotel-name{
      .host-id-input{
        width: 215px;
        // margin-left: 10px;
      }
  }
}
</style>