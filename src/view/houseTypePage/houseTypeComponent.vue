<template>
  <div class="houseType">
    <div class="tip">
      <el-breadcrumb separator-class="el-icon-arrow-right" style="paddingTop:15px">
        <el-breadcrumb-item @click.native="back">{{title}}</el-breadcrumb-item>
        <el-breadcrumb-item v-if="show">新增房型</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="refresh">
      <div v-show="show1" @click="addHouse">新增</div>
    </div>
    <!-- 新增脚本 -->
    <div v-if="show" class="add-house">
      <div class="hotel-name">
        酒店名称：
        <el-select v-model="value3" filterable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.name"
            :label="item.name"
            :value="item.name"
            @click.native="selectHotel1(item.id)"
          ></el-option>
        </el-select>
      </div>
      <div class="type-name">
        房型名称：
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.id"
            :label="item.title"
            :value="item.title"
            @click.native="selectHouseType1(item.id)"
          ></el-option>
        </el-select>
      </div>
      <div class="change-name-script">
        改名脚本：
        <el-input
          style="marginTop:10px"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="textarea1"
        ></el-input>
      </div>
      <div class="change-name-script">
        情景脚本：
        <el-input
          style="marginTop:10px"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="textarea2"
        ></el-input>
      </div>
      <div class="change-name-script">
        自动脚本：
        <el-input
          style="marginTop:10px"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="textarea3"
        ></el-input>
      </div>
      <div class="change-name-script">
        情景清除：
        <el-input
          style="marginTop:10px"
          type="textarea"
          :rows="10"
          placeholder="请输入内容"
          v-model="textarea4"
        ></el-input>
      </div>
      <div class="operate-btn">
        <div class="search-btn" @click="addHotelScriptModel">保存</div>
        <div class="search-btn" @click="cancel">取消</div>
      </div>
    </div>
    <!-- 酒店列表 -->
    <div v-if="show1" class="house-list">
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
      <span style="marginLeft:50px"></span> 房型选择：
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.id"
          :label="item.title"
          :value="item.title"
          @click.native="selectHouseType(item.id)"
        ></el-option>
      </el-select>
      <span style="marginLeft:195px"></span>
      <div class="search-btn" @click="getHotelHouseScriptM">搜索</div>

      <el-table :data="tableData" border style="width: 65%;marginTop:50px">
        <el-table-column fixed prop="houseTypeTitle" label="房型名称" width="300"></el-table-column>
        <el-table-column prop="hotelName" label="所属酒店" width="300"></el-table-column>
        <el-table-column fixed="right" label="操作" width="400">
          <template slot-scope="scope">
            <el-button @click="changeName(scope)" type="text" size="small">改名脚本</el-button>
            <el-button @click="changeScene(scope)" type="text" size="small">情景脚本</el-button>
            <el-button @click="zidongScene(scope)" type="text" size="small">自动脚本</el-button>
            <el-button @click="clearScene(scope)" type="text" size="small">情景清除脚本</el-button>
            <el-button
              @click.native.prevent="deleteRow(scope.$index, tableData, scope.row)"
              type="text"
              size="small"
            >刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-size="10"
        :total="tableData.length"
      ></el-pagination>
    </div>
    <!-- 脚本操作 -->
    <div v-show="show2" class="script-operate">
      <div class="change-name-script">
        <el-input
          style="marginTop:10px"
          type="textarea"
          :rows="20"
          placeholder="请输入内容"
          v-model="textarea5"
        ></el-input>
        <div class="operate-btn">
          <div class="search-btn" @click="updateHotelScriptModel">保存</div>
          <div class="search-btn" @click="cancel">取消</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      options: [],
      options1: [],
      tableData: [],
      title: "房型管理",
      operateName: "",
      input: "",
      value: "",
      value1: "",
      value2: "",
      value3: "",
      textarea1: "",
      textarea2: "",
      textarea3: "",
      textarea4: "",
      textarea5: "",
      show: false,
      show1: true,
      show2: false,
      PageSize: 5,
      currentPage: 1,
      hotelId: "",
      hotelId1: "",
      houseType: "",
      houseType1: "",
      pageSize: 10,
      total: 1,
      id: "",
      type: ""
    };
  },
  mounted() {
    this.getHotelList();
    this.getHouseTypeInfo();
    this.getHotelHouseScriptM();
  },
  methods: {
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getHotelHouseScriptM();
      console.log(val);
    },
    deleteRow(index, rows, value) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rows.splice(index, 1);
          this.deleteHotelScriptModel(value.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addHouse() {
      this.show = true;
      this.show1 = false;
    },
    back() {
      this.show = false;
      this.show1 = true;
    },
    cancel() {
      this.show = false;
      this.show1 = true;
      this.show2 = false;
      this.title = "房型管理";
    },
    changeName(scope) {
      this.title = "改名脚本";
      this.type = 1;
      this.id = scope.row.id;
      this.textarea5 = scope.row.renameScript;
      this.show1 = false;
      this.show2 = true;
    },
    changeScene(scope) {
      this.title = "情景脚本";
      this.type = 2;
      this.id = scope.row.id;
      this.textarea5 = scope.row.sceneScript;
      this.show1 = false;
      this.show2 = true;
    },
    zidongScene(scope) {
      this.title = "自动脚本";
      this.type = 3;
      this.id = scope.row.id;
      this.textarea5 = scope.row.automaticScript;
      this.show1 = false;
      this.show2 = true;
    },
    clearScene(scope) {
      this.title = "情景清除脚本";
      this.type = 4;
      this.id = scope.row.id;
      this.textarea5 = scope.row.sceneClearScript;
      this.show1 = false;
      this.show2 = true;
    },
    //酒店下拉数据
    getHotelList() {
      this.$api.getHotelList().then(res => {
        this.options = res.result;
      });
    },
    // 房型名称下拉框数据
    getHouseTypeInfo() {
      this.$api.getHouseTypeInfo().then(res => {
        this.options1 = res.result;
      });
    },
    //选择酒店
    selectHotel(id) {
      this.hotelId = id;
      console.log(id);
      this.getHotelList(id);
      this.value1 = "";
    },
    //选择房型
    selectHouseType(type) {
      console.log(type);
      this.houseType = type;
    },
    //选择酒店
    selectHotel1(id) {
      this.hotelId1 = id;
      this.getHotelList(id);
      this.value1 = "";
    },
    //选择房型
    selectHouseType1(type) {
      this.houseType1 = type;
    },
    //搜索
    getHotelHouseScriptM() {
      this.$api
        .getHotelHouseScriptM({
          hotelId: this.hotelId,
          houseType: this.houseType,
          pageNo: this.currentPage,
          pageSize: this.pageSize
        })
        .then(res => {
          if (res.success) {
            this.total = res.records;
            this.tableData = res.result;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    //新增房型
    addHotelScriptModel() {
      this.$api
        .addHotelScriptModel({
          hotelId: this.hotelId1,
          houseType: this.houseType1,
          renameScript: encodeURI(this.textarea1),
          sceneScript: encodeURI(this.textarea2),
          automaticScript: encodeURI(this.textarea3),
          sceneClearScript: encodeURI(this.textarea4)
        })
        .then(res => {
          if (res.success) {
            this.$message.success(res.msg);
            this.show = false;
            this.show1 = true;
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // XX脚本保存按钮
    updateHotelScriptModel() {
      this.$api
        .updateHotelScriptModel({
          id: this.id,
          type: this.type,
          scriptInfo: encodeURI(this.textarea5)
        })
        .then(res => {
          if (res.success) {
            this.$message.success(res.msg);
            this.show1 = true;
            this.show2 = false;
            this.getHotelHouseScriptM();
          } else {
            this.$message.error(res.msg);
          }
        });
    },
    // 删除按钮
    deleteHotelScriptModel(id) {
      this.$api
        .deleteHotelScriptModel({
          id: id
        })
        .then(res => {
          if (res.success) {
            this.$message.success(res.msg);
          } else {
            this.$message.error(res.msg);
          }
        });
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
.houseType {
  height: 90%;
  overflow-y: scroll;
}
.tip {
  position: fixed;
  z-index: 999;
  width: 90%;
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
  margin-top: 50px;
  margin-left: auto;
  line-height: 35px;
  text-align: center;
  color: #ffffff;
  border-radius: 5px;
  background: rgb(84, 82, 177);
}
.add-house,
.house-list {
  padding: 30px;
  background: #ffffff;
  border-radius: 10px;
  margin: 20px;
}
.type-name {
  margin-top: 20px;
}
.change-name-script {
  width: 60%;
  margin-top: 20px;
}
.operate-btn {
  margin-top: 20px;
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
.script-operate {
  padding: 30px;
}
</style>