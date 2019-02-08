<template>
  <div>
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
    <div v-if="getters.homePushSet">
      <van-notice-bar
        :left-icon="getters.isAuthorize === true ? getters.avatar : '/static/imgs/default_avatar.png'"
        :text="getters.homePushSet.text"
        mode="closeable"
      />
    </div>
    <swiper
      v-show="getters.banners && getters.banners.length !== 0"
      class="swiper"
      indicator-dots="true"
      autoplay="true"
      interval="5000"
      duration="1000"
    >
      <block v-for="(item, index) in getters.banners" :key="index">
        <swiper-item>
          <image :src="item.img" @click="redirect(item.link,item.type)" style="width:100%;" mode="widthFix"/>
        </swiper-item>
      </block>
    </swiper>
    <div class="details-list">
      <van-row>
        <van-col :span="12" v-for="(item, index) in getters.pinterest" :key="index">
          <good-card :item="item" @icon-click="addCart"></good-card>
        </van-col>
      </van-row>
      <div v-show="isBottomLoading" class="loading">
        <van-loading
          style="margin-left:auto;margin-right:auto;display:block;"
          type="spinner"
          color="#f4ea2a"
        />
      </div>
    </div>
  </div>
</template>
<script>
  import goodCard from "@/components/goodCard";
  import quickAddition from "@/components/quickAddition";
  import store from "@store";
  import { redirect } from "@utils";
  import { toast, clearToast } from "@utils/vant";

  export default {
    store,
    computed: {
      getters() {
        return store.getters;
      }
    },
    components: {
      goodCard,
      quickAddition
    },
    data() {
      return {
        showQuickAddition: false,
        isBottomLoading: false,
        quickAdditionType: 1
      };
    },
    methods: {
      redirect(url, type) {
        redirect(url);
      },
      closeQuickAddition() {
        this.showQuickAddition = false;
      },
      openQuickAddition() {
        this.showQuickAddition = true;
      },
      onCloseQuickAddition(e) {
        this.closeQuickAddition();
      },
      onCancelQuickAddition(e) {
        this.closeQuickAddition();
      },
      /**
       * type 0: 全部显示  1： 购物车  2：立即购买
       */
      onConfirmQuickAddition(type, cart) {
        if (type === 1) {
          this.onAddCart(cart);
        }
      },
      onAddCart(cart) {
        if (cart.quantity > cart.sku.stock) {
          toast("fail", "库存不足");
          return;
        }
        toast('loading','Loading...',0);
        store.dispatch("AddCart", {
          cart,
          isAuthorize: this.getters.isAuthorize,
          success:res=>{
            clearToast();
            this.closeQuickAddition();
            toast("success", "添加成功");
          }
        });
      },
      addCart(item) {
        toast("loading", "Loading...", 0);
        this.quickAdditionType = 1;
        store.dispatch("GetQuickProduct", {
          productId: item.id,
          success: () => {
            this.openQuickAddition();
            clearToast();
          }
        });
      }
    },
    created() {
      console.log("首页", "created");
      store.dispatch("GetHomePush");
      store.dispatch("GetBanners");
      store.dispatch("GetPinterest");
    },
    mounted() {
      var title = "首页";
      console.log(title, "mounted");
      wx.startPullDownRefresh();
    },
    //下拉刷新
    async onPullDownRefresh() {
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      toast("loading", "Loading...", 0);

      store.dispatch("UpdateHomePush",
        {
          complete: () => {

            store.dispatch("UpdateBanners",
              {

                complete: () => {

                  store.dispatch("UpdatePinterest",
                    {

                      success: (res) => {
                      },
                      fail: () => {
                      },
                      complete: () => {
                        console.log("refresh finished");
                        clearToast();
                        wx.hideNavigationBarLoading(); //完成停止加载
                        wx.stopPullDownRefresh(); //停止下拉刷新
                      }

                    });

                }

              });

          }
        });


    },
    onReachBottom() {
      if (this.isBottomLoading) {
        return;
      }
      this.isBottomLoading = true;
      store.dispatch("MorePinterest", {
        complete: () => {
          this.isBottomLoading = false;
        }
      });
    },
  };
</script>
<style socped>
  * {
    padding: 0;
    margin: 0;
  }

  .display {
    display: none;
  }

  .details-list {
    padding: 10rpx;
    margin-top: 20rpx;
  }

  .details-list-title {
    text-align: center;
    font-size: 20px;
    line-height: 20px;
  }

  .cart {
    margin-bottom: 70px;
  }
</style>
