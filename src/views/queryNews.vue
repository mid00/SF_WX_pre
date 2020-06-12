<template>
    <div class="evaluate">

<!-- 1. 预约信息记录 -->
        <!-- <div class="top"> <span class="msg">预约信息记录</span> </div> -->

<!-- 没有记录 -->
        <div class="noNews" v-if="isShow">
            <img src="../assets/four/bq-his.png">
            <p>未查询到您的预约信息</p>
        </div>

<!-- 信息 -->
        <div class="msgs" v-for="(item,i) of msgs" :key="i" @click="getInfo(item)">
            <msgItem :item="item"></msgItem>
        </div>

<!-- 预约二维码 -->
        <showcode :sucResult="sucResult" :tocancel="tocancel" :base64_img="base64_img" v-if="success" @cancelSuc="cancelSuc"></showcode>

    </div>
</template>


<script>

import msgItem from '../components/three/preMsg';
import showcode from '../components/one/preCode';
import { getMsg} from '../tools/get';
import { Toast } from 'vant';
import Vue from 'vue';

export default {
    components:{ msgItem, showcode },
    data(){
        return {

            msgs:[], // 传值给 preMsg
            varval:'', // 接收 queryNews 传值，发送 ajax

            success:false, // 二维码 显示隐藏
            sucResult:{}, // 二维码给 preCode 传值
            base64_img: "",

            isShow: false, // 未查询到预约信息

            tocancel: true,
        }
    },
    created(){

        this.bus.$on('prequery',this.prequery)  // 1. 预约记录，给 data 赋值
        this.pres();                            // 2. 预约记录
        this.bus.$on('closeNew',this.closeNew)  // 3. 关闭二维码
        document.body.style.background = "#EEEEEE";
    },
    methods:{

// 取消成功
    cancelSuc(){
      this.success = false;
      this.pres();
    },

// 1. 传参，给 data 赋值，请求 预约记录
        prequery(data){ this.varval=data;   },

// 2. 预约记录
        pres(){

            var url='';
            var obj={
                        action : '1012',
                        search : this.varval, // 用户输入信息
                    };
            getMsg(url,obj).then(result=>{

                console.log('响应 - 成功');
                console.log(result);

                if(result.status==200){
                    if(result.data.status==200){

                        this.msgs = result.data.data ; // 传值给 preMsg 组件
                    }
                    else if( result.data.status==301){ Toast(result.data.msg); this.isShow = true; console.log('行为不存在')}
                    else if( result.data.status==302){ Toast(result.data.msg); this.isShow = true; console.log('数据库操作失败')}
                    else if( result.data.status==303){ Toast(result.data.msg); this.isShow = true; console.log('用户没有登录')}
                    else if( result.data.status==305){ Toast(result.data.msg); this.isShow = true; console.log('参数错误')}
                    else if( result.data.status==304){ Toast(result.data.msg); this.isShow = true; console.log('网站黑名单')}
                    else if( result.data.status==306){ Toast(result.data.msg); this.isShow = true; console.log('数据不存在');}
                    else if( result.data.status==307){ Toast(result.data.msg); this.isShow = true; console.log('当前条件下不符合要求')}
                    else{ Toast(result.data.msg); this.isShow = true; console.log(result.data.msg)}
                }
                else{ Toast(result.data.msg); this.isShow = true; console.log('请求失败')}
            }).catch( err=>{console.log(err); })
        },

// 3. 关闭二维码
        closeNew(n){
            this.success = false;
            this.pres();    // 2. 预约记录
        },

// 4. 弹出二维码
        getInfo(item){

            console.log(item);

            if( item.Status == 1 ){

                var url='';
                var obj={
                            action  : '1013',
                            yynumber   : item.yynumber,
                        }
                getMsg(url,obj).then(result=>{

                    console.log('响应 - 成功');
                    console.log(result);

                    if(result.status==200){
                        if(result.data.status==200){

                            this.sucResult = item ;
                            this.base64_img = result.data.data.base64_img ;

                            console.log(this.sucResult) ;
                            this.success = true ;
                        }
                        else if( result.data.status==301){ Toast(result.data.msg);}
                        else if( result.data.status==302){ Toast(result.data.msg);}
                        else if( result.data.status==303){ Toast(result.data.msg);}
                        else if( result.data.status==305){ Toast(result.data.msg);}
                        else if( result.data.status==304){ Toast(result.data.msg);}
                        else if( result.data.status==306){ Toast(result.data.msg);}
                        else if( result.data.status==307){ Toast(result.data.msg);}
                        else{ Toast('已失效');}
                    }
                    else{ console.log('请求失败')}
                }).catch(err=>{console.log(err)})
            }
            else if( item.Status == 2 ){ Toast.success('该预约已取消');}
            else if( item.Status == 3 ){ Toast.success('该预约已出票');}
            else if( item.Status == 4 ){ Toast.success('该预约已失效');}
            else{    Toast('该预约已失效');}
        },
    },

}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}

    .evaluate{  width: calc(100% - 20px); padding: 0 10px; padding-bottom: 50px; background:#eee; }

    .top{   width: 100%; height: 40px; background-image: linear-gradient(to bottom,#0984e4,#15b8f2); }
    .top>span{ line-height: 40px; color: rgba(255,255,255,0.9); margin-left: 10px;}

    .msgs{  width: 100%; }

/* 没有预约 */
    .noNews{    position: absolute; left: 10PX; top: 80px; bottom: 10px; right: 10PX; background: #FFF; display: flex; align-items: center; flex-direction: column; }
    .noNews>img{ width: 166px; height: 91px; margin-top: 100px;}
    .noNews>p{ margin-top: 20px; color: #999;}

</style>
