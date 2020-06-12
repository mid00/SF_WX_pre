<template>
  <div id="app">
<!--
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
-->
    <meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
    <navbar v-show="$route.meta.showNav"></navbar>
    <iconMe v-show="$route.meta.showNav" class="myMsg"></iconMe>
    <!-- <mapIcon v-show="$route.meta.showNav"></mapIcon> -->

    <router-view/>
  </div>
</template>


<style>
  *{
    padding:0;margin:0;
    font-size: 15px;
    /* font-family: Microsoft YaHei6; */
    font-family: "Microsoft YaHei", 微软雅黑, "MicrosoftJhengHei", 华文细黑, STHeiti, MingLiu;
  }

/* #app{ max-width: 760px; margin:auto; }
*/
</style>
