<template>
  <div class="home">
    <div class="container">

      <!-- 1.办理地址、咨询电话 -->
      <div class="addrBox" v-show="addr">
          <div class="img"></div>
          <div class="addr">
              <p><span>办理地址：</span><span>{{addrTel.addr}}</span></p>
              <p><span>咨询电话：</span><span>{{addrTel.tel}}</span></p>
          </div>
      </div>

      <!-- 2.办理部门 -->
      <div class="dep" @click.prevent="preDept">
        <div class="optc">
          <span>办理部门：</span>
          <input type="text" placeholder="请先选择办理部门" v-model="dept" readonly  @blur="allDown" @focus="allTop">
        </div>
      </div>

      <!-- 3.预约业务 -->
      <div class="dep"  @click.prevent="preJob">
        <div class="optc">
          <span>预约业务：</span>
          <input type="text" placeholder="请先选择预约业务" v-model="job" readonly  @blur="allDown" @focus="allTop">
        </div>
      </div>

      <!-- 3.预约事项 -->
      <div class="dep"  @click.prevent="preThing" v-if="showthing">
        <div class="optc">
          <span>预约事项：</span>
          <input type="text" placeholder="请先选择预约事项" v-model="thing" readonly  @blur="allDown" @focus="allTop">
        </div>
      </div>

      <!-- 4.预约日期 -->
      <div class="dep" @click.prevent="preDay">
        <div class="optc">
          <span>预约日期：</span>
          <input type="text" placeholder="请先选择预约日期" v-model="day" readonly  @blur="allDown" @focus="allTop">
        </div>
      </div>

      <!-- 5.预约时段 -->
      <div class="dep" @click.prevent="preTime">
        <div class="optc">
          <span>预约时段：</span>
          <input type="text" placeholder="请先选择预约时段" v-model="time" readonly  @blur="allDown" @focus="allTop">
        </div>
      </div>

      <!-- 6.手机号码 -->
      <div class="tel">
        <div class="opt">
          <span>手机号码：</span><input placeholder="请输入手机号码" v-model="phone" @blur="toBottom" type="number"><!-- @blur="allDown"-->
        </div>
      </div>

      <!--7. 身份证号 -->
      <div class="idcard">
        <div class="opt">
          <span>身份证号：</span><input placeholder="请输入身份证号"  v-model="idNo" @blur="toBottom" type="text"><!-- @blur="allDown"-->
        </div>
      </div>

      <!-- 8.预约取票 -->
      <div @click="pre" :class="{ isSubmit: isPre, unSubmit: !isPre}"><span>预约取票</span></div>

      <!-- 9.预约规则 -->
      <div class="reguBox">
        <div class="regu">
          <p>预约规则：</p>
          <p>1. 凭手机号码进行预约取号</p>
          <p>2. 预约办理时间为周一至周六 08:00-17:00，办事群众在预约时间段到大厅取号后可享受及时办理服务。</p>
        </div>
      </div>

    </div><!-- container 标签 -->

    <!-- 10. picker 选项 -->
    <div class="myPicker" v-show="pickerView">
      <van-picker show-toolbar
          :title="title"
          :columns="columns"
          @cancel="onCancel"
          @confirm="onConfirm" />
    </div>

    <!-- 12. 二维码 -->
    <preCode v-if="success" :sucResult="sucResult" :tocancel="tocancel" :base64_img="base64_img" :job="job" @cancelSuc="cancelSuc"></preCode>

    <!-- 13. 登录注册 -->
    <log v-if="showLog" @logSuc="logSuc"></log><!-- 登录成功 -->
    <reg v-if="showReg" @regSuc="regSuc"></reg><!-- 注册成功 -->

  </div><!-- home -->
</template>
<script>

import { getMsg} from '../tools/get'
import { Toast, Dialog } from 'vant'
import log from './login'
import reg from '../components/one/register'
import preCode from '../components/one/preCode'

