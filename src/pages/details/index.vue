<template>
  <div v-if="product" class="detail-main">
    <swiper
      class="swiper"
      indicator-dots="true"
      autoplay="true"
      interval="5000"
      duration="1000"
    >
      <block v-for="(img, index) in product.album_pics" :key="index">
        <swiper-item>
          <image :src="img" style="width:100%;height: 400px;" mode="widthFix"/>
        </swiper-item>
      </block>
    </swiper>

    <div class="detail-price">
      <div>
        <lable>活动价格:</lable>
        <span v-text="'￥'+product.original_price"></span>
        <br>
        <span style="font-size:10px;">
          <lable>店内价格:</lable>
        <span style="text-decoration:line-through;" v-text="'￥'+product.price"></span>
        </span>
      </div>
      <div>

      </div>
    </div>

    <div class="detail-desc">
      <div class="detail-desc-title">
        <span v-text="product.title"></span>
      </div>
      <br>
      <div class="cell-item">
        <span v-text="'配送费：0'"></span>
        <span v-text="'销售量：'+product.sale + ' ' + product.unit"></span>
        <span v-text="'分类：'+product.category_title"></span>
      </div>

    </div>

    <div class="detail-styles cell-item" @click="selectSku">
    <span>
    选择
    </span>
      <span>请选择商品样式及分类</span>
      <span><van-icon name="arrow"/></span>
    </div>

    <div class="detail-coupon cell-item" v-if="product.is_have_coupon" @click="openCoupon">
    <span>
    优惠卷
    </span>
      <div>
        <van-tag style="margin-right: 10px;" type="danger">满减</van-tag>
        <span>全商城实物商品通用</span></div>
      <span>领取<van-icon style="margin-left: 10px;" name="arrow"/></span>
    </div>

    <div class="detail-promotion cell-item" v-if="product.score  && product.score !== 0">
    <span>
    促销
    </span>
      <div>
        <van-tag plain style="margin-right: 10px;" type="danger">积分</van-tag>
        <span>购买可得{{product.score}}积分</span>
      </div>
      <span><van-icon name="arrow"/></span>
    </div>


    <div class="detail-comment">
      <navigator :url="'/page/comment/main?product_id='+product_id">
        <div class="cell-item">
           <span>
          商品评论（10000）
        </span>
          <span style="color: crimson;">查看全部<van-icon name="arrow"/></span>
        </div>
      </navigator>

      <navigator :url="'/page/comment/main?product_id='+product_id+'&user_id=1'">
        <div class="comment-item">
          <div class="comment-info">
            <span class="nick">千本笔墨</span>
            <span class="style">99红玫瑰【萤火虫小夜灯】</span>
            <span class="timer">2018-12-20</span>
          </div>
          <blockquote class="comment-content">
            专门抽出时间来给卖家宣传，花儿很漂亮，媳妇很满意，每一枝都含苞待放，每一朵都娇艳欲滴，包装甚是好看，送的非常准时，收到花的那一瞬间，意外中带着惊喜，微笑中带着眼泪。天气有点恶劣，老板比较辛苦，亲自送货上门，时间相当准时，这样的产品，如此的质量，完美的售后，简直无可挑剔
          </blockquote>
        </div>
      </navigator>

    </div>

    <div class="detail-video">
      <video style="width: 100%"
             :danmu-list="danmuList"
             src="http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
             enable-danmu danmu-btn controls></video>
    </div>
    <div class="footer-desc">
      <div v-html="product.detail"></div>
    </div>
    <div style="height: 55px"></div>
    <van-goods-action>
      <van-goods-action-icon icon="chat" text="客服" open-type="contact"/>
      <van-goods-action-icon icon="phone" text="电话" @click="phone"/>
      <van-goods-action-icon icon="cart" text="购物车" url="/pages/shoppingCart/main" link-type="switchTab"/>
      <van-goods-action-button text="加入购物车" type="warning" @click="openAddCart"/>
      <van-goods-action-button text="立即购买" @click="openBuyNow"/>
    </van-goods-action>
    <quick-addition
      :show="showQuickAddition"
      :details="getters.quickProduct"
      :type="quickAdditionType"
      @close="onCloseQuickAddition"
      @cancel="onCancelQuickAddition"
      @confirm="onConfirmQuickAddition"
      @add-cart="onAddCart"
      @now-buy="onNowBuy"
    ></quick-addition>
    <coupon-popup
      :isPopup="isCouponPopup"
      :coupons="coupons"
      @finishPopup="finishPopup"
      @getCoupon="getCoupon"
    >
    </coupon-popup>

  </div>
