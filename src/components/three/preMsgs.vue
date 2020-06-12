<template>
    <div class="evaluate">

<!-- 1. 预约信息记录 -->
        <div class="top">
            <span class="msg">预约信息记录</span>
        </div>

<!-- 没有记录 -->
        <div class="noNews" v-if="isShow">
            <img src="../../assets/four/bq-his.png">
            <p>未查询到您的预约信息</p>
        </div>

<!-- 信息 -->
        <div class="msgs" v-for="(item,i) of msgs" :key="i" @click="getInfo(item)">
            <msgItem :item="item"></msgItem>
        </div>

<!-- 预约二维码 -->
        <showcode :sucResult="sucResult" :base64_img="base64_img" v-show="success"></showcode>

    </div>
</template>


<script>

import msgItem from './preMsg'
import showcode from '../one/preCode'

import {getMsg} from '../../tools/get'
import {Toast} from 'vant'
import Vue from 'vue'

export default {

    components:{
        msgItem,showcode
    },
    data(){
        return {

            msgs:[], // 传值给 preMsg
            varval:'', // 接收 queryNews 传值，发送 ajax

            success:false, // 二维码 显示隐藏
            sucResult:{}, // 二维码给 preCode 传值
            base64_img: "",

            isShow: false, // 未查询到预约信息
        }
    },
    updated(){ console.log(this.success); },
    created(){

        this.bus.$on('prequery',this.prequery)  // 1. 预约记录，给 data 赋值
        this.pres();                            // 2. 预约记录
        this.bus.$on('closeNew',this.closeNew)  // 3. 关闭二维码
    },
    methods:{

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

                        this.msgs=result.data.data // 传值给 preMsg 组件

                        var now = new Date().getTime()

                        for(var i=0;i<this.msgs.length;i++){

                            var pdata = this.msgs[i].bp_data

                            var newstr1 = pdata.slice( 0,pdata.lastIndexOf(' ') )
                            var newstr2 = pdata.slice( pdata.lastIndexOf('-')+1 )
                            var newstr = newstr1 + ' ' + newstr2
                            var goed = new Date( newstr ).getTime()

                            if( this.msgs[i].cancelyy == 0 ){

                                if( now > goed ){

                                    this.msgs[i].cancelyy = 2
                                }
                            }
                        }
                    }
                    else if( result.data.status==301){ Toast(result.data.msg); this.isShow = true; console.log('行为不存在')}
                    else if( result.data.status==302){ Toast(result.data.msg); this.isShow = true; console.log('数据库操作失败')}
                    else if( result.data.status==303){ Toast(result.data.msg); this.isShow = true; console.log('用户没有登录')}
                    else if( result.data.status==305){ Toast(result.data.msg); this.isShow = true; console.log('参数错误')}
                    else if( result.data.status==304){ Toast(result.data.msg); this.isShow = true; console.log('网站黑名单')}
                    else if( result.data.status==306){ Toast(result.data.msg); this.isShow = true; console.log('数据不存在');}
                    else if( result.data.status==307){ Toast(result.data.msg); this.isShow = true; console.log('当前条件下不符合要求')}
                    else{ Toast(result.data.msg); this.isShow = true; console.log(result.data.msg)}
                // -------------------------------------------------- 2
                }
                else if( result.status==301){ Toast(result.data.msg); this.isShow = true; console.log('行为不存在')}
                else if( result.status==302){ Toast(result.data.msg); this.isShow = true; console.log('数据库操作失败')}
                else if( result.status==303){ Toast(result.data.msg); this.isShow = true; console.log('用户没有登录')}
                else if( result.status==305){ Toast(result.data.msg); this.isShow = true; console.log('参数错误')}
                else if( result.status==304){ Toast(result.data.msg); this.isShow = true; console.log('网站黑名单')}
                else if( result.status==306){ Toast(result.data.msg); this.isShow = true; console.log('数据不存在');}
                else if( result.status==307){ Toast(result.data.msg); this.isShow = true; console.log('当前条件下不符合要求')}
                else{ Toast(result.data.msg); this.isShow = true; console.log('请求失败')}

            }).catch( err=>{console.log(err); })
        },

// 3. 关闭二维码
        closeNew(n){    this.success=n  },

// 4. 弹出二维码
        getInfo(item){

            if( item.cancelyy == 0 ){

                var url='';
                var obj={
                            action  : '1013',
                            bp_id   : item.bp_id,
                        }
                getMsg(url,obj).then(result=>{

                    console.log('响应 - 成功');
                    console.log(result);

                    if(result.status==200){
                        if(result.data.status==200){

                            this.sucResult=result.data.data
                            this.base64_img = result.data.data.base64_img
                            this.sucResult.telphone=sessionStorage.getItem('sfUserName')
                            this.sucResult.bp_id=item.bp_id

                            console.log(this.sucResult)

                            this.success=true;
                        }
                        else if(result.data.status==307){
                            Toast('预约已经过期')
                        }
                        else{
                            Toast('已失效')
                        }

                    }
                    else if( result.status==301){ console.log('行为不存在')}
                    else if( result.status==302){ console.log('数据库操作失败')}
                    else if( result.status==303){ console.log('用户没有登录')}
                    else if( result.status==305){ console.log('参数错误')}
                    else if( result.status==304){ console.log('网站黑名单')}
                    else if( result.status==306){ console.log('数据不存在')}
                    else if( result.status==307){ console.log('当前条件下不符合要求')}
                    else{ console.log('请求失败')}

                }).catch(err=>{console.log(err)})

            }
            else if( item.cancelyy == 1 ){
                Toast.success('该预约已取消')
            }
            else{
                Toast('该预约已失效')
            }
        },
    },

}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}

    .evaluate{
        width: 100%;
        padding-bottom: 50px;
        background:#eee;
        /* position: absolute;top:0;right:0;bottom:0;left:0; */
        /* border:1px solid sandybrown; */
    }


    .top{
        width: 100%; height: 40px;
        background-image: linear-gradient(to bottom,#0984e4,#15b8f2);
        /* border:1px solid black; */
    }
    .top>span{ line-height: 40px; color: rgba(255,255,255,0.9); margin-left: 10px;}


    .msgs{
        /* border:1px solid red; */
        width: calc(100% - 10px);
        padding: 0 5px;
    }

/* 没有预约 */
    .noNews{
        position: absolute; left: 0; top: 40px; bottom: 0; right: 0;
        background: #E8E8E8;
        display: flex; align-items: center; flex-direction: column;
    }
    .noNews>img{ width: 166px; height: 91px; margin-top: 100px;}
    .noNews>p{ margin-top: 20px; color: #999;}

</style>
