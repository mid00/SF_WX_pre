<template>
    <div>
        <img class="opt" :src="opt ? ispic : nopic">
    </div>
</template>


<script>
export default {
    props:{
        opt:false,
        ispic:{default:""},
        nopic:{default:""},
    }
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;}

    .opt{ width: 100%; display: block;}
</style>
