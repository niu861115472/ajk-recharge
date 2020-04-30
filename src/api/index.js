import axios from 'axios'
import qs from 'qs'
import utils from '@/api/util.js'

// axios.defaults.baseURL = '/api'

let loginUser = utils.getUrlKey('loginUser')
let password = utils.getUrlKey('password')
let type = utils.getUrlKey('type')

sessionStorage.setItem('type', type)
sessionStorage.setItem('account', loginUser)
sessionStorage.setItem('password', password)
console.log(loginUser, password, type)

const base_url = 'https://www.live-ctrl.com/'
const base_url1 = 'http://www.live-ctrl.com/'
// const base_url2 = 'http://home.gmaple.cn:8080/'

const base_axios_options = {
  timeout: 5000,
  withCredentials: false,  //是否跨站点访问控制请求
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
  }
};
const url = `${base_url}`;
const url1 = `${base_url1}`;
// const url2 = `${base_url2}`;
const postAxios = axios.create(Object.assign({}, { baseURL: url }, base_axios_options));
const postAxios1 = axios.create(Object.assign({}, { baseURL: url1 }, base_axios_options));
// const postAxios2 = axios.create(Object.assign({},{ baseURL:url2 },base_axios_options));
export const Api = {
  // 获取酒店用户列表
  getHotelUserList: (params) => {
    return postAxios.post(`aijukex/op/hotelPay_getHotelUserList?loginUser=${loginUser}&password=${password}&type=${type}`, qs.stringify(params)).then(res => res.data);
  },
  //赠送余额接口
  getSendBalance: (params) => {
    return postAxios.post(`aijukex/op/hotelPay_giveMoney?loginUser=${loginUser}&password=${password}&type=${type}`, qs.stringify(params)).then(res => res.data);
  },
  //设置扣款标准
  setReduceMoney: (params) => {
    return postAxios.post(`aijukex/op/hotelPay_setUpDeduction?loginUser=${loginUser}&password=${password}&type=${type}`, qs.stringify(params)).then(res => res.data);
  },
  //获取账单列表
  getBalanceList: (params) => {
    return postAxios.post(`aijukex/op/hotelPay_getBillList?loginUser=${loginUser}&password=${password}&type=${type}`, qs.stringify(params)).then(res => res.data);
  },
  //获取酒店信息列表
  getHotelInfo: (params) => {
    return postAxios.post(`aijukex/op/hotelPay_getHotelInfo?accountNo=${loginUser}&loginUser=${loginUser}&password=${password}&type=${type}`, qs.stringify(params)).then(res => res.data);
  },
  //获取扣款账单凭证列表
  getOperateCardDailyList: (params) => {
    return postAxios.post(`aijukex/op/hotelPay_getOperateCardDailyList?loginUser=${loginUser}&password=${password}&type=${type}`, qs.stringify(params)).then(res => res.data);
  },
  getOperateInfraredDailyList: (params) => {
    return postAxios.post(`aijukex/op/hotelPay_getOperateInfraredDailyList?loginUser=${loginUser}&password=${password}&type=${type}`, qs.stringify(params)).then(res => res.data)
  },

  /*********************************通用接口******************************/
  //酒店选择下拉框数据
  getHotelList: (params) => {
    return postAxios.post('aijukex/op/hotelScript_getHotelList', qs.stringify(params)).then(res => res.data);
  },
  // 房间选择下拉框数据
  getHotelHouseList: (params) => {
    return postAxios.post('aijukex/op/hotelScript_getHotelHouseList', qs.stringify(params)).then(res => res.data);
  },
  // 房型名称下拉框数据
  getHouseTypeInfo: (params) => {
    return postAxios.post('aijukex/op/hotelScript_getHouseTypeInfo', qs.stringify(params)).then(res => res.data);
  },

  /*********************************脚本管理******************************/
  // 搜索按钮
  getHotelScriptInfo: (params) => {
    return postAxios.post('aijukex/op/hotelScript_getHotelScriptInfo', qs.stringify(params)).then(res => res.data);
  },
  // 保存按钮
  saveHotelScript: (params) => {
    return postAxios.post('aijukex/op/hotelScript_saveHotelScript', qs.stringify(params)).then(res => res.data);
  },
  // 刷入主机
  brushScriptInHost: (params) => {
    return postAxios.post('aijukex/op/hotelScript_brushScriptInHost', qs.stringify(params)).then(res => res.data);
  },
  // 获取已经刷入主机的脚本信息接口（页面如何展示还未明确）
  getScriptForHost: (params) => {
    return postAxios.post('aijukex/op/hotelScript_getScriptForHost', qs.stringify(params)).then(res => res.data);
  },

  /*********************************房型管理******************************/
  // 搜索按钮
  getHotelHouseScriptM: (params) => {
    return postAxios.post('aijukex/op/hotelScript_getHotelHouseScriptModelList', qs.stringify(params)).then(res => res.data);
  },
  //新增按钮
  addHotelScriptModel: (params) => {
    return postAxios.post('aijukex/op/hotelScript_addHotelScriptModel', qs.stringify(params)).then(res => res.data);
  },
  // XX脚本保存按钮
  updateHotelScriptModel: (params) => {
    return postAxios.post('aijukex/op/hotelScript_updateHotelScriptModel', qs.stringify(params)).then(res => res.data);
  },
  // 删除按钮
  deleteHotelScriptModel: (params) => {
    return postAxios.post('aijukex/op/hotelScript_deleteHotelScriptModel', qs.stringify(params)).then(res => res.data);
  },

  /*********************************日志查询页面******************************/
  getLogInfo: (params) => {
    return postAxios.post('aijukex/op/hotelScript_getLogInfo', qs.stringify(params)).then(res => res.data);
  },

  /*********************************天猫精灵接口******************************/
  getHotelNames: (params) => {
    return postAxios1.post('aijukex/op/tmall_getHotelNames', qs.stringify(params)).then(res => res.data);
  },
  getTmallSearchList: (params) => {
    return postAxios1.post('aijukex/op/tmall_getTmallHotelList', qs.stringify(params)).then(res => res.data);
  },
  getHostList: (params) => {
    return postAxios1.post('aijukex/op/tmall_getHouseTypeInfo', qs.stringify(params)).then(res => res.data);
  },
  //添加(修改删除)天猫绑定
  addOrUpdateTmall: (params) => {
    return postAxios1.post('aijukex/op/tmall_addOrUpdateTmall', qs.stringify(params)).then(res => res.data);
  },
  //电视频道列表
  getTmallHotelTvList: (params) => {
    return postAxios1.post('aijukex/op/tmall_getTmallHotelTvList', qs.stringify(params)).then(res => res.data);
  },
  //增删改查电视频道
  addOrUpdateTmallTv: (params) => {
    return postAxios1.post('aijukex/op/tmall_addOrUpdateTmallTv', qs.stringify(params)).then(res => res.data);
  },

  //酒店选择下拉框数据
  getTmallHotelList: (params) => {
    return postAxios1.post('aijukex/op/hotelScript_getHotelList', qs.stringify(params)).then(res => res.data);
  },
  //天猫绑定测试接口
  getTmallTest: (params) => {
    return postAxios1.post('aijukex/op/op_welcome', qs.stringify(params)).then(res => res.data);
  },
}