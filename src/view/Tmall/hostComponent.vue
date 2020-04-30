<template>
  <div class="host">
    <div class="tip">
      <p>{{title}}</p>
      <div @click="addHost" v-show="show">添加</div>
    </div>
    <!-- 主机列表 -->
    <div class="hotel-list" v-show="show">
      <div class="hotel-name">
        酒店名称：
        <el-select v-model="value" @clear="clearHotelName" clearable filterable placeholder="请选择">
          <el-option
            v-for="(item,index) in options"
            :key="index"
            :label="item"
            :value="item"
            @click.native="selectSearchHotel(item)"
          ></el-option>
        </el-select>
        <div class="search-btn" @click="search()">搜索</div>
      </div>
      <div class="house-list">
        <el-table :data="tableData" stripe border style="width: 78%">
          <el-table-column fixed prop="hotelName" label="酒店" width="180"></el-table-column>
          <el-table-column prop="serverId" label="主机ID" width="300"></el-table-column>
          <el-table-column prop="houseId" label="房间" width="120"></el-table-column>
          <el-table-column prop="hotelId" label="天猫精灵对应的酒店" width="180"></el-table-column>
          <el-table-column prop="roomId" label="天猫精灵对应的房间" width="180"></el-table-column>
          
          <el-table-column fixed="right" label="操作" width="200">
            <template slot-scope="scope">
              <el-button @click="changeHost(scope.row)" type="text" size="small">修改</el-button>
              <el-button
                @click="handleOpenOrClose(scope.row)"
                type="text"
                size="small"
              > 删除</el-button>
              <el-button @click="handleTest(scope.row)" type="text" size="small">测试</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          layout="prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-size="10"
          :total="this.total"
        ></el-pagination>
      </div>
    </div>
    <!-- 添加主机 -->
    <div class="add-host" v-show="show1">
      <div>
        <p>后台酒店名称：</p>
        <el-select v-model="value1" filterable placeholder="请选择">
          <el-option
            v-for="item in options3"
            :key="item.hotelId"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <span>*必填</span>
      </div>
      <div>
        <p>后台房间号：</p>
        <el-input class="host-id-input" v-model="input" placeholder="请输入内容"></el-input>
        <span>*必填</span>
      </div>
      <div>
        <p>天猫精灵对应的酒店名称：</p>
        <el-select v-model="value2" placeholder="请选择">
          <el-option
            v-for="item in options1"
            :key="item.hotelId"
            :label="item.name"
            :value="item.name"
            @click.native="selectAddTmallHotel(item.hotelId)"
          ></el-option>
        </el-select>
        <span>*必填</span>
      </div>
      <div>
        <p>天猫精灵对应的房间名称：</p>
        <el-input class="host-id-input" v-model="input1" placeholder="请输入内容"></el-input>
        <span>*必填</span>
      </div>
      <div>
        <p>主机ID：</p>
        <el-select clearable v-model="value3" @clear="clear" filterable placeholder="请选择">
          <el-option
            v-for="item in options2"
            :key="item.id"
            :label="item.name"
            :value="item.name"
            @click.native="selectAddHost(item.serverId)"
          ></el-option>
        </el-select>
      </div>
      <div>
        <p>mac地址：</p>
        <el-input class="host-id-input" v-model="input2" placeholder="请输入内容"></el-input>
      </div>
      <div>
        <p>ID号：</p>
        <el-input class="host-id-input" v-model="input3" placeholder="请输入内容"></el-input>
      </div>
      <div class="operate-btn">
        <div class="search-btn" @click="save">保存</div>
        <div class="search-btn" @click="cancel">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: true,
      show1: false,
      options: [],
      options2: [],
      options3: [],
      options1: [
        {
          hotelId: "b587e3e0429f49adbfa813066722290c",
          name: "迟迟庭院-龙坞店"
        },
        {
          hotelId: "39325",
          name: "爱居客智慧演示间"
        },
        {
          hotelId: "b7b1d2b1ca1144aaa3398f889cc808d4",
          name: "迟迟艺术酒店"
        },
        {
          hotelId:'4c201db689514631aff17aa426fe1495',
          name:'金沙温泉酒店'
        },
        {
          hotelId:'77e4b1686e4946b0a5d3d414674b047e',
          name:'将军大酒店'
        },
        {
          hotelId:'bb3d683c9d59481386238b1c58927f4d',
          name:'杭州寻觅民宿'
        }
      ],
      status: "",
      tableData: [],
      hotel: "",
      value: "",
      value1: "",
      value2: "",
      value3: "",
      PageSize: 10,
      currentPage: 1,
      total: 0,
      title: "酒店版天猫精灵房间绑定",
      input: "",
      input1: "",
      input2: "",
      input3: "",
      deviceId: "",
      hotelId: "",
      hostId: "",
      searchName: "",
      isType: "",
      id: ""
    };
  },
  mounted() {
    this.getHotelNames();
    this.getAddHotelList();
    this.getTmallSearchList(name);
    this.getHostList();
  },
  methods: {
    handleSizeChange(val) {
      this.PageSize = val;
      this.currentPage = 1;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getTmallSearchList(this.searchName);
      console.log(val);
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    //添加主机
    addHost() {
      this.show = false;
      this.show1 = true;
      this.isType = 1;
      this.value1 = "";
      this.input = "";
      this.value2 = "";
      this.input1 = "";
      this.value3 = "";
      this.input2 = "";
      this.input3 = "";
    },
    //修改主机
    changeHost(row) {
      this.show = false;
      this.show1 = true;
      this.isType = 2;
      console.log(row);
      this.value1 = row.hotelName;
      this.input = row.houseId;
      this.value2 = row.hotelId;
      
      // this.hotelId = row.hotelId;
      this.input1 = row.roomId;
      this.input2 = row.mac || '';
      this.input3 = row.macId || '';
      this.id = row.id || '';
      var arr = this.options1.filter(item => {
        return item.name == row.hotelId;
      });
      this.hotelId = arr[0].hotelId
      var arr1 = this.options2.filter(item => {
        return item.serverId == row.serverId;
      });
      console.log(this.options2,arr1);
      this.value3 = arr1[0].name;
      this.hostId = arr1[0].serverId;
    },
    handleTest(row){
      // alert(row.serverId)
      this.$api.getTmallTest({
        hostId:row.serverId
      }).then(res=>{
        if(res.success){
          console.log(res)
        }
      })
    },
    handleOpenOrClose(row) {
      let isDelete = 1
      this.isType = 3;
      let data = {
        id: row.id,
        type: this.isType,
        isDelete: isDelete
      };
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.addOrUpdateTmall(data);
          row.isDelete = !row.isDelete;
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      console.log(row);
    },
    //选择添加酒店
    selectAddTmallHotel(id) {
      this.hotelId = id;
    },
    //选择添加主机
    selectAddHost(id) {
      this.hostId = id;
    },
    //保存
    save() {
      let data = {
        hotelName: this.value1,
        houseId: this.input,
        hotelId: this.hotelId,
        roomId: this.input1,
        serverId: this.hostId,
        mac: this.input2,
        macId: this.input3,
        id: this.isType == 2 ? this.id : "",
        type: this.isType,
        isDelete: ""
      };
      console.log(data)
      this.addOrUpdateTmall(data);
    },
    clear(){
      this.hostId = ''
    },
    cancel() {
      this.show = true;
      this.show1 = false;
    },
    //获取酒店列表
    getHotelNames() {
      this.$api.getHotelNames().then(res => {
        this.options = res.result;
      });
    },
    //获取添加酒店列表
    getAddHotelList() {
      this.$api.getTmallHotelList().then(res => {
        this.options3 = res.result;
      });
    },
    //获取搜索列表
    getTmallSearchList(name) {
      this.$api
        .getTmallSearchList({
          hotelName: name,
          pageNo: this.currentPage,
          pageSize: "10"
        })
        .then(res => {
          this.total = res.records;
          for (var x in res.result) {
            for (var y in this.options1) {
              if (res.result[x].hotelId == this.options1[y].hotelId) {
                res.result[x].hotelId = this.options1[y].name;
              }
            }
          }
          this.tableData = res.result;
        });
    },
    selectSearchHotel(item) {
      this.searchName = item;
    },
    clearHotelName(){
      this.searchName = ''
    },
    //搜索
    search() {
      this.getTmallSearchList(this.searchName);
    },
    getHostList() {
      this.$api.getHostList().then(res => {
        this.options2 = res.result;
      });
    },
    addOrUpdateTmall(data) {
      this.$api.addOrUpdateTmall(data).then(res => {
        if (res.success) {
            this.$message({
              type: "success",
              message: `${this.isType == 3 ? '删除成功!' : '成功'}`
            });
            this.show = true;
            this.show1 = false;
            this.getTmallSearchList(name);
        } else {
          alert(res.msg);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.host {
  .el-pagination {
    width: 400px;
    position: relative;
    left: 250px;
    top: 20px;
  }
  .tip {
    // position: absolute;
    z-index: 999;
    width: 100%;
    display: flex;
    justify-content: space-between;
    color: #666666;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dddada;
    font-size: 13px;
    padding-left: 15px;
    background: #ffffff;
    div {
      width: 55px;
      height: 28px;
      cursor: pointer;
      display: inline-block;
      margin-right: 90px;
      margin-top: 5px;
      line-height: 28px;
      text-align: center;
      color: #ffffff;
      border-radius: 5px;
      background: rgb(84, 82, 177);
    }
  }
  .add-host,
  .hotel-list {
    width: 90%;
    position: relative;
    top: 10px;
    padding: 30px;
    background: #ffffff;
    border-radius: 10px;
    margin: 0px 20px 20px 20px;
  }
  .search-btn {
    width: 80px;
    height: 35px;
    cursor: pointer;
    display: inline-block !important;
    margin-left: 50px;
    line-height: 35px;
    text-align: center;
    color: #ffffff;
    border-radius: 5px;
    background: rgb(84, 82, 177);
  }
  .house-list {
    width: 100%;
    margin-top: 30px;
  }
  .add-host {
    div {
      display: flex;
      margin-bottom: 15px;
      .host-id-input {
        width: 215px;
      }
    }
    p {
      width: 200px;
      text-align: right;
    }
    span {
      color: #949191;
      font-size: 6px;
    }
  }
}
</style>