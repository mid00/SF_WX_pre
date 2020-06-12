<template>
    <div class="evaluateBox">

<!-- 1.将要评价的业务的 详情 -->
        <div class="detailItem">
            <div class="item-top">
                <span>{{arr[3]}}</span>
                <div class="preDetail">
                    <div><span>业务编号：</span><span>{{arr[4]}}</span></div>
                    <span>{{arr[1]}}</span>
                </div>
            </div>

<!-- 评价器 -->
            <p>非常满意</p>
            <div @click="evalRate">
                <van-rate v-model="value" :size="25" color="#fba136" void-icon="star" void-color="#ddd" />
            </div>
        </div>

<!-- 2.评价详情 -->
<!-- 
        <div class="evaluateItem">
            <p>请选中一条或多条评价理由</p>

            <div @click="eval(0)" class="items" :class=" {unSct: !bgs[0].unbg, isSct: bgs[0].unbg} "><p>材料范本非常规范</p></div>
            <div @click="eval(1)" class="items" :class=" {unSct: !bgs[1].unbg, isSct: bgs[1].unbg} "><p>办理条件非常准确</p></div>
            <div @click="eval(2)" class="items" :class=" {unSct: !bgs[2].unbg, isSct: bgs[2].unbg} "><p>申请流程非常清晰</p></div>
            <div @click="eval(3)" class="items" :class=" {unSct: !bgs[3].unbg, isSct: bgs[3].unbg} "><p>情形非常合理</p>   </div>

            <div><textarea v-model="txtVal" placeholder="请输入你的评价描述"></textarea></div>
        </div>
 -->

<!-- 3.是否匿名 -->
<!-- 
        <div class="unNameBox">
            <div class="unName">
                <div>
                    <van-checkbox v-model="checked">匿名评价</van-checkbox>
                </div>
                <p>你的评论会以匿名形式展现</p>
            </div>
        </div>
 -->

<!-- 4.提交 -->
        <div :class="{isSubmit:isSub,unSubmit:!isSub}" @click.prevent="subEvaluate"><span>提交</span></div>

    </div>
</template>


<script>

import {getMsg} from '../../tools/get'
import { Toast } from 'vant';

export default {
    data(){
        return {
            isIcon:require('../../assets/three/xx.png'),    //评价器图标
            unIcon:require('../../assets/three/xx-pr.png'), //评价器图标
            bgs:[{unbg:false},{unbg:false},{unbg:false},{unbg:false}],//判断评价条件，便于收集数据

            isSub:false,//提交按钮图片
            value:3,    //评价器选中个数
            txtVal: "", // 文本域
            checked:false,   //匿名评价

            arr : [], // 预约 id
        }
    },
    created(){ // 接收办理业务记录的数据 —— 个人信息

        // var arr = [ val.Level, val.date, val.id, val.job_name, val.number ]; 传参
        this.arr = this.$route.params.arr.split(",");
        this.value = Number(this.arr[0]);
        console.log(this.arr);
    },
    methods:{


// 失去焦点，回退底部
        allDown(){ document.body.scrollTop=0; },


// 1. 提交评价
        subEvaluate(){

            if( this.isSub){
                var url = '';
                var obj = {
                            action: "1016",
                            bp_id : this.arr[2],            // 预约 id
                            evaluate_type : this.value,     // 评价器的值 —— 几星 - 评价等级
                            
                            evaluate_content : this.txtVal, // 评价描述
                            opts : this.bgs,                // 多条
                            anonymous : this.checked,       // 匿名
                        }
                getMsg( url, obj ).then(result=>{

                    console.log( result );

                    if( result.status == 200 ){
                        if( result.data.status == 200 ){

                            Toast.success("评价成功");

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

                }).catch( err => { console.log( err ); })
            }else{
                Toast("请先选择");
            }
        },


// 评价选项
        eval(n){

            for(var i=0;i<this.bgs.length;i++){

                if(i==n){

                    console.log(n);
                    this.bgs[i].unbg=!this.bgs[i].unbg;
                }
            }

            this.isSub=true;
            console.log(this.bgs);
        },


// 点击评价器，可以提交 评价
        evalRate(){ this.isSub=true; },
    },
    watch: {
        txtVal(){ (this.txtVal.length>0)?(this.isSub = true):(this.isSub = false); }
    },
}
</script>


<style scoped>
/* 4. 提交 */
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


/* 3. 匿名评价 */
    .unNameBox{
        margin-top: 10px;
        width:100%;background:#fff;
        /* padding-bottom: 2%; */
    }
    .unName{
        /* border:1px solid salmon; */
        display: flex;justify-content: space-between;align-items: center;
        width: calc(100% - 10px);
        height:45px;
        margin:0 10px;
        /* border:1px solid #e8e8e8;border-radius: 3px; */
        /* margin: 5px 0 20px 0; */
        /* padding:0 2%; */
    }
    .unName>p{font-size: 14px;color:#aaa; margin-right: 5px;}


/* 2 评价详情 */
    .evaluateItem{
        margin-top: 10px;
        background: #fff;
        width: calc(100% - 20px);
        /* height:309px; */
        padding: 10px 10px;
        /* border:1px solid red; */
    }
/* 2.1 评价起头 */
    .evaluateItem>p{    font-size:14px;color:#aaa;}   /* 2.0 */
/* 2.2 评价选项 */
    .items{         /* 2.1——2.4 */
        width: calc(100% - 10px);
        height:30px;
        /* border:1px solid salmon; */
        /* height:36px; */
        display: flex;
        align-items: center;
        padding-left:10px;
        margin-top: 5px;
    }

    .unSct{
        /* background:url(../../assets/three/unSelect.png) no-repeat left center;background-size: 100%; */
        border:1px solid #e8e8e8;border-radius: 3px;
    }
    .isSct{
        /* background:url(../../assets/three/isSelect.png) no-repeat left center;background-size: 100%; */
        border:1px solid #0c8fe7;border-radius: 3px;
    }
    .isSct>p{color:#0c8fe7;}
/* 2.3 评价描述 */
    .evaluateItem>div:last-child{
        width:100%;margin-top:5px;
        
        border:1px solid #eee;
        border-radius: 3px;
    }
    .evaluateItem>div:last-child>textarea{width: calc(100% - 10px);height:70px;line-height: 1.5rem;padding-left:10px;border:none;outline: none;}


/* 1. 业务详情 */
    .detailItem{
        width: 100%;
        height:124px;
        background: #fff;
        /* border:1px solid sienna; */
    }
    .item-top{
        border-bottom:1px dotted #dddddd;
        padding:5px 10px;
        width: calc(100% - 20px);
    }
    .detailItem>span{font-size: 14px;line-height: 24px;}
/* 1.2 业务编号 */
    .preDetail{
        width:100%;
        display:flex;justify-content: space-between;align-items: center;
        /* border:1px solid salmon; */
        margin-top: 0px;
    }
    .preDetail span{    font-size: 12px; color:#aaa;}
/* 1.3 非常满意 */
    .detailItem>p{  width:100%; font-size:14px; text-align: center;margin-top:10px;}
    .evaluateBox{
        width: calc(100% - 20px);
        padding:10px;
        background:#eee;
        position: absolute;top:0;right:0;left:0;bottom:0;
    }/* 设置灰色背景 */
    .detailItem>div:last-child{
        /* border:1px solid black; */
        text-align: center;
        margin:7px 0;
    }

    input::placeholder{color:#aaa;}
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
</style>
