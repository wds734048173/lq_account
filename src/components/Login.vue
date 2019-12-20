<template>
  <div class="login-wrap">
    <a-form
      :form="form"
      class="login-form"
      @submit="handleSubmit"
    >
      <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="密码登录" key="1">
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              placeholder="Username"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
              ]"
              type="password"
              placeholder="Password"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-checkbox v-decorator="['remember',{valuePropName: 'checked',initialValue: true}]"> 记住密码 </a-checkbox>
            <a class="login-form-forgot" href=""> 忘记密码 </a>
          </a-form-item>
        </a-tab-pane>
        <a-tab-pane tab="短信登录" key="2" forceRender>
          <a-form-item>
            <a-input
              v-decorator="[
                'userPhone',
                { rules: [{ required: true, message: 'Please input your userPhone!' }] },
              ]"
              placeholder="userPhone"
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
              placeholder="code"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          
        </a-tab-pane>
      </a-tabs>
      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data(){
    return{

    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: 'normal_login' });
  },
  methods: {
    callback(key) {
      console.log(key);
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    }
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
