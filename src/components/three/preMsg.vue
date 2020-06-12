<template>
    <div class="msgItems">

<!-- 评价背景 -->
        <div class="msgBox">

<!-- 左 -->
            <div class="left" :class="{  yesbg: item.Status == 1 , nobg: item.Status != 1 }"></div>

<!-- 左 -->
            <div class="middle">
                <div class="msgNum"><span>预约号票：</span><span>{{item.yynumber}}</span></div>       <!-- 办理号票 -->
                <div class="msgEvent"><span>办理业务：</span><span>{{item.job_name}}</span></div>   <!-- 办理业务 -->
                <div class="msgDate"><span>办理时间：</span><span>{{item.ymd +" "+ item.start_time+"-"+item.end_time}}</span></div>     <!-- 办理时间 -->
            </div>

<!-- 右 -->
            <div class="right">
                <!-- <img :src="Number(item.cancelyy)? ((Number(item.cancelyy)==1)?require('../../assets/yqx.png'):require('../../assets/ysx.png')) :require('../../assets/yyz.png')"> -->
                <span class="prein" v-if="(item.Status == 1)">预约中</span>
                <span class="caned" v-if="(item.Status == 2)">已取消</span>
                <span class="haned" v-if="(item.Status == 3)">已出票</span>
                <span class="inved" v-if="(item.Status == 4)">已失效</span>
            </div>

        </div>
    </div>
</template>
<script>
export default {
    props: [ "item", ],
    data(){
        return {
            datas: this.item,
        }
    }
}
</script>
<style scoped>

/* 框 */
    *{ padding: 0; margin: 0; color: #666;font-family: Microsoft YaHei;}
    input::placeholder{color:#aaa;}

    .msgItems{  width:100%; margin-top: 5px; }
    .msgBox{    width:100%; height: 70px; background: #FFF; border-radius: 3px; display:flex; justify-content: space-between; align-items: center; }

/* 左边 */
    .left{ width: 4px; height: 70px; border-radius: 3px 0 0 3px;}

/* 中 */
    .middle{ width: calc(100% - 85px); margin-left: 6px; text-overflow: ellipsis; white-space: nowrap;  overflow: hidden;}
    .msgNum{    margin-top: 5px; }
    .msgEvent{  margin-top: 0px; }
    .msgDate{   margin-top: 4px; }

    .msgNum>span:last-child{ color: red; font-weight: bolder;}
    .msgDate>span{ font-size: 13px; color: #aaa;}

    .yesbg{ background: #15b8f2;}
    .nobg{  background: #BBB}

/* 右边图片 */
    .right{ width: 70px; height: 30px; margin-right: 5px; }
    .right>span{    display: block; width: 100%; height: 100%; text-align: center; line-height: 30px; border-radius: 15px;}
    .right>.prein{   color: #FFF; background-image: linear-gradient(to bottom,#0984e4,#15b8f2);}
    .inved{ background: rgb(224, 146, 0); color: #F8F8F8;}
    .haned{ background: rgb(0, 216, 108); color: #F8F8F8;}
    .caned{ background: #DDD;}
</style>#F8F8F8
