<template>
    <div class="bills">
        <div class="top">
            <span>丨 选择<span>&lt;&lt;{{arr[0]}}&gt;&gt;</span>需要填写单据</span>
        </div>
        <div class="middle">
            <!-- 没有数据 -->
            <div class="close" v-if="isMsgs">
                <div><img src="../../assets/four/bq-his.png"></div>
                <p>未查询到您的填写信息</p>
            </div>
            <!-- 预填单 -->
            <div class="item" v-for="(item,i) of billArr" :key="i" @click="showdetail(item)">
                <billItem :item="item"></billItem>
            </div>
        </div>
    </div>
</template>


<script>
import billItem from './billItem'
import { Toast, Tab } from 'vant'
import {getMsg} from '../../tools/get'
export default {
    components:{ billItem, },
    data(){
        return {
            arr: [],
            billArr: [],
            isMsgs: true, // 没有数据
        }
    },
    created(){
        this.arr = this.$route.params.arr.split(",");
        console.log( this.arr);
        
        this.getBills();
        document.body.style.background = "#FFFFFF";
    },
    methods:{


// 请求表单信息
        getBills(){

            var url="";
            var obj={
                        action: '1017',
                        dp:     this.arr[0],
                        dp_id : this.arr[1], // 部门 id
                        job_id :this.arr[2],
                        mobile :this.arr[3],
                        id :    this.arr[4],    // 身份证号
                    };

            // console.log("请求表单参数");
            // console.log(obj);

            getMsg(url,obj).then(result=>{

                console.log(result);

                if(result.status == 200){
                    if(result.data.status == 200){
                        
                        this.isMsgs = false;
                        this.billArr = result.data.data
                        // console.log(this.billArr)

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
        },

// 预填单 -> 跳转
        showdetail( val ){

            console.log( val );
            var str = val.id
            this.$router.push(`/billDetail/${ str }`)
        },
    }
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}

    .bills{ width:100%;}

/* 页头 */
    .top{
        width: 100%; height: 40px;
        background-image: linear-gradient(to bottom,#0984e4,#15b8f2);
        display: flex; align-items: center;
        overflow: hidden;
    }
    .top>span{
        width: calc(100% - 10px); text-overflow: ellipsis; white-space: nowrap;  overflow: hidden;
        padding-left: 10px;
        color:#fff; line-height: 40px; align-items: text-bottom;
    }
    .top>span>span{ color: #CF151F; font-weight: bolder;}

/* 单据部分 */
    .middle{
        width: calc(100% - 10px);
        padding: 0 5px 100px 5px;
        margin: 0 auto;
    }
    .item{ width: 100%;}

/* 丢失 */
    .close{    width: 100%; margin-top: 100px; }
    .close>div{    width: 50%; margin: 0 auto; }
    .close>div>img{display: block; width: 100%; }
    .close>p{  text-align: center; color: #999; margin-top: 4%; }
</style>
