<template>
    <div>
        <div @click="followMe" class="lookMe">
            <img src="../../assets/five/wd.png">
        </div>
    </div>
</template>


<script>
import { Toast } from 'vant'
export default {
    methods:{
        followMe(){

            console.log('去到个人信息')

            if(sessionStorage.getItem('sfUserName')){

                this.$router.push("/me")
            }else{
                Toast('请先登录')
            }
        },
    }
}
</script>


<style scoped>
  .lookMe{
    /* border:1px solid salmon; */
    position: fixed;
    bottom: 10px; right: 10px;
    width: 45px;
    /* width: 40px; height: 40px; */
    /* border: 1px solid #0A9DE5; border-radius: 50%; */
    z-index: 2;
  }
  .lookMe>img{width: 100%;display: block;}
</style>
