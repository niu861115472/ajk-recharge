<template>
  <div class="home">
    <el-row class="tac">
      <div class="img-box" @click="back">
        <img src="../../assets/logo.png" alt />
        <p>爱居客管理平台</p>
      </div>
      <el-col :span="24">
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @select="handleSelect"
          background-color="#2f2f31"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>上海主机</span>
            </template> -->
            <el-menu-item-group>
              <el-menu-item index="1-1">主机管理</el-menu-item>
              <el-menu-item index="1-2">设备管理</el-menu-item>
              <!-- <el-menu-item index="1-3">情景管理</el-menu-item> -->
              <el-menu-item index="1-4">设备状态</el-menu-item>
              <el-menu-item index="1-5">设备日志</el-menu-item>
            </el-menu-item-group>
          <!-- </el-submenu> -->
        </el-menu>
      </el-col>
    </el-row>
    <!-- </div> -->

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
      <host-component v-show="index == '1-1'"></host-component>
      <device-component v-show="index == '1-2'"></device-component>
      <scence-component v-show="index == '1-3'"></scence-component>
      <device-status v-show="index == '1-4'"></device-status>
      <device-log v-show="index == '1-5'"></device-log>
      <!-- <device-log></device-log> -->
      <div class="footer">
        <a href="http://www.live-ctrl.com" target="_blank">2018 ©爱居客 &nbsp;All Rights Reserved.</a>
      </div>
    </div>
  </div>
</template>
<script>
import HostComponent from "./hostComponent";
import DeviceComponent from "./deviceComponent";
import ScenceComponent from "./scenceComponent";
import DeviceStatus from "./deviceStatus";
import DeviceLog from "./deviceLog";

export default {
  components: {
    HostComponent,
    DeviceComponent,
    ScenceComponent,
    DeviceStatus,
    DeviceLog
  },
  data() {
    return {
      index: ""
    };
  },
  methods: {
    back() {
      window.location.href =
        "http://www.live-ctrl.com/aijukex/tenement/mainPage";
    },
    logout(){
        window.location.href = 'http://www.live-ctrl.com/aijukex/login/logout'
    },
    handleSelect(key) {
      console.log(key);
      this.index = key;
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
.home .tac {
  height: 100%;
  background: #2e363f;
}
.home .img-box {
  display: flex;
  padding: 30px 0;
  color: aliceblue;
}
.home img {
  width: 35px;
  height: 25px;
  margin-left: 10px;
}
.home p {
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
.tac {
  width: 13%;
  background: #2f2f31;
}
</style>
