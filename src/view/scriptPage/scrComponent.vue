<template>
  <div class="script-main">
    <div class="tip">脚本刷入结果</div>
    <div class="refresh">
      <div @click="refresh">刷新</div>
    </div>
    <div class="refresh-result">
      <el-input type="textarea" :rows="13" placeholder="请输入内容" v-model="result"></el-input>
    </div>
    <div class="operate">
      酒店选择：
      <el-select v-model="value" filterable placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name"
          @click.native="selectHotel(item.id)"
        ></el-option>
      </el-select>
      <span style="marginLeft:50px"></span> 房间选择：
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.name"
          :label="item.name"
          :value="item.name"
          @click.native="selectHouse(item.id,item.houseType,item.hostId)"
        ></el-option>
      </el-select>
      <span style="marginLeft:195px"></span>
      <div class="search-btn" @click="getHotelScriptInfo">搜索</div>
      <div class="tabs">
          <div class="btn-box">
            <div class="search-btn" @click="saveHotelScript">保存</div>
            <div class="search-btn" @click="brushScriptInHost">刷入主机</div>
        </div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <el-tab-pane label="改名脚本" name="1">
            <el-input type="textarea" :rows="13" placeholder="请输入内容" v-model="text[0].value"></el-input>
          </el-tab-pane>
          <el-tab-pane label="情景脚本" name="2">
            <el-input type="textarea" :rows="13" placeholder="请输入内容" v-model="text[1].value"></el-input>
          </el-tab-pane>
          <el-tab-pane label="自动脚本" name="3">
            <el-input type="textarea" :rows="13" placeholder="请输入内容" v-model="text[2].value"></el-input>
          </el-tab-pane>
          <el-tab-pane label="情景清除脚本" name="4">
            <el-input type="textarea" :rows="13" placeholder="请输入内容" v-model="text[3].value"></el-input>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: "1",
      options: [],
      options1:[],
      text:[
        {
          id:0,
          value:''
        },
        {
          id:1,
          value:''
        },
        {
          id:2,
          value:''
        },
        {
          id:3,
          value:''
        }
      ],
      value: "",
      value1:'',
      hotelId:'',
      hotelId1:'',
      houseId:'',
      houseId1:'',
      houseType:'',
      houseType1:'',
      hostId:'',
      hostId1:'',
      type:'1',
      script:'',
      result:'',
      date:''
    };
  },
  mounted() {
    this.getHotelList()
    this.formatDate()
  },
  methods: {
    handleClick(tab) {
      console.log(tab)
      this.type = tab.name
    },
    formatDate(){
      let date = new Date()
      let newDate = new Date(date);
      let year = newDate.getFullYear();
      let month = (newDate.getMonth() + 1) > 10 ? newDate.getMonth() + 1 : ('0' + (newDate.getMonth() + 1));
      let day = newDate.getDate() > 10 ? newDate.getDate() : ('0' + newDate.getDate())
      this.date = year + '-' + month + '-' + day
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
      this.hotelId = id
      this.getHotelHouseList(id)
      this.value1 = ''
    },
    //选择房间
    selectHouse(id,type,hostId){
      this.houseId = id
      this.hostId = hostId
      this.houseType = type
    },
    // 搜索
    getHotelScriptInfo(){
      this.$api.getHotelScriptInfo({
        hotelId:this.hotelId,
        houseId:this.houseId,
        hostId:this.hostId,
        houseType:this.houseType
      }).then(res=>{
        if(res.success){
          this.houseType1 = res.houseType
          this.hotelId1 = res.result[0].hotelId
          this.houseId1 = res.result[0].houseId
          this.hostId1 = res.result[0].hostId
          this.text[0].value = res.result[0].renameScript
          this.text[1].value = res.result[0].sceneScript
          this.text[2].value = res.result[0].automaticScript
          this.text[3].value = res.result[0].sceneClearScript
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    //保存
    saveHotelScript(){
      this.$api.saveHotelScript({
        hotelId:this.hotelId1,
        houseId:this.houseId1,
        type:this.type,
        scriptInfo:encodeURI(this.text[this.type - 1].value)
      }).then(res =>{
        if(res.success){
          this.$message.success(res.msg);
        }else{
          this.$message.error(res.msg);
        }
      })
    },
    //刷入主机
    brushScriptInHost(){
      this.$api.brushScriptInHost({
        hostId:this.hostId1,
        scriptInfo:this.text[this.type - 1].value
      }).then(res =>{
        if(res.success){
          this.$message.success(res.msg)
          this.getLogInfo(this.hostId1)
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    //刷入结果展示
    getScriptForHost(hostId){
      this.$api.getScriptForHost({
        hostId:hostId
      }).then(res=>{
        this.result = res.result[0]
      })
    },
    //刷入主机后日志
    getLogInfo(hostId){
      this.$api.getLogInfo({
        hostId:hostId,
        dateStr:this.date
      }).then(res=>{
        if(res.success){
          this.$message.success(res.msg)
          this.result = res.result[0]
        }else{
          this.$message.error(res.msg)
        }
      })
    },
    //刷新
    refresh(){
      this.getScriptForHost(this.hostId)
    }
  }
};
</script>
<style scoped>
.script-main{
  height: 90%;
  overflow-y: scroll;
}
.script-main .tip {
  color: #666666;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddada;
  font-size: 13px;
  padding-left: 15px;
  background: #ffffff;
}
.refresh {
  width: 90%;
  text-align: right;
}
.refresh div {
  width: 80px;
  height: 35px;
  cursor: pointer;
  margin-top: 10px;
  margin-left: auto;
  line-height: 35px;
  text-align: center;
  color: #ffffff;
  border-radius: 5px;
  background: rgb(84, 82, 177);
}
.refresh-result {
  width: 80%;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
  background: #ffffff;
}
.operate {
  padding: 20px;
  border-radius: 10px;
  background: #fff;
  color: #666666;
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
.tabs {
  position: relative;
  width: 60%;
  margin-top: 20px;
}
.btn-box{
    position: absolute;
    z-index: 999;
    right: 0;
}
</style>