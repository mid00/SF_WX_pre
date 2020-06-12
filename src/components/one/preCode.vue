<template>
    <div class="container">
        <div class="content">

<!-- 头 -->
            <div class="top">
                <img src="../../assets/five/dx.png">
                <p>该二维码可用于现场扫码出票</p>
                <img src="../../assets/five/dx.png">
            </div>

<!-- 二维码 -->
            <!-- <div class="code"><img src="../../assets/five/ewm.png"></div> -->
            <div class="code">
                <!-- <vue-qr :logoSrc="imgURL" :text="sucResult.base64_img + ''" :size="250"></vue-qr> -->
                <img :src="`data:image/jpeg;base64,${base64_img}`">
            </div>

<!-- 信息 -->
            <div class="middle">
                <p><span>预约号码：</span><span>{{sucResult.yynumber}}</span></p>
                <p><span>预约手机：</span><span>{{sucResult.mobile}}</span></p>
                <p><span>办理业务：</span><span>{{sucResult.job_name}}</span></p>
                <p><span>预约时间：</span><span>{{sucResult.ymd+' '+sucResult.start_time+'-'+sucResult.end_time}}</span></p>
            </div>

            <div class="foot">
<!-- 取消按钮 -->
                <div @click="cancel(sucResult)" v-if="tocancel"><span>取消预约</span></div>
<!-- 关闭按钮 -->
                <div @click="close"><span>关闭弹窗</span></div>
            </div>
        </div>
    </div>
</template>


<script>

import { Dialog, Toast} from 'vant'      // 弹窗
import { getMsg} from '../../tools/get'  // 取消预约
import vueQr from 'vue-qr' // 二维码

export default {
    props: [ "sucResult", "base64_img", "job", "tocancel" ],
    components:{ vueQr },
    data(){
        return {
            datas: this.sucResult,
        }
    },
    // created(){ this.updateQR(); },
    // mounted(){ this.updateQR(); },
    methods:{

// 取消方法
        cancel(data){

            console.log('取消预约')
            console.log(data)

            var url='';
            var obj={
                        action  : '1014',
                        yynumber:   this.datas.yynumber,    // 预约编号
                        ymd:        this.datas.ymd,         // 预约日期
                        start_time: this.datas.start_time,  // 开始时间
                        end_time:   this.datas.end_time,    // 结束时间
                        job_name:   this.datas.job_name,    // 业务名称
                        or_address: this.datas.or_address,  // 网店地址
                        mobile:     this.datas.mobile,      // 手机号码
                        // num: '',// 预约人数
                    }
            console.log(obj);

            Dialog.confirm({
                title:'信息',
                message:'确认取消预约吗？'
            }).then(()=>{

                getMsg(url,obj).then(result=>{

                    console.log('接到 - 响应');
                    console.log(result);

                    if(result.status==200){
                        if(result.data.status==200){

                            // this.$router.go(0);
                            // this.bus.$emit('closeNew',false);
                            this.$emit("cancelSuc",false);
                            // Toast(result.data.status);
                        }
                        else if( result.data.status==301){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==302){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==303){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==305){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==304){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==306){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==307){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==308){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        else if( result.data.status==309){ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                        // else{ Dialog.confirm({ title: '标题', message: result.data.msg}).then(() => {}).catch((err) => { console.log(err)}); }
                        else{ Dialog.alert({ title: '标题', message: result.data.msg}).then(() => { this.$emit("cancelSuc",false); }); }
                    }
                    else{ Dialog.confirm({ title: '标题', message: `${result.statusText}，请退出，重新登录`}).then(() => {}).catch((err) => { console.log(err)}); }
                }).catch(err=>{console.log(err)})
            }).catch( ()=>{console.log("取消取消预约");})
        },

// 关闭对话框
        close(){

            console.log('关闭对话框');
            this.bus.$emit('closeNew',false);
        }
    },
}
</script>


<style scoped>
    *{  color: #666; font-family: Microsoft YaHei;}
    input::placeholder{ color: #aaa;}


    .container{

        position: fixed; top:0; right:0; bottom: 0; left: 0; z-index: 9;
        background:rgba(15, 15, 15, 0.6);
        /* background: red; */
        display: flex;
        /* justify-content: center; align-items: center; */
        /* border: 1px solid red; */
    }
    .content{

        width: 270.5px; height: 399px;
        position: absolute;
        left: 50%; margin-left: -135px;
        top: 50%; margin-top: -200px;

        background: url(../../assets/five/tc.png) no-repeat; background-size: 100%;
        /* background: teal; */
        display: flex; align-items: center; flex-direction: column;
        /* position: relative; */
        /* border: 1px solid green; */
    }


/* 1. 标题 */
    .top{       width:86%; margin-top: 30px; display: flex; justify-content: space-between; align-items: center;}
    .top>img{   width:25px;}
    .top>p{     font-size: 14px; color: #999;}

/* 2. 二维码 */
    .code{      width: 161px; height: 161px; margin-top: 10px;}
    .code>img{  width: 161px; height: 161px; display: block;}

/* 3. 预约信息 */
    .middle{    margin-top: 10px; }
    .middle span{ font-size: 14px; color: #999; line-height: 22px;}

/* 4. 取消预约 */
    .foot{
        width: 270px; margin-top: 20px;
        /* border: 1px solid red; */
        display: flex; justify-content: center; align-items: center;
    }
    .foot>div{
        width: 50%; height: 36px; border-radius: 18px;
        display: flex; justify-content: center; align-items: center;
    }
    .foot>div>span{
        /* text-align: center; */
        text-align: center;
        width: 100px; height: 36px; border-radius: 18px;
        background-image: linear-gradient(to bottom, #0984e4, #15b8f2);
        line-height: 36px; font-size: 16px; color: #FFFFFF;
    }

/* 5. 关闭按钮 */
</style>
