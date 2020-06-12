<template>
    <div class="bills">
<!-- 页头 -->
        <div class="top"> <span>&gt; {{ arr[2] }}</span> </div>
<!-- 内容 -->
        <div class="middle">
<!-- 为空 -->
            <div class="close" v-if="close">
                <div class="one">
                    <img src="../../assets/four/bq.png" alt="">
                    <span>抱歉表单飞走啦！</span>
                </div>
                <div class="two" @click="otherWrite"><img src="../../assets/four/td.png" alt=""></div>
            </div>
<!-- 不为空 -->
            <div class="haveData" v-if="!close">
                <div class="item" v-for="(item,index) of fills" :key="index">               <!-- 1 层 item: {} -->
                    <!-- <p class="title">{{item.name}}</p>                          页头 -->
                    <div class="content" v-for="(itemDetails,i) of item.items" :key="i">    <!-- 2 层 -->
                        <span class="text">{{itemDetails.name}}</span>           <!-- 名 -->


<!-- text -->           <input class="inp"      v-model = "itemDetails.value"   type="text" placeholder="请在此处填写"
                                                v-if = "(itemDetails.type == '1')  || (itemDetails.type == '16') || (itemDetails.type == '18') ||
                                                        (itemDetails.type == '20') || (itemDetails.type == '26') ||
                                                        (itemDetails.type == '29') || (itemDetails.type == '31') || (itemDetails.type == '32') ||
                                                        (itemDetails.type == '33') || (itemDetails.type == '34') || (itemDetails.type == '35') ||
                                                        (itemDetails.type == '36')">


<!-- number -->         <input class="inp"      v-model = "itemDetails.value"   type="tel" placeholder="请在此处填写"
                                                v-if = "(itemDetails.type == '6')  || (itemDetails.type == '7')  || (itemDetails.type == '8')  ||
                                                        (itemDetails.type == '10') || (itemDetails.type == '11') || (itemDetails.type == '12') ||
                                                        (itemDetails.type == '14') || (itemDetails.type == '22') || (itemDetails.type == '23') ||
                                                        (itemDetails.type == '24') || (itemDetails.type == '30')">


<!-- 性别 -->           <van-radio-group        v-if = "(itemDetails.type == '19')"    v-model = "itemDetails.value">
                            <van-radio class="itemHeight"       @click="clickSet( [ index, i, 0])"   name="0">男</van-radio>
                            <van-radio class="itemHeight"       @click="clickSet( [ index, i, 1])"   name="1">女</van-radio>
                        </van-radio-group>


<!-- 复选 -->           <van-checkbox-group     v-if = "(itemDetails.type == '2')"    v-model = "itemDetails.value">
                            <!-- <van-checkbox class="itemHeight"    @click="clickSet( [ index, i, `${a}`])" :name="a"    v-for="(aItem,a) of itemDetails.preselection_input" :key="a">{{aItem}}</van-checkbox> -->
                            <!-- <van-checkbox class="itemHeight"    @click="clickSet( [ index, i, `${a}`])" name="√" v-show="!(aItem == '')"    v-for="(aItem,a) of itemDetails.preselection_input" :key="a">{{aItem}}</van-checkbox> -->
                            <van-checkbox class="itemHeight"    @click="clickSet( [ index, i, `${a}`])" name="√"    v-for="(aItem,a) of itemDetails.preselection_input" :key="a">{{aItem}}</van-checkbox>
                        </van-checkbox-group>


<!-- 单选 -->           <van-radio-group        v-if = "(itemDetails.type == '3')"    v-model = "itemDetails.value">
                            <!-- <van-radio class="itemHeight"       @click="clickSet( [ index, i, a])"   :name="a"    v-for="(aItem,a) of itemDetails.preselection_input" :key="a">{{aItem}}</van-radio> -->
                            <!-- <van-radio class="itemHeight"       @click="clickSet( [ index, i, a])"      name="√" v-show="!(aItem == '')"    v-for="(aItem,a) of itemDetails.preselection_input" :key="a">{{aItem}}</van-radio> -->
                            <van-radio class="itemHeight"       @click="clickSet( [ index, i, a])"      name="√"    v-for="(aItem,a) of itemDetails.preselection_input" :key="a">{{aItem}}</van-radio>
                        </van-radio-group>


