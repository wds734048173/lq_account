<template>
  <div class="register-wrap">
    <a-form
      v-if="usertype==1"
      :form="form"
      class="login-form"
    >
      <a-form-item>
        <label class="tips">工商注册名称</label>
        <a-input
          v-model="companyname"
          autocomplete="off"
        >
        </a-input>
        <p ref="companynameErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
      </a-form-item>
      <a-form-item>
        <label class="tips">姓名</label>
        <a-input
          v-model="linkman"
          autocomplete="off"
        >
        </a-input>
        <p ref="linkmanErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
      </a-form-item>
      <a-form-item>
        <label class="tips">手机号</label>
        <a-input
          v-model="loginnameEnt"
          autocomplete="off"
        >
        </a-input>
        <p ref="phoneEntErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
      </a-form-item>
      <a-form-item>
        <label class="tips">验证码</label>
        <a-input
          v-model="inputcodeEnt"
          autocomplete="off"
        >
        </a-input>
        <button ref="codeEnt" @click="regEntGetCode" class="send-code">发送验证码</button>
        <p ref="codeEntErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
      </a-form-item>
      <a-form-item class="submit-btn">
        <a-button type="primary" html-type="submit" class="login-form-button" @click="handleSubmit"> 提交</a-button>
      </a-form-item>
    </a-form>

    <a-form
      v-else
      :form="form"
      class="login-form"
    >
      <a-form-item>
        <label class="tips">手机号</label>
        <a-input
          v-model="loginname"
          autocomplete="off"
        >
        </a-input>
        <p ref="phoneErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
      </a-form-item>
      <a-form-item>
        <label class="tips">验证码</label>
        <a-input
          v-model="inputcode"
          autocomplete="off"
        >
        </a-input>
        <button ref="code" @click="regGetCode" class="send-code">发送验证码</button>
        <p ref="codeErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
      </a-form-item>
      <a-form-item>
        <label class="tips">密码</label>
        <a-input
          v-model="userpass"
          autocomplete="off"
        >
        </a-input>
        <p ref="passErr" class="tip-error"><img src="../assets/img/err-icon.png" alt=""><span></span></p>
      </a-form-item>

      <a-form-item>
        <a-button type="primary" html-type="submit" class="login-form-button" @click="handleSubmit"> 完成并登录</a-button>
      </a-form-item>
    </a-form>

  </div>
</template>

