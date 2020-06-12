<template>
    <div class="bills">

        <div class="top">
            <span>|</span>
            <span>我的单据历史数据</span>
        </div>

        <div class="content">

<!-- 搜索条件 -->
            <!-- <div> <yearMouth></yearMouth> </div> -->

<!-- 请求数据 -->

    <!-- 1. 请求为空 -->
            <div class="close" v-if="isMsgs">
                <div><img src="../../assets/four/bq-his.png"></div>
                <p>未查询到您的填写信息</p>
            </div>

    <!-- 2. 请求不为空 -->
            <div class="haveData" v-if="!isMsgs">
                <!-- <div @click="toSec(item)" v-show="delItem != index" v-for="(item,index) of historyData" :key="index"> -->
                <!-- <div v-show="delItem != index" v-for="(item,index) of historyData" :key="index"> -->
                <div v-for="(item,index) of historyData" :key="index">
                    <info :item="item" :index="index" @delSuc="delSuc"></info>
                </div>
            </div>

        </div>

    <!-- 二维码 -->
        <td-code v-show="isCode" :item="item" @closeView="closeView"></td-code>
    </div>
</template>


<script>
import yearMouth from './yearMouth'
import info from './info'
import tdCode from './tdCode'
import { Toast } from 'vant';
import {getMsg} from '../../tools/get'
export default {
    components:{ info , yearMouth, tdCode },
    data(){
        return {

            arr: [], //路由参数

            years:0,    // 选了年份
            mouths:0,   // 选了月份
            count:0,    // 选了年份和月份

            isMsgs: true,// 请求数据为空

            historyData: [],// 请求回来数据

            isCode: false, // 隐藏二维码
            item: "", // 二维码字符串

            delItem: NaN, //删除某一个
        };
    },
    created(){

        this.arr = this.$route.params.arr.split(","); // 路由传参
        this.getDetails();
        this.bus.$on("selDate",this.getResult); // 选择年份，搜索历史数据
        document.body.style.background = "#FFF"; // 设置背景
    },
    methods:{


// 删除成功
        delSuc( val){
            this.getDetails();
        },


// 获取历史信息
        getDetails(){
            var url = "";
            var obj = {
                        action: "1020",
                        dp:     this.arr[0],
                        dp_id : this.arr[1], // 部门 id
                        job_id :this.arr[2],
                        mobile :this.arr[3],
                        id :    this.arr[4],    // 身份证号
                      }
            getMsg( url, obj ).then( result => {

                console.log("获取历史信息");
                console.log(result);

                if( result.status == 200 ){
                    if(result.data.status == 200 ){

                        this.isMsgs = false;
                        this.historyData = result.data.data;
                    }
                    else if( result.status==301){ this.isMsgs = true; console.log('行为不存在')}
                    else if( result.status==302){ this.isMsgs = true; console.log('数据库操作失败')}
                    else if( result.status==303){ this.isMsgs = true; console.log('用户没有登录')}
                    else if( result.status==305){ this.isMsgs = true; console.log('参数错误')}
                    else if( result.status==304){ this.isMsgs = true; console.log('网站黑名单')}
                    else if( result.status==306){ this.isMsgs = true; console.log('数据不存在')}
                    else if( result.status==307){ this.isMsgs = true; console.log('当前条件下不符合要求')}
                    else{ this.isMsgs = true; console.log( result.data.msg)}
                }
                else{ this.isMsgs = true; console.log('请求失败')}

            }).catch( err => { console.log( err ); })
        },


// 信息二维码
        toSec( val ){
            console.log( val );
            var url = "";
            var obj = {
                action: "1021",
                fill_input_id: val.id
            };
            getMsg( url, obj ).then( result => {

                console.log( result );

                if( result.status == 200 ){
                    if( result.data.status == 200 ){

                        console.log( result.data.data.base64_img)

                        this.item = result.data.data.base64_img;
                        this.isCode = true;

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
        },

        // 关闭二维码
        closeView( val ){

            this.isCode = val;
            console.log(val);
        },

// 条件搜索
        getResult(yearMouth){

            if(      yearMouth.length==6 ){ this.years=1; console.log('年份'); }
            else if( yearMouth.length==4 ){ this.mouths=100; console.log('月份'); }

            this.count=this.years+this.mouths; console.log("年月"+this.count)

            if(this.count==101){ // 年月每选一次，发送一次ajax

                console.log('已选年份月份，发送ajax')
            }
        },
    }
}
</script>


<style scoped>
    *{  color: #666; font-family: Microsoft YaHei; padding: 0; margin: 0;}
    input::placeholder{ color: #aaa;}

    .bills{ width: 100%;}

/* 页头 */
    .top{   width: calc(100% - 10px); height: 40px; padding-left: 10px; background-image: linear-gradient(to bottom,#0984e4,#15b8f2); }   
    .top>span{  color:#fff; line-height: 40px; }
    .top>span:nth-child(2){ margin-left: 5px; }

/* 内容 */
    .content{   width: calc(100% - 20px); padding: 0 10px 50px 10px; }
    /* .content>div:first-child{ margin: 10px 0; } */

/* 请求有数据 */
    .haveData{  width: 100%; }

/* 丢失 */
    .close{    width: 100%; margin-top: 100px; }
    .close>div{    width: 50%; margin: 0 auto; }
    .close>div>img{display: block; width: 100%; }
    .close>p{  text-align: center; color: #999; margin-top: 4%; }

</style>