<!-- 下拉 -->           <input class="inp"  v-model = "itemDetails.value"   @focus="focusDropdown([ index, i, itemDetails.preselection_input])" placeholder="请点击此处"
                                                v-if = "itemDetails.type == '4'">


<!-- tel -->            <input class="inp"      v-model = "itemDetails.value"   type="tel"      maxlength="11" placeholder="请在此处填写"
                                                v-if = "itemDetails.type == '15'">


<!-- id -->             <input class="inp"      v-model = "itemDetails.value"   type="text"     maxlength="18" placeholder="请在此处填写"
                                                v-if = "itemDetails.type == '17'">


<!-- 日期 -->           <input class="inp"  v-model = "itemDetails.value"   @focus="focusDatetime( [index, i, itemDetails.type] )" placeholder="请点击此处"
                                                v-if = "(itemDetails.type == '5') || (itemDetails.type == '21') || (itemDetails.type == '27') ||
                                                        (itemDetails.type == '28')">


<!-- 时间 -->           <input class="inp"  v-model = "itemDetails.value"   @focus="focusDatetime( [index, i, itemDetails.type] )" placeholder="请点击此处"
                                                v-if = "itemDetails.type == '9'">


<!-- 日期时间 -->       <input class="inp"  v-model = "itemDetails.value"   @focus="focusDatetime( [index, i, itemDetails.type] )" placeholder="请点击此处"
                                                v-if = "itemDetails.type == '13'">


<!-- 地址 -->           <input class="inp"  v-model = "itemDetails.value"   @focus="focusArea([index,i])" placeholder="请点击此处"
                                                v-if = "itemDetails.type == '25'">


                    </div>
                </div>
            </div>

<!-- 提交 -->
            <div class="item submit">
                <div class="butBox">
                    <span class="but" @click="cancel">清除</span>
                    <span class="but" @click="goBack">顶部</span>
                    <span class="but" @click="submit">提交</span>
                </div>
            </div>

        </div>
<!--<span class="text">我有童心一棵，久被尘埃锁牢，何日尘尽光生，踏遍四海山河</span>-->


<!-- 下拉 -->
        <div class="isPicker">
            <van-picker

                v-show="showPicker"
                show-toolbar
                title="请选择"
                :columns="columns"

                @cancel="cancelDropdown"
                @confirm="confirmDropdown"
            />
        </div>


<!-- 日期时间 -->
        <van-datetime-picker    v-show = "isDatetime"   v-model="currentDate"

            :min-date="minDate"
            :max-date="maxDate"
            :type="setType"
            class="chooseDatetime"

            @confirm = "datetimeConfirm"
            @cancel  = "datetimeClose"
        />


<!-- 地址 -->
        <van-area               v-show = "isArea"       value=""

            :area-list="areaList"
            title="请选择"
            class="chooseArea"

            @change  = "ChangeBut"
            @confirm = "confirmBut"
            @cancel  = "cancelBut"
        />

    </div>
</template>


