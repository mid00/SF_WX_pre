<template>
    <div class="loginbox" @touchmove.prevent>
        <div class="relativelogin">
            <div class="loginitem">
                <div class="one">
                    <div class="title"><img src="../../assets/one/xx.png"><p>请输入注册信息</p><img src="../../assets/one/xx.png"></div>

                    <InputGroup
                        class="item"
                        type="tel"
                        placeholder="请输入手机号"

                        :btnTitle="btnTitle"
                        :disabled="disabled"
                        :error="error.account"

                        v-model="account"
                        @btnClick="getVerifyCode"
                    ></InputGroup>
<!-- 验证码 -->
                    <div class="tel idno"><input @blur="allDown" @focus="allTop" v-model="verifyCode" type="text" placeholder="请输入验证码"></div>
<!-- 身份证 -->
                    <div class="tel idno"><input @blur="allDown" @focus="allTop" v-model="idnum" type="text" placeholder="请输入身份证号"></div>
                    <p>默认密码：123456</p>
                </div>


                <div class="btnGroup">

        <!-- 1. 立即注册 按钮 -->
                    <div @click="register" class="register" :class="{ unOK: !isregister, isOK: isregister}"><span>立即注册</span></div>
                </div>
            </div>
        </div>
    </div>
</template>


<script>

import InputGroup from "./input"
import { regMsg} from '../../tools/post'
import { Toast } from 'vant';

