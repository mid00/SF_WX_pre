<template>
    <div class="evaluate">

        <div class="top">
            <span>丨取票信息记录</span>
        </div>

<!-- 没有信息 -->
        <div class="noNews" v-if="!isMsgs">
            <img src="../../assets/four/bq-his.png">
            <p>未查询到您的预约信息</p>
        </div>


<!-- 信息 -->
        <div class="msgs" v-if="isMsgs">
            <div class="msgitem" v-for="(item,i) of msgs" :key="i">
                <msgItem :item="item"></msgItem>
            </div>
        </div>

    </div>
</template>


<script>

import msgItem from './msg'
import {getMsg} from '../../tools/get'

export default {
    components:{ msgItem },
    data(){
        return {
            idNum: "",
            isMsgs: false,
            msgs:[],
        }
    },
    created(){
        this.bus.$on("toEva", this.gotoEva);
        this.getEvalate();
        document.body.style.background = "#EEEEEE";
    },
    methods:{

// 传值
        gotoEva( val){
            this.idNum = val;
        },


// 获取评价
        getEvalate(){
            if(sessionStorage.getItem('sfUserName')){ // 判断是否已登录

                var url = '';
                var obj = {
                            action : '1015',
                            id: this.idNum
                        }
                getMsg( url , obj ).then(result=>{

                    console.log('得到 - 响应')
                    console.log(result)

                    if(result.status==200){
                        if(result.data.status == 200){

                            this.msgs = result.data.data
                            this.isMsgs = true; // 请求数据不为空，显示记录

                        }
                        else if( result.data.status==301){ this.isMsgs = false; console.log('行为不存在')}
                        else if( result.data.status==302){ this.isMsgs = false; console.log('数据库操作失败')}
                        else if( result.data.status==303){ this.isMsgs = false; console.log('用户没有登录')}
                        else if( result.data.status==305){ this.isMsgs = false; console.log('参数错误')}
                        else if( result.data.status==304){ this.isMsgs = false; console.log('网站黑名单')}
                        else if( result.data.status==306){ this.isMsgs = false; console.log('数据不存在');}
                        else if( result.data.status==307){ this.isMsgs = false; console.log('当前条件下不符合要求')}
                        else{ this.isMsgs = false; console.log( result.data.msg ); }
                    }
                    else{ this.isMsgs = false; console.log( "请求失败" ); }

                }).catch( err=>{ console.log( err ); } )
            }
        },
    },
}
</script>


<style scoped>

    *{  color: #666;font-family: Microsoft YaHei;}

    .evaluate{

        width:100%;
        /* position: absolute; top: 65px; right: 0; bottom: 0; left: 0; */
        /* border:1px solid sandybrown; */
    }

    .top{
        width: 100%; height: 40px;
        background-image: linear-gradient(to bottom, #0984e4, #15b8f2);
        margin-bottom: 10px;
    }
    .top>span{
        color: #F8F8F8; font-size: 16px; line-height: 40px; margin-left: 5px;
    }

    .msgs{

        width:calc(100% - 20px);
        padding: 0 10px;
        margin-bottom: 50px;
        /* border: 1px solid salmon; */
    }

    /* 没有预约 */
    .noNews{
        /* position: absolute; left: 10PX; top: 10px; bottom: 10PX; right: 10PX; */
        /* background: #FFFFFF; */
        display: flex; align-items: center; flex-direction: column;
    }
    .noNews>img{
        width: 166px; height: 91px; margin-top: 100px;
    }
    .noNews>p{
        margin-top: 20px; color: #999;
    }


</style>
