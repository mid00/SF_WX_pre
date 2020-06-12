<template>
    <div class="addrBox">
        <div class="img"></div>
        <div class="addr">
            <p><span>办理地址：</span><span>{{addrTel.addr}}</span></p>
            <p><span>咨询电话：</span><span>{{addrTel.tel}}</span></p>
        </div>
    </div>
</template>
<script>
export default {
    props:{ addrTel:{default:""} }
}
</script>
<style scoped>

    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{ color: #aaa;}


    .addrBox{
        width: calc(100% - 2px); min-height: 70px; max-height: 100px;
        padding: 10px 0; margin-top: 10px;
        background: #FFF;
        border: 1px solid #e8e8e8; border-radius: 3px;
        display: flex; justify-content: start; align-items: center;
    }
    .addr{
        width: calc(100% - 18px); min-height: 70px; max-height: 100px;
        margin-left: 14px;
        display: flex; flex-direction: column; justify-content: center;
    }
    .img{   width: 4px; height: 60px; border-radius: 0 2px 2px 0; background-image: linear-gradient(to bottom, #0984e4, #15b8f2);}
    .addr>p{ display: flex;}
    .addr>p~p{ padding-top: 5px;}
    .addr>p>span:first-child{ width: 75px;}
    .addr>p:first-child>span:last-child{ width: calc(100% - 77px); padding-right: 2px;}

</style>
