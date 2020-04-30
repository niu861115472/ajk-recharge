<template>
  <div class="hello">
    <div class="send_tip">
      <p>充500赠送20元</p>
    </div>
    <div class="input">
       <el-radio v-model="radio" border label="50">50</el-radio>
       <el-radio v-model="radio" border label="100">100</el-radio>
       <el-radio v-model="radio" border label="200">200</el-radio>
       <el-radio v-model="radio" border label="500">500</el-radio>
    </div>
    
    <div class="rechargeType">
      <div class="ZFB">
        <div>
          <img src="../../assets/zhifu-pay@2x.png" alt />
          <span>支付宝</span>
        </div>
        <label>
          <input class="radio" type="radio" name="ZF" :value="value1" v-model="picked" />
        </label>
      </div>
      <!-- <div class="WX">
        <div>
          <img src="../../assets/timg.jpg" alt />
          <span>微信</span>
        </div>
        <label>
          <input class="radio" type="radio" name="ZF" :value="value2" v-model="picked" />
        </label>
      </div> -->
    </div>
    <div class="submit" @click="submit()">充值</div>
  </div>
</template>

<script>
import ap from "@/api/ap.js";
// import wx from "weixin-js-sdk";
import axios from "axios";

export default {
  data() {
    return {
      value: "",
      value1: "ZFB",
      // value2: "WX",
      picked: "ZFB",
      radio: '50'
    };
  },
  methods: {
    submit() {
      // if(this.radio == '500'){
      //   this.radio = Number(this.radio) - 20
      // }
      console.log(this.radio)
      if (this.picked == "ZFB") {
        this.submitZfbPay();
      } else {
        // this.submitWxPay();
      }
    },
    //支付宝支付
    submitZfbPay() {

      let formData = new FormData();
      formData.append("accountNo", sessionStorage.getItem("account"));
      formData.append("subject", "酒店余额充值");
      formData.append("totalAmount", this.radio);
      formData.append("body", "爱居客酒店主机使用余额充值");

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios
        .post("https://www.live-ctrl.com:8082/aijukex_pay/order/appidAlipay", formData, config)
        .then(res => {
          document.write(res.data);
        });
    },
    //微信支付
    submitWxPay() {
      let formData = new FormData();
      formData.append("accountNo", sessionStorage.getItem("account"));
      formData.append("subject", "酒店余额充值");
      formData.append("totalAmount", this.value);
      formData.append("body", "爱居客酒店主机使用余额充值");

      let config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };
      axios.post("https://www.live-ctrl.com:8082/aijukex_pay/order/wxPay", formData, config).then(res => {
        this.$router.push({
          path:'/wxQrcode',
          query:{
            qrUrl:res.data
          }
        })
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  width: 500px;
  height: 300px;
  border-radius: 10px;
  background: #fff;
}
.input {
  position: relative;
  top: 20px;
  display: flex;
  padding: 20px 20px 40px 20px;
  margin: 0px 20px 20px 20px;
}
.input p {
  color: #666363;
  margin-top: 8px;
  font-size: 18px;
}
.rechargeInp {
  width: 200px;
  height: 35px;
  font-size: 15px;
  padding-left: 10px;
  border-radius: 5px;
  border: 1px solid #9e9a9a;
}
.rechargeType {
  width: 89%;
  padding: 10px 20px;
  margin: 20px 20px 20px 20px;
  font-size: 15px;
}
.rechargeType img {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.rechargeType .ZFB,
.WX {
  display: flex;
  padding: 10px 0;
  justify-content: space-between;
}
.rechargeType input {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 10px;
  right: 30px;
}
.rechargeType .ZFB {
  border-bottom: 1px solid rgb(202, 200, 200);
}
.rechargeType span {
  position: relative;
  bottom: 10px;
}
.radio {
  width: 100px;
}
.submit {
  width: 500px;
  position: relative;
  cursor: pointer;
  top: 20px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  color: #fff;
  font-size: 15px;
  background: #ca600a;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
label {
  position: relative;
  width: 250px;
}
#qrcode{
  width: 200px;
  height: 200px;
}
.send_tip{
  color: #ca600a;
  margin: 20px 0 0 50px;
}
</style>
