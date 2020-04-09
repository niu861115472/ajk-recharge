import axios from 'axios'
import qs from 'qs'
import md5 from 'js-md5'

const base_url1 = 'http://demo.live-ctrl.com/aijukex/'
const base_url = 'http://demo.live-ctrl.com/verslink/'
const app_key = '4375b25d6994a1b9'
const app_sercet = 'Fp7gY4MR5EZkU6mvHVZzr2schVSGezNH'
setInterval(() => {
    const timestamp = new Date().getTime()
    const key = md5(md5(timestamp + app_sercet))
    const sign = key.substring(8, 24)
    // console.log(timestamp, sign)
    sessionStorage.setItem('timestamp', timestamp)
    sessionStorage.setItem('sign', sign)
}, 6000);

const base_axios_options = {
    timeout: 5000,
    withCredentials: false,  //是否跨站点访问控制请求
};

const url = `${base_url}`;
const url1 = `${base_url1}`;
const postAxios = axios.create(Object.assign({}, { baseURL: url }, base_axios_options));
const postAxios1 = axios.create(Object.assign({}, { baseURL: url1 }, base_axios_options));
export const RcuApi = {
    // 获取酒店（房间）列表
    getHotelList: (params) => {
        return postAxios.get(`HotelServlet?app=${app_key}&timestamp=${sessionStorage.getItem('timestamp')}&sign=${sessionStorage.getItem('sign')}&` + qs.stringify(params)).then(res => res.data);
    },
    //获取设备列表
    getDevicesList: (params) => {
        return postAxios.get(`DeviceServlet?action=querydevices&app=${app_key}&timestamp=${sessionStorage.getItem('timestamp')}&sign=${sessionStorage.getItem('sign')}&` + qs.stringify(params)).then(res => res.data);
    },
    //控制设备
    deviceControl: (params) => {
        return postAxios.get(`DeviceServlet?action=deviceControl&app=${app_key}&timestamp=${sessionStorage.getItem('timestamp')}&sign=${sessionStorage.getItem('sign')}&` + qs.stringify(params)).then(res => res.data);
    },
    getHostList: (params) => {
        return postAxios1.post(`op/rcu_rcuSmartHostList`,qs.stringify(params)).then(res => res.data);
    },
    //获取主机列表(添加)
    getAddHostList: (params) => {
        return postAxios1.get(`op/rcu_rcuSmartHostForUrlList` + qs.stringify(params)).then(res => res.data);
    },
    //添加、修改、删除主机
    addOrUpdateSmartHost: (params) => {
        return postAxios1.post(`op/rcu_addOrUpdateSmartHost`,qs.stringify(params)).then(res => res.data);
    },
    //同步设备
    syncHostDevices: (params) => {
        return postAxios1.post(`op/rcu_syncHostDevices`,qs.stringify(params)).then(res => res.data);
    },
    //清理设备
    clearHostDevices: (params) => {
        return postAxios1.post(`op/rcu_clearHostDevices`,qs.stringify(params)).then(res => res.data);
    },
    //同步情景
    syncHostScene: (params) => {
        return postAxios1.post(`op/rcu_syncHostScene`,qs.stringify(params)).then(res => res.data);
    },
    //获取情景列表
    getScenceList: (params) => {
        return postAxios1.post(`op/rcu_rcuSmartHostSceneList`,qs.stringify(params)).then(res => res.data);
    },
    //执行情景
    senseControl:(params) => {
        return postAxios1.post(`op/rcu_senseControl`,qs.stringify(params)).then(res => res.data);
    },
}