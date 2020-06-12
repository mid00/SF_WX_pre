<template>
    <div class="loginbox" @touchmove.prevent>

<!-- 登录界面 -->
        <div class="loginitem">

            <div class="one">
                <div class="title"><img src="../assets/one/xx.png"><p>使用手机号登录</p><img src="../assets/one/xx.png"></div>
                <div class="tel"><img src="../assets/one/sj.png"><input @blur="allDown" @focus="allTop" v-model="tel" type="tel" placeholder="输入手机号"></div>
                <div class="tel"><img src="../assets/one/mm.png"><input @blur="allDown" @focus="allTop" v-model="pwd" type="text" placeholder="输入密码"></div>
                <div class="reg"><p @click="losePwd">忘记密码 ？</p></div>
            </div>
            <div @click="login" class="login"><img :src="isLogin?require('../assets/one/dl.png'):require('../assets/one/dl-pr.png')"></div>

        </div>

<!-- 密码提示 -->
<!--
        <div class="losepassword" v-show="ispre" @click="showpwd">
            <img src="../assets/losepwd.png">
        </div>
 -->

    </div>
</template>

<script>
import { getMsg} from '../tools/get';
import { Toast } from 'vant';
export default {
    data(){
        return {

            tel:'', // 1. 双向绑定 手机号码
            pwd:'', // 2. 双向绑定 密码
            idNum: "", // 身份证

            isTel:false, //电话号码满足规则
            isPwd:false, //密码满足规则

            isLogin:false,  // 3. 登录按钮图片 = 电话、密码同时满足规则

            params:false, // 4. 注册时，给home传参，隐藏 login，显示 register

            ispre:false, // 忘记密码
            isout:true, // 禁止频繁点击

            isBlur: false, // 失去焦点，回退底部

            t: Function, // 回调函数
        }
    },
    created(){
        // this.inputFunction();
        this.writeTel();
        this.isAndroid();
    },
    methods:{

// 修改密码自动填写手机号码
    writeTel(){
        // ( sessionStorage.getItem("sfUserName"))?(this.tel = sessionStorage.getItem("sfUserName")):"";
    },

// input 失去焦点，回退底部
    allDown(){  this.t = setTimeout( ()=>{ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); }, 250); },
    allTop(){   clearTimeout( this.t); },

    isAndroid(){

        window.addEventListener("resize", function(){
            if(document.activeElement.tagName == "INPUT" || document.activeElement.tagName == "TEXTAREA"){
                window.setTimeout( function(){
                    document.activeElement.scrollIntoView() || document.activeElement.scrollIntoViewIfNeeded();
                })
            }
        })
    },


// 3. 登录 -> ajax
        login(){

            console.log('请求登录');

            if(this.isLogin){

                var url='';                // 接口
                var obj={
                            action:'1001',
                            mobile:this.tel,    // 手机号
                            pwd:this.pwd,       // 密码
                        };
                getMsg(url,obj).then(result=>{

                    console.log('前端收到响应');
                    console.log(result);

                    if(result.status==200){
                        if(result.data.status==200){ // 登录成功

                            var obj = {};
                            obj.phone   = result.data.data.mobile;
                            obj.idNo = result.data.data.idno;

                            sessionStorage.setItem("sfUserName", obj.phone);
                            sessionStorage.setItem("idNum", obj.idNo);

                            Toast.success('登录成功');

                            this.bus.$emit("autotel", obj); // 自动填充 手机号码 身份证号码
                            setTimeout(() => { this.$emit('logSuc',this.params);}, 1000);

                        }
                        else if( result.data.status==301){ Toast(result.data.msg); console.log('行为不存在')}
                        else if( result.data.status==302){ Toast(result.data.msg); console.log('数据库操作失败')}
                        else if( result.data.status==303){ Toast(result.data.msg); console.log('用户没有登录')}
                        else if( result.data.status==305){ Toast(result.data.msg); console.log('参数错误')}
                        else if( result.data.status==304){ Toast(result.data.msg); console.log('网站黑名单')}
                        else if( result.data.status==306){ Toast(result.data.msg); console.log('数据不存在')}
                        else if( result.data.status==307){ Toast(result.data.msg); console.log('当前条件下不符合要求')}
                        else{ Toast(result.data.msg); console.log('请求失败')}
                    // -------------------------------------------------- 2
                    }
                    else{ Toast("网络错误"); console.log(result.status);}

                }).catch( err=>{ console.log(err) })

            }else{
                Toast('请输入正确的手机号和密码')
            }
        },


// 1.0 忘记密码

        losePwd(){

            this.$router.push("/alterMsg"); },


// 2. 注册时，给 home传参，让登录界面隐藏，注册界面显示
        // reg(){ this.$emit("gotoReg",this.params); },
    },

// 监听输入框，切换登录按钮图片
    watch:{
        tel(){

            var telReg=/^1[3-9]\d{9}$/;
            telReg.test(this.tel) ? (this.isTel=true):(this.isTel=false)

            if(this.isTel && this.isPwd){
                this.isLogin=true;
            }else{
                this.isLogin=false;
            }
        },
        pwd(){

            var pwdReg=/\w{6,}/;
            pwdReg.test(this.pwd) ?(this.isPwd=true) : (this.isPwd=false)

            if(this.isTel && this.isPwd){
                this.isLogin=true;
            }else{
                this.isLogin=false;
            }
        },
    },

}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;}
    input::placeholder{color:#aaa;}


/* 透明层 */
    .loginbox{

        position: fixed; top:0; right:0; bottom: 0; left: 0; background:rgba(15, 15, 15, 0.6); z-index: 2;
        display: flex;justify-content: center;align-items: center;
    }
/* 白色框 */
    .loginitem{

        width: 270.5px; height: 259.5px;
        background: url(../assets/one/bg.png) no-repeat; background-size: 100%;
        display: flex;justify-content: center;align-items: center;flex-direction: column;
    }
    .one{
        /* border:1px solid black; */
        width:85%;
    }

/* 标题 */
    .title{
        display:flex;justify-content: space-between;align-items: center;
        /* border:1px solid salmon; */
        color:#777;
        margin:8% 0 8% 0;
        width:100%;
    }
    .title>img{
        width:22%;
        /* border: 1px solid salmon; */
        display: block;
    }
    .title p{
        font-size:14px;color:#555;
        /* border:1px solid red; */
    }

/* 手机号码 */
    .tel{

        border:1px solid #D2D2D2;border-radius: 3px;
        display: flex;align-items: center;
        width:98%;height:35px;
        margin-top:4%;
    }
    .tel>img{ width: 12px; padding-left: 6px;}
    .tel>input{ margin-left: 6px; width: calc(100% - 24px); height: 35px; border:none;outline:none;}

/* 忘记密码/注册 */
    .reg{
        display: flex;justify-content: flex-end;align-items: center;
        margin-top:5%;
        /* border:1px solid salmon; */
    }
    .reg>p{font-size: 14px;color: #999;}
    /* .reg>p:last-child{color:red;} */

/* 登录激活 */
    .login{
        /* border:1px solid red; */
        display: flex;justify-content: center;align-items: center;
        width: 120px; height: 35px;
        margin:10% 0;
    }
    .login>img{ display: block; width: 120px; height: 35px;}

/* 忘记密码 */
    .losepassword{
        position: absolute;top:0;right:0;bottom: 0;left: 0; z-index: 99999;
        background: rgba(20,20,20,0.5);
        display: flex; justify-content: center; align-items: center;
    }
    .losepassword>img{
        width:190px;height:35px;
    }

</style>
