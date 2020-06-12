<template>
  <div class="home">

    <navbar></navbar><!-- 全局组件、导航组件 -->

    <div class="content">
      <div v-show="show==0">  <preNews></preNews>     </div><!-- 第 1 个页面  -->
      <div v-show="show==1">  <lineNews></lineNews>   </div><!-- 第 2 个页面  -->
      <div v-show="show==2">  <queryNews></queryNews> </div><!-- 第 3 个页面  -->
      <div v-show="show==3">  <writeNews></writeNews> </div><!-- 第 4 个页面  -->
      <div v-show="show==4">  <epage></epage> </div><!-- 第 5 个页面  -->
    </div>

  </div>
</template>

<script>

import preNews from './preNews'
import lineNews from './lineNews'
import queryNews from './queryNews'
import writeNews from './writeNews'
import epage from './epage'

export default {
  name: 'Home',
  components: { preNews, lineNews, queryNews, writeNews, epage },
}
</script>