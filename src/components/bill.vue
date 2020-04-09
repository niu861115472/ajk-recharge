<template>
  <div class="bill bill_box">
      <div class="bill_list">
          <ul>
              <li>
                  <span>账单类型：</span>
                  <el-select size='small' @change="selectBillType($event,value)" v-model="value" placeholder="请选择">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </li>
              <li>
                  <span>年份：</span>
                  <el-select size='small' v-model="value2" placeholder="请选择">
                      <el-option
                          v-for="item in options2"
                          :key="item.value"
                          :label="item.label"
                          :value="item.label">
                      </el-option>
                  </el-select>
              </li>
              <li>
                  <span>月份：</span>
                  <el-select size='small' v-model="value1" placeholder="请选择">
                      <el-option
                          v-for="item in options1"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
              </li>
              <li><div class="search" @click="searchBill()">搜索</div></li>
          </ul>
          
    </div>
    <el-table :data="tableData4" border max-height="500" style="width:65%">
      <el-table-column prop="time" label="日期" width="280"></el-table-column>
      <el-table-column prop="item" label="事项" width="400"></el-table-column>
      <el-table-column prop="money" width="100" label="金额"></el-table-column>
      <el-table-column fixed="right" label="凭证" width="180">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">
            <span v-if="modal == '1'">查看</span>
            <span v-if="modal != '1'" style="color:#666666">暂无操作</span>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="reduce_money">总计：{{num}}</div>
    <el-dialog title="扣款凭证" :visible.sync="dialogVisible" width="25%">
      <p class="time_total">
        <span v-if="payType == 1">插卡时间统计</span>
        <span v-if="payType == 2">红外感应次数统计</span>
      </p>
      <div class="date_list">
        <ul>
          <li v-for="(item,index) in date_list" :key="index">
            <div class="date_box">
              <p v-if="payType == 1">{{item.inTime + ' ' + '--' + ' ' +item.outTime}}</p>
              <p v-if="payType == 2">
                {{item.year + '-' + item.month + '-' + item.day + ' ' + item.hour + ':00' + '--' 
                + item.year + '-' + item.month + '-' + item.day + ' ' + (item.hour+1) + ':00'
                }}</p>
              <p v-if="payType == 1">{{item.hour.toFixed(2)}}</p>
              <p v-if="payType == 2">{{item.hourTimes}}</p>
            </div>
          </li>
        </ul>
        <p class="total_hour">合计:{{allHour}}
          <span v-if="payType == 1">小时</span>
          <span v-if="payType == 2">次</span>
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确定</el-button>
      </span>
    </el-dialog>
<el-pagination
  background
  layout="prev, pager, next"
  @size-change="handleSizeChange" 
  @current-change="handleCurrentChange" 
  :page-size='5'
  :total="total">
</el-pagination>
  </div>
