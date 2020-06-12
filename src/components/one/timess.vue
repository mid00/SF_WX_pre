<template>
    <div class="cont">
        <span>{{item.time}}</span>
        <p :class="{ isPre: true, noPre: false}" v-if="item.surplus != 0" @click="toPre">预 约</p>
        <p :class="{ isPre: false, noPre: true}" v-if="item.surplus == 0" @click="toFull">预约已满</p>
        <!-- 人数已满 -->
    </div>
</template>
<script>
import {getMsg} from '../../tools/get'
import { Toast } from 'vant'
export default {
    props: [ "Netnumber", "PreDate", "Job_id", "Job_name", "Item", "Mobile", "Idno" ],
    data(){
        return {
            netnumber: this.Netnumber,
            preDate: this.PreDate,
            job_id: this.Job_id,
            job_name: this.Job_name,
            item: this.Item,
            mobile: this.Mobile,
            idno: this.Idno
        }
    },
    methods: {

// 预约已满
        toFull(){
            Toast("此时段预约人数已满，请选择其他时间段")
        },
        
// 预约
        toPre(){

            var reg1=/^\d{18}$/;
            var reg2=/^\d{17}[X|x]$/;
            var idSure=(reg1.test(this.idno)) || (reg2.test(this.idno))

            ( idSure  && (sessionStorage.getItem('idNum') == "null") ) ? sessionStorage.setItem("idNum", this.idno) : Toast("身份证号码有误")

            var url='';
            var obj={
                    action:     "1010",
                    netnumber:  this.netnumber, // 网点号
                    job_id:     this.job_id, // 业务 id
                    date:       this.preDate, // 日期
                    time:       this.item.time, // 时间段
                    mobile:     this.mobile,
                    idno:       this.idno
                    }
            console.log("预约 参数");
            console.log( obj);
            getMsg(url,obj).then(result=>{

            console.log(result)

            if(result.status==200){
                if(result.data.status==200){

                var sucResult= { // 预约成功 响应结果 // 给 预约二维码 传值
                                    base64_img :result.data.data.base64_img,

                                    yynumber  : result.data.data.yynumber,
                                    bp_id     : result.data.data.bp_id,
                                    job_name  : this.job_name,
                                    telphone  : this.mobile,
                                    date      : (this.preDate+` `+this.item.time),
                                    isLoad    : true
                                };
                // var base64_img = result.data.data.base64_img;
                console.log( sucResult)

                // var success=true; // 显示 预约二维码
                this.$emit("preSuc", sucResult);

                }
                else if( result.data.status==301){ Toast(result.data.msg); console.log('行为不存在')}
                else if( result.data.status==302){ Toast(result.data.msg); console.log('数据库操作失败')}
                else if( result.data.status==303){ Toast(result.data.msg); console.log('用户没有登录')}
                else if( result.data.status==305){ Toast(result.data.msg); console.log('参数错误')}
                else if( result.data.status==304){ Toast(result.data.msg); console.log('网站黑名单')}
                else if( result.data.status==306){ Toast(result.data.msg); console.log('数据不存在')}
                else if( result.data.status==307){ Toast(result.data.msg); console.log('当前条件下不符合要求')}
                else{ Toast(result.data.msg); console.log('请求失败')}
            // -------------------------------------------------- 2
            }
            else{ Toast("网络错误"); console.log(result.status);}

            }).catch( err=>{ console.log(err) })
        }
    }
}
</script>
<style scoped>
    .cont{
        display: flex; flex-direction: column; align-items: center;
        width: 100px;
        margin: 5px;
        border: 1px solid #E8E8E8; border-radius: 5px; box-shadow: 0 0 5px 2px #E8E8E8;
    }
    /* .container>span{ border: 1px solid orange;} */
    .cont>p{
        width: 100px; height: 32px;
        border-radius: 16px;
        color: #FFF; text-align: center; line-height: 30px; font-size: 15px;
        margin: 2px 0;
        /* border: 1px solid olive; */
    }
    p.isPre{ background-image: linear-gradient(to bottom,#0984e4,#15b8f2);}
    p.noPre{ background: #A0A0A0;}
</style>