export default {
  name: 'preNews',
  components: { preCode, log, reg },
// --------------------------------------------------------------------------------------- 模型 data
  data(){
    return{

      openid: "",// openid
      addr: false,// 地址电话隐藏
      addrTel: {  // 地址电话，为一个对象：addrTel
        addr: "",
        tel: ""
      },

      dept: "",   // 1. 预约部门
      job: "",    // 2. 预约业务
      thing: "",  // 3. 预约事项
      day: "",    // 4. 预约日期
      time: "",   // 5. 预约时间
      phone: "",  // 6. 手机号码
      idNo: "",   // 7. 身份证号

      deptVar: "",    // 1. 是否改变
      jobVar: "",     // 2. 服务改变
      thingVar: "" ,  // 3. 事件改变
      dayVar: "",     // 4. 日期改变

      pre2: false,     // 2. 业务预约是否可选
      pre3: false,     // 3. 日期预约是否可选
      pre4: false,     // 4. 时段预约是否可选
      pre5: false,     // 5. 取号预约是否可选

      deptlist: [],   // 1. 预约部门
      jobArr: [],     // 2. 业务源
      joblist: [],    // 2. 业务
      thingArr: [],   // 3. 事项源
      thinglist: [],  // 3. 事项
      dayArr: [],     // 4. 天
      daylist: [],    // 4. 天
      timeArr: [],    // 5. 时间
      timelist: [],   // 5. 时间

      jobid: [],      // 2. 业务 id项
      job_id: "",     // 2. 业务 id
      thingid: [],    // 3. 事项 id项
      thing_id: "",   // 3. 事项 id
      showthing: false,// 3. 显示事项
      dayData: [],    // 4. 天    赋值用
      weeklist: [],   // 4. 天    判断时间段
      timeData: [],   // 5. 时间  赋值用
      showTime: [],
      submitTime: [],

      tocancel: false,
      
      

      Day: [],        // 暂时不知道啥用
      TimeType: [],   // 暂时不知道啥用

      isTime: false,
      isPhone: false,
      isID: false,     // 身份证号 输入正确
      isPre: true,    // 预约取号 图片激活 -> 当身份证号 id + 预约时段 正确时，激活

      t: null, // 回调函数



      // deptlist:[],    // 1. 部门数组
      deptids: [],     // 1. 部门 id 数组
      
      jobids: [],      // 2. 业务 id 数组
      jobdate: [],     // 3. 日期数组
      jobtime: [],     // 4. 时间数组

      dp_id:'',       // 部门 id
      job_id:'',      // 业务 id -> 预约日期 picker确定按钮 调函数时遍历赋值
      netnumber:0,    // 2. 网点 -> 部门 picker确定按钮 调业务函数请求回来，并赋值
      

      showMsg: false, // 5. 隐藏预约信息
      total: 0,       // 可预约数
      surplus_count: 0, // 剩余可预约数

      isWho: 1,       // 判断是谁启动的弹出框

      pickerView:false, // picker 默认隐藏
      title:'',       // picker 信息为空
      columns: [],    // picker 选项

      showLog: false, // 登录
      showReg: false, // 注册

      success: false, // 二维码子组件 显示隐藏
      sucResult:{},   // 二维码子组件 传值
      base64_img: "",
    }
  },
  watch:{ // ----------------------------------------------------------------------------------------- watch 监听

    // 5. 预约时段
    time(){
      (this.time == "") ? (this.isTime = false) : (this.isTime = true) ;

      (this.isTime && this.isPhone && this.isID) ? (this.isPre=true) : (this.isPre=false) ;
      // console.log( "可预约时间" );
    },

    // 6. 手机号
    phone(){
      var reg = /^1[3-9]\d{9}$/;
      var isright = reg.test(this.phone) ;
      isright ? (this.isPhone = true) : (this.isPhone = false) ;

      (this.isTime && this.isPhone && this.isID) ? (this.isPre=true) : (this.isPre=false) ;
    },

    // 7. 身份证号
    idNo(){
      var reg1=/^\d{18}$/;
      var reg2=/^\d{17}[X|x]$/;
      var isright = ( reg1.test( this.idNo)) || ( reg2.test( this.idNo))
      isright ? (this.isID = true) : (this.isID = false) ;

      (this.isTime && this.isPhone && this.isID) ? (this.isPre=true) : (this.isPre=false) ;
      // console.log(this.isID);
    },
  },
  created(){ // ----------------------------------------------------------------------------------------- 钩子函数
    this.bus.$on('autotel',this.setphone)   // 手机号码 自动赋值 -> 登录传值
    this.autowrite();                       // 刷新,手机号码、身份证号自动赋值
    this.isRefresh();                       // 刷新,不显示登录界面
    this.bus.$on("closeNew",this.closeNew)  // 二维码界面 关闭

    this.goto();                            // 是否需要登录、注册、请求数据
  },
  methods:{ // ----------------------------------------------------------------------------------------- methods 方法
    
    setphone( val){ this.phone = val.phone; this.idNo = val.idNo; },        // 6. 自动获取 手机号码
    autowrite(){                                                                // 刷新以后，手机号码、身份证赋值
      this.phone = sessionStorage.getItem('sfUserName');
      this.idNo = sessionStorage.getItem('idNum');
      document.body.style.background = "#EEEEEE";
    },
    isRefresh(){ if(sessionStorage.getItem("idNum")){ this.showLog = false; } },// 刷新,不显示登录界面
    closeNew( res){                                                             // 12. 关闭 二维码界面 <- 预约成功弹窗
      this.dept = '';  // 1. 预约部门
      this.job = '';     // 2. 预约服务
      this.thing = '';  // 3. 事项
      this.day = '';     // 3. 预约日期
      this.time = '';     // 4. 预约时间
      this.addr = false;
      this.success = res; // 显示 预约二维码
      this.showMsg = false;// ???
    },
    toBottom(){ window.scrollBy( { top: document.body.clientHeight, left: 0, behavior: "smooth"} );},                             // input 失去焦点，回退底部 -> scrollBottom 为 0
    allDown(){  this.t = setTimeout( ()=>{ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); }, 250); }, // input 失去焦点，回退底部
    allTop(){   clearTimeout( this.t); },


    // ------------------------------------------------------------- 程序进入判断：登录、注册
    goto(){

      var url = '';
      var obj = { action: '1001' }
      getMsg(url,obj).then(result=>{

        console.log("判断")
        console.log(result);

        if(result.status==200){

          if(result.data.status==200){

            this.idNo = result.data.idNo ;
            this.phone = result.data.phone ;
            this.openid = result.data.openid ;    // 1. openid
            console.log(sessionStorage.getItem("sfUserName")!=null);

            sessionStorage.removeItem("sfUserName");
            sessionStorage.removeItem("idNum");
            sessionStorage.setItem("sfUserName", result.data.phone);
            sessionStorage.setItem("idNum", result.data.idNo);

            
            this.addrTel.tel = result.data.data.place.Tnumber ; // 2. 电话
            this.addrTel.addr = result.data.data.place.address ;// 2. 地址

            this.dayArr = result.data.data.day ;// 3. 星期数据

            var list = result.data.data.list ;
            for(var i=0; i<list.length; i++){
              this.deptlist.push( list[i].name ) ;    // 4. 部门列表
              this.jobArr.push( list[i].bussType ) ; // 5. 业务数据
            }
            // console.log( this.deptlist) ;
            // console.log( this.jobArr) ;
            // Dialog.alert({ title: '提示', message: result.data.msg }).then(() => {}) ;
          }
          else if( result.data.status==301){ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
          else if( result.data.status==302){ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
          else if( result.data.status==303){ this.showLog = true; }// 303 登录界面
          else if( result.data.status==305){ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {
            
            document.addEventListener('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('closeWindow'); }, false) || WeixinJSBridge.call('closeWindow');// 退出微信网页
          }); }

          else if( result.data.status==304){ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
          else if( result.data.status==306){ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
          else if( result.data.status==307){ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
          else if( result.data.status==308){ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
          else if( result.data.status==309){ this.showReg = true; }// 309 注册界面
          else{ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
        }
        else{ Dialog.alert({ title: '提示', message: `${result.data.msg}，请退出` }).then(() => {}); }
      }).catch( err=>{console.log( err); })
    },


    // ------------------------------------------------------------- 预约部门
    preDept(){
            console.log('部门列表：' + this.deptlist);
            // console.log('部门 id：' + this.deptids);
            if(this.deptlist.length == 0){
              Dialog.alert({ title: '提示', message: "没有获取到数据，请重新进入程序"}).then(() => {
                document.addEventListener('WeixinJSBridgeReady', function(){ WeixinJSBridge.call('closeWindow'); }, false) || WeixinJSBridge.call('closeWindow');// 退出微信网页
              });
            }else{
              this.title='选择办理部门';  // picker 信息
              this.columns = this.deptlist;  // picker 选项
              this.pickerView = true;         // picker 显示
              this.isWho = 1 ;                // 判断谁启动的弹窗
            }
    },

    // ------------------------------------------------------------- 预约业务
    preJob(){

      if(this.pre2){
        // this.showthing = true;// 显示事项
        var arr = [];
        for(var i=0; i<this.deptlist.length; i++){
          if(this.dept == this.deptlist[i]){
            arr = this.jobArr[i] ;
          }
        }
        console.log(arr);
        this.joblist = [];
        this.thingArr = [];
        this.timeArr = [];
        for(var j=0; j<arr.length; j++){

          this.joblist.push(arr[j].bussName) ;// 业务
          this.jobid.push(arr[j].bussTypeId);// 业务 id项
          this.thingArr.push(arr[j].bussItem) ;// 事件源
          this.timeArr.push(arr[j].timeSlot) ;// 时间源
        }
        console.log(this.thingArr) ;

        this.title='选择办理业务';  // picker 信息
        this.columns = this.joblist;  // picker 选项
        this.pickerView = true;         // picker 显示
        this.isWho = 2 ;                // 判断谁启动的弹窗



        // var obj = this.joblist                 // 2. 业务数据
        // for(var key in obj){                              // 拆分joblist数组：jobids数组、joblist数组
        //   this.jobids.push(obj[key].id)                   // 2.1 业务 id
        //   this.joblist.push(obj[key].name)                // 2.2 业务列表
        // }
      }
      else{ Toast("请先选择办理部门");}
    },

    // ------------------------------------------------------------- 预约事项
    preThings(){

      if(this.pre3){ // 业务预约是否可选

        var arrthing = [];// 事项
        var arrtime = [];// 时间段
        for(var i=0; i<this.joblist.length; i++){
          if(this.job == this.joblist[i]){
            arrthing = this.thingArr[i] ;
            arrtime = this.timeArr[i] ;
          }
        }
        this.thinglist = [];// 事件
        this.thingid = [];
        for(var j=0; j<arrthing.length; j++){
          this.thinglist.push(arrthing[j].bussItemName) ;
          this.thingid.push(arrthing[j].bussItemId) ;
        }

        this.timelist = []; // 时间段赋值
        this.timeData = [];
        this.Day = [];
        this.TimeType = [];
        for(var x=0; x<arrtime.length; x++){

          // this.timelist.push(arrtime[x].TimeStart+"-"+arrtime[x].TimeEnd+" 预约名额:"+arrtime[x].TicketNum+" 剩余名额:"+arrtime[x].SmsNum) ;// 时间项
          // this.timelist.push(arrtime[x].TimeStart +"-"+ arrtime[x].TimeEnd + (arrtime[x].TimeType == 1)?(" 上午"):(" 下午")) ;// 时间项
          var val1 = (arrtime[x].TimeType == 1)?(" 上午"):(" 下午");
          var val2 = arrtime[x].TimeStart +"-"+ arrtime[x].TimeEnd + val1;
          this.timelist.push( val2) ;

          this.timeData.push(arrtime[x].TimeStart +"-"+ arrtime[x].TimeEnd) ; // 时间
          this.Day.push(arrtime[x].Day) ;                                   // Day
          this.TimeType.push(arrtime[x].TimeType) ;                         // TimeType
        }


        if(this.thinglist.length == 0){
          console.log("有没有事项 ------------------------ ");
          console.log(this.thinglist.length == 0);
          this.pre4 = true ;
          this.showthing = false;
        }
        else{
          this.showthing = true;
        }  
      }
      else{ Toast("请先选择办理业务")}
    },
    // ------------------------------------------------------------- 预约事项
    preThing(){
          this.title = '选择办理事项';  // picker 信息
          this.columns = this.thinglist
          this.pickerView = true;         // popup 显示

          this.isWho = 3 ;                 // 判断谁启动的弹窗
    },

    // ------------------------------------------------------------- 预约日期
    preDay(){

      if(this.pre4){ // 日期预约是否可选

        // console.log( new Date("2020.06.09").getDay()) ;// 年月日转星期

        var dayData = this.dayArr ;
        console.log(dayData) ;
        this.daylist = [];
        this.dayData = [];
        for(var i=0; i<dayData.length; i++){
          
          this.daylist.push(dayData[i].day+" ("+dayData[i].week+")") ;  // 3. 预约日期 + 星期
          this.dayData.push(dayData[i].day) ;                           // 3. 预约日期
          this.weeklist.push(dayData[i].weekint) ;
        }


        this.title = '选择预约日期'; // picker 信息
        this.columns = this.daylist;
        this.pickerView = true; // picker 显示

        this.isWho = 4  // 判断谁启动的弹窗
      }
      else{ Toast("请先选择办理事项")}
    },

    // ------------------------------------------------------------- 预约时间
    preTime(){
              
              if(this.pre5){ // 日期预约是否可选

                // this.jobtime = [ '08:00-09:00', '09:00-10:00', '10:00-11:00', '11:00-12:00', '13:00 - 14:00', '14:00 - 15:00', '15:00 - 16:00', '16:00 - 17:00']
                
                this.showTime = [];
                this.submitTime = [];

                var isno = false;
                for(var x=0; x<this.Day.length; x++){// 如果 Day为0
                  if(this.Day[x] == 0){

                    this.showTime = this.timelist;
                    this.submitTime = this.timeData;
                    isno = false;

                  }else{
                    isno = true;
                  }
                }


                if(isno){// 如果Day不为0

                  var int = "";
                  for(var i=0; i<this.dayData.length; i++){
                    if(this.day == this.dayData[i]){
                      int = this.weeklist[i];
                    }
                  }

                  for(var j=0; j<this.Day.length; j++){
                    if(int == this.Day[j]){
                      this.showTime.push(this.timelist[j]);
                      this.submitTime.push(this.timeData[j]);
                    }
                  }
                }

                if(this.showTime.length == 0){

                  // Toast("该日期不能预约此项业务或事项");
                  Dialog.confirm({ title: '信息', message: "该日期不能预约此项业务或事项"}).then(() => {}).catch((err) => { console.log(err)});
                }
                else{

                  this.title = '选择预约时间'; // picker 信息
                  this.columns = this.showTime;
                  this.pickerView = true; // picker 显示

                  this.isWho = 5  // 判断谁启动的弹窗
                }
              }
              else{ Toast("请先选择办理日期")}
    },


    // 取消成功
    cancelSuc(){
      this.success = false;
    },


    // ------------------------------------------------------------- 可预约人数 : 可预约总数 + 可预约人数
    getCount(){

      for( var i=0; i<this.joblist.length; i++){

        if( this.joblist[i] == this.job ){ // 业务 id
          this.job_id = this.jobids[i]
        }
      }
      var url = "";
      var obj = {
        action: "1009",
        job_id: this.job_id, // 业务 id
        date: this.preDate, // 预约日期
        time: this.preTime, // 预约时间
        netnumber :this.netnumber, // 网点号
      };
      getMsg( url, obj ).then( result => {

        console.log( result );

        if( result.status == 200 ){
          if( result.data.status == 200 ){
            
            this.total = result.data.data.total
            this.surplus_count = result.data.data.surplus_count
            this.showMsg = true;

          }
          else if( result.data.status==301){ Toast(result.data.msg); console.log('行为不存在')}
          else if( result.data.status==302){ Toast(result.data.msg); console.log('数据库操作失败')}
          else if( result.data.status==303){ Toast(result.data.msg); console.log('用户没有登录')}
          else if( result.data.status==305){ Toast(result.data.msg); console.log('参数错误')}
          else if( result.data.status==304){ Toast(result.data.msg); console.log('网站黑名单')}
          else if( result.data.status==306){ Toast(result.data.msg); console.log('数据不存在')}
          else if( result.data.status==307){ Toast(result.data.msg); console.log('当前条件下不符合要求')}
          else{ Toast(result.data.msg); console.log('请求失败')}
        }
        else{ Toast("网络错误"); console.log(result.status);}
      }).catch( err => { console.log( err ); })
    },

    // ------------------------------------------------------------- picker
    // 9.1 picker 确认按钮
    onConfirm(value,index){

      if(this.isWho == 1){        // 1. 选择部门

        this.dept = value ; // 选中部门赋给 input

        if(this.deptVar != this.dept){

          this.deptVar = this.dept;

          this.job = "" ; // 2. 服务 清除
          this.thing = "" ;
          this.day = "" ; // 3. 日期 清除
          this.time = "" ; // 4. 时间 清除

          this.pre3 = false ; // 按钮禁用
          this.pre4 = false ; // 按钮禁用
          this.pre5 = false ;
        }

        if( this.dept != ""){ this.pre2 = true ;}// 激活下一个按钮图片
        (this.addrTel.addr == "")?(this.addr = false):(this.addr = true);// 显示地址、电话
               
      }
      else if(this.isWho == 2){   // 2. 选择业务

        this.job = value ;

        if(this.jobVar != this.job){

          this.jobVar = this.job ;

          this.thing = "" ;
          this.day ="" ; // 3. 日期 清除
          this.time ="" ; // 4. 时间 清除

          this.pre4 = false ; // 按钮禁用
          this.pre5 = false ;
        }

        if( this.job != ""){ this.pre3 = true ;}// 激活下一个按钮图片
        this.preThings();
      }
      else if(this.isWho == 3){   // 3. 选择事项

        this.thing = value ;

        if(this.thingVar != this.thing){

          this.thingVar = this.thing ;

          this.day = "" ; // 4. 时间 清除
          this.time = "" ; // 预约人数 隐藏

          this.pre5 = false ;
        }

        this.pre4 = true ;
      }
      else if(this.isWho == 4){   // 4. 选择天

        // this.day = value ;
        var dayVal = value;
        for(var j=0; j<this.daylist.length; j++){
          if(dayVal == this.daylist[j]){
            this.day = this.dayData[j] ;
          }
        }

        if(this.dayVar != this.day){

          this.dayVar = this.day ;

          this.time = "" ;
        }

        if( this.day != ""){ this.pre5 = true ;}// 激活下一个按钮图片
      }
      else if(this.isWho == 5){   // 4. 选择时间

        // this.time = value ;
        var timeVal = value;
        for(var i=0; i<this.showTime.length; i++){
          if(timeVal ==  this.showTime[i]){
            this.time = this.submitTime[i] ;
          }
        }
      }

      this.pickerView = false;    // 关闭 picker
    },

    // 9.2 picker 取消按钮
    onCancel(){ this.pickerView = false;  }, // 关闭 picker

    // ------------------------------------------------------------- 取票 pre()
    pre(){

      if(this.isPre){

        for(var i=0; i<this.jobid.length; i++){
          if(this.job == this.joblist[i]){
            this.job_id = this.jobid[i];
          }
        }
        for(var j=0; j<this.thingid.length; j++){
          if(this.thing == this.thinglist[j]){
            this.thing_id = this.thingid[j];
          }
        }

        var url='';
        var obj={
                  action:     "1010",
                  date:       this.day,       // 日期
                  time:       this.time,      // 时间段
                  job_name:   this.job,       // 业务名
                  idno:         this.idNo,    // 个人身份证
                  mobile:     this.phone,     // 手机号
                  bussTypeId: this.job_id,    // 业务 id
                  bussItemId: this.thing_id,  // 事项 id
                  item_name: this.thing,      // 事项名
                }

        getMsg(url,obj).then(result=>{

          console.log('预约取票 - 接到响应');
          console.log(result);

          if(result.status==200){
            if(result.data.status==200){

              this.sucResult= { // 预约成功 响应结果 // 给 预约二维码 传值

                                yynumber  : result.data.data.yynumber,  // 预约号码
                                ymd       : this.day,   // 日期 + 
                                start_time: this.time.split("-")[0], // 开始时间
                                end_time  : this.time.split("-")[1], // 结束时间
                                time      : this.time,  // 时间
                                job_name  : this.job,                   // 预约业务
                                or_address: this.addrTel.addr,  // 网店地址
                                mobile    : this.phone,                 // 手机
                                // tocancel  : false
                                // isLoad    : true
                              };
              this.base64_img = result.data.data.base64_img;
              console.log(this.sucResult)

              this.success = true; // 显示 预约二维码

              if( sessionStorage.getItem('idNum') == null){ sessionStorage.setItem('idNum', this.idNo); }

            }
            else if( result.data.status==301){ Toast(result.data.msg); console.log('行为不存在')}
            else if( result.data.status==302){ Toast(result.data.msg); console.log('数据库操作失败')}
            else if( result.data.status==303){ Toast(result.data.msg); console.log('用户没有登录')}
            else if( result.data.status==305){ Toast(result.data.msg); console.log('参数错误')}
            else if( result.data.status==304){ Toast(result.data.msg); console.log('网站黑名单')}
            else if( result.data.status==306){ Toast(result.data.msg); console.log('数据不存在')}
            else if( result.data.status==307){ Toast(result.data.msg); console.log('当前条件下不符合要求')}
            else{ Toast(result.data.msg); console.log('请求失败')}
          }
          else{ Toast("网络错误"); console.log(result.status);}
        }).catch( err=>{ console.log(err) })
      }
      else{ Toast('请先完善信息');}
    },

    // ------------------------------------------------------------- 显示 预约二维码
    preSuc( val){

      console.log(this.sucResult);

      this.sucResult = val;
      this.base64_img = val.base64_img;
      this.success=true; // 显示 预约二维码
    },

    // 登录注册
    logSuc ( val ){ this.showLog = val; this.goto(); },
    regSuc ( val ){ this.showReg = val; this.goto(); },
  },
}
</script>


<style scoped>
  *{  color: #666; font-family: Microsoft YaHei;}
  input::placeholder{color:#aaa;}
  body::-webkit-scrollbar{ overflow-y: hidden;}

  .home{ width:100%;}
  .container{
    width:calc(100% - 20px); padding: 0 10px 50px 10px;
    display: flex; flex-direction: column; justify-content: start; align-items: center;
    /* border:1px solid red; */
  }


/* 1. 办理部门、预约业务、预约日期、预约时段 */
  .dep{
    /* height:40px; */
    width: calc(100% - 2px);
    /* border:1px solid #e8e8e8; */
    border-radius: 3px;
    background:#fff;
    margin-top:5px;
    /* border:1px sandybrown solid; */
    /* background:url(../assets/one/k2.png) no-repeat left center;background-size: 100%; */
  }
  .optc{
    /* border:1px sandybrown solid; */
    width: 100%; height: 40px;
    background: url(../assets/bt.png) no-repeat 8px center;
    background-size:6px;
    display: flex; justify-content: space-between; align-items: center;
  }
  .optc>span{
    margin-left: 18px; width: 76px;
    /* border:1px red solid; */
  }
  .optc>input{
    width: calc(100% - 94px);
    outline:none;
    border:none;
     border-radius: 3px;
    /* border:1px sandybrown solid; */
  }


  .timesItem{
    width: calc(100% - 2px);
    border:1px solid #e8e8e8; border-radius: 3px;
    background:#fff;
    margin-top:5px;
    display: flex; flex-wrap: wrap; justify-content: space-between;
  }


  .preMsg{ display: flex; flex-direction: column; width: 100%;}


/* 2. 手机号和身份证号 */
  .tel,.idcard{
    width: calc(100% - 2px);
    border-radius: 3px; background:#fff;
    margin-top: 5px;
  }


  .opt{
    width: 100%; height: 40px;
    /* border:1px solid sandybrown; */
    display: flex;align-items: center;justify-content: start;
    background: url(../assets/bt.png) no-repeat 8px center;
    background-size: 6px;
  }
  .opt>span{
    margin-left:18px;
    /* border:1px red solid; */
  }

  .opt>input{
    width:68%;
    outline: none;
    border:none;
    border-radius: 3px;
    /* border:1px red solid; */
  }


/* 3. 预约取票 */
  .unSubmit{
    width: 100%; height: 48px;
    border-radius: 24px;
    line-height: 48px; text-align: center;
    margin-top:20px;
    background: #a0a0a0;
  }
  .isSubmit{
    width: 100%; height: 48px;
    border-radius: 24px;
    line-height: 48px; text-align: center;
    margin-top: 20px;
    background-image: linear-gradient(to bottom,#0984e4,#15b8f2);
  }
  .isSubmit>span{font-size: 16px;color:#fff;}
  .unSubmit>span{font-size: 16px;color:#fff;}


/* --------------------------------------------------------------- */
/* 4. 预约规则 */
  .reguBox{ width:100%; margin-top: 20px;}
  .regu{
    width: calc(100% - 6px);
    background: url(../assets/j1-assistor.png) no-repeat left 1.5px;
    background-size:2px;
    padding-left:6px;
  }
  .regu>p{ font-size: 14px; color: #888; line-height: 20px;}
  .regu>p:nth-child(2){margin-top: 5px;}


/* 地址电话 */
    .addrBox{
        width: calc(100% - 2px); min-height: 70px; max-height: 100px;
        padding: 10px 0; margin-top: 5px;
        border: 1px solid #e8e8e8; border-radius: 3px;
        background: #FFF;
        display: flex; justify-content: start; align-items: center;
    }
    .img{   width: 4px; height: 60px; border-radius: 0 2px 2px 0; background-image: linear-gradient(to bottom, #0984e4, #15b8f2);}
    .addr{
        width: calc(100% - 18px); min-height: 70px; max-height: 100px;
        margin-left: 14px;
        display: flex; flex-direction: column; justify-content: center;
    }
    .addr>p{ display: flex;}
    .addr>p~p{ padding-top: 5px;}
    .addr>p>span:first-child{ width: 75px;}
    .addr>p:first-child>span:last-child{ width: calc(100% - 77px); padding-right: 2px;}


/* picker */
  .myPicker{
    width:100%;
    position: fixed;
    left: 0; bottom: 0;
    box-shadow: -2px 0 10px 2px #BBB;
    /* border:1px solid red; */
  }
</style>
