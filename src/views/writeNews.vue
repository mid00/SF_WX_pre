<template>
    <div class="preBox">
        <div class="preWrite">

    <!-- 手机号码 -->
            <div class="tel">
                <img src="../assets/one/bt.png">
                <span>手机号码 :</span>
                <input type="number" placeholder="点击可修改" @blur="allDown" @focus="allTop" v-model="tel">
            </div>

    <!-- 身份证号 -->
            <div class="idnum">
                <img src="../assets/one/bt.png">
                <span>身份证号 :</span>
                <input type="text" placeholder="请先输入身份证号" @blur="allDown" @focus="allTop" v-model="idcard">
            </div>


    <!-- 选择部门 -->
            <div class="dep" @click.prevent="chooseDept">
                <div class="cla">
                    <img src="../assets/one/bt.png">
                    <span>所属部门 :</span>
                    <input type="text" placeholder="请先选择办理部门" v-model="dpt" readonly @blur="allDown" @focus="allTop">
                </div>
            </div>

    <!-- 选择业务 -->

            <div class="opt" @click.prevent="jobBut">
                <div class="cla">
                    <img src="../assets/one/bt.png">
                    <span>业务选择 :</span>
                    <input type="text" placeholder="请先选择预约业务" v-model="service" readonly @blur="allDown">
                </div>
            </div>



<!-- 按钮 -->
            <div class="sel">

    <!-- 1. 获取单据 -->
                <div @click="getBills">
                    <img :src=" isSure ? require('../assets/four/an.png') : require('../assets/four/an-pr.png')">
                </div>

    <!-- 2. 历史单据 -->
                <div @click="getNotes">
                    <img :src=" isSure ? require('../assets/four/ls.png') : require('../assets/four/ls-pr.png')">
                </div>

            </div>

        </div>

    <!-- picker -->
            <div class="pickerView">
                <van-picker
                    v-show="isPicker"
                    show-toolbar
                    :title="title"
                    :columns="columns"
                    @cancel='onCancel'
                    @confirm='onConfirm'
                />
            </div>
    </div>
</template>


<script>

import {getMsg} from '../tools/get'
import { Toast, Tab } from 'vant'

