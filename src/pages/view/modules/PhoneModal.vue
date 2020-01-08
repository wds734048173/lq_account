<template>
    <a-modal
        class="editModal"
        :title=this.modalData.title
        :width="398"
        :visible="phoneVisible"
        :maskClosable="false"
        :footer="null"
        @cancel="close"
    >
        <div class="content">
            <a-form class="com-form" >
                <a-form-item v-if="modalData.type=='phone'">
                    <a-input
                        v-model="loginphone"
                        autocomplete="off"
                        placeholder='手机号'
                    >
                    </a-input>
                    <p ref="phoneErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
                </a-form-item>
                <a-form-item v-else>
                    <a-input
                        v-model="loginphone"
                        autocomplete="off"
                        placeholder='邮箱'
                    >
                    </a-input>
                    <p ref="phoneErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
                </a-form-item>
                <a-form-item>
                    <a-input
                        v-model="logincode"
                        type="text"
                        autocomplete="off"
                        placeholder="验证码"
                    >
                    </a-input>
                    <button ref="code" @click="getCode" class="send-code">发送验证码</button>
                    <p ref="codeErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
                </a-form-item>
                <a-form-item class="btn-item">
                    <a-button type="primary" class="ok-btn" @click="onOk">完成</a-button>
                </a-form-item>
            </a-form>
        </div>
    </a-modal>
</template>

<script>
import base from '../../../utils/base'
    export default {
        name: 'PhoneModal',
        data() {
            return {
                loginphone:'',
                logincode:'',
            }
        },
        props: {
            phoneVisible: Boolean,
            modalData: Object,
        },
        mounted(){
            this.initInputs()
        },
        methods: {
            getCode(){
                let code = this.$refs.code;
                let phoneErr = this.$refs.phoneErr
                if(this.loginphone.trim().length>0){
                    console.log(this.loginphone.trim())
                    base.SendCode(code,this.timmer,60)
                }else{
                    if(this.modalData.type=='phone'){
                        base.FormError(phoneErr,'请输入手机号');
                    }else{
                        base.FormError(phoneErr,'请输入邮箱');
                    }
                }
            },
            close() {
                this.$emit('phoneVisibleClose', !this.phoneVisible)
            },
            onOk(){
                this.$emit('onOk',this.loginphone,this.logincode)
            },
            initInputs(){
                let inputs = document.querySelectorAll('.ant-row .ant-input');
                base.MoveInputTips(inputs)
                $(inputs).on('focus', function() {
                    base.FormErrorHide(this);
                })
            },
        }
    }
</script>

<style lang="less" scope>
@import url('~@/assets/css/style.less');
</style>
