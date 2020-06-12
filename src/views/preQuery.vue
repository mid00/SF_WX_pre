<template>
    <div class="queryBox">

<!-- 查询条件 -->
        <div class="queryCondition">
            <span>查询条件：</span><input v-model="inpVal"  @blur="allDown" @focus="allTop" type="text" placeholder="请输入查询条件">
        </div>

<!-- 查询按钮 -->
        <div :class="{isSubmit:isQuery,unSubmit:!isQuery}" @click="queryMsg"><span>预约查询</span></div>

        <div class="queryExplain">
            <p>说明：</p>
            <p>1. 输入预约时的手机号码、预约号码或身份证号码进行查询</p>
            <p>2. 显示所有的有效预约信息</p>
        </div>

<!-- 百度地图 -->
        <div class="myMap" @click="lookMap">
            <img disabled src="../assets/map.png" >
        </div>

    </div>
</template>


<script>

import {getMsg} from '../tools/get'
import { Toast } from 'vant';

export default {
    data(){
        return {
            inpVal:'', // 查询条件 input 默认为空
            isQuery:true, // 查询按钮 图片切换
            t: Function, // 回调函数
        }
    },
    created(){ document.body.style.background = "#EEEEEE";},
    methods:{

// input 失去焦点，回退底部
    allDown(){  this.t = setTimeout( ()=>{ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); }, 250); },
    allTop(){   clearTimeout( this.t); },

// 1. 预约查询按钮 -> ajax

        queryMsg(){

            if(sessionStorage.getItem('sfUserName')){
                this.bus.$emit('prequery',this.inpVal);
                this.$router.push('/preMsgs')
            }else{
                Toast('请先登录')
            }
        },

// 地图
        lookMap(){
            
            if(sessionStorage.getItem('sfUserName')){

                this.$router.push('/SFmap')
            }else{
                Toast('请先登录')
            }
        },

    },
    watch:{
        inpVal(){
            if(this.inpVal){
                this.isQuery=true; // 查询背景图片切换
            }
        },
    },
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;}
    input::placeholder{color:#aaa;}

/* 盒子 */

    .queryBox{
        width:calc(100% - 20px);
        padding:0 10px;
    }


/* 1. 查询条件 */
    .queryCondition{
        width:100%;
        height:40px;

        background:#fff;border:1px solid #e8e8e8;border-radius: 3px;
        display: flex;align-items: center;justify-content: start;
        /* background:url(../assets/one/k2.png) no-repeat left center;background-size: 100%; */
        display:flex;
        margin:5px 0 15px 0;
        /* padding-left: 2%; */
        border:1px solid #e8e8e8;
    }
    .queryCondition>span{
        background:url(../assets/one/bt.png) no-repeat 8px center;
        background-size: 6px;
        /* border:1px salmon solid; */
        padding-left:18px;
        /* width:22%; */
    }
    .queryCondition>input{
        width:68%;
        outline: none;border:none;
        /* border:1px salmon solid;     */
    }

/* 2. 预约查询 */
    .queryIcon{
        /* border:1px solid salmon; */
        width:100%;
        margin-top: 20px;
        display: flex;align-items: center;justify-content: center;
    }
    .queryIcon>img{width:100%;display: block;}

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

/* 3. 预约说明 */
    .queryExplain{
        width:100%;
        /* border:1px salmon solid; */
/* --------------------------------------------------------------------------- */
        margin-top:15px;
    }
    .queryExplain>p:first-child{
        background:url(../assets/one/j1.png) no-repeat left 1.5px;background-size: 2px;
    }
    .queryExplain>p{padding-left: 6px;color:#999;font-size: 14px;line-height: 19px;}

/* 百度地图 */
    .myMap{
        border:1px solid #0A9DE5; border-radius: 50%;
        width:40px; height: 40px;
        position: absolute;right:10px;top:50%;
    }
    .myMap>img{width:100%;display:block;}

</style>