export default {
    data(){
        return {

            tel: "",
            idcard: "",
            dpt: "",         // picker 赋值对象 - 部门
            service: "",     // picker 赋值对象 - 业务

            isTel: false,
            isid: false,     // 身份证是否正确
            isSure:false,   // 是否 可以查询

            dpids: [],      // 部门 id 数组
            dplist: [],      // 部门数组
            dp_id: "",        // 选择部门的 id

            jobids:[],      // 业务 id 数组
            joblist:[],     // 业务数组
            job_id: "",
            dpvalued:'',    // 业务判断 是否需要再次请求

            isService:false,// 业务 是否可选

            t: null, // 回调函数

            columns:[],     // picker 部门选项
            title:'',       // picker 标题提示
            isPicker:false, // 是否显示 picker
            i: "",            // picker判断是谁触发
        }
    },
    created(){
        this.autoget();// 自动填充手机号码
        document.body.style.background = "#EEEEEE";
    },
    updated(){
        this.autoget();// 自动填充手机号码
    },
    methods:{

// input 失去焦点，回退底部
    allDown(){  this.t = setTimeout( ()=>{ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); }, 250); },
    allTop(){   clearTimeout( this.t); },

// 自动填充手机号码
    autoget(){
        console.log(this.idcard = sessionStorage.getItem('idNum'));
        this.tel = sessionStorage.getItem('sfUserName');
        this.idcard = sessionStorage.getItem('idNum');
    },


// 1.0 选择部门
        chooseDept(){

            this.i='department' //给 picker 赋值做判断

            if( this.dpt == "" ){    // 当没有请求过部门时

                var url = '';
                var obj = {
                    action:'1003'
                };
                getMsg( url, obj).then(result=>{

                    // console.log(result)

                    if(result.status == 200){
                        if(result.data.status == 200){

                            var res = result.data.data

                            for(var key in res){

                                this.dpids.push(res[key].dp_id)
                                this.dplist.push(res[key].dp_name)
                            }
                            // console.log(this.dpids)
                            // console.log(this.dplist)

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


            this.title='请先选择办理部门'
            this.columns = this.dplist
            this.isPicker=true;
        },


// 2.0 选择业务
        chooseService(){

            if( this.dpvalued != this.dpt ){
                this.dpvalued = this.dpt

                for(var i=0; i<this.dpids.length; i++){
                    if( this.dpt == this.dplist[i] ){
                        this.dp_id = this.dpids[i]
                    }
                }
                var url = '';
                var obj = {
                            action :'1007',
                            dp_id : this.dp_id
                          };
                getMsg( url , obj ).then( result=>{

                    // console.log( result )

                    if( result.status ==200 ){
                        if( result.data.status == 200 ){

                            var job_list = result.data.data.joblist

                            for(var i=0; i<job_list.length; i++){
                                this.jobids.push(job_list[i].id)
                                this.joblist.push(job_list[i].name)
                            }
                            // console.log(this.jobids)
                            // console.log(this.joblist)
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

                } ).catch( err =>{ console.log(err)})
            }
        },


// 2.1 业务选择 按钮
        jobBut(){
            if( this.isService){               // 当部门有值时
                this.i='service'        //给 picker 赋值做判断
                this.title='请先选择预约业务'
                this.columns = this.joblist ;
                this.isPicker=true;
            }
            else{ Toast('请先选择部门') }// 部门没有值时
        },


// 1.1 picker确定按钮
        onConfirm(value,index){

            console.log(`选择部门：${value}，当前索引：${index}`);

            if( this.i == 'department' ){ // 判断 i的值，给input赋值

                this.dpt = value;
                this.service = "";
                this.isService = true; // 业务选项 可选
                this.chooseService(); // 业务选项 请求
            }
            else if( this.i == 'service' ){
                this.service = value;

                for( var i=0; i<this.joblist.length; i++){
                    if( this.joblist[i] == this.service ){
                        this.job_id = this.jobids[i];
                    }
                }
            }
            // this.dpt = value;
            // this.isSure = true;
            this.isPicker = false;
        },


// 1.2 picker取消按钮
        onCancel(){ this.isPicker=false; },


// 获取 部门id / 业务id
        // getId(){

        //     for(var i=0; i<this.dplist.length; i++){
        //         if( this.dplist[i] == this.dpt){

        //             this.dp_id = this.dpids[i];
        //             // console.log( this.dpt);
        //             // console.log( this.dplist);
        //             // console.log( this.dp_id);
        //             // console.log( this.dpids);
        //         }
        //     }
        //     if( this.service != ''){
        //         for(var j=0; j<this.joblist.length; j++){
        //             if( this.service = this.joblist[i]){
                        
        //                 this.job_id = this.jobids[i]
        //             }
        //         }
        //     }
        // },


// 1.  获取单据 按钮
        getBills(){

            ( this.isid  && (sessionStorage.getItem('idNum') == "null") )?sessionStorage.setItem("idNum", this.idcard):Toast("身份证号码有误")

            if( this.isSure ){

                // this.getId();
                
                // var getObj = {
                //     dp: this.dpt,
                //     dp_id: this.dp_id,
                //     job_id: this.job_id,
                //     mobile: this.tel,
                //     idno: this.idcard
                // }

                // this.$set( getObj, "dp", this.dpt);
                // this.$nextTick(function () { bus.$emit('getWrite', getObj); }) // DOM 现在更新了
                // this.bus.$emit("getWrite", this.dpt, this.dp_id, this.job_id, this.tel, this.idcard);

                var getArr = [ this.dpt, this.dp_id, this.job_id, this.tel, this.idcard ]
                
                this.$router.push(`/bills/${getArr}`);

            }else{ Toast('请先完善信息') }
        },


// 2.  历史单据 按钮
        getNotes(){

            ( this.isid  && (sessionStorage.getItem('idNum') == "null") )?sessionStorage.setItem("idNum", this.idcard):Toast("身份证号码有误")

            if( this.isSure ){

                // this.getId();
                

                var getArr = [ this.dpt, this.dp_id, this.job_id, this.tel, this.idcard ]
                this.$router.push(`/history/${getArr}`);

            }else{ Toast('请先完善信息'); }
        },
    },


    watch:{

// 手机号码
        tel(){

            var reg = /^1[3-9]\d{9}$/;
            if( reg.test( this.tel)){ this.isTel = true;}
            else{ this.isTel = false;}

            (this.isTel && this.isid && (this.dpt !=''))?(this.isSure=true) : (this.isSure=false)
        },

// 身份证号码
        idcard(){

            var reg1=/^\d{18}$/;
            var reg2=/^\d{17}[Xx]$/;
            if( reg1.test(this.idcard) || reg2.test(this.idcard) ){ this.isid = true;}
            else{ this.isid = false;}

            ( this.isTel && this.isid && (this.dpt != '') ) ? (this.isSure=true) : (this.isSure=false)
        },

// 部门是否选择
        dpt(){ ( this.isTel && this.isid && (this.dpt != '') ) ? (this.isSure=true) : (this.isSure=false) },
    }
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;}
    input::placeholder{color:#aaa;}


/* 背景 */
    .preBox{ width:100%;}
    .preWrite{
        width:calc(100% - 20px);
        padding:0 10px;
    }


/* 1、2 手机号、身份证号 */
    .tel,.idnum{
        width: calc(100% - 2px); height:40px;
        background:#fff;
        /* border:1px solid #e8e8e8; */
        border-radius: 3px;
        margin-top:5px;
        display: flex; align-items: center; justify-content: start;
        /* background:url(../assets/one/k2.png) no-repeat left center;;background-size:100%; */
    }

    .tel{margin-top: 5px;}
    .tel>img,.idnum>img{display: block;width:6px;margin-left:8px;}
    .tel>span,.idnum>span{margin-left:4px; width: 74px;}
    .tel>input,.idnum>input{width: calc(100% - 92px);padding-left: 1%;border:none;outline:none;}


/* 3、4 所属部门、业务选择 */
    .dep,.opt{
        /* border:1px solid salmon; */
        width: calc(100% - 2px);
        height:40px;
        background:#fff;
        /* border:1px solid #e8e8e8; */
        border-radius: 3px;
        margin-top:5px;
        display:flex;justify-content: space-between;align-items: center;
        /* background:url(../assets/one/k2.png) no-repeat left center;background-size: cover; */
        /* padding:2% 0; */
    }

    .cla{
        /* border:1px solid green; */
        width: 100%;
        display: flex;justify-content: start;align-items: center;
    }
    .cla>img{width:6px;display: block;margin-left:8px;}
    .cla>span{margin-left:4px; width: 74px;}
    .cla>input{width: calc(100% - 92px);padding-left:2px;border:none;outline: none; }

    .icon{width: 50px;}
    .icon>img{width:100%;display: block;}


/* 5 ajax按钮 */
    .sel{
        width:100%;
        display:flex;justify-content: center;align-items: center;
    }
    .sel>div{width:120px;padding:20px;}
    .sel>div>img{width:100%;display: block;}


/* 6. pickerView */
    .pickerView{
        width:100%;
        position: absolute;left:0;bottom: 0;
    }
</style>