</template>
<script>
export default {
  props:['message'],
  data() {
    return {
      PageSize:5,
      currentPage:1,
      tableData4: [],
      date_list: [],
      dialogVisible: false,
      options:[
          {value:'1',label:'扣款账单'},
          {value:'2',label:'充值账单'},
          {value:'3',label:'赠送账单'}
        ],
        options2:[
          {value:'1',label:'2019年'},
          {value:'2',label:'2020年'},
          {value:'3',label:'2021年'},
          {value:'4',label:'2022年'},
          {value:'5',label:'2023年'},
          {value:'6',label:'2024年'},
          {value:'7',label:'2025年'},
          {value:'8',label:'2026年'},
          {value:'9',label:'2027年'},
          {value:'10',label:'2028年'},
          {value:'11',label:'2029年'},
          {value:'12',label:'2030年'},
      ],
      options1:[
          {value:'1',label:'1月'},
          {value:'2',label:'2月'},
          {value:'3',label:'3月'},
          {value:'4',label:'4月'},
          {value:'5',label:'5月'},
          {value:'6',label:'6月'},
          {value:'7',label:'7月'},
          {value:'8',label:'8月'},
          {value:'9',label:'9月'},
          {value:'10',label:'10月'},
          {value:'11',label:'11月'},
          {value:'12',label:'12月'},
      ],
      modal:'1',
      value:'1',
      value1:'',
      value2:'',
      childVal:'',
      type:'1',
      year:'',
      time:'',
      allHour:'',
      total:0,
      payType:''
    };
  },
  computed: {
    num:function(){
      var numArr = this.tableData4.map(item => {
        return item.money;
      });
      return numArr.reduce(function(prev, cur) {
        return prev + Math.abs(cur);
      },0);
    }
  },
  mounted() {
    this.getMonth()
    this.getBillList();
  },
  methods: {
    getBillList(type,time){
      
      let accountNo = this.message ? this.message : sessionStorage.getItem('account')
      console.log(accountNo)
      this.$api.getBalanceList({
        accountNo:accountNo,
	      billType:this.type, 
	      time:this.time,
	      pageNo:this.currentPage,  
        pageSize:"5"
      }).then(res=>{
        this.tableData4 = res.result
        this.total = res.records
        this.payType = res.payReason
      })
    },
    selectBillType(event,value){
      this.value = value
    },
    getMonth(){
      let date = new Date();
      let newDate = new Date(date)
      this.year = newDate.getFullYear()
      let month = newDate.getMonth()+1
      this.time = this.year + '-' + month
      this.value1 =  month + '月'
    },
    handleClick(row,index) {
      console.log(row)
      if(this.modal == '1'){
        this.dialogVisible = true;
      }
      this.payType = row.payReason
      if(this.payType == 1){
        this.getOperateCardDailyList(row.hotelId,row.hotelHouseId,row.startTime,row.endTime,index)
        return
      }
      if(this.payType == 2){
        this.getOperateInfraredDailyList(row.hotelId,row.hotelHouseId,row.startTime,row.endTime,index)
        return
      }
    },
    handleSizeChange(val){
      this.PageSize = val
      this.currentPage = 1
    },
    handleCurrentChange(val){
      this.currentPage = val
      this.getBillList()
      console.log(val)
    },
    searchBill(){
      console.log(this.value2,this.value1)
      this.type = this.value;
      this.time = this.value2.replace('年','') + '-' + this.value1.replace('月','');
      this.modal = this.value
      this.getBillList()
    },
    //获取插卡扣款账单凭证
    getOperateCardDailyList(hotelId,hotelHouseId,startTime,endTime,index){
      const TYPE = sessionStorage.getItem('type')
      this.$api.getOperateCardDailyList({
          accountNo:TYPE == '0' ? sessionStorage.getItem('hotelAccount') : sessionStorage.getItem('account'),
 	        hotelId:hotelId,
 	        hotelHouseId:hotelHouseId,
 	        startTime:startTime,
 	        endTime:endTime 
      }).then(res=>{
        this.date_list = res.result
        this.allHour = res.result[0].allHour.toFixed(2)
      })
    },
    //获取红外扣款账单凭证
    getOperateInfraredDailyList(hotelId,hotelHouseId,startTime,endTime,index){
      
      const TYPE = sessionStorage.getItem('type')
      this.$api.getOperateInfraredDailyList({
          accountNo:TYPE == '0' ? sessionStorage.getItem('hotelAccount') : sessionStorage.getItem('account'),
 	        hotelId:hotelId,
 	        hotelHouseId:hotelHouseId,
 	        startTime:startTime,
 	        endTime:endTime 
      }).then(res=>{
        this.date_list = res.result
        this.allHour = res.result[0].times
      })
    }
  }
};
</script>
<style scoped>
li {
  list-style: none;
}
.el-pagination{
  width: 400px;
  position: relative;
  left: 250px;
  bottom: 40px;
}
.time_total {
  position: relative;
  bottom: 30px;
}
.date_list ul {
  margin-left: 20px;
}
.date_list ul li {
  padding: 10px 0;
  border-bottom: 1px solid #cccaca;
}
.date_list ul li .date_box {
  display: flex;
}
.date_list ul li .date_box p:nth-child(2) {
  margin-left: 50px;
}
.total_hour {
  width: 100%;
  position: relative;
  top: 20px;
  font-size: 16px;
  text-align: right;
}
.reduce_money {
  padding: 20px 0;
  margin-left: 500px;
  text-align: center;
}
.bill{
    /* width: 90%; */
    color: #666666;
    background: #ffffff;
    border-radius: 8px;
    margin: 20px 20px 0 20px;
    padding: 20px 0 0px 40px
}
.bill .bill_list{
    width: 80%;
    margin-top: 20px;
    margin-bottom: 30px;
}
.bill .bill_list ul{
    display: flex;
    
}
.bill .bill_list ul li:not(:first-child){
  margin-left: 80px;
}
.bill .bill_list .search{
    padding: 5px 20px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
    background: rgb(81, 83, 179)
}
</style>
