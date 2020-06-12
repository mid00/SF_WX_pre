<template>
  <div class="home"><!--  -->
    <div class="navbox" ref="nav"><!--  -->
      <div class="nav"><!-- 长条 -->

        <div class="navItem" @click="nav($event,0)">
          <navpic
            :opt="checks[0].is"
            :ispic="require('../assets/one/n1-press.png')"
            :nopic="require('../assets/one/n1.png')"
          ></navpic>
        </div>

        <div class="navItem" @click="nav($event,1)">
          <navpic
            :opt="checks[1].is"
            :ispic="require('../assets/one/n3-press.png')"
            :nopic="require('../assets/one/n3.png')"
          ></navpic>
        </div>

        <div class="navItem" @click="nav($event,2)">
          <navpic
            :opt="checks[2].is"
            :ispic="require('../assets/one/n4-press.png')"
            :nopic="require('../assets/one/n4.png')"
          ></navpic>
        </div>

        <div class="navItem" @click="nav($event,3)">
          <navpic
            :opt="checks[3].is"
            :ispic="require('../assets/one/n5-press.png')"
            :nopic="require('../assets/one/n5.png')"
          ></navpic>
        </div>

      </div>
    </div>
    <!-- 顶部导航 -->
  </div>
</template>


<script>

import navpic from './navpic'

export default {
  name: 'Home',
  components: { navpic, },
  data(){
    return{
      checks: [
                {is:true , goto: '/'},
                {is:false, goto: '/queryNews'},
                {is:false, goto: '/writeNews'},
                {is:false, goto: '/epage'},
              ],
      saveRouter: '', // 路由暂存
    }
  },
  methods:{

    nav(e,n){

      // console.log(e,n)
      // console.log(location)

      for(var i=0;i<this.checks.length;i++){

        if(n==i){

              this.checks[i].is = true; // 点击谁，谁的图片激活

              if(this.saveRouter != this.checks[i].goto){

                this.saveRouter = this.checks[i].goto // 保存当前路由
                this.$router.push( this.checks[i].goto ) //跳转
              }

        }else{ this.checks[i].is=false;}
      }
    },
  }
}
</script>


<style scoped>
  *{  padding:0; margin:0; color: #666;font-family: Microsoft YaHei;}
  input::placeholder{color:#aaa;}


  .home{
    padding: 10px 10px 0 10px;
    width:calc(100% - 20px); height: 65px;
    background: #eee;
    /* border:1px solid salmon; */
  }


  .navbox{

    width:100%;
    overflow-x: auto;
    scrollbar-color: rgba(0,0,0,0);
  }
  .navbox::-webkit-scrollbar{ display: none;}

/* 长条 */
  .nav{
    width: 600px; display: flex; justify-content: space-between;
  }

  .navItem{
    width:144px;
  }

</style>>
