<template>
  <div class="log-query">
    <div class="tip">日志查询</div>
    <div class="operate-area">
      酒店名称：
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name"
          @click.native="selectHotel(item.id)"
        ></el-option>
      </el-select>
      <span style="marginLeft:50px"></span>
      房间选择：
      <el-select v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.name"
          :label="item.name"
          :value="item.name"
          @click.native="selectHouse(item.hostId)"
        ></el-option>
      </el-select>
      <span style="marginLeft:50px"></span>
      日期选择：
      <el-date-picker
        v-model="value1"
        value-format="yyyy-MM-dd"
        type="date"
        :picker-options="pickerOptions"
        placeholder="选择日期"
      ></el-date-picker>
      <div class="search-btn" @click="getLogInfo">搜索</div>
      <div class="log-text">
        <el-input type="textarea" :rows="30" placeholder="请输入内容" v-model="result"></el-input>
      </div>
      <!-- <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="5"
        :total="5"
      ></el-pagination> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pickerOptions: {},
      options: [],
      options1:[],
      value: "",
      value1: "",
      value2: "",
      PageSize: 5,
      currentPage: 1,
      timestamp: "",
      hostId:'',
      result:''
    };
  },
  created() {
    var nowDate = new Date();
    nowDate.setMonth(nowDate.getMonth() - 1);
    var timestamp = Date.parse(nowDate);
    this.pickerOptions = {
      disabledDate(time) {
        return time.getTime() < timestamp || time.getTime() > Date.now();
      }
    };
  },
  mounted() {
    this.getHotelList()
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
    //酒店下拉数据
    getHotelList(){
      this.$api.getHotelList().then(res =>{
        this.options = res.result
        console.log(this.options)
      })
    },
    //房间下拉数据
    getHotelHouseList(id){
      this.$api.getHotelHouseList({
        hotelId:id
      }).then(res=>{
        this.options1 = res.result
      })
    },
    //选择酒店
    selectHotel(id){
      this.getHotelHouseList(id)
      this.value2 = ''
    },
    //选择房间
    selectHouse(hostId){
      this.hostId = hostId
    },
    getLogInfo(){
      this.$api.getLogInfo({
        hostId:this.hostId,
        dateStr:this.value1
      }).then(res=>{
        this.result = res.result[0]
      })
    }
  }
};
</script>
<style scoped>
.el-pagination {
  width: 400px;
  position: relative;
  left: 250px;
  top: 20px;
}
.log-query{
  height: 90%;
  overflow-y: scroll
}
.tip {
  color: #666666;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddada;
  font-size: 13px;
  padding-left: 15px;
  background: #ffffff;
}
.operate-area {
  background: #ffffff;
  border-radius: 10px;
  padding: 30px 30px 40px 30px;
  margin: 20px;
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
.log-text {
  width: 71%;
  margin-top: 40px;
  border-radius: 5px;
}
.log-text ul li{
  list-style: none;
  margin-bottom: 15px;
}
</style>
