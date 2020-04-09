<template>
  <div class="qrcode">
    <div id="qrcode"></div>
    <div class="tip"> <img src="../../assets/timg.jpg" alt=""> 使用微信扫码支付</div>
    <div class="back" @click="$router.go(-1)">返回上一页</div>
  </div>
</template>
<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {};
  },
  mounted() {
      let url = this.$route.query.qrUrl
      this.qrcode(url)
  },
  methods: {
    qrcode(url) {
      let qrcode = new QRCode("qrcode", {
        width: 250,
        height: 250,
        text: url, // 二维码地址
        colorDark: "#000",
        colorLight: "#fff"
      });
    },
  }
};
</script>
<style scoped>
    .qrcode{
        width: 100%;
        height: 100%;
        background: rgb(212, 211, 211)
    }
    #qrcode{
        width: 250px;
        height: 250px;
        border: 10px solid rgb(241, 240, 240);
        border-radius: 10px;
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    .tip{
        width: 300px;
        height: 50px;
        text-align: center;
        position: absolute;
        top: 350px;
        font-size: 24px;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
    img{
        width: 45px;
        height: 45px;
        position: relative;
        top: 15px;
    }
    .back{
        width: 100px;
        height: 40px;
        line-height: 40px;
        color: #fff;
        background: rgb(151, 147, 147);
        text-align: center;
        position: absolute;
        top: 500px;
        font-size: 15px;
        left: 0;
        bottom: 0;
        right: 0;
        margin: auto;
    }
</style>