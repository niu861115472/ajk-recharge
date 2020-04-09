<template>
  <div class="home">
    <div class="aside">
      <ul>
        <li>
          <img src="../../assets/logo.png" alt />
          <p>爱居客管理平台</p>
        </li>
         <li @click="toScript()" :class="{'current':currentIndex == 1}">
          <i class="el-icon-menu"></i>脚本管理
        </li>
        <li @click="toHouse()" :class="{'current':currentIndex == 3}">
          <i class="el-icon-menu"></i>房型管理
        </li>
        <li @click="toLog()" :class="{'current':currentIndex == 2}">
          <i class="el-icon-menu"></i>日志查询
        </li>
        <li @click="back">返回上一页</li>
      </ul>
    </div>

    <div class="box">
      <div class="header">
        <ul>
          <li>
            <img src="../../assets/username.png" alt /> aijuke
          </li>
          <li>
            <i class="el-icon-setting">修改密码</i>
          </li>
          <li @click="logout()">
            <i class="el-icon-d-arrow-left"></i> 安全退出
          </li>
        </ul>
      </div>
      <house-component></house-component>
      <div class="footer">
        <a href="http://www.live-ctrl.com" target="_blank">2018 ©爱居客 &nbsp;All Rights Reserved.</a>
      </div>
    </div>
  </div>
</template>
<script>
import HouseComponent from "./houseTypeComponent";
export default {
  components: {
    HouseComponent
  },
  data() {
    return {
      other: 2,
      show1: true,
      currentIndex:this.$route.query.index
    };
  },
  methods: {
    back(){
        window.location.href = 'http://www.live-ctrl.com/aijukex/tenement/mainPage'
    },
    logout(){
        window.location.href = 'http://www.live-ctrl.com/aijukex/login/logout'
    },
    toHouse() {
      this.$router.push({
        path: "/houseType"
      });
    },
    toLog() {
      this.$router.push({
        path: "/logQuery",
        query:{index:2}
      });
    },
    toScript() {
      this.$router.push({
        path: "/scrManage"
      });
    }
  }
};
</script>
<style scoped>
li {
  list-style: none;
}
.el-icon-menu {
  width: 20px;
  height: 20px;
}
.home {
  width: 100%;
  height: 100%;
  display: flex;
}
.home .aside {
  width: 10%;
  height: 100%;
  background: #2e363f;
}
.home .aside ul li {
  padding: 15px 0;
  border-bottom: 1px solid #37414b;
  font-size: 15px;
  text-align: center;
  color: #939da8;
  cursor: pointer;
}
.home .aside ul li.hover {
  background: #3d3d3d;
}
.home .aside ul li.current {
  background: #3d3d3d;
}
.home .aside ul li:nth-child(1) {
  display: flex;
  padding: 30px 0;
  color: aliceblue;
}
.home .aside ul li:nth-child(1) img {
  width: 35px;
  height: 25px;
  margin-left: 10px;
}
.home .aside ul li:nth-child(1) p {
  font-size: 17px;
  margin-left: 10px;
}
.home .box {
  width: 90%;
  height: 100%;
  background: #eeeeee;
}
.home .box .header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid;
  background: #2e363f;
}
.home .box .header ul li img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
}
.home .box .header ul {
  display: flex;
}
.home .box .header ul li {
  font-size: 13px;
  margin-left: 60px;
  color: #ffffff;
  cursor: pointer;
}
.home .box .main {
  height: 95%;
  background: #eeeeee;
}
.home .box .main .tip {
  color: #666666;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddada;
  font-size: 13px;
  padding-left: 15px;
  background: #ffffff;
}
.home .box .footer {
  width: 90%;
  position: fixed;
  text-align: center;
  bottom: 0;
  height: 40px;
  line-height: 40px;
  background: #2e363f;
}
.home .box .footer a {
  margin-right: 150px;
  font-size: 13px;
  text-decoration: none;
  color: #08c;
}
</style>
