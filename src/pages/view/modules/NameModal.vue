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
                class="com-form"
            >
                <a-form-item>
                    <a-input
                        v-model="linkname"
                        type="text"
                        autocomplete="off"
                        placeholder="联系人姓名"
                    >
                    </a-input>
                    <p ref="passErr" class="tip-error"><img src="~@/assets/img/err-icon.png" alt=""><span></span></p>
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
                linkname:''
            }
        },
        props: {
            nameVisible: Boolean,
        },
        methods: {
            close() {
                this.$emit('nameVisibleClose', !this.nameVisible)
            },
            onOk(){
                this.$emit('onOk',this.linkname)
            }
        }
    }
</script>

<style lang="less" scope>
@import url('~@/assets/css/style.less');

</style>
