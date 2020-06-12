<template>
    <div class="container">
        <div class="color"></div>
        <div class="content">
            <p class="itemtitle">{{ item.template_name }}</p>
            <!-- <p class="itemtitle">一起看过山河大海，走过人山和人海。一起看过山河大海，走过人山和人海。</p> -->
            <div class="itemdetails">
                <div class="left">
                    <p><span>单据编号：</span><span>{{ item.name }}</span></p>
                    <p><span>单据时间：</span><span>{{ item.create_time }}</span></p>
                </div>
                
                <div class="right">
                    <p @click="altForm( item)">修改表单</p>
                    <p @click="delForm( item, index)">删除表单</p>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import {Dialog, Toast} from 'vant';
import {getMsg} from '../../tools/get'
export default {
    props: [ "item", "index" ],
    methods: {

// 删除某一个
        delForm( item, index){
            console.log("删除预填单");
            Dialog.confirm({ title: '信息', message: '确认删除吗？'})
            .then( ()=>{
                console.log("1");
                var url = "";
                var obj = {
                    action: "1023",
                    // report_id: val.report_id
                    report_id: item.id
                };
                console.log("2");
                getMsg( url, obj).then( result => {

                    console.log("3");
                    console.log( result);

                    if( result.status == 200 ){
                    if( result.data.status == 200 ){

                        Toast.success("删除成功");
                        this.$emit("delSuc", index);

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
                })
            })
            .catch( ()=>{})
        },

// 修改预填单
        altForm( val){
            console.log("修改预填单");
            // var arr=[ val.fill_input_id, val.create_time];
            var arr=[ val.id, val.create_time, val.template_name];
            this.$router.push(`/alterForm/${arr}`);
        },
    }
}
</script>


<style scoped>
    .itemdetails{
        width: 100%;
        margin-top: 5px;
        display: flex; justify-content: space-between; align-items: center;
        /* border: 1px solid red; */
    }

    .left{
        width: calc(100% - 110px);
        white-space: nowrap; overflow: hidden;
    }
    .left>p{    width: 100%; display: flex;}
    .left>p>span{ color: #999; font-size: 13px; text-overflow: ellipsis; white-space: nowrap;  overflow: hidden;}
    .left>p>span:first-child{   display: block; width: 68px; }
    .left>p>span:last-child{    width: calc(100% - 68px); }

    .right{
        width: 140px; height: 25px; margin-right: 5px;
        
        display: flex; justify-content: space-between; align-items: center;
    }
    .right>p{
        width: 65px; height: 25px;
        color: #107ED6;
        border: 1px solid #107ED6;
        text-align: center; line-height: 25px;
    }
    .right>p:first-child{border-right: none;}


    .itemtitle{ width:100%;color:#565656; line-height: 30px; text-overflow: ellipsis; white-space: nowrap;  overflow: hidden;}
    .content{ width: calc(100% - 4px); height:77px; background:#E7F2FB; padding-left: 5px;}
    .color{ width:4px; height:77px; background:#107ED6;}

    .container{
        width:100%; height:77px;
        margin-top:5px;
        display: flex;
    }
    input::placeholder{color:#aaa;}
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
</style>
