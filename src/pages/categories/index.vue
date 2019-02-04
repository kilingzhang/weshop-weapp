<template>
  <div>
    <select-tree
      :leftTabs="getters.productCategories"
      :rightTabs="getters.products"
      :active="currentTab"
      @left-tab-click="leftTabClick"
      @right-item-click="rightItemClick"
      @moreItems="moreItems"
      @right-item-add="add"
    ></select-tree>
    <van-toast id="van-toast"/>
    <quick-addition
      :show="showQuickAddition"
      :details="getters.quickProduct"
      :type="quickAdditionType"
      @close="onCloseQuickAddition"
      @cancel="onCancelQuickAddition"
      @confirm="onConfirmQuickAddition"
      @add-cart="onAddCart"
    ></quick-addition>
  </div>
</template>
<script>
  import selectTree from "@/components/selectTree";
  import quickAddition from "@/components/quickAddition";
  import store from "@store";
  import { toast , clearToast } from "@utils/vant";

  export default {
    store,
    computed: {
      getters() {
        return store.getters;
      }
    },
    components: {
      selectTree,
      quickAddition
    },
    data() {
      return {
        currentTab: 0,
        clickedTab: 0,
        showQuickAddition: false,
        quickAdditionType: 1
      };
    },
    methods: {
      leftTabClick(item, index) {

        this.currentTab = index;
        this.clickedTab = index;
        store.dispatch("UpdateProducts", { categoryId: item.id });

      },
      rightItemClick(item) {

      },
      moreItems(active, finishLoading) {
        const category = store.getters.productCategories[active];
        store.dispatch("MoreProducts", {
          categoryId: category.id,
          success: () => {
            finishLoading();
          }
        });
      },
      add(item) {
        toast("loading", "Loading...", 0);
        this.quickAdditionType = 1;
        store.dispatch("GetQuickProduct", {
          productId: item.id,
          success: () => {
            this.openQuickAddition();
            clearToast();
          }
        });
      },
      onAddCart(cart) {
        if (cart.nums > cart.sku.stock) {
          toast("fail", "库存不足");
          return;
        }
        store.dispatch("AddCart", cart);
        this.closeQuickAddition();
        toast("success", "添加成功");
      },
      /**
       * type 0: 全部显示  1： 购物车  2：立即购买
       */
      onConfirmQuickAddition(type,cart) {
        if (type === 1) {
          this.onAddCart(cart);
        }
      },
      onCloseQuickAddition(e) {
        this.closeQuickAddition();
      },
      onCancelQuickAddition(e) {
        this.closeQuickAddition();
      },
      closeQuickAddition() {
        this.showQuickAddition = false;
      },
      openQuickAddition() {
        this.showQuickAddition = true;
      }
    },
    created() {

    },
    mounted() {
      var title = "分类";
      console.log(title, "mounted");
      wx.startPullDownRefresh();

    },
    //下拉刷新
    async onPullDownRefresh() {
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      toast("loading", "Loading...", 0);
      store.dispatch(
        "UpdateProductCategories",
        {
          success: () => {
            store.dispatch("ClearProducts");
            this.currentTab = -1;
            this.currentTab = this.clickedTab;
            var category = store.getters.productCategories[this.currentTab];
            store.dispatch("UpdateProducts", { categoryId: category.id });
          },
          complete: res => {
            clearToast();
            wx.hideNavigationBarLoading(); //完成停止加载
            wx.stopPullDownRefresh(); //停止下拉刷新
          }
        });
    }
  };
</script>
<style socped>
</style>
