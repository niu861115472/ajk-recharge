import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Index from '@/view/payPage/index'
import Withhold from '@/view/payPage/withhold'
import PhonePage from '@/view/payPage/phonePage'
import WxQrcode from '@/view/payPage/wxQrcode'
import ScrManage from '@/view/scriptPage/scrManage'
import HouseType from '@/view/houseTypePage/houseType'
import LogQuery from '@/view/logQueryPage/logQuery'
import Host from '@/view/hostPage/host'
import JLhost from '@/view/JL-host/home'
import Tmall from '@/view/Tmall/host'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/withhold',
      name: 'Withhold',
      component: Withhold
    },
    {
      path:'/phonePage',
      name:'PhonePage',
      component:PhonePage
    },
    {
      path:'/scrManage',
      name:'ScrManage',
      component:ScrManage
    },
    {
      path:'/wxQrcode',
      name:'WxQrcode',
      component:WxQrcode
    },
    {
      path:'/houseType',
      name:'HouseType',
      component:HouseType
    },
    {
      path:'/logQuery',
      name:'LogQuery',
      component:LogQuery
    },
    {
      path:'/host',
      name:'Host',
      component:Host
    },
    {
      path:'/JLhost',
      name:'JLhost',
      component:JLhost
    },
    {
      path:'/Tmall',
      name:'Tmall',
      component:Tmall
    }
  ]
})
