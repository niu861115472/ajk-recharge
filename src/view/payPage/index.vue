<template>
    <div class="index">
       <div class="aside">
           <ul>
               <li>
                   <img src="../../assets/logo.png" alt="">
                   <p>爱居客管理平台</p>
                </li>
               <li v-if="type == 1"><i class="el-icon-menu"></i>酒店信息（酒店端）</li>
               <li v-if="type == 0" @click="toChild()"><i class="el-icon-menu"></i>酒店信息（大后台）</li>
               <li @click="back">返回上一页</li>
           </ul>
       </div>

       <div class="box">
           <div class="header">
               <ul>
                   <li><img src="../../assets/username.png" alt=""> {{loginUser}}</li>
                   <li><i class="el-icon-setting"> 修改密码</i></li>
                   <li @click="logout()"><i class="el-icon-d-arrow-left"></i> 安全退出</li>
               </ul>
           </div>
           <div class="main" v-if="type == 1">
               <div v-if="show1" class="tip"><i class="el-icon-tickets"></i>  &nbsp;酒店信息</div>
               <div v-if="show1" class="house_info">
                   <div class="top_msg">
                       <div class="left">
                           <span>{{list.name}}</span>
                           <span>&nbsp;&nbsp;{{list.address}}</span>
                       </div>
                       <div class="right">
                           <p>
                               <span>余额：</span>
                               <span>{{(list.payMoney+list.giveMoney).toFixed(2)}}</span>
                               <span>(充值余额：</span>
                               <span style="color:#f00d46">{{list.payMoney}}</span>
                               &nbsp;&nbsp;
                               <span>赠送余额：</span>
                               <span style="color:#1dda55">{{list.giveMoney}})</span>
                            </p>
                           <div @click="qrCode">充值</div>
                       </div>
                   </div>
                   <div class="house_list">
                       <ul>
                           <li v-for="(item,index) in hotelList" :key="index">{{item.replace(/[^0-9]/ig,"")}}</li>
                       </ul>
                   </div>
               </div>
               <div class="tip"><i class="el-icon-tickets"></i>  &nbsp;账单信息</div>
               <bill></bill>
           </div>
           <main-page v-if="type == 0" @listenToChildEvent="getChildMsg"></main-page>
           <div class="footer">
               <a href="http://www.live-ctrl.com" target="_blank">2018 ©爱居客 &nbsp;All Rights Reserved. </a>
            </div>
       </div>
       <div v-show="show" class="qrcode_box" @click.self="hideQr">
            <phone-page v-show="show"></phone-page>
       </div>
    </div>
</template>
<script>
import Bill from '../../components/bill'
import MainPage from './ourIndex'
import PhonePage from './phonePage'
export default {
    inject:['reload'],
    data(){
        return{
            other:2,
            show:false,
            show1:true,
            type:sessionStorage.getItem('type'),
            ins:this.$route.query.ins,
            list:'',
            hotelList:[],
            loginUser:sessionStorage.getItem('account')
        }
    },
    mounted() {
        if(sessionStorage.getItem('type') == 1){
            this.getHotelInfo()
        }
    },
    methods: {
    back(){
        window.location.href = 'http://www.live-ctrl.com/aijukex/tenement/mainPage'
    },
    logout(){
        window.location.href = 'http://www.live-ctrl.com/aijukex/login/logout'
    },
    hideQr(){
        this.show = false
    },
    qrCode(){
        this.show = true
    },
    getChildMsg(data){
        this.ins = data
        this.show1 = false
    },
    getHotelInfo(){
        this.$api.getHotelInfo({
        }).then(res=>{
            console.log(res)
            this.list = res.result[0]
            let arrStr = res.result[0].houseNameStr
            this.hotelList = arrStr.split(',')
            console.log()
        })
    },
    toChild(){
        this.reload()
    }
},
    components:{
        Bill,
        MainPage,
        PhonePage
    }
}
</script>
<style scoped>
li{list-style: none;}
.el-icon-menu{
    width: 20px;
    height: 20px;
}
.index{
    width: 100%;
    height: 100%;
    display: flex;
}
.index .aside{
    width: 10%;
    height: 100%;
    background: #2E363F
}
.index .aside ul li{
    padding: 15px 0;
    border-bottom: 1px solid #37414b;
    font-size: 13px;
    text-align: center;
    color: #939da8;
    cursor: pointer;
}
.index .aside ul li.current{
    background: #3d3d3d
}
.index .aside ul li:nth-child(1){
    display: flex;
    padding: 30px 0;
    color: aliceblue
}
.index .aside ul li:nth-child(1) img{
    width: 35px;
    height: 25px;
    margin-left: 10px;
}
.index .aside ul li:nth-child(1) p{
    font-size: 17px;
    margin-left: 10px;
}
.index .box{
    width: 90%;
    height: 100%;
    background: #eeeeee
}
.index .box .header{
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid;
    background: #2E363F
}
.index .box .header ul li img{
    width: 15px;
    height: 15px;
    position: relative;
    top:3px;
}
.index .box .header ul{
    display: flex;
}
.index .box .header ul li{
    font-size: 13px;
    margin-left: 60px;
    color: #ffffff;
    cursor: pointer;
}
.index .box .main{
    height: 95%;
    overflow-y:scroll; 
    background: #eeeeee
}
.index .box .main .tip{
    color: #666666;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dddada;
    font-size: 13px;
    padding-left: 15px;
    background: #ffffff;
}
.index .box .main .house_info{
    width: 90%;
    color: #666666;
    background: #ffffff;
    margin: 20px;
    border-radius: 8px;
    padding: 15px
}
.index .box .main .house_info .top_msg{
    display: flex;
    justify-content: space-between;
}
.index .box .main .house_info .top_msg .left span:nth-child(1){
    font-size: 20px;
    font-weight: 400;
}
.index .box .main .house_info .top_msg .left span:nth-child(2){
    font-size: 14px;
    color:#939da8
}
.index .box .main .house_info .top_msg .right{
    width: 35%;
    display: flex;
    /* justify-content: space-between; */
}
.index .box .main .house_info .top_msg .right div{
    padding: 5px 20px;
    margin-left: 50px;
    font-size: 14px;
    color: #ffffff;
    border-radius: 5px;
    cursor: pointer;
    background: rgb(81, 83, 179)
}
.index .box .main .house_list{
    margin-top: 15px;
    /* margin-left: 30px; */
}
.index .box .main .house_list ul{
    display: flex;
    flex-wrap: wrap
}
.index .box .main .house_list ul li{
    width: 60px;
    height: 60px;
    margin-bottom: 20px;
    margin-left: 20px;
    line-height: 60px;
    color: #ffffff;
    text-align: center;
    border-radius: 4px;
    background: rgb(18, 94, 133)
}

.index .box .footer{
    width: 90%;
    position: absolute;
    text-align: center;
    bottom: 0;
    height: 40px;
    line-height: 40px;
    background: #2E363F
}
.index .box .footer a{
    margin-right: 150px;
    font-size: 13px;
    text-decoration: none;
    color: #08c
}
.qrcode_box{
    position: absolute;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0,0.5)
}
</style>
