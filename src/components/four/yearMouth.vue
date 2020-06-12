<template>
    <div class="container">
        <span class="txt">搜索条件 :</span>

        <div class="content">
            <div v-for="(item,i) of dates" :key="i"><testSelect :item="item"></testSelect></div>
        </div>
    </div>
</template>


<script>
import testSelect from './testSelect'
export default {
    components:{ testSelect },
    data(){
        return {
           dates:[
                {
                    values :[
                            '2020 年','2021 年','2022 年','2023 年','2024 年','2025 年','2026 年','2027 年','2028 年',
                            '2029 年','2030 年','2031 年','2032 年','2033 年','2034 年','2035 年','2036 年','2037 年',
                            '2038 年','2039 年','2040 年','2041 年','2042 年','2043 年','2044 年','2045 年','2046 年',
                            ],
                    value :'',
                    placeholder :"年份"
                },

                {
                    values :['01 月','02 月','03 月','04 月','05 月','06 月','07 月','08 月','09 月','10 月','11 月','12 月',],
                    value :'',
                    placeholder :'月份'
                },
           ]
        }
    }
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}


    .container{
        /* border:1px solid salmon; */
        width:100%;height:40px;
        display: flex;justify-content: space-between;align-content: center;
        /* margin-top:5px; */
    }
    .txt{
        /* border:1px solid #ddd;border-radius: 5px; */
        width:22%;height:100%;
        /* padding-left:2%; */
        text-align: start;line-height: 40px;color:#444;
    }
    .content{
        width:74%;height:100%;
        /* border:1px solid red; */
        display: flex;justify-content: space-between;align-items: center;
    }
    .content>div{
        border:1px solid #ddd;
        border-radius: 5px;
        width:48%;height:100%;
        display: flex;justify-content: space-between;align-items: center;
    }

</style>
