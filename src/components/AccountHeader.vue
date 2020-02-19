<template>
  <div class="account-header">
    <div class="head">
      <img src="../assets/img/lq-logo-blue.png" alt="蓝桥">
      <span class="line"> | </span>
      <span class="tag">{{name}}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'AccountHeader',
    data() {
      return {}
    },
    props: {
      name: String
    },
    methods: {}
  }
</script>

<style lang="less" scoped>
  .account-header {
    position: relative;

    .head {
      width: 100%;
      height: 64px;
      padding: 15px 30px;
      background: rgba(13, 57, 138, .06);
      border-radius: 6px 6px 0px 0px;

      img {
        width: 102px;
      }

      .line {
        font-weight: 500;
        color: rgba(167, 180, 204, 1);
        margin: 0 13px 0 7px;
      }

      .tag {
        font-size: 16px;
        font-weight: 500;
        color: rgba(74, 74, 74, 1);
        line-height: 22px;
      }
    }
  }
</style>
