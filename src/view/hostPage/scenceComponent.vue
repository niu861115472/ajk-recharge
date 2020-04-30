<template>
  <div class="scence">
    <div class="tip">
      <p>{{title}}</p>
    </div>
    <!-- 设备列表 -->
    <div class="hotel-list">
      <div class="hotel-name">
        所属主机：
        <el-select v-model="value" filterable placeholder="请选择主机">
          <el-option
            v-for="item in options"
            :key="item.roomId"
            :label="item.hotelName + item.roomName + item.roomNo"
            :value="item.roomId"
            @click.native="search(item.roomId)"
          ></el-option>
        </el-select>
        <div class="search-btn" @click="toSearch">搜索</div>
      </div>
      <div class="house-list">
        <el-table :data="tableData" stripe border style="width: 56%">
          <el-table-column fixed prop="name" label="情景名称" width="240"></el-table-column>
          <el-table-column prop="id" label="情景ID" width="250"></el-table-column>
          <el-table-column prop="type" label="所属主机" width="180"></el-table-column>
          <el-table-column fixed="right" label="操作" width="150">
            <template slot-scope="scope">
              <el-button @click="changeHost(scope.row)" type="text" size="small">测试</el-button>
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      show1:false,
      options: [],
      tableData: [],
      value: "",
      PageSize: 10,
      currentPage: 1,
      title:'情景管理',
      input:'',
      total:1,
      serverId:''
    };
  },
  mounted() {
    this.getAddHostList()
    // this.getScenceList()
  },
  methods: {
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getScenceList()
      console.log(val);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    search(id){
      this.serverId = id
    },
    toSearch(){
      this.getScenceList()
    },
    changeHost(row){
      this.$rcuApi.senseControl({
        roomId:row.serverId,
        sceneId:row.sceneId
      }).then(res =>{
        alert(res.msg)
      })
    },
    getAddHostList(){
      this.$rcuApi.getAddHostList().then(res =>{
        this.serverId = res.result[0].roomId
        this.options = res.result
        this.getScenceList()
      })
    },
    getScenceList(){
      this.$rcuApi.getScenceList({
        serverId:this.serverId,
        pageNo:this.currentPage,
        pageSize:'10'
      }).then(res =>{
        this.total = res.records;
        this.tableData = res.result
      })
    }
  }
};
</script>
<style lang="less" scoped>
.scence {
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
  .hotel-name{
      .host-id-input{
        width: 215px;
        // margin-left: 10px;
      }
  }
}
</style>