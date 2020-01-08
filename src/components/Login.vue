<template>
  <div class="login-wrap">
    <a-tabs defaultActiveKey="1">
      <a-tab-pane tab="密码登录" key="1">
        <a-form
          class="login-form"
        >
          <a-form-item v-if="usertype==0">
            <label class="tips">用户名</label>
            <a-input
              v-model="loginname"
              autocomplete="off"
            >
            </a-input>
            <p ref="nameErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item v-else>
            <label class="tips">手机号/邮箱</label>
            <a-input
              v-model="loginname"
              autocomplete="off"
            >
            </a-input>
            <p ref="nameErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item>
            <label class="tips">密码</label>
            <a-input
              v-model="userpass"
              :type="showPass?'text':'password'"
              autocomplete="off"
              style="padding-right:30px;"
            >
            </a-input>
            <a v-if="showPass" @click.prevent="changeEye" class="eye open"><img src="../assets/img/eye-close.png" alt=""></a>
            <a v-else @click.prevent="changeEye" class="eye close"><img src="../assets/img/eye-open.png" alt=""></a>
            <p ref="passErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item class="pass-form">
            <a-checkbox v-model="checked" class="remeber-pass" > 记住密码 </a-checkbox>
            <a class="login-form-forgot" href=""> 忘记密码? </a>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="loginByPass" class="login-form-button"> 登录 </a-button>
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
              autocomplete="off"
            >
            </a-input>
            <p ref="phoneErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
          </a-form-item>
          <a-form-item>
            <label class="tips">验证码</label>
             <a-input
              v-model="logincode"
              type="text"
              autocomplete="off"
            >
            </a-input>
            <button ref="code" @click="getCode" class="send-code">发送验证码</button>
            <p ref="codeErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
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
import base from '../utils/base'
export default {
  name: 'HelloWorld',
  data(){
    return{
      loginname:'',  //登录名
      userpass:'',   //密码
      loginphone:'', //手机号
      logincode:'',  //验证码
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
  mounted(){
    let inputs = document.querySelectorAll('.ant-row .ant-input');
    base.MoveInputTips(inputs)
    $(inputs).on('focus', function() {
      base.FormErrorHide(this);
    })
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
    changeEye(){
      this.showPass = !this.showPass
    },
    getCode(){
      let code = this.$refs.code;
      let phoneErr = this.$refs.phoneErr
      if(this.loginphone.trim().length>0){
        console.log(this.loginphone.trim())
        base.SendCode(code,this.timmer,60)
      }else{
        base.FormError(phoneErr,'请输入手机号');
      }
    },
    //密码登录
    loginByPass(){
      let nameErr = this.$refs.nameErr
      let passErr = this.$refs.passErr
      if(this.loginname.trim().length==0){
        base.FormError(nameErr,'请输入用户名');
        return;
      }
      if(this.userpass.trim().length==0){
        base.FormError(passErr,'请输入密码');
        return;
      } 
      let data = {
        loginname: this.loginname,
        userpass: this.userpass
      }
      this.$emit('log',data);
    },
    //短信登录
    loginByMess(){
      let phoneErr = this.$refs.phoneErr
      let codeErr = this.$refs.codeErr
      if(this.loginphone.trim().length==0){
        base.FormError(phoneErr,'请输入手机号');
        return;
      }
      if(this.logincode.trim().length==0){
        base.FormError(codeErr,'请输入验证码');
        return;
      } 
      let data = {
        loginphone: this.loginphone,
        logincode: this.logincode
      }
      this.$emit('log',data);
    },
  }
}
</script>

<style lang="less" scoped>
</style>
