<template>
  <div class="login-wrap">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="密码登录" key="1">
        <a-form
          :form="passform"
          class="login-form"
          @submit="passSubmit"
        >
          <a-form-item v-if="usertype==0">
            <label class="tips">用户名</label>
            <a-input
              v-decorator="[
                'loginname',
                { rules: [{ required: true, message: '请输入手机号/邮箱/用户名' }] },
              ]"
              autocomplete="off"
            >
            </a-input>
          </a-form-item>
          <a-form-item v-else>
            <label class="tips">手机号/邮箱</label>
            <a-input
              v-decorator="[
                'loginname',
                { rules: [{ required: true, message: 'Please input your username!' }] },
              ]"
              autocomplete="off"
            >
            </a-input>
          </a-form-item>
          <a-form-item>
            <label class="tips">密码</label>
            <a-input
              v-decorator="[
                'userpass',
                { rules: [{ required: true, message: 'Please input your Password!' }] },
              ]"
              :type="showPass?'text':'password'"
              autocomplete="off"
            >
            </a-input>
            <a v-if="showPass" @click.prevent="changeEye" class="eye open"><img src="../assets/img/eye-close.png" alt=""></a>
            <a v-else @click.prevent="changeEye" class="eye close"><img src="../assets/img/eye-open.png" alt=""></a>
          </a-form-item>
          <a-form-item class="pass-form">
            <a-checkbox v-model="checked" class="remeber-pass" > 记住密码 </a-checkbox>
            <a class="login-form-forgot" href=""> 忘记密码? </a>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button"> 登录 </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
      <a-tab-pane tab="短信登录" key="2" forceRender>
        <a-form
          class="login-form"
        >
          <a-form-item>
            <label class="tips">手机号</label>
            <a-input
              v-model="loginphone"
              type="phone"
              autocomplete="off"
            >
            </a-input>
            <!-- <a-input
              v-decorator="[
                'loginphone',
                { rules: [{ required: true, message: 'Please input your userPhone!' }] },
              ]"
              autocomplete="off"
            >
            </a-input> -->
          </a-form-item>
          <a-form-item>
            <label class="tips">验证码</label>
             <a-input
              v-model="logincode"
              type="text"
              autocomplete="off"
            >
            </a-input>
            <!-- <a-input
              v-decorator="[
                'logincode',
                { rules: [{ required: true, message: 'Please input your code!' }] },
              ]"
              type="text"
              autocomplete="off"
            >
            </a-input> -->
            <button ref="code" @click="getCode" class="send-code">发送验证码</button>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loginByMess" class="login-form-button"> 登录 </a-button>
          </a-form-item>
        </a-form>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import { send } from 'q'
export default {
  name: 'HelloWorld',
  data(){
    return{
      loginphone:'',
      logincode:'',
      checked: false,
      showPass: false,
      timmer:null
    }
  },
  props:{
    usertype:{type:Number,required:true}
  },
  created () {
    let userInfo = localStorage.getItem('userInfo')
    // console.log(userInfo)
    if (userInfo) {
      userinfo = JSON.parse(localStorage.getItem('userInfo'))
      console.log(userInfo)
      this.loginname = userInfo.loginname
      this.password = userInfo.password
      this.checked = true
    }
  },
  beforeCreate() {
    this.passform = this.$form.createForm(this, { name: 'pass_login' });
    // this.messform = this.$form.createForm(this, { name: 'mess_login' });
  },
  mounted(){
    let inputs = document.querySelectorAll('.ant-row .ant-input');
    $(inputs).focus(function(event) {
      $(this).siblings("label").stop().animate({"top": "-35px","fontSize":"13px"}, 300);
    });
    $(inputs).blur(function(event) {
      if($(this)[0].value.trim().length>0)
        return;
      $(this).siblings("label").stop().animate({"top": "-15px","fontSize":"14px"}, 300);
    });
  },
  methods: {
    ss(){
      let _this = this;
      this.$store.dispatch('LoginByUsername', loginForm).then(() => {
        console.log('回到longin.vue')
        // 记住密码
        if (typeof (Storage) !== 'undefined') {
          console.log('支持web存储')
          if (this.checked) {
            console.log('记住密码')
            let userinfo = { username: _this.loginname, password: _this.password, checked: true }
            localStorage.setItem('userInfo', JSON.stringify(userinfo))
            console.log(localStorage.getItem('userInfo'))
          } else {
            localStorage.removeItem('userInfo')
            localStorage.removeItem('rememberPassword')
            console.log('移除localStorage')
          }
        } else {
          console.log(' 抱歉! 不支持 web 存储。')
        }
        this.$router.push({ path: '/' }) // 登录成功之后重定向到首页
      }).catch(error => {
        _this.errors = _this.$store.getters.logs[0]
        return Promise.reject(error)
      })
    },
    passSubmit(e) {
      let _this = this;
      e.preventDefault();
      this.passform.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of passform: ', values);
          _this.$emit('log',values)
        }
      });
    },
    // messSubmit(e) {
    //   let _this = this;
    //   e.preventDefault();
    //   this.messform.validateFields((err, values) => {
    //     if (!err) {
    //       console.log('Received values of messform: ', values);
    //       _this.$emit('log',values)
    //     }
    //   });
    // },
    changeEye(){
      this.showPass = !this.showPass
    },
    getCode(){
      if(this.loginphone.trim().length>0){
        console.log(this.loginphone.trim())
        this.sendCode(60)
      }else{
        this.$message.info('请输入手机号')
      }
    },
    //发送验证码
    sendCode(interval) {
      let code = this.$refs.code;
      $(code).addClass('disabled').html('重新发送 (' + interval + ')')
      $(code).prop('disabled', true);
      this.timmer = setTimeout(()=>{
        if (interval > 0) {
          interval--;
          $(code).innerHTML = '重发 ' + interval + '秒';
          this.timmer = setTimeout(this.sendCode(interval), 1000);
        } else {
          clearTimeout(this.timmer);
          $(code).removeClass('disabled').html('获取验证码')
          $(code).prop('disabled', false);
        }
      },1000)
    },
    //短信登录
    loginByMess(){
      if(!this.loginphone){
        this.$message.info('请输入手机号')
        return;
      }
      if(!this.logincode){
        this.$message.info('请输入验证码')
        return;
      }
      let data = {
        loginphone: this.loginphone,
        logincode: this.logincode
      }
      this.$emit('log',data);
    }
  }
}
</script>

<style lang="less" scoped>
</style>
