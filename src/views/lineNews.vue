<template>
    <div class="lineNews">
        <div class="lineposition">
            <addr v-show="addr" :addrTel="addrTel"></addr>

    <!-- 1. 办理部门 -->
            <div class="linebox" @click.prevent="lineQuery">
                <div class="dept">
                    <div>
                        <p>办理部门：</p>
                        <input type="text" placeholder="请先选择办理部门" v-model="dept" readonly @blur="allDown">
                    </div>
                    <div>
                        <img src="../assets/one/xz.png">
                    </div>
                </div>
            </div>

    <!-- 2. 我的票号 -->
            <div class="linebox">
                <div class="numb">
                    <p>当前号票：</p>
                    <input type="text" placeholder="请输入您的预约号码" v-model="myNum"  @blur="allDown" @focus="allTop">
                </div>
            </div>

    <!-- 3. 查询结果 -->
            <div class="resultbox" v-show='queryResult' v-for="(item,index) in getline" :key="index">

                <p class="result">查询结果：</p>

                <div class="cont">

                    <div class="one">
                        <div class="top">
                            <img src="../assets/two/yw.png">
                            <p class="selResult">{{item.job_name}}</p>
                        </div>
                    </div>

                    <div class="one">
                        <div class="top">
                            <img src="../assets/two/dd.png">
                            <p class="selResult">当前等待人数</p>
                        </div>

                        <p class="foot">{{item.waiting_number}}</p>

                    </div>
<!--
                    <div class="one">
                        <div class="top">
                            <img src="../assets/two/ph.png">
                            <p class="selResult">当前最大票号</p>
                        </div>

                        <p class="foot">123</p>
                        {{item.max_ticket_number}}
                    </div>
-->
                </div>
            </div>

    <!-- 4. 功能按钮 -> 排队查询 -->
            <div @click="queryNew" :class="{isSubmit:isSub,unSubmit:!isSub}"><span>排队查询</span></div>

    <!-- 5. 查询规则 -->
            <div class="rule">
                <div>查询规则：</div>
                <p>1. 选择办理部门后点击排队查询，可查看全部业务当前等待人数和办理的最大票号。</p>
            </div>

        </div>

<!-- 7. 选择部门 弹窗选项 -->
        <div class="pickerView">
            <van-picker
                v-show="pickerBar"
                show-toolbar
                title="请先选择办理部门"
                :columns='columns'
                @cancel='onCancel'
                @confirm='onConfirm'
            />
        </div>

    </div>
</template>


<script>

import addr from '../components/two/addr'
import {getMsg} from '../tools/get'
import { Toast } from 'vant'

