<template>
  <div class="index">
    <div class="aside">
      <ul>
        <li @click="back">
          <img src="../../assets/logo.png" alt />
          <p>爱居客管理平台</p>
        </li>
        <li @click="hotelOur()">
          <i class="el-icon-menu"></i>酒店信息（大后台）
        </li>
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
          <li @click="logout">
            <i class="el-icon-d-arrow-left"></i> 安全退出
          </li>
        </ul>
      </div>
      <div class="main">
        <div class="tip">
          <i class="el-icon-tickets"></i> &nbsp;
          <span v-if="setType == 'send'">赠送金额</span>
          <span v-if="setType == 'reduce'">扣款设置</span>
          <span v-if="setType == 'hint'">余额提示</span>
        </div>
        <div class="setting_box">
          <div>
            酒店账户：
            <el-input v-model="input1" placeholder="请输入内容"></el-input>
          </div>
          <div>
            <span v-if="setType == 'send'">赠送金额：</span>
            <span v-if="setType == 'reduce'">扣款金额：</span>
            <span v-if="setType == 'hint'">手机号码：</span>
            <el-input v-model="input2" placeholder="请输入内容"></el-input>
          </div>
          <!-- <div>
                       <span>扣款方式：</span>
                  <el-select size='small' @change="selectBillType($event,value)" v-model="value" placeholder="请选择">
                      <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                      </el-option>
                  </el-select>
          </div>-->
          <div>
            <div class="sure" @click="open2">确定</div>
            <div class="cancel" @click="cancel">取消</div>
          </div>
        </div>
      </div>
      <div class="footer">
        <a href="http://www.live-ctrl.com" target="_blank">2018 ©爱居客 &nbsp;All Rights Reserved.</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      ins: this.$route.query.ins,
      input1: this.$route.query.name,
      input2: "",
      setType: this.$route.query.whichSet
    };
  },
  methods: {
    back() {
      window.location.href =
        "http://www.live-ctrl.com/aijukex/tenement/mainPage";
    },
    logout() {
      window.location.href = "http://www.live-ctrl.com/aijukex/login/logout";
    },
    open2() {
      if (this.input1 == "") {
        this.$message.error("账户不能为空");
        return;
      }
      if (this.input2 == "" & this.setType != 'hint') {
        this.$message.error("金额不能为空");
        return;
      }
      if (this.input2 == "" & this.setType == 'hint') {
        this.$message.error("手机号不能为空");
        return;
      }
      if (isNaN(this.input2) == true) {
        this.$message.error("金额类型错误");
        return;
      }
      if (this.setType == "reduce") {
        this.setReduceMoney();
      } else {
        this.getSendBalance();
      }

      setTimeout(() => {
        this.$router.push({
          path: "/"
        });
      }, 3000);
    },
    setReduceMoney() {
      this.$api
        .setReduceMoney({
          accountNo: this.input1,
          deductMoney: this.input2
        })
        .then(res => {
          if (res.success) {
            this.$message({
              message: "恭喜你，设置成功！",
              type: "success"
            });
          }
        });
    },
    getSendBalance() {
      this.$api
        .getSendBalance({
          accountNo: this.input1,
          giveMoney: this.input2
        })
        .then(res => {
          if (res.success) {
            this.$message({
              message: "恭喜你，设置成功！",
              type: "success"
            });
          }
        });
    },
    cancel() {
      this.$router.push({
        path: "/",
        query: {
          ins: 2
        }
      });
    },
    hotelOther() {
      this.$router.push({ path: "/" });
      this.ins = 1;
    },
    hotelOur() {
      this.$router.push({
        path: "/",
        query: {
          ins: 2
        }
      });
      this.ins = 2;
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
.el-input {
  width: 280px;
  margin-bottom: 30px;
}
.index {
  width: 100%;
  height: 100%;
  display: flex;
}
.index .aside {
  width: 10%;
  height: 100%;
  background: #2e363f;
}
.index .aside ul li {
  padding: 15px 0;
  border-bottom: 1px solid #37414b;
  font-size: 13px;
  text-align: center;
  color: #939da8;
  cursor: pointer;
}
.index .aside ul li.current {
  background: #3d3d3d;
}
.index .aside ul li:nth-child(1) {
  display: flex;
  padding: 30px 0;
  color: aliceblue;
}
.index .aside ul li:nth-child(1) img {
  width: 35px;
  height: 25px;
  margin-left: 10px;
}
.index .aside ul li:nth-child(1) p {
  font-size: 17px;
  margin-left: 10px;
}
.index .box {
  width: 90%;
  height: 100%;
}
.index .box .header {
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid;
  background: #2e363f;
}
.index .box .main {
  height: 89%;
  background: #eeeeee;
}
.index .box .main .tip {
  color: #666666;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #dddada;
  font-size: 13px;
  padding-left: 15px;
  background: #ffffff;
}
.index .box .header ul li img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
}
.index .box .header ul {
  display: flex;
}
.index .box .header ul li {
  font-size: 13px;
  margin-left: 60px;
  color: #ffffff;
}
.index .box .footer {
  width: 90%;
  position: absolute;
  text-align: center;
  bottom: 0;
  height: 60px;
  line-height: 60px;
  background: #2e363f;
}
.index .box .footer a {
  margin-right: 150px;
  font-size: 13px;
  text-decoration: none;
  color: #08c;
}
.setting_box {
  width: 80%;
  color: #666666;
  background: #ffffff;
  margin: 20px;
  border-radius: 8px;
  padding: 25px;
}
.setting_box .sure,
.cancel {
  padding: 8px 24px;
  font-size: 14px;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 100px;
  background: rgb(81, 83, 179);
}
.setting_box div:nth-child(3) {
  display: flex;
  width: 50%;
}
</style>
