<template>
  <div class="register-wrap">
    <a-form
      v-if="usertype==1"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <label class="tips">工商注册名称</label>
        <a-input
          v-model="companyname"
          autocomplete="off"
        >
        </a-input>
        <!-- <a-input
          v-decorator="[
            'companyname',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          autocomplete="off"
        >
        </a-input> -->
      </a-form-item>
      <a-form-item>
        <label class="tips">姓名</label>
        <a-input
          v-model="linkman"
          autocomplete="off"
        >
        </a-input>
        <!-- <a-input
          v-decorator="[
            'linkman',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          autocomplete="off"
        >
        </a-input> -->
      </a-form-item>
      <a-form-item>
        <label class="tips">手机号</label>
        <a-input
          v-model="loginname"
          autocomplete="off"
        >
        </a-input>
        <!-- <a-input
          v-decorator="[
            'userphone',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          autocomplete="off"
        >
        </a-input> -->
      </a-form-item>
      <a-form-item>
        <label class="tips">验证码</label>
        <a-input
          v-decorator="[
            'code',
            { rules: [{ required: true, message: 'Please input your code!' }] },
          ]"
          type="text"
          autocomplete="off"
        >
        </a-input>
        <button ref="code" @click="getCode" class="send-code">发送验证码</button>
      </a-form-item>
      <a-form-item class="submit-btn">
        <a-button type="primary" html-type="submit" class="login-form-button"> 提交 </a-button>
      </a-form-item>
    </a-form>

    <a-form
      v-else
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <label class="tips">手机号</label>
        <a-input
          v-model="loginname"
          autocomplete="off"
        >
        </a-input>
        <!-- <a-input
          v-decorator="[
            'loginname',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          autocomplete="off"
        >
        </a-input> -->
      </a-form-item>
      <a-form-item>
        <label class="tips">验证码</label>
        <a-input
          v-model="inputcode"
          autocomplete="off"
        >
        </a-input>
        <!-- <a-input
          v-decorator="[
            'inputcode',
            { rules: [{ required: true, message: 'Please input your code!' }] },
          ]"
          type="text"
          autocomplete="off"
        >
        </a-input> -->
        <button ref="code" @click="getCode" class="send-code">发送验证码</button>
      </a-form-item>
      <a-form-item>
        <label class="tips">密码</label>
        <a-input
          v-model="userpass"
          autocomplete="off"
        >
        </a-input>
        <!-- <a-input
          v-decorator="[
            'userpass',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          type="password"
          autocomplete="off"
        >
        </a-input> -->
      </a-form-item>
          
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button"> 完成并登录 </a-button>
      </a-form-item>
    </a-form>

  </div>
</template>

<script>
import base from '../utils/base'
export default {
  name: 'Register',
  data(){
    return{
      companyname:'',
      linkman:'',
      loginname:'',
      inputcode:'',
      userpass:'',
      timmer:null
    }
  },
  props:{
    usertype:{type:Number,required:true},
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  mounted(){
    let inputs = document.querySelectorAll('.ant-row .ant-input');
    base.MoveInputTips(inputs);
  },
  methods: {
    handleSubmit(e) {
      var _this = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          // _this.$emit('reg',values)
        }
      });
    },
    getCode(){
      let code = this.$refs.code;
      if(this.loginname.trim().length>0){
        base.SendCode(code,this.timmer,60)
      }else{
        this.$message.info('请输入手机号')
      }
    },
  }
}
</script>

<style scoped>
</style>
