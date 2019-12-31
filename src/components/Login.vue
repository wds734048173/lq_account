<template>
  <div class="login-wrap">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="密码登录" key="1">
        <a-form
          :form="form"
          class="login-form"
          @submit="passSubmit"
        >
          <a-form-item v-if="usertype==0">
            <a-input
              v-decorator="[
                'loginname',
                { rules: [{ required: true, message: '请输入手机号/邮箱/用户名' }] },
              ]"
              placeholder="请输入手机号/邮箱/用户名"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item v-else>
            <a-input
              v-decorator="[
                'loginname',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              placeholder="请输入手机号/邮箱"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
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
            <a-checkbox > 记住密码 </a-checkbox>
            <a class="login-form-forgot" href=""> 忘记密码 </a>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button"> 密码登录 </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="短信登录" key="2" forceRender>
        <!-- <a-form
          :form="form"
          class="login-form"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'loginphone',
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
                'logincode',
                { rules: [{ required: true, message: 'Please input your code!' }] },
              ]"
              type="text"
              placeholder="请输入验证码"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button"> 短信登录 </a-button>
          </a-form-item>
        </a-form> -->
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{

    }
  },
  props:{
    usertype:{type:Number,required:true}
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'pass_login' });
  },
  methods: {
    passSubmit(e) {
      let _this = this;
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of passform: ', values);
          _this.$emit('log',values)
        }
      });
    },
  }
}
</script>

<style lang="less" scoped>
.login-form {
  max-width: 300px;
  .login-form-forgot {
    float: right;
  }
  .login-form-button {
    width: 100%;
  }
}
</style>
