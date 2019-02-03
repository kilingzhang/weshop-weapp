<template>
  <div>
    <network-error
      :show="isShow"
    ></network-error>
  </div>
</template>
<script>
  import networkError from "@components/networkError";

  export default {
    components: { networkError },
    data() {
      return {
        codeStatus: 500,
        isShow: true
      };
    },
    methods: {},
    created() {
    },
    mounted() {
      var title = "错误页-" + this.codeStatus;
      wx.setNavigationBarTitle({
        title: title
      });
    },
    onShow() {
    },
    onLoad(options) {
      if (options) {
        this.codeStatus = options.codeStatus == null ? this.codeStatus : options.codeStatus;
        console.log(options.msg);
      }
    }
  };
</script>
<style socped>
  .error {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }
</style>
