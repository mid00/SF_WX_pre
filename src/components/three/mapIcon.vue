<template>
    <div>
        <div @click="followMe" class="lookMe">
            <img src="../../assets/map.png">
        </div>
    </div>
</template>


<script>
import { Toast } from 'vant'
export default {
    methods:{
        followMe(){

            console.log('去到地图')

            if(sessionStorage.getItem('sfUserName')){

                this.$router.push("/SFmap")
            }else{
                Toast('请先登录')
            }
        },
    }
}
</script>


<style scoped>
  .lookMe{
    /* border:1px solid #0A9DE5; */
    position: fixed;
    bottom: 16px; right: 70px;
    width:36px; height: 36px;
    z-index: 2;
  }
  .lookMe>img{ width: 100%; display: block;}
</style>
