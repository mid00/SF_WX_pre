<template>
    <div class="alterMe">

<!-- 1. 手机号码 -->
        <div class="tel">
            <div class="content"><span>手机号码：</span><input @blur="allDown" @focus="allTop" v-model="tel" type="number" placeholder="点击可修改"></div>
            <p @click="delData(0)" class="delNum">×</p>
        </div>

<!-- 身份证号 -->
        <div class="idcard">
            <div class="content"><span>身份证号：</span><input @blur="allDown" @focus="allTop" v-model="idNum" type="text" placeholder="点击可修改"></div>
            <p @click="delData(1)" class="delNum">×</p>
        </div>

<!-- 新设密码 -->
<!-- 
        <div class="idcard">
            <div class="content"><span>新设密码：</span><input @blur="allDown" @focus="allTop" v-model="pwd" type="text" placeholder="点击可修改"></div>
            <p @click="delData(2)" class="delNum">×</p>
        </div>
 -->

<!-- 提交按钮 -->
        <div @click="subAlter" :class="{isSubmit:isSure,unSubmit:!isSure}"><span>确 定</span></div>

    </div>
</template>


<script>

import {getMsg} from '../../tools/get'
import {alterMsg} from '../../tools/put'
import { Toast } from 'vant';

export default {
    data(){
        return {

            tel:'',     // 手机号码
            idNum:'',   // 身份证号
            // pwd: "", // 密码

            isTel: false,// 号码正确
            isID: false, // id 不改
            // isPwd: false, // 密码正确

            isSure:false, // 切换按钮图片 = 号码、id 同时正确

            t: Function, // 回调函数
        }
    },
    created(){ this.autoGet(); },// 钩子函数 -> 自动获取用户 id tel
    methods:{


// 1. 自动获取个人信息
        autoGet(){

            var telephone = sessionStorage.getItem("sfUserName");
            console.log(telephone);
            if( telephone != null){
                this.tel = sessionStorage.getItem("sfUserName");
                this.idNum = sessionStorage.getItem("idNum");
            }

            // var url='';
            // var obj={
            //             action:1004,
            //         };
            // getMsg(url,obj).then(result=>{
            //     console.log('响应成功')
            //     console.log(result)

            //     if(result.status==200){
            //         if(result.data.status==200){

            //             this.tel=result.data.data.mobile;
            //             this.idNum=result.data.data.id;

            //         }else{ console.log( result.data.msg )}
            //     }
            //     else if( result.status==301){ console.log('行为不存在')}
            //     else if( result.status==302){ console.log('数据库操作失败')}
            //     else if( result.status==303){ console.log('用户没有登录')}
            //     else if( result.status==305){ console.log('参数错误')}
            //     else if( result.status==304){ console.log('网站黑名单')}
            //     else if( result.status==306){ console.log('数据不存在')}
            //     else if( result.status==307){ console.log('当前条件下不符合要求')}
            //     else{ console.log('请求失败')}

            // }).catch(err=>{console.log(err)})
        },


// 2. 提交修改信息
        subAlter(){

            if(this.isSure){

                var url='';
                var obj={
                            action: "1005",
                            mobile: this.tel,
                            id: this.idNum,
                            pwd: this.pwd
                        };
                alterMsg(url,obj).then(result=>{
                    console.log("提交修改响应")
                    console.log(result)

                    if(result.status==200){
                        if(result.data.status==200){

                            Toast.success('修改成功');

                            sessionStorage.setItem("sfUserName", this.tel);
                            sessionStorage.setItem("idNum", this.idNum);
                            
                            this.$router.push("/");
                            this.$emit('logSuc',this.params);// 跳转主页，隐藏登录界面
                        }
                        else if( result.data.status==301){ Toast("行为不存在");     console.log('行为不存在')}
                        else if( result.data.status==302){ Toast("数据库操作失败"); console.log('数据库操作失败')}
                        else if( result.data.status==303){ Toast("用户没有登录");   console.log('用户没有登录')}
                        else if( result.data.status==305){ Toast("参数错误");       console.log('参数错误')}
                        else if( result.data.status==304){ Toast("网站黑名单");     console.log('网站黑名单')}
                        else if( result.data.status==306){ Toast("数据不存在");     console.log('数据不存在')}
                        else if( result.data.status==307){ Toast("当前信息已存在"); console.log('当前条件下不符合要求')}
                        else{ Toast("手机号码或身份证号码错误");                     console.log('请求失败')}
                    }
                    else{ Toast("网络错误"); console.log('请求失败')}

                }).catch( err=>{console.log(err)})

            }else{ Toast('请输入正确的手机号码') } // 手机号或身份证号输入错误
        },


// 删除数据
        delData(n){

            if( n == 0){ this.tel = "";}
            else if( n == 1){ this.idNum = "";}
            else if( n == 2){ this.pwd = "";}
        },


// input 失去焦点，回退底部
        allDown(){
            this.t = setTimeout( ()=>{ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); }, 250);
        },
        allTop(){
            clearTimeout( this.t);
        },
    },


// 双向绑定 切换图片------------------------------------------------
    watch:{


        tel(){
            var reg = /^1[3-9]\d{9}$/;
            var result = reg.test(this.tel);
            result ? (this.isTel=true) : (this.isTel=false);
            (this.isTel && this.isID )?(this.isSure = true):(this.isSure = false);
        },
        idNum(){
            var reg1 = /^\d{18}$/;
            var reg2 = /^\d{17}[Xx]$/;
            var result = reg1.test(this.idNum) || reg2.test(this.idNum);
            result ? (this.isID=true) : (this.isID=false);
            (this.isTel && this.isID )?(this.isSure = true):(this.isSure = false);
        },
        // pwd(){
        //     var reg = /\w{6,}$/;
        //     var result = reg.test(this.pwd);
        //     result ? (this.isPwd=true) : (this.isPwd=false);
        //     (this.isTel && this.isID && this.isPwd)?(this.isSure = true):(this.isSure = false);
        // }
    }
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}

    .alterMe{
        width:100%;
        /* padding:0 1%; */
        background:#eee;
        position: absolute;right:0;bottom:0;left:0;top:0;
        /* border:1px solid red; */
    }



/* 1/2 手机号码、身份证号 */
    .tel,.idcard{
        /* background: url(../../assets/one/k2.png) no-repeat left center;background-size: 100%; */
        /* padding:3% 0 3% 2%; */
        width:100%;
        height:45px;
        background: #fff;
        border-bottom:1px solid #e8e8e8;
        display: flex; justify-content: space-between; align-items: center;

    }
    .content{width: calc(100% - 32px);}
    .content>span,.content>span{margin-left: 10px;}
    .content>input,.content>input{width: calc(100% - 90px); height: 44px; outline: none; border: none;}

/* 删除小按钮 */
    .delNum{
        height: 20px; width: 20px;
        /* border:1px solid rgba(0,0,0,0.2);border-radius: 50%; */
        margin-right: 12px;
        display: flex;justify-content: center;align-items: center;
    }

/* 3 提交按钮 */
    .unSubmit{
        width:100%;height:48px;
        background: #a0a0a0;
        border-radius: 24px;
        line-height: 48px;text-align: center;
        margin-top:20px;
    }
    .isSubmit{
        width:100%;height:48px;
        background-image: linear-gradient(to bottom,#0984e4,#15b8f2);
        border-radius: 24px;
        line-height: 48px;text-align: center;
        margin-top:20px;
    }
    .isSubmit>span{font-size: 16px;color:#fff;}
    .unSubmit>span{font-size: 16px;color:#fff;}
</style>
