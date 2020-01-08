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
        <div class="content">
            <a-form
                class="com-form"
            >
                <a-form-item>
                    <a-input
                        v-model="password"
                        type="password"
                        autocomplete="off"
                        placeholder="新密码"
                    >
                    </a-input>
                    <p ref="passErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
                </a-form-item>
                <a-form-item>
                    <a-input
                    v-model="repass"
                    type="password"
                    autocomplete="off"
                    placeholder="再次输入密码"
                    >
                    </a-input>
                    <p ref="repassErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
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
        name: 'PassModal',
        data() {
            return {
                password:'',
                repass:'',
            }
        },
        props: {
            passVisible: Boolean,
        },
        mounted(){
        },
        methods: {
            close() {
                this.$emit('passVisibleClose', !this.passVisible)
            },
            onOk(){
                this.$emit('onOk',this.password,this.repass)
            }
        }
    }
</script>

<style lang="less" scope>
@import url('~@/assets/css/style.less');
</style>
