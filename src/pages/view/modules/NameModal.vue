<template>
  <a-modal
    class="editModal"
    title="修改姓名"
    :width="398"
    :visible="nameVisible"
    :maskClosable="false"
    :footer="null"
    @cancel="close"
  >
    <div class="content">
      <a-form
        :form="form"
        class="com-form"
      >
        <a-form-item>
          <a-input
            type="text"
            placeholder="联系人姓名"
            v-decorator="['linkname',{ rules: [{ required: true, message: '请输入联系人姓名' },{validator:this.checkName}] }]"
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
  export default {
    name: 'NameModal',
    data() {
      return {
        linkname: '',
        form: this.$form.createForm(this, {name: 'nameModel'}),
      }
    },
    props: {
      nameVisible: Boolean,
    },
    methods: {
      checkName(rule, value, callback) {
        let name = value.trim()
        if (name.length != 0) {
          callback()
        } else {
          callback("请输入联系人姓名")
        }
      },
      close() {
        this.form.resetFields()
        this.$emit('nameVisibleClose', !this.nameVisible)
      },
      onOk() {
        this.form.validateFields((err, values) => {
          if (!err) {
            this.$emit('onOk', values.linkname)
          }
        })
      }
    }
  }
</script>

<style lang="less" scope>
  @import url('~@/assets/css/style.less');

</style>
