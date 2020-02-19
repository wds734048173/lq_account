<template>
  <a-modal
    class="editModal"
    title="修改密码"
    :width="398"
    :visible="passVisible"
    :maskClosable="false"
    :footer="null"
    @cancel="close"

  >
    <!-- @ok="onOk"
    okText="完成"-->
    <div class="content">
      <a-form
        :form="form"
        class="com-form"
      >
        <a-form-item>
          <a-input
            type="password"
            placeholder="新密码"
            v-decorator="['password',{ rules: [{ required: true, message: '请输入新密码' },{validator:this.checkNewPass}] }]"
          />
        </a-form-item>
        <a-form-item>
          <a-input
            type="password"
            placeholder="再次输入密码"
            v-decorator="['repass',{ rules: [{ required: true, message: '请再次输入密码' },{validator:this.checkRePass}] }]"
          />
        </a-form-item>
        <a-form-item class="btn-item">
          <a-button type="primary" class="ok-btn" @click="onOk">完成</a-button>
        </a-form-item>
      </a-form>
    </div>
  </a-modal>
</template>

<script>
  import {checkPass} from "../../../common/js/comReg";

  export default {
    name: 'PassModal',
    data() {
      return {
        password: '',
        repass: '',
        form: this.$form.createForm(this, {name: 'passModel'}),
      }
    },
    props: {
      passVisible: Boolean,
    },
    methods: {
      close() {
        this.form.resetFields()
        this.$emit('passVisibleClose', !this.passVisible)
      },
      checkNewPass(rule, value, callback) {
        let checkPassResult = checkPass(value.trim())
        if (checkPassResult == "") {
          callback()
        } else {
          callback(checkPassResult)
        }
      },
      checkRePass(rule, value, callback) {
        let password = this.form.getFieldValue('password');
        if (value == password) {
          callback()
        } else {
          callback("两次输入的密码不一致")
        }
      },
      onOk() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('onOk', values.password)
          }
        })
      }
    }
  }
</script>

<style lang="less" scope>
  @import url('~@/assets/css/style.less');
</style>
