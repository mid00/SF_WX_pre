<template>
    <div class="select">
<!-- input输入框 -->
        <div class="input" ref="inp">
            <input type="text"
                :placeholder="item.placeholder"
                :value="item.value"
                autofocus
                readonly
            >
            <img disabled src="../../assets/four/xl.png">
        </div>
<!-- 下拉列表 -->
        <ul class="content"
            :class="{'bottom':position=='bottom','top':position=='top'}"
            v-show="show && item.values.length"
            @click="setVal($event)"
            ref="item"
        >
            <li v-for="(item,i) of item.values" :key="i">{{item}}</li>
        </ul>
    </div>
</template>


<script>
export default {
    props:['item'],
    data(){
        return {
            show:false, // 下拉列表是否显示
            position:'bottom', // 下拉列表显示位置
        }
    },
    mounted(){ this.handle() },
    // beforeDestroy(){ document.removeEventListener('click',fn,false);},
    methods:{

        handle(){

            console.log(1)

            document.addEventListener("click",(e)=>{

                console.log("给 document 添加事件")

                if(this.$refs.inp){

                    if(this.$refs.inp.contains(e.target)){

                        this.show = !this.show
                    }else{
                        this.show = false
                    }
                }
            },true)

            console.log(2)
        },

        setVal(e){
            this.item.value=e.target.innerHTML
            this.bus.$emit('selDate',this.item.value)
            // e.stopPropagation();
            // document.removeEventListener('click',fn,false)
        },
    },
}
</script>


<style scoped>
    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}
    input::placeholder{color:#aaa;}
    .select{
        width:100%; height:100%; position: relative;
        border-radius: 5px;
        /* border:1px solid salmon; */
    }
    .input{
        width:100%;height:100%;position: relative;
        display: flex;align-items: center;justify-content: center;
        /* border:1px solid #222; */
    }
    .input>input{
        width:85%;padding-left: 15%;
        height:100%;
        outline: none;
        border:none;
        border-radius: 5px;
    }
    .input>img{
        position: absolute;top:50%;transform:translateY(-50%);
        right:15%;
        display: block;
        width:12px;height:12px;
        /* border:1px solid black; */
    }
    .content{
        width:100%;
        max-height:200px;
        overflow-y:scroll;

        background:white;
        border:1px solid #dddddd;
        border-radius: 5px;

        position:absolute;
        left:0;
        z-index: 2;
        /* padding:2%; */
        margin-top:3px;
    }

    .bottom{    top:100%;}
    .top{   bottom:100%;}

    .content::-webkit-scrollbar{    display:none;}
    .content>li{
        height:38px;
        line-height:38px;
        width:85%;
        padding-left: 15%;
        border-bottom:1px #ddd dashed;
    }
    .content>li:last-child{ border: none;}

</style>