export default {
    components: { InputGroup, },
    data(){
        return {

            // tel:'',     // 双向绑定 手机号码
            idnum:'',   // 双向绑定 身份证号

            istel:false,// 手机号码 填写正确
            isID:false, // 身份证号 填写正确

            isregister:false, // 改变注册图片 tel、idnum 皆正确
            toReg: "",

            params: false, // 给父元素传参

            t: null,// 回退底部、软键盘遮挡输入框

            btnTitle: "验证码",  // 按钮
            disabled: false,        // 按钮是否禁用
            error: {},              // 验证提示信息
            account: "",            // 手机号
            verifyCode: "",         // 验证码
            pwd: "",                // 密码
            isAccount: false,
            isVerifyCode: false,
            isPwd: false,
        }
    },
    methods:{


// input 失去焦点，回退底部
    allDown(){  this.t = setTimeout( ()=>{ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); }, 250); },
    allTop(){   clearTimeout( this.t); },

// 发送验证码
        getVerifyCode(){
            if( this.isAccount){
                this.validateBtn();
                var url = "";
                var obj = {
                    action: "1028",
                    mobile: this.account,
                };
                regMsg( url, obj).then( res => {
                    console.log(res);
                    if(result.status==200){
                        if(result.data.status==200){ //注册成功时

                            sessionStorage.setItem('sfUserName',this.tel);

                            Toast.success('获取验证码成功')
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
                })
                .catch( err => {
                    console.log(err)
                });
            }else{
                Toast("请输入正确的手机号");
            }
        },

// 发送验证码 倒计时
        validateBtn(){

            // 倒计时
            let time = 120;
            let timer = setInterval( ()=>{

                if(time == 0){
                    clearInterval( timer);
                    this.disabled = false;
                    this.btnTitle = "获取验证码";
                }else{
                    this.btnTitle = time + "秒后重试";
                    this.disabled = true;
                    time--;
                }
            }, 1000);
        },

// 1. ajax 注册
        register(){

            console.log('发送 登录请求 ！')

            var url=''
            var obj={

                action:1006,
                mobile:this.account,
                code: this.verifyCode,
                idno:this.idnum
            }

            if(this.isregister){

                regMsg( url , obj ).then(result=>{

                    console.log('前端收到响应')
                    console.log(result);

                    if(result.status==200){
                        if(result.data.status==200){ //注册成功时

                            sessionStorage.setItem('sfUserName',this.tel);
                            sessionStorage.setItem('idNum', this.idnum);

                            Toast.success('注册成功')

                            setTimeout(()=>{

                                this.$emit("regSuc",this.params)
                            },1000)

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

                }).catch(err=>{console.log(err)})
            }
            else{ Toast('请输入正确的手机号码和身份证号')}
        },
    },


// watch 监听两个输入框，判断按钮背景图片
    watch:{


// 1. 监听电话号码
        account(){
            var reg = /^1[3-9]\d{9}$/;
            this.isAccount = reg.test( this.account);

            if(this.isAccount && this.isID && (this.verifyCode != "")){this.isregister=true}else{this.isregister=false}
            console.log(this.isAccount)
        },


// 2. 监听身份证号
        idnum(){

            var reg1=/^\d{18}$/;
            var reg2=/^\d{17}[X|x]$/;

            var idSure=(reg1.test(this.idnum)) || (reg2.test(this.idnum))

            idSure?(this.isID=true):(this.isID=false)

            if(this.isID && this.isAccount && (this.verifyCode != "")){this.isregister=true}else{this.isregister=false}

            console.log(idSure)
        },
// 3. 监听验证码
        verifyCode(){
            if(this.isID && this.isAccount && (this.verifyCode != "")){this.isregister=true}else{this.isregister=false}
        }

    },

}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}


/* 透明层 */
    .loginbox{
        width: 100%;
        position: fixed; top: 0; right: 0; bottom: 0; left: 0; z-index: 9;
        background: rgba(15, 15, 15, 0.6);
        display: flex; justify-content: center; align-items: center;
    }
/* 定为用 */
    .relativelogin{ width: 100%; position: relative; display: flex; justify-content: center; align-items: center;}


/* 白色背景 */
    .loginitem{
        /* border:1px solid salmon; */
        background: #FFF; border-radius: 10px;
        /* width:270.5px; */
        width: 90%;
        height:290px;
        /* height:50%; */
        /* position: absolute;top:0;right:0;bottom: 0;left: 0;margin: auto; */
        /* background:url(../../assets/zcbg.png) no-repeat;background-size: 100%; */
        display: flex; align-items: center; flex-direction: column;
    }

/* 文字内容 */
    .one{
        /* border:1px solid black; */
        width:80%;
        position: relative;
    }

/* 1. 标题 */
    .title{
        display: flex; justify-content: space-between; align-items: center;
        /* border:1px solid salmon; */
        margin: 15px 0;
    }
    .title>img{
        width:20%;
        /* border: 1px solid salmon; */
        display: block;
    }
    .title>p{font-size: 15px; color: #555;}

/* 2、3. 手机号码 */
    .tel{
        /* background:url(../../assets/one/k.png) no-repeat left center;background-size:100%; */
        border: 1px solid #D2D2D2; border-radius: 5px;
        display: flex;align-items: center;
        width: calc(100% - 2px);
        height:35px;
        margin-top:10px;
    }
    .telnum{ margin-top: 20px;}

    .tel>img{ width:12px;}

    .one>.telno>img{
        width:12px;
        margin-left:6px;
        margin-right: 11px;
    }
    .one>.idno>img{
        width:16px;
        margin-left:6px;
        margin-right: 7px;
    }
    .one>.idno>input{   padding-left: 10px; border-radius: 5px;}
    .one>p{ width:98%; margin-top:  20px; color: #999;}
    .tel>input{margin-left: 0px; width: calc(100% - 32px); height:35px; outline: none; border: none;}


    .btnGroup{
        width: 80%; display: flex; justify-content: center; margin-top: 10px;
        /* width: 230px; */
    }
/* 登录激活 */
    .register{
        /* border:1px solid red; */
        display: flex; justify-content: center; align-items: center;
        width: 100px; height: 36px;
        border-radius: 18px;
    }
    .unOK{ background: #a0a0a0;}
    .isOK{ background-image: linear-gradient(to bottom,#0984e4,#15b8f2);}

/* 取消 */
    .cancel{
        background-image: linear-gradient(to bottom,#0984e4,#15b8f2);
    }
    .register>span{ color: #FFF; font-size: 14px; letter-spacing: 2px;}

</style>
