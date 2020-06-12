<template>
    <div class="item" :class="{isbg:item.isWrite,unbg:!item.isWrite}">

        <div class="left">
            <img :src="item.isWrite?require('../../assets/four/zx.png'):require('../../assets/four/hzx.png')">
            <span>{{item.name}}</span>
        </div>

        <div class="right" v-show="item.isWrite"><img src="../../assets/four/g.png"></div>

    </div>
</template>
<script>
export default {
    props:["item"],
    data(){
        return {
            isSelect: true, // 未选中
            isWrite: true,  //未填写
        }
    },
}
</script>


<style scoped>
    *{  color: #666; font-family: Microsoft YaHei; padding: 0; margin: 0;}


/* 外边框 */
    .item{
        width:100%;
        display:flex; justify-content: space-between; align-items: center;
        /* border:1px solid red; */
        margin-top: 5px;
        padding: 10px 0;
    }
    .unbg{  background:#EEEEEE;}
    .isbg{  background:#E7F2FB;}
    .isbg span{ color:dodgerblue;}


/* 左边 */
    .left{
        width: calc(100% - 20px);
        display: flex; justify-content: start;
        /* align-items: center; */
    }
    .left>img{
        width: 15px; height: 12px; margin-top: 2px;
        display: block; margin-left: 5px;
    }   /* 7 */
    .left>span{ width: 90%; margin-left: 5px; line-height: 18px;}    /* 91 */


/* 右边 */
    .right{ width: 15px; margin-right: 5px;}  /* 6 */
    .right>img{ width: 15px; height: 10px; display: block;}

</style>
