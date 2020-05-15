<template>
  <div class="home">
    <div class="tip">
      <!-- <i class="el-icon-tickets"></i> &nbsp;酒店用户列表 -->
      <el-breadcrumb separator-class="el-icon-arrow-right" style="paddingTop:15px">
        <el-breadcrumb-item @click.native="toHome()" class="hotel-list-cursion">酒店用户列表</el-breadcrumb-item>
        <el-breadcrumb-item v-if="show">账单信息（{{hoName}}）</el-breadcrumb-item>
        <el-breadcrumb-item v-else>账单信息</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <bill v-bind:message="account" v-if="show"></bill>
    <div v-if="show1" class="user_list">
      <span style="marginLeft:30px"></span>
      账户：
      <el-input v-model="input" placeholder="请输入内容"></el-input>
      <span style="marginLeft:250px"></span>
      <!-- 状态：
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>-->
      <div class="search" @click="toSearch()">查询</div>

      <el-table :data="tableData" border style="width:75%">
        <el-table-column fixed prop="accountNo" label="账号" width="120"></el-table-column>
        <el-table-column prop="userName" label="姓名" width="180"></el-table-column>
        <el-table-column prop="telephone" label="手机号" width="180"></el-table-column>
        <el-table-column prop="recharge" label="充值余额" width="120"></el-table-column>
        <el-table-column prop="give" label="赠送余额" width="120"></el-table-column>
        <!-- <el-table-column prop="address" label="关联酒店" width="280"></el-table-column> -->
        <el-table-column fixed="right" label="操作" width="280">
          <template slot-scope="scope">
            <!-- <el-button @click="handleClick(scope.row,scope.$index)" type="text" size="small">
                    <span v-show="scope.row.isUse == false">停用</span>
                    <span v-show="scope.row.isUse == true">启用</span>
            </el-button>-->
            <!-- <el-button v-show="scope.row.isUse == false" @click='allot()' type="text" size="small">分配酒店</el-button> -->
            <el-button @click="sendMoney(scope.row)" type="text" size="small">赠送</el-button>
            <el-button @click="reduceSetting(scope.row)" type="text" size="small">扣款设置</el-button>
            <el-button @click="sendMsgToParent(scope.row)" type="text" size="small">查看账单</el-button>
            <el-button @click="balanceHint(scope.row)" type="text" size="small">余额提示</el-button>
            <!-- <el-button v-show="scope.row.isUse == true" type="text" size="small">修改密码</el-button> -->
            <!-- <el-button v-show="scope.row.isUse == true" type="text" size="small">修改</el-button> -->
            <!-- <el-button v-show="scope.row.isUse == true"
                    @click.native.prevent="deleteRow(scope.$index, tableData)"
                    type="text"
                    size="small">
                    删除
            </el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="8"
        :total="this.total"
      ></el-pagination>
    </div>
    <!-- <allot-hotel v-bind:message="childVal"></allot-hotel> -->
  </div>
</template>
<script>
import AllotHotel from "../../components/allotHotel";
import Bill from "../../components/bill";
export default {
  components: {
    // AllotHotel
    Bill
  },
  data() {
    return {
      show: false,
      show1: true,
      childVal: false,
      ins: 0,
      setType: "",
      PageSize: 8,
      currentPage: 1,
      options: [
        {
          value: "选项1",
          label: "停用"
        }
      ],
      tableData: [],
      input: "",
      value: "启用",
      account: "",
      total: "",
      hoName:''
    };
  },
  mounted() {
    this.getHotelUserList();
  },
  methods: {
    deleteRow(index, rows) {
      this.$confirm("此操作将删除该账户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleClick(row, index) {
      const list = this.tableData.slice(
        (this.currentPage - 1) * this.PageSize,
        this.currentPage * this.PageSize
      );
      this.$confirm("此操作将启用该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          list[index].isUse = !list[index].isUse;
          this.$message({
            type: "success",
            message: "操作成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作!"
          });
        });
    },
    sendMsgToParent(account) {
      this.show = true;
      this.show1 = false;
      this.hoName = account.userName
     
      this.account = account.accountNo;
      sessionStorage.setItem("hotelAccount", this.account);
      console.log(this.account);
    },
    sendMoney(value) {
      let isWhere = "send";
      this.$router.push({
        path: "/withhold",
        query: {
          whichSet: isWhere,
          name: value.accountNo
        }
      });
    },
    reduceSetting(value) {
      let isWhere = "reduce";
      this.$router.push({
        path: "/withhold",
        query: {
          whichSet: isWhere,
          name: value.accountNo
        }
      });
    },
    balanceHint(value){
      let isWhere = "hint";
      this.$router.push({
        path:'/withhold',
        query: {
          whichSet: isWhere,
          name:value.accountNo
        }
      })
    },
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHotelUserList();
      console.log(val);
    },
    allot() {
      this.childVal = true;
    },
    toHome() {
      this.input = "";
      this.getHotelUserList();
      this.show = false;
      this.show1 = true;
    },
    //查询酒店
    toSearch() {
      this.getHotelUserList();
    },
    //获取酒店信息
    getHotelUserList() {
      this.$api
        .getHotelUserList({
          accountNo: this.input,
          pageNo: this.currentPage,
          pageSize: "8",
          status: "0"
        })
        .then(res => {
          console.log(res);
          this.tableData = res.result;
          this.total = res.records;
        });
    }
  }
};
</script>
<style scoped>
.el-input {
  width: 180px;
}
.el-pagination {
  width: 400px;
  position: relative;
  left: 250px;
  bottom: 20px;
}
.home {
  background: #eeeeee;
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
.user_list {
  width: 80%;
  color: #666666;
  background: #ffffff;
  margin: 20px;
  border-radius: 8px;
  padding: 15px;
}
.search {
  display: inline-block;
  margin-left: 300px;
  padding: 5px 20px;
  font-size: 14px;
  color: #ffffff;
  border-radius: 5px;
  cursor: pointer;
  background: rgb(81, 83, 179);
}
.el-table {
  margin: 30px;
}
.hotel-list-cursion {
  cursor: pointer;
}
</style>
