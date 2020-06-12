import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


// ajax请求和登录验证
import axios from 'axios'
axios.defaults.baseURL='http://jh.com/standard/ajaxHttp.php' // 访问服务器地址
axios.defaults.withCredentials=true
Vue.prototype.axios=axios


// 导航全局组件
import nav from './components/nav'
Vue.component("navbar",nav)

import iconMe from './components/one/iconMe'
Vue.component("iconMe",iconMe)

import mapIcon from './components/three/mapIcon'
Vue.component("mapIcon",mapIcon)

// 组件通信
import bus from './bus'
Vue.prototype.bus=bus


// 第三方组件 vant
import Vant from 'vant'
import 'vant/lib/index.css'
Vue.use(Vant);

import {Toast} from 'vant' // 轻提示组件
Vue.use(Toast);

import {Picker} from 'vant' // picker 组件
Vue.use(Picker);

import {RadioGroup,Radio} from 'vant'       // 单选 -> billlsDetails
Vue.use(RadioGroup);
Vue.use(Radio);

import {CheckboxGroup,Checkbox} from 'vant' // 复选 -> billlsDetails
Vue.use(CheckboxGroup);
Vue.use(Checkbox);

import { DatetimePicker } from 'vant';      // 日期时间 -> billlsDetails
Vue.use(DatetimePicker);

import {Area} from 'vant'                   //省市区 -> billlsDetails
Vue.use(Area);

import { Col, Row } from 'vant'             // 行列 -> billlsDetails
Vue.use(Col);
Vue.use(Row);

// import {PasswordInput, NumberKeyboard} from "vant" // 密码输入框、数字键盘
// Vue.use(PasswordInput);
// Vue.use(NumberKeyboard);


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),


// 全局变量 -> 可读写
  // data: function(){
  //   return {

  //     deptResponse:{}, // 第 1 页获取的部门请求 -> 全局变量
  //     timerId: '',
  //   }
  // },
  // created(){
  //   window.addEventListener("scroll", this.justifyPos);
  // },
  // methods:{
  //   justifyPos(){
  //     if(this.timerId)clearTimeout(this.timerId)
  //     this.timerId = setTimeout(()=>{
  //       this.$route.meta.x = window.pageXOffset
  //     }, )
  //   }
  // }


}).$mount('#app')