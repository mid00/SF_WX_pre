import Vue from 'vue'
import VueRouter from 'vue-router'


import preNews from '../views/preNews.vue'


Vue.use(VueRouter)

const routes = [

  //component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')

  {path: '/register',       name: 'register',     component: ()=> import('../components/one/register')},       // 0. 注册
  {path: '/me',             name: 'me',           component: ()=> import('../components/one/me')},             // 2.我的信息
  {path: '/alterMsg',       name: 'alterMsg',     component: ()=> import('../components/one/alterMsg')},       // 2.1.修改我的信息
  {path: '/alterTel',       name: 'alterTel',     component: ()=> import('../components/one/alterTel')},       // 2.1.修改我的信息
  // {path: '/login',          name: 'login',        component: ()=> import( /* webpackChunkName: "about" */ '../views/login.vue'),     meta:{showNav: true}},

  //{path: '/',             name: 'Home',         component: Home},
  {path: '/',               name: 'preNews',      component: preNews,                               meta:{showNav: true}},  // 第 1 页 提前预约 第 1 版 -> redirect: '/preNews',
  //{path: '/preNews',      name: 'preNews',      component: preNews,                               meta:{showNav: true}},  // 第 1 页 提前预约 第 1 版
  {path: '/lineNews',       name: 'lineNews',     component: ()=> import( /* webpackChunkName: "about" */ '../views/lineNews.vue'),  meta:{showNav: true}},
  {path: '/queryNews',      name: 'queryNews',    component: ()=> import( /* webpackChunkName: "about" */ '../views/queryNews.vue'), meta:{showNav: true}},
  {path: '/writeNews',      name: 'writeNews',    component: ()=> import( /* webpackChunkName: "about" */ '../views/writeNews.vue'), meta:{showNav: true}},
  {path: '/epage',          name: 'epage',        component: ()=> import( /* webpackChunkName: "about" */ '../views/epage.vue'),     meta:{showNav: true}},  // 评价页

  //{path: '/nav',          name: 'nav',          component: ()=> import('../components/nav')},
  {path: '/preCode',        name: 'preCode',      component: ()=> import( /* webpackChunkName: "preCode" */ '../components/one/preCode')},     // 1. / 3. 预约二维码
  {path: '/times',          name: 'times',        component: ()=> import( /* webpackChunkName: "times" */   '../components/one/times')},     // 1. / 3. 预约二维码
  {path: '/timess',         name: 'timess',       component: ()=> import( /* webpackChunkName: "timess" */  '../components/one/timess')},     // 1. / 3. 预约二维码
  // {path: '/addr',        name: 'addr',         component: ()=> import('../components/two/addr')},        // 2.地址电话
  //{path: '/preMsg',       name: 'preMsg',       component: ()=> import('../components/three/preMsg')},      // 3.预约信息
  {path: '/preMsgs',        name: 'preMsgs',      component: ()=> import( /* webpackChunkName: "preMsgs" */ '../components/three/preMsgs')},     // 3.查询信息
  {path: '/SFmap',          name: 'SFmap',        component: ()=> import( /* webpackChunkName: "SFmap" */ '../components/three/SFmap')},         // 3.地图
  {path: '/tdCode',         name: 'tdCode',       component: ()=> import( /* webpackChunkName: "tdCode" */ '../components/four/tdCode')},       // 4.关闭二维码
  {path: '/bills/:arr',     name: 'bills',        component: ()=> import( /* webpackChunkName: "bills" */ '../components/four/bills'),            props: true},   // 4.预填单据表
  //{path: '/billItem',     name: 'billItem',     component: ()=> import('../components/four/billItem')},     // 4.单据项
  {path: '/billDetail/:arr',name: 'billDetail',   component: ()=> import( /* webpackChunkName: "billDetail" */ '../components/four/billDetail'),  props: true},   // 4.丢失
  {path: '/history/:arr',   name: 'history',      component: ()=> import( /* webpackChunkName: "history" */ '../components/four/history'),        props: true},   // 4.历史数据
  {path: '/info',           name: 'info',         component: ()=> import('../components/four/info')},         // 4.历史数据
  {path: '/alterForm/:arr', name: 'alterForm',    component: ()=> import( /* webpackChunkName: "alterForm" */ '../components/four/alterForm'),    props: true},   // 4.修改预填单
  //{path: '/yearMouth',    name: 'yearMouth',    component: ()=> import('../components/four/yearMouth')},    // 4.历史 年月
  //{path: '/testSelect',   name: 'testSelect',   component: ()=> import('../components/four/testSelect')},   // 4.历史 年月 测试
  {path: '/evaluate/:arr',  name: 'evaluate',     component: ()=> import( /* webpackChunkName: "evaluate" */ '../components/five/evaluate'),      props: true},    // 5.评价
  //{path: '/msg',          name: 'msg',          component: ()=> import('../components/five/msg')},         // 5.信息
  {path: '/msgs',           name: 'msgs',         component: ()=> import( /* webpackChunkName: "msgs" */ '../components/five/msgs')},         // 5.信息
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 全局前置 导航守卫
router.beforeEach((to,from,next)=>{

      let isLogin=sessionStorage.getItem('idNum');
// 如果已经登录，可以跳转
      if( isLogin){ next();}
      else{

        if( to.path==='/'){ next();}
        else if( to.path==='/alterMsg'){ next();}
        else if( to.path==='/register'){ next();}
        else{ next('/');}
      }
})


// 刷新时，滚动条位置不变
// const scrollBehavior = (to, from, savedPosition) => {

//   console.log("我在刷新")
//   if(to.hash){ return { selector: to.hash } }
// }


export default router