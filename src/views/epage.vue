<template>
    <div class="evaluate">

        <div class="msgs">

<!-- 信息 -->
            <div class="idCard">
                <img src="../assets/bt.png">
                <span>身份证号 :</span>
                <input type="text" placeholder="请输入身份证号" v-model="idNum">
            </div>

<!-- 查询 -->
            <p @click="queryEva">查询评价</p>

<!-- 说明 -->
            <div class="describe">
                <img src="../assets/bt.png">
                <span class="title">使用说明：</span>
                <span class="text">本功能只限于在本中心使用身份证排队叫号的申请人使用</span>
            </div>

        </div>
    </div>
</template>


<script>
import { Toast } from 'vant';
export default {
    data(){
        return {
            idNum: "",
            del: false,
        }
    },
    created(){
        this.idNum = sessionStorage.getItem("idNum");
        document.body.style.background = "#EEEEEE";
    },
    methods:{

// 查询
        queryEva(){
            var reg1 = /^\d{18}$/;
            var reg2 = /^\d{17}[A-Za-z]$/;
            var res = reg1.test(this.idNum) || reg2.test(this.idNum);

            ( res && (sessionStorage.getItem('idNum') == "null") )?sessionStorage.setItem("idNum", this.idNum):Toast("身份证号码有误")

            if(res){
                this.bus.$emit("toEva", this.idNum)
                this.$router.push("/msgs");
            }else{
                Toast("请输入正确的身份证号")
            }
        }
    },
}
</script>


<style scoped>

    *{  color: #666;font-family: Microsoft YaHei;}

    .evaluate{
        width:100%;
        /* border: 1px solid red; */
    }

    .msgs{
        width: calc(100% - 20px); padding: 0 10px;
        /* margin-bottom: 50px; */
        /* display: flex; flex-direction: column; */
    }
    .idCard{
        width: calc(100% - 2px); height: 40px;
        /* border: 1px solid #e8e8e8; */
        /* box-shadow: 0 0 8px 2px #e8e8e8; */
        border-radius: 5px;
        background: #FFFFFF;
        margin-top: 5px;
        display: flex; align-items: center; justify-content: start;
    }
    .idCard>img{    width: 6px; margin-left: 5px;}
    .idCard>span{   margin-left: 5px; width: 74px;}
    .idCard>input{  width: calc(100% - 90px); height: 38px; border: none; outline: none; border-radius: 5px;}

/* 查询 */
    .msgs>p{
        width: 100%; height: 46px;
        background-image: linear-gradient(to bottom, #0984e4, #15b8f2);
        border-radius: 23px;
        color: #F8F8F8; text-align: center; line-height: 46px; font-size: 16px;
        margin-top: 20px;
    }

/* 说明 */
    .describe{
        margin-top: 20px;
        display: flex;
    }
    .describe>img{
        width: 6px; height: 6px; margin: 7px 5px 0 6px;
    }
    .describe>span{
        font-size: 14px; line-height: 20px;
    }
    .title{width: 75px;}
    .text{
        width: calc(100% - 92px);
    }
</style>