</template>
<script>
  import couponPopup from "@/components/couponPopup";
  import quickAddition from "@/components/quickAddition";
  import { weshopConfigMap } from "@config";
  import store from "@store";
  import { forEachValue, redirect } from "@utils";
  import { toast, clearToast } from "@utils/wx";

  export default {
    store,
    components: {
      couponPopup,
      quickAddition
    },
    computed: {
      getters() {
        return store.getters;
      },
      product() {
        return store.getters.product;
      }
    },
    data() {
      return {
        productId: 1,
        showQuickAddition: false,
        isCouponPopup: false,
        quickAdditionType: 0,
        coupons: [],
        danmuList: []
      };
    },
    methods: {
      openCoupon() {
        if (this.isAuthorize === false) {
          toast("fail", "请先授权微信登录~", 0);
          setTimeout(() => {
            if (toast !== null) {
              redirect("/pages/me/main", "switchTab");
              clearToast();
            }
          }, 2000);
          return;
        }
        toast("loading", "Loading...", 0);
        this.isCouponPopup = true;
        clearToast();

      },
      finishPopup() {
        this.isCouponPopup = false;
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
        console.log(type, type === 1);
        if (type === 1) {
          this.onAddCart(cart);
        } else if (type === 2) {
          this.onNowBuy(cart);
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
      onNowBuy(cart) {
        if (cart.quantity > cart.sku.stock) {
          toast("fail", "库存不足");
          return;
        }
        toast("success", "Now Buy!");
        this.closeQuickAddition();
      },
      openAddCart() {
        toast("loading", "Loading...", 0);
        this.quickAdditionType = 1;
        store.dispatch("GetQuickProduct", {
          productId: this.productId,
          success: () => {
            this.openQuickAddition();
            clearToast();
          }
        });
      },
      onBuyNow() {
        toast("loading", "Loading...", 0);
        this.quickAdditionType = 2;
        store.dispatch("GetQuickProduct", {
          productId: this.productId,
          success: () => {
            this.openQuickAddition();
            clearToast();
          }
        });
      },
      selectSku() {
        toast("loading", "Loading...", 0);
        this.quickAdditionType = 0;
        store.dispatch("GetQuickProduct", {
          productId: this.productId,
          success: () => {
            this.openQuickAddition();
            clearToast();
          }
        });
      },
      phone() {
        wx.makePhoneCall({
          phoneNumber: weshopConfigMap.phone //仅为示例，并非真实的电话号码
        });
      }
    },
    created() {
    },
    mounted() {
      var title = "详情";
      console.log(title, "mounted");
    },
    onLoad(options) {

      if (options) {
        this.productId = options.product_id == null ? this.productId : options.product_id;
      }

      toast("loading", "Loading...", 0);

      store.dispatch(
        "UpdateProduct",
        {
          productId: this.productId,
          success: (res) => {
            console.log(this.productId, res);
          },
          fail: res => {
            Dialog.confirm({
              title: "查询失败",
              message: "未查询到当前商品～"
            }).then(() => {
              wx.navigateBack({ changed: true });
            }).catch(() => {
              wx.navigateBack({ changed: true });
            });
          },
          complete: res => {
            clearToast();
          }
        });
    }
  };
</script>
<style socped>

  .cell-item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    color: #bfbfbf;
    font-size: 15px;
    padding: 10px;
    line-height: 30px;
    height: 30px;
  }

  .detail-main {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
  }

  .detail-video {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
  }

  .detail-price {
    padding: 10px;
    font-size: 16px;
    color: white;
    background-image: url("http://weshop.test/storage/commodities/December2018/W2rS8ZSKIDt9f2aGlUII.png");
  }

  .detail-desc {
  }

  .detail-desc-title {
    text-align: left;
    color: black;
    font-size: 16px;
    padding: 10px;
  }

  .comment-info {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    color: #bfbfbf;
    font-size: 15px;
    padding-left: 10px;
    padding-right: 10px;
    line-height: 30px;
    height: 30px;
  }

  .comment-content {
    padding: 10px;
    font-size: 15px;
  }


  .swiper {
    height: 300px;
  }

  .footer-desc {

  }


</style>
