<template>
  <div class="register-wrap">
    <a-form
      v-if="usertype==1"
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-form-item>
        <a-input
          v-decorator="[
            'companyname',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          placeholder="请输入企业的工商注册名称"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'linkname',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          placeholder="联系人姓名"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'userphone',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          placeholder="请输入联系人手机号"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'code',
            { rules: [{ required: true, message: 'Please input your code!' }] },
          ]"
          type="text"
          placeholder="请输入验证码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
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
        <a-input
          v-decorator="[
            'loginname',
            { rules: [{ required: true, message: 'Please input your userPhone!' }] },
          ]"
          placeholder="请输入手机号"
        >
          <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'inputcode',
            { rules: [{ required: true, message: 'Please input your code!' }] },
          ]"
          type="text"
          placeholder="请输入验证码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-decorator="[
            'userpass',
            { rules: [{ required: true, message: 'Please input your Password!' }] },
          ]"
          type="password"
          placeholder="请输入密码"
        >
          <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
          
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button"> 完成并登录 </a-button>
      </a-form-item>
    </a-form>

  </div>
</template>

<script>
export default {
  name: 'Register',
  data(){
    return{
    }
  },
  props:{
    usertype:{type:Number,required:true},
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    handleSubmit(e) {
      var _this = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
          _this.$emit('reg',values)
        }
      });
    }
  }
}
</script>

<style scoped>
</style>