<script>
import { getMsg } from '../../tools/get'
import { Toast, Dialog } from 'vant';
import { DatetimePicker } from 'vant';
export default {
    data(){
        return {

            arr: [], // 修改表单 - 传参

            // fill_id: "",        // 填单表的 id
            fill_name: "",      // 填单表的表名
            fills: [],          // 填单表的内容
            initialArr: [], // 最初的数据

            close: false,       // 请求数据为空

            showPicker: false,  // 下拉列表 默认隐藏
            dropdownArr: [],    // 下拉数组
            columns: [],        // 下拉列表

            setType: "date",  // datetimepicker 类型
            isDatetime: false,  // 日期时间隐藏
            timeArr: [],
            minDate: new Date(2020, 0, 1),
            maxDate: new Date(2025,10,1),
            currentDate: new Date(),

            isArea: false,      // 地址 默认隐藏
            areaArr: [],
            showArea: "",
            areaList: {
                province_list: {
                                
                                210000: '辽宁省',
                            },
                            city_list: {
                                
                                210100: '沈阳市',
                                210200: '大连市',
                                210300: '鞍山市',
                                210400: '抚顺市',
                                210500: '本溪市',
                                210600: '丹东市',
                                210700: '锦州市',
                                210800: '营口市',
                                210900: '阜新市',
                                211000: '辽阳市',
                                211100: '盘锦市',
                                211200: '铁岭市',
                                211300: '朝阳市',
                                211400: '葫芦岛市',
                            },
                            county_list: {
                         
                                210102: '和平区',
                                210103: '沈河区',
                                210104: '大东区',
                                210105: '皇姑区',
                                210106: '铁西区',
                                210111: '苏家屯区',
                                210112: '浑南区',
                                210113: '沈北新区',
                                210114: '于洪区',
                                210115: '辽中区',
                                210123: '康平县',
                                210124: '法库县',
                                210181: '新民市',
                                210190: '经济技术开发区',
                                210202: '中山区',
                                210203: '西岗区',
                                210204: '沙河口区',
                                210211: '甘井子区',
                                210212: '旅顺口区',
                                210213: '金州区',
                                210214: '普兰店区',
                                210224: '长海县',
                                210281: '瓦房店市',
                                210283: '庄河市',
                                210302: '铁东区',
                                210303: '铁西区',
                                210304: '立山区',
                                210311: '千山区',
                                210321: '台安县',
                                210323: '岫岩满族自治县',
                                210381: '海城市',
                                210390: '高新区',
                                210402: '新抚区',
                                210403: '东洲区',
                                210404: '望花区',
                                210411: '顺城区',
                                210421: '抚顺县',
                                210422: '新宾满族自治县',
                                210423: '清原满族自治县',
                                210502: '平山区',
                                210503: '溪湖区',
                                210504: '明山区',
                                210505: '南芬区',
                                210521: '本溪满族自治县',
                                210522: '桓仁满族自治县',
                                210602: '元宝区',
                                210603: '振兴区',
                                210604: '振安区',
                                210624: '宽甸满族自治县',
                                210681: '东港市',
                                210682: '凤城市',
                                210702: '古塔区',
                                210703: '凌河区',
                                210711: '太和区',
                                210726: '黑山县',
                                210727: '义县',
                                210781: '凌海市',
                                210782: '北镇市',
                                210793: '经济技术开发区',
                                210802: '站前区',
                                210803: '西市区',
                                210804: '鲅鱼圈区',
                                210811: '老边区',
                                210881: '盖州市',
                                210882: '大石桥市',
                                210902: '海州区',
                                210903: '新邱区',
                                210904: '太平区',
                                210905: '清河门区',
                                210911: '细河区',
                                210921: '阜新蒙古族自治县',
                                210922: '彰武县',
                                211002: '白塔区',
                                211003: '文圣区',
                                211004: '宏伟区',
                                211005: '弓长岭区',
                                211011: '太子河区',
                                211021: '辽阳县',
                                211081: '灯塔市',
                                211102: '双台子区',
                                211103: '兴隆台区',
                                211104: '大洼区',
                                211122: '盘山县',
                                211202: '银州区',
                                211204: '清河区',
                                211221: '铁岭县',
                                211223: '西丰县',
                                211224: '昌图县',
                                211281: '调兵山市',
                                211282: '开原市',
                                211302: '双塔区',
                                211303: '龙城区',
                                211321: '朝阳县',
                                211322: '建平县',
                                211324: '喀喇沁左翼蒙古族自治县',
                                211381: '北票市',
                                211382: '凌源市',
                                211402: '连山区',
                                211403: '龙港区',
                                211404: '南票区',
                                211421: '绥中县',
                                211422: '建昌县',
                                211481: '兴城市',

                            },
            }
        }
    },
    created(){
        this.arr = this.$route.params.arr.split(","); // 路由传参
        // console.log(this.arr);
        this.getDetails();      // 获取表单
    },
    methods:{

// 获取填单内容
        getDetails(){
            var url = '';
            var obj = {
                        action : "1025",
                        fill_input_id: this.arr[0],
                        create_time: this.arr[1],
                      };
            getMsg( url , obj ).then( result=>{

                console.log( "修改预填单 - 请求结果" );
                console.log( result );
                // result.data.data = {
                //                         create_time: "2020-05-07 11:22:11",
                //                         creator_id_info: null,
                //                         creator_id_num: "500228198801271111",
                //                         creator_name: "",
                //                         creator_tel: "13541201111",
                //                         name: "20200507112211-13541201111",
                //                         pages: [{}, {}, {}],
                //                         source: 1,
                //                         template_id: 1,
                //                         template_name: "公司登记备案申请书"
                //                     }
// ---------------------------------------------------------------------------------------------------------------------

                if( result.status == 200 ){
                    if( result.data.status == 200 ){

                        if( result.data.data.length == 0 ){ this.close = true; } // 没数据页面

                        // this.fill_name = result.data.data.template_name

                        var fill = result.data.data.pages     // 获取结果 ---> 数组
                        console.log( fill)

                        // data: ""
                        // id: 798
                        // name: "TextItem1"
                        // preselection_input: ";"
                        // value: ""

                        for(var i=0; i<fill.length; i++){                 // 给每一个对象加属性 ---> value
                            for(var j=0; j<fill[i].items.length; j++){    // 循环对象里的数组 items

                                // console.log( [ i, j ]);

                                var item = fill[i].items[j].type;
// 复选
                                if( item == 2){

                                    fill[i].items[j].value = [`${ fill[i].items[j].value}`];
                                    this.fills[i].items[j].preselection_input = [ this.fills[i].items[j].preselection_input ];

                                    // if( (fill[i].items[j].preselection_input == "")||(fill[i].items[j].preselection_input == ";")){
                                    //     this.$set( fill[i].items[j], "preselection_input", [""]); }
                                    // else{ fill[i].items[j].preselection_input = fill[i].items[j].preselection_input.split(";"); }
                                }
// 单选
                                else if( item == 3){

                                    this.fills[i].items[j].preselection_input = [ this.fills[i].items[j].preselection_input ];

                                    // if( (fill[i].items[j].preselection_input == "")||(fill[i].items[j].preselection_input == ";")){
                                    //     this.$set( fill[i].items[j], "preselection_input", [""]); }
                                    // else{ fill[i].items[j].preselection_input = fill[i].items[j].preselection_input.split(";"); }
                                }
// 下拉列表
                                else if( item == 4){
                                    if( (fill[i].items[j].preselection_input == "")||(fill[i].items[j].preselection_input == ";")){

                                        this.$set( fill[i].items[j], "preselection_input", [""]);
                                    }else{
                                        fill[i].items[j].preselection_input = fill[i].items[j].preselection_input.split(";");
                                    }
                                }
// 性别                         else if( item == 19){}
// type = 1 输入框              else{}

                                var initialObj = {};
                                initialObj.item_id = fill[i].items[j].id;
                                initialObj.input_data = fill[i].items[j].value;
                                this.initialArr.push(initialObj);

                            }
                        }
                        this.fills = fill
                        console.log(" 结果 ")
                        console.log( fill)
                        console.log( this.fills );

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

// ---------------------------------------------------------------------------------------------------------------------

            }).catch( err => { console.log( err ) } )
        },

// 请求数据为空，跳回去
        otherWrite(){ this.$router.push('/writeNews')},


// 单选、复选
        clickSet( val){

            console.log("我点了谁")
            console.log( val);
        },


// 下拉
        focusDropdown( val){
            console.log( "下拉列表");
            console.log( val);
            this.columns = val[2];
            this.showPicker = true;
            this.dropdownArr = [ val[0], val[1]];
        },
        cancelDropdown(){ this.showPicker = false; },
        confirmDropdown( value, index){

            var arr = this.dropdownArr;

            for(var i=0; i<this.fills.length; i++){
                if( i == arr[0]){
                    for(var j=0; j<this.fills[i].items.length; j++){
                        if( j == arr[1]){
                            this.fills[i].items[j].value = value;
                        }
                    }
                }
            }
            this.showPicker = false;
        },


// -------------------------------------------------------------------------------------
// 获取日期时间
        focusDatetime( val){
            console.log( val);
            this.timeArr = val;
            this.isDatetime = true;
        },
        datetimeConfirm(){

            var setTime = this.currentDate
            console.log( this.timeArr);
            console.log( setTime);

            var mont = (setTime.getMonth() + 1);
            var days = setTime.getDate();
            var hour = setTime.getHours();
            var minu = setTime.getMinutes();

            if(mont.length < 2){ mont = `0${mont}`;}
            if(days.length < 2){ days = `0${days}`;}
            if(hour.length < 2){ hour = `0${hour}`;}
            if(minu.length < 2){ minu = `0${minu}`;}

            if(this.timeArr[2] == 9){

                this.setType = "time";
                var showTime =  hour + ':' + minu ;
            }
            else if(this.timeArr[2] == 13){

                this.setType = "datetime";
                var showTime =  setTime.getFullYear() + '年' + mont + '月' + days + '日 ' + hour + ':' + minu ;
            }
            else{

                this.setType = "date";
                var showTime =  setTime.getFullYear() + '年' + mont + '月' + days + '日 ' ;
            }

            console.log( showTime);

            for(var i=0; i<this.fills.length; i++){
                if( i == this.timeArr[0]){
                    for(var j=0; j<this.fills[i].items.length; j++){
                        if( j == this.timeArr[1]){
                            this.fills[i].items[j].value = showTime;
                        }
                    }
                }
            }
            this.isDatetime = false;
        },
        datetimeClose(){ this.isDatetime = false; },
// -------------------------------------------------------------------------------------


// 获取地址
        focusArea( val){
            console.log( val);
            this.areaArr = val;
            this.isArea = true;
        },
        ChangeBut(picker, value, index){

            for( var i=0; i<value.length; i++){
                this.showArea = this.showArea + value[i].name
            }
        },
        confirmBut(){
            var arr = this.areaArr;
            for(var i=0; i<this.fills.length; i++){
                if( i == arr[0]){
                    for(var j=0; j<this.fills[i].items.length; j++){
                        if( j == arr[1]){
                            this.fills[i].items[j].value = this.showArea;
                        }
                    }
                }
            }
            this.isArea = false;
        },
        cancelBut(){
            console.log("取消选择地址");
            this.isArea = false;
        },


// 第 3.1 个方法，重置
        cancel(){

            console.log( "重置" );

            // for( var i=0; i<this.fills.length; i++){
            //     for( var j=0; j<this.fills[i].items.length; j++){
            //         if( this.fills[i].items[j].type == 2){ this.fills[i].items[j].value = []; }
            //         else if( this.fills[i].items[j].type == 3){ this.fills[i].items[j].value = 0; }
            //         else if( this.fills[i].items[j].type == 19){ this.fills[i].items[j].value = 0; }
            //         else if( this.fills[i].items[j].type == 4){ this.fills[i].items[j].value = ""; }
            //         else{ this.fills[i].items[j].value = ""; }
            //     }
            // }
            this.getDetails();
            Toast.success("重置成功");
        },
// 第 3.2 个方法，回到顶部
        goBack(){ (document.body.scrollTop = 0) || (document.documentElement.scrollTop = 0); },
// 第 3.3 个方法，提交
        submit(){

            Dialog.confirm({title:"提示", message:"信息填写不完善会影响审核通过，请确认是否已完善"})
            .then( ()=>{

                var arrs = [];

                for(var i=0; i<this.fills.length; i++){
                    for(var j=0; j<this.fills[i].items.length; j++){

                        // if( this.fills[i].items[j].value == "" ){ Toast("请完善信息"); return;}

                        var obj = {};
                        obj.item_id = this.fills[i].items[j].id;
                        obj.input_data = this.fills[i].items[j].value;
                        arrs.push(obj);
                    }
                }

                console.log( arrs);
                console.log( this.initialArr);

                var getArr = []; // 修改的数据
                for(var i=0; i<arrs.length; i++){
                    if( arrs[i].input_data != this.initialArr[i].input_data ){
                        getArr.push(arrs[i])
                    }
                }
                console.log("修改的数据");
                console.log( getArr);
                var url = '';
                var ob = {
                            // action:"1019",
                            // fill_id: this.fill_id,
                            // fill_data: arrs,
                            // idno: sessionStorage.getItem("idNum")
                            action: "1026",
                            fill_input_id: this.arr[0],
                            create_time: this.arr[1],
                            update_items: getArr, // 更新的数据
                        };
                getMsg( url, ob ).then( result => {

                    console.log( result );

                    if( result.status == 200){
                        if( result.data.status == 200){

                            Toast.success("提交成功");

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

                }).catch( err => { console.log( err ); })

            })
            .catch( ()=>{ console.log("取消提交")})
        },
    },
    watch: {}
}
</script>


<style scoped>


/* picker */
    .isPicker{ width: 100%; position: fixed; left: 0; bottom: 0; z-index: 99999;}


/* 时间、地址 */
    .chooseDatetime{ position: fixed; bottom: 0; left: 0; right: 0;}
    .chooseArea{ position: fixed; bottom: 0; left: 0; right: 0;}


/* 内容 */
    .middle{ width: calc(100% - 10px); padding: 0 5px 100px 5px;  background: #E8E8E8E8; }
    .haveData{  width: 100%;}

    .item{      background: #E8E8E8E8; margin-top: 5px; }/* 外边框 */
    .title{     width: calc(100% - 10px); padding: 5px; background: #FFFFFF; border-bottom: 1px solid #DDDDDD; color: #3D90DB; font-size: 14px; }/* 标题 */


/* 预填项 */
    .content{/* 内容：姓名 + 值 */
        width: calc(100% - 10px); padding: 5px;
        border-bottom: 1px dotted #DDDDDD;
        background: #FFFFFF;
        display: flex; flex-direction: column;
    }

/* 姓名 */
    .text{
        margin: 2px 0; font-size: 14px;
        /* text-overflow: ellipsis; white-space: nowrap;  overflow: hidden; */
    }
/* ------------------------------------------------------------------------------------------------------ */
    .inp{   /* 值 */
        width: calc(100% - 14px);
        margin-left: 14px;
        height: 28px;
        border: none;
        outline: none;
        border-radius: 0;
        border-bottom: 1px solid #BBBBBB;
        /* text-overflow: ellipsis; white-space: nowrap;  overflow: hidden; */
    }
/* ------------------------------------------------------------------------------------------------------ */
    .itemHeight{height: 28px;}
    .item.submit{margin-top: 15px;}


/* 请求数据为空 */
    .close{ width: 100%;}
    .one{ width: 150px; height: 114px; margin: auto; margin-top: 30%; }
    .one>img,.two>img{  width: 100%; display: block; }
    .one>span{  color: #999; text-align: center; width:100%; display: block; margin-top:8%;}
    .two{ width: 120px; height: 35px; margin: auto; }
    .two{ margin-top: 60px; }


/* 按钮组 */
    .butBox{    width: 100%; height: 40px; display: flex; align-items: center; justify-content: space-between;}
    .but:first-child{   color: #F2F2F2; background: rgb(223, 160, 1); flex: 1; height: 100%; text-align: center; line-height: 40px; border-radius: 5px 0 0 5px;}
    .but:nth-child(2){  color: #F2F2F2; background: #FF5722; flex: 1; height: 100%; text-align: center; line-height: 40px;}
    .but:last-child{    color: #F2F2F2; background: #1E9FFF; flex: 1; height: 100%; text-align: center; line-height: 40px; border-radius: 0 5px 5px 0;}

/* 页头 */
    .top{
        width:calc(100% - 10px); height:40px;
        padding-left: 10px;
        background-image: linear-gradient(to bottom,#0984e4,#15b8f2);
        overflow: hidden;
        /* border:1px solid salmon; */
    }
    .top>span{  width: calc(100% - 10px); color:#fff; line-height: 40px; text-overflow: ellipsis; white-space: nowrap;  overflow: hidden;}

/* 容器 */
    .bills{ width:100%; position: absolute; left: 0; top: 0; right: 0; bottom: 0; background: #E8E8E8E8;}

    *{  color: #666;font-family: Microsoft YaHei;padding:0;margin:0;}

</style>
