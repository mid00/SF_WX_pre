<template>
    <div class="container">

<!-- 二维码 查看历史记录详情 -->

        <div class="content">
            <div class="top">
                <!-- <vue-qr :logoSrc="imgURL" :text="text" :size="250"></vue-qr> -->
                <img :src="`data:image/jpeg;base64,${item}`">
            </div>
            <p>扫一扫查看单据详情</p>
            <div class="bottom" @click="closeView"><img disabled src="../../assets/four/gb.png" alt=""></div>
        </div>

    </div>
</template>


<script>

import vueQr from 'vue-qr'

export default {
    components: { vueQr },
    props: [ "item"],
    data(){
        return {
            text: "131646413416", // 二维码字符串
            imgURL  : require('../../assets/ch.png'),
        }
    },
    methods: {
        closeView(){
            this.$emit("closeView", false)
        }
    },
}
</script>


<style scoped>
/*  */
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}


    .container{
        position: fixed; top:0px; right: 0px; bottom: 0px; left: 0px;
        background: rgba(80,80,80,0.8);
        display: flex; justify-content: center; align-items: center;
    }
    .content{
        width: 278px; height: 327px;
        background: url(../../assets/four/tk.png) no-repeat left top; background-size:100%; 
        display: flex; flex-direction: column; align-items: center;
    }


    .top{
        width: 161px; height: 161px;
        margin-top: 40px;
        /* border:1px solid green; */
    }
    .top>img{ width: 161px; height: 161px; display: block; }
    .content>p{color:#999;margin-top:10px;font-size:14px;}
    .bottom{
        /* border:1px solid red; */
        width: 120px; height: 35px;
        margin-top: 30px;
    }
    .bottom>img{ width: 120px; display: block;}
</style>
