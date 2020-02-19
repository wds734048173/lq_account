<template>
  <div class="common-wrap link-account">
    <account-header name="找回密码">
      <template>
        <span class="gotoLogin" @click="gotoLogin">返回登录<a-icon type="right"/></span>
      </template>
    </account-header>
    <div class="content">
      <a-form
        class="com-form"
      >
        <a-form-item>
          <label class="tips">新密码</label>
          <a-input
            v-model="password"
            type="password"
            autocomplete="off"
          >
          </a-input>
          <p ref="passErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <label class="tips">再次输入密码</label>
          <a-input
            v-model="repass"
            type="password"
            autocomplete="off"
          >
          </a-input>
          <p ref="repassErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" class="ok-btn" @click="onOk">确定</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
  import AccountHeader from '@/components/AccountHeader.vue'
  import {resetpwd} from '../../axios/api'
  import base from '../../utils/base'
  import {checkPass} from "../../common/js/comReg";

  export default {
    name: 'FoundPass',
    data() {
      return {
        password: '',
        repass: '',
        loginphone: this.$route.query.loginphone,
        logincode: this.$route.query.logincode,
        usertype: this.$route.query.usertype,
      }
    },
    components: {AccountHeader},
    mounted() {
      this.initInputs()
    },
    methods: {
      initInputs() {
        let inputs = document.querySelectorAll('.ant-row .ant-input');
        base.MoveInputTips(inputs)
        $(inputs).on('focus', function () {
          base.FormErrorHide(this);
        })
      },
      onOk() {
        // 对密码进行验证
        let password = this.password.trim();
        let repass = this.repass.trim();
        let passErr = this.$refs.passErr;
        let repassErr = this.$refs.repassErr;
        let checkPassResult = checkPass(password)
        if (checkPassResult != "") {
          base.FormError(passErr, checkPassResult);
          return
        }
        if (password != repass) {
          base.FormError(repassErr, "两次输入的密码不一致，请重新输入");
          return
        }
        let data = new FormData()
        data.append("loginname", this.loginphone)
        data.append("userpass", password)
        data.append("inputcode", this.logincode)
        data.append("usertype", this.usertype)
        data.append("lqtoken", this.$store.state.com.lqtoken)
        resetpwd(data).then(res => {
          if (res.data.code == 200) {
            this.$message.success("修改密码成功")
            //先跳转到个人中心，做测试用
            this.$router.push({
              path: '/selfManage',
            })
          } else if (res.data.code == 1001) {
            let result = createLqtoken()
            if (result == 0) {
              this.onOk()
            }
          } else {
            this.$message.error(res.data.msg)
          }
        })
      },
      gotoLogin() {
        //0=个人账户 1=企业账户 2=院校账户 ，默认个人账户
        if (this.usertype == 0) {
          this.$router.push({
            path: '/user/login',
          })
        } else if (this.usertype == 1) {
          this.$router.push({
            path: '/enterprise/login',
          })
        } else {
          this.$router.push({
            path: '/school/login',
          })
        }
      }
    }
  }
</script>

<style lang="less" scope>
  @import url('../../assets/css/style.less');

  .link-account {
    // .ant-form-item-children{
    //   display: initial;
    // }
  }
</style>