<script>
  import base from '../utils/base'
  import {sendcode} from '../axios/api'
  import {createLqtoken} from "../common/js/createLqtoken";
  import comReg from '../common/js/comReg'; //引用comReg.js
  import {checkPhone, checkPass} from "../common/js/comReg";

  export default {
    name: 'Register',
    data() {
      return {
        companyname: '',
        linkman: '',
        loginnameEnt: '',
        loginname: '',
        inputcodeEnt: '',
        inputcode: '',
        userpass: '',
        timmer: null,
        form: this.$form.createForm(this, {name: 'normal_login'}),
      }
    },
    props: {
      usertype: {type: Number, required: true},
    },
    mounted() {
      let inputs = document.querySelectorAll('.ant-row .ant-input');
      base.MoveInputTips(inputs);
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        let data = {};
        if (this.usertype == 1) {
          // 错误信息显示
          let companynameErr = this.$refs.companynameErr;
          let linkmanErr = this.$refs.linkmanErr;
          let phoneEntErr = this.$refs.phoneEntErr;
          let codeEntErr = this.$refs.codeEntErr;
          // 数据
          let companyname = this.companyname.trim();
          let linkman = this.linkman.trim();
          let loginnameEnt = this.loginnameEnt.trim();
          let inputcodeEnt = this.inputcodeEnt.trim();
          // 对数据进行验证（"inputcode""loginname""linkman""companyname"）
          if (companyname.length > 0 ) {
            if(companyname.length < 16){

            }else{
              base.FormError(companynameErr, '公司名称最多16个字符');
              return
            }
          } else {
            base.FormError(companynameErr, '请输入公司名称');
            return
          }
          if (linkman.length > 0) {
            if(linkman.length < 10){

            }else{
              base.FormError(linkmanErr, '联系人名称最多10个字符');
              return
            }
          } else {
            base.FormError(linkmanErr, '请输入联系人名称');
            return
          }
          let checkPhoneResult = checkPhone(loginnameEnt);
          if (checkPhoneResult != "") {
            base.FormError(phoneEntErr, checkPhoneResult);
            return;
          }
          if (inputcodeEnt.length > 0) {

          } else {
            base.FormError(codeEntErr, '请输入验证码');
            return
          }
          data = {
            "companyname": companyname,
            "linkman": linkman,
            "loginname": loginnameEnt,
            "inputcode": inputcodeEnt,
            "lqtoken": this.$store.state.com.lqtoken,
          }
        } else {
          // 错误信息显示
          let phoneErr = this.$refs.phoneErr;
          let codeErr = this.$refs.codeErr;
          let passErr = this.$refs.passErr;
          // 数据
          let loginname = this.loginname.trim();
          let inputcode = this.inputcode.trim();
          let userpass = this.userpass.trim();
          //loginname，phoneErr， inputcode，code，codeErr  ，userpass ，passErr
          // 对数据进行验证（"userpass""inputcode"loginname）
          let checkPhoneResult = checkPhone(loginname);
          if (checkPhoneResult != "") {
            base.FormError(phoneErr, checkPhoneResult);
            return;
          }
          if (inputcode.length > 0) {

          } else {
            base.FormError(codeErr, '请输入验证码');
            return
          }
          let checkPassResult = checkPass(userpass);
          if (checkPassResult != "") {
            base.FormError(passErr, checkPassResult);
            return;
          }
          data = {
            "loginname": loginname,
            "inputcode": inputcode,
            "userpass": userpass,
            "lqtoken": this.$store.state.com.lqtoken,
          }
        }
        this.$emit('register', data)
      },
      // 企业注册发送验证码
      regEntGetCode() {
        let code = this.$refs.code;
        let phoneEntErr = this.$refs.phoneEntErr;
        let loginnameEnt = this.loginnameEnt.trim();
        let checkPhoneResult = checkPhone(loginnameEnt);
        if (checkPhoneResult != "") {
          base.FormError(phoneEntErr, checkPhoneResult);
          return;
        }
        // 需要做防刷图验证

        // 发送短信验证码
        let sendData = new FormData()
        sendData.append("loginname", loginnameEnt)
        sendData.append("lqtoken", this.$store.state.com.lqtoken)
        sendData.append("codetype", 1)//验证码类型 0：登陆， 1：注册 2：忘记密码 3:绑定
        sendcode(sendData).then(res => {
          if (res.data.code == 200) {
            //进入读秒
            base.SendCode(code, this.timmer, 60)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.regGetCode()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })

      },
      // 普通注册获取验证码
      regGetCode() {
        let code = this.$refs.code;
        let phoneErr = this.$refs.phoneErr
        let loginname = this.loginname.trim();
        let checkPhoneResult = checkPhone(loginname);
        if (checkPhoneResult != "") {
          base.FormError(phoneErr, checkPhoneResult);
          return;
        }
        // 需要做防刷图验证

        // 发送短信验证码
        let sendData = new FormData()
        sendData.append("loginname", loginname)
        sendData.append("lqtoken", this.$store.state.com.lqtoken)
        sendData.append("codetype", 1)//验证码类型 0：登陆， 1：注册 2：忘记密码 3:绑定
        sendcode(sendData).then(res => {
          if (res.data.code == 200) {
            //进入读秒
            base.SendCode(code, this.timmer, 60)
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.regGetCode()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
    }
  }
</script>

<style scoped>
</style>
