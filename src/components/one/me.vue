<template>
    <div class="me">

        <div @click="alter" class="opt"><p>修改信息</p><div><img src="../../assets/five/gd.png"></div></div>
        <div @click="cancel" class="opt delnum"><p>注销帐号</p><div><img src="../../assets/five/gd.png"></div></div>
    </div>
</template>


<script>

import {deleteMsg} from '../../tools/delete'
import { Dialog, Toast } from 'vant'

export default {
    methods:{

        alter(){ this.$router.push('/alterTel'); },

// 1. 注销帐号
        cancel(){

            Dialog.confirm({
                title:'消息',
                message:'请确认是否注销帐号？'

            }).then(()=>{

// 2. ajax 请求注销
                var url='';
                var params={
                                action:1002,
                                mobile :sessionStorage.getItem('sfUserName'),
                                idno :sessionStorage.getItem('idNum'),
                            }

                deleteMsg(url,params).then(result=>{

                    if(result.status==200){

                        console.log('成功响应')
                        console.log(result)

                        if(result.data.status==200){ // 注销成功

                            console.log('注销成功')

                            sessionStorage.removeItem('idNum')
                            console.log(sessionStorage.getItem('idNum'))

                            Toast.success('欢迎再次回来')

                            this.$router.push('/')

                        }
                        else if( result.data.status==301){ Toast(result.data.msg); console.log('行为不存在')}
                        else if( result.data.status==302){ Toast(result.data.msg); console.log('数据库操作失败')}
                        else if( result.data.status==303){ Toast(result.data.msg); console.log('用户没有登录')}
                        else if( result.data.status==305){ Toast(result.data.msg); console.log('参数错误')}
                        else if( result.data.status==304){ Toast(result.data.msg); console.log('网站黑名单')}
                        else if( result.data.status==306){ Toast(result.data.msg); console.log('数据不存在')}
                        else if( result.data.status==307){ Toast(result.data.msg); console.log('当前条件下不符合要求')}
                        else{ Toast(result.data.msg); console.log('请求失败')}
                    }
                    else{ Toast("网络错误"); console.log(result.status);}
                }).catch(err=>{ console.log(err) })
            }).catch(()=>{

                Toast({
                    message:"未来更多期待！",
                    icon:'like-o'
                });
            })
        },
    }
}
</script>


<style scoped>

    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}

    .me{
        width: 100%;
        background:#eee;
        position: absolute;top:0;left:0;bottom: 0;right:0;
    }
    .opt{
        width:100%;
        height:45px;
        background:#fff;
        /* border-top: 1px solid #e8e8e8; */
        border-bottom:1px solid #e8e8e8;
        border-radius: 3px;
        display: flex;justify-content: space-between;align-items: center;
        /* padding:3% 3%; */
        /* margin-top: 5px; */
        /* background:url(../../assets/five/k.png) no-repeat 0 0;background-size:100%; */
    }
    /* .delnum{margin-top: 5px;} */
    .opt p{margin-left: 10px;}
    .opt div{
        width:10px;
        margin-right: 10px;
        /* border:1px solid springgreen; */
    }
    .opt img{width:100%;display: block;}
</style>