export default {
    components:{ addr },
    data(){
        return {
            addr : false,   // 显示 地址电话
            addrTel: {      // 地址电话默认值
                        tel:'',
                        addr:''
                     },

            queryResult : false,  // 显示 排队查询结果

            columns : [], // picker 选项值
            pickerBar : false,    // 是否显示 picker

            dept : '',    // 部门
            myNum : '',   // 预约号码

            t: Function, // 回调函数

            id_list : [], // 部门 id 数组
            dp_list : [], // 部门 数组

            dp_id: '', // 选中部门的 id

            isSub : false,// 排队查询按钮 颜色

            getline:[], // 获取排队结果
        }
    },
    created(){ document.body.style.background = "#EEEEEE";},
    methods:{

// input 失去焦点，回退底部
    allDown(){  this.t = setTimeout( ()=>{ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); }, 250); },
    allTop(){   clearTimeout( this.t); },

// 2.   第 2 页，排队查询 ajax

        queryNew(){

            for(var i=0; i<this.dp_list.length; i++){
                if(this.dp_list[i] == this.dept){
                    this.dp_id = this.id_list[i];
                }
            }

            var url="";
            var obj={
                        action  : '1011',
                        dp_id   : this.dp_id,
                        ticket_number  : this.myNum,
                    };

            if(this.dept){


                getMsg(url,obj).then(result=>{

                console.log('响应 - 成功')
                console.log(result)

                if( result.status == 200){
                    if( result.data.status == 200){

                        this.getline = result.data.data // 获取排队结果
                        this.queryResult = true; // 显示查询结果
                        console.log(this.getline)

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

                }).catch(err=>{ Toast(err); console.log(err); })

            }else{ Toast('请 填写号票 或 选择部门'); }

        },


// 1. 选择部门 -> 请求部门数组
        lineQuery(){

            if(this.dp_list.length == 0){

                var url="";
                var obj={
                            action: "1003"
                        }
                getMsg( url,obj ).then(result=>{

                    console.log(result)

                    if( result.status == 200 ){
                        if( result.data.status == 200 ){

                            var res = result.data.data;

                            for(var key in res){
                                this.dp_list.push(res[key].dp_name);
                                this.id_list.push(res[key].dp_id)
                            }
                            console.log( this.dp_list)
                            console.log( this.id_list)

                            this.columns = this.dp_list;
                            this.pickerBar=true; // 弹出 picker

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

            }else{

                this.columns=this.dp_list
                this.queryResult = false; // 每次切换部门，隐藏查询结果
                this.pickerBar=true; // 弹出 picker
            }
        },


// 1.0 地址、电话 -> 部门 IP 获取
        getInfo(){

            for(var i=0;i<this.dp_list.length;i++){ // 获取部门 id
                if(this.dp_list[i]==this.dept){

                    this.dp_id=this.id_list[i]
                }
            }
            console.log( "部门id -> " + this.dp_id)

            var url='';
            var obj={
                        action:'1022',
                        dp_id:this.dp_id
                    }

            getMsg(url,obj).then(result=>{

                console.log('响应 - 成功')
                console.log(result)

                if(result.status==200){
                    if(result.data.status==200){

                        let obj=result.data.data

                        this.addrTel.tel=obj.tel // 电话
                        this.addrTel.addr=obj.address // 地址

                    }
                    else{
                        this.addrTel.tel = "未查询到相关信息" // 电话
                        this.addrTel.addr = "未查询到相关信息" // 地址
                    }
                // -------------------------------------------------- 2
                }
                else{
                        this.addrTel.tel = "未查询到相关信息" // 电话
                        this.addrTel.addr = "未查询到相关信息" // 地址
                    }

            }).catch(err=>{console.log(err)})

        },


// 1.1 picker确定按钮
        onConfirm(value,index){

            console.log(`选择部门：${value}，当前索引：${index}`);


            this.dept = value;  // picker 选中值赋给 input
            this.getInfo();     // 调用方法，获取 address、tel
            this.addr = true;     // 显示地址

            this.isSub = true;    // 查询 按钮
            this.pickerBar = false; // 隐藏 picker
        },


// 1.2 picker取消按钮
        onCancel(){ this.pickerBar = false; },
    },


// watch 监听
    watch:{
        dept(){

            (this.dept.length>0) ? (this.isSub=true) : (this.isSub=false);
        },
        myNum(){

            (this.myNum.length>0) ? (this.isSub=true) : (this.isSub=false);
        }
    },

}
</script>


<style scoped>


/* 整体布局 */

    *{  color: #666;font-family: Microsoft YaHei; padding:0; margin:0;}
    input::placeholder{color:#aaa;}
    input{border:none;outline:none;}


    .lineNews{ width:100%;}
    .lineposition{
        width:calc(100% - 20px);
        padding:0 10px 50px 10px;
        background-color:#eee;
    }


/* 1、2. 办理部门、我的票号 */
    .linebox{
        background:url(../assets/one/k2.png) no-repeat left center;background-size: 100%;
        height:40px;
        width:100%;
        background:#fff;
        /* border:1px solid #e8e8e8; */
        border-radius: 3px;
        margin-top:5px;
        /* border:1px solid sandybrown; */
    }

    .dept,.numb{
        background:url(../assets/one/bt.png) no-repeat 8px center;background-size: 6px;
        height:40px;
        /* border:1px solid red; */
        display: flex;align-items: center;justify-content: start;
    }


    .dept{
        justify-content: space-between;align-items: center;
        /* padding-left:5%; */
    }

    .dept>div:first-child>p{margin-left:18px;}


    .numb>p{margin-left:18px;}
    
    .dept,.numb{
        /* border:1px solid salmon; */
        display:flex;
        width:100%;
        
    }

    .dept>div:first-child{display: flex;width:82%;}
    .dept>div:first-child input{width:58%;}
    .dept>div:last-child{width:50px;}
    .dept>div:last-child>img{display: block;width:100%;}
    .dept input{width:66%;}


    .numb input{width:66%;}


/* 3. 查询结果 */
    .resultbox{
        width:100%;
        border:1px solid #e8e8e8; border-radius: 3px;
        background:#fff;
        display: flex;
        margin-top: 5px;
        padding: 8px 0;
    }
    .result{ /* P 标签 */
        /* border:1px solid black; */
        width: 75px;
        margin-left: 18px;
        margin-top: 3px;
    }

    .cont{ /* 右边 排队 详情 */
        width: calc(100% - 94px);
        /* border:1px solid green; */
    }
    .one{
        display: flex;align-items: center; justify-content: space-between;
        margin: 3px 0;
    }
    .top{ width:60%; display: flex;align-items: center; }
    .top>img{ width:15px; height:13px;display: block; margin-left: 10px; }
    .selResult{ margin-left: 10px;}
    .foot{ text-align: center; width:40%; color: #15b8f2;}


/* 4. 排队查询 */
    .unSubmit{
    width:100%;height:48px;
    background: #a0a0a0;
    line-height: 48px;text-align: center;
    border-radius: 24px;
    margin-top:20px;
  }
  .isSubmit{
    width:100%;height:48px;
    border-radius: 24px;
    line-height: 48px;text-align: center;
    background-image: linear-gradient(to bottom,#0984e4,#15b8f2);
    margin-top:20px;
  }
  .isSubmit>span{font-size: 16px;color:#fff;}
  .unSubmit>span{font-size: 16px;color:#fff;}


/* 5. 查询规则 */
    .rule{width:100%;line-height: 1.2rem;padding:25px 0 20px 0;}
    .rule>div{background:url(../assets/one/j1.png) no-repeat left 1.5px;background-size:2px; padding-left:6px;color:#999;line-height: 19px;}
    .rule>p{padding-left: 6px;font-size: 14px;color:#999;line-height: 19px;}


/* pickerView */
    .pickerView{
        width:100%;
        /* border:1px solid slateblue; */
        position:absolute;left:0;bottom: 0;right:0;
        z-index: 9999;
    }
</style>
