<template>
    <div class="msgItems" @click.prevent="jumpEval(item)">

<!-- 待评价 -->
        <div class="msgBox">

<!-- 左 -->
            <div class="left" :class="{ unbg: (item.Level == 0), endbg: (item.Level != 0) }"></div>

<!-- 中 -->
            <div class="middle">
                <div class="msgNum"><span>办理号票：</span><span>{{ item.number }}</span></div>     <!-- 办理号票 -->
                <div class="msgEvent"><span>办理业务：</span><span>{{ item.job_name }}</span></div> <!-- 办理业务 -->
                <div class="msgDate"><span>办理时间：</span><span>{{ item.date }}</span></div>   <!-- 办理时间 -->
            </div>

<!-- 待评价/已评价 -->
            <!-- <div class="right"><img :src="(item.cancelyy == 0)?require('../../assets/three/dpj.png'):require('../../assets/three/ypj.png')"></div> -->
            <div class="right" :class="{ unEva: (item.Level == 0), endEva: (item.Level != 0)}">
                <span v-if="( item.Level == 0 )">未评价</span>
                <span v-if="( item.Level != 0 )">修改评价</span>
            </div>
        </div>

    </div>
</template>


<script>
import { Toast } from 'vant'
export default {
    props: [ "item" ],
    data(){
        return {
        }
    },
    created(){},
// 1. 评价

    methods:{
        jumpEval( val ){

            console.log( val );

            var arr = [ val.Level, val.date, val.id, val.job_name, val.number ]
            this.$router.push(`/evaluate/${arr}`)// 跳转评价页面
        }
    }
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}


    .msgItems{
        height: 70px;
        width: 100%;
        background: #fff; border: 1px solid #e8e8e8; border-radius: 3px;
        margin-top: 5px;
    }
    .msgBox{
        width: 100%; height: 70px;
        display: flex; justify-content: space-between; align-items: center;
        margin: 0 auto;
    }


/* 左边 */
    .left{
        width: 4px; height: 70px;
        border-radius: 3px 0 0 3px;
    }

/* 中 */
    .middle{ width: calc(100% - 89px); padding-left: 10px;}


/* 号码 */
    .msgNum{    margin-top: 4px;}
    .msgEvent{  margin-top: 0px;}
    .msgDate{   margin-top: 0px;}

    .msgNum>span:last-child{ color: red; font-weight: bolder;}
    .msgDate>span{ font-size: 12px; line-height: 10px; color:#aaa;}

    .unbg{ background: #15b8f2;}
    .endbg{  background: #BBB}


/* 右边图片 */
    .right{ width: 70px; height: 30px; border-radius: 15px; margin-right: 5px;}
    .unEva{ background-image: linear-gradient(to bottom, #0984e4, #15b8f2);}
    .endEva{ background: #BFBFBF;}
    .right>span{
        display: block; width:70px; line-height: 30px; color: #F8F8F8; text-align: center;
    }
    .right>img{ width: 100%; display: block;}
</style>
