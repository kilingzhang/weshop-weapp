<template>
  <div></div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {},
  created() {},
  mounted() {
    var title = "订单";
    // wx.setNavigationBarTitle({
    //   title: title
    // });
    console.log(title, "mounted");
  },
  onShow() {
    console.log("onShow");
  },
  //下拉刷新
  async onPullDownRefresh() {
    console.log("onPullDownRefresh");
    wx.showNavigationBarLoading(); //在标题栏中显示加载

    //模拟加载
    setTimeout(function() {
      // complete
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    }, 1500);
  }
};
</script>
<style socped>
* {
  padding: 0;
  margin: 0;
}
</style>
