<template>
    <div class="container">
<!-- input 组 -->
      <div class="inp_group" :class="{'is-res': error}">
        <div>
          <input
            :type="type"
            :placeholder="placeholder"
            :name="name"

            :value="value"
            @input="$emit('input',$event.target.value)"
          >
        </div>

        <button
            :disabled="disabled"

            v-if="btnTitle"
            @click="$emit('btnClick')"

        >{{ btnTitle }}</button>

      </div>

<!-- 验证提示 -->
      <p class="res-tips" v-if="error">{{ error }}</p>
    </div>
</template>
<script>
export default {
    props: {
              type: { type: String, default: "text"},
              placeholder:  String, // 提示语
              name:         String, // 元素的名称，用于form提交
              value:        String, // input 值

              disabled:     Boolean,// 按钮 禁用
              btnTitle:     String, // 按钮文字 提示
              error:        String, // 验证不正确 提示
    }
}
</script>
<style scoped>
    input::placeholder{color:#aaa;}
  .container{ width: 100%; height: 35px; margin-top: 10px;}
  .inp_group{
    width: 100%; height: 100%;
    /* border: 1px solid #D2D2D2; */
    border-radius: 5px;
    display: flex; justify-content: space-between; align-items: center;
  }

/* input 输入框 */
  .inp_group>div{
    width: calc(100% - 91px); height: 35px;
    border: 1px solid #D2D2D2; border-radius: 5px 0 0 5px;
    display: flex; justify-content: center; align-items: center;
  }
  .inp_group>div>input{
    width: calc(100% - 10px); height: 35px;
    border: none; outline: none;
    margin-left: 10px;
  }

/* 按钮 */
  .inp_group>button{
    width: 90px; height: 37px;
    background: #0F9EEB; border: 1px solid #0F9EEB;
    border-radius: 0 5px 5px 0;
    color: #FFF;
  }
  .inp_group>button:focus{
    outline: none;
  }

/* 错误信息 */
  .res-tips{
    color: red;
  }
</style>
