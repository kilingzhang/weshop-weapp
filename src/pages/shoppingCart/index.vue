<template>
  <div>
    <div class="shopping-crat-nav">
      <van-cell-group>
        <van-cell icon="cart">
          <view slot="title">
            <span class="van-cell-text">购物车</span>
          </view>
          <view slot="right-icon">
            <van-button size="mini" v-if="!isDelete" @click="openDelete">编辑</van-button>
            <van-button size="mini" type="danger" v-if="isDelete" @click="remove">删除</van-button>
            <van-button style="margin-left: 10px;" size="mini" v-if="isDelete" @click="isDelete = false">完成</van-button>
          </view>
        </van-cell>
      </van-cell-group>
      <ul>
        <van-checkbox-group :value="result" @change="onCheckboxChange">
          <li class="item" v-for="(cart, i) in carts" :key="i">
            <van-checkbox size="30px" v-if="!isDelete" :name="i" class="item-checkbox"></van-checkbox>
            <van-card
              class="item-details"
              lazy-load
              :num="cart.nums"
              :tag="cart.icon_text"
              :price="cart.sku.price"
              :origin-price="cart.sku.original_price"
              :desc="cart.sku.values"
              :title="cart.product.title"
              :thumb="cart.sku.pic"
            >
              <view slot="footer">
                <van-stepper :value="carts[i].nums" :data-id="i" integer min="1" :max="cart.sku.stock" step="1"
                             @change="onCartNumsChange"/>
              </view>
            </van-card>
            <van-checkbox checked-color="red" v-if="isDelete" :name="i" class="item-checkbox"></van-checkbox>
          </li>
        </van-checkbox-group>
      </ul>
    </div>
    <van-submit-bar :price="priceAmount" button-text="提交订单" @submit="submitOrder" :tip="true">
      <van-checkbox style="margin-left:10rpx;" :value="checked" @change="selectAll">全选</van-checkbox>
      <view slot="tip">优惠卷将在提交订单时减免
      </view>
    </van-submit-bar>
    <van-dialog id="van-dialog"/>
    <van-toast id="van-toast"/>
  </div>
</template>
<script>
  import store from "@store";
  import { redirect, forEachValue } from "@utils";
  import Dialog from "@vant/dialog/dialog";
  import Toast from "@vant/toast/toast";

  export default {
    data() {
      return {
        checked: true,
        isDelete: false,
        result: [],
        priceAmount: 0
      };
    },
    store,
    computed: {
      getters() {
        return store.getters;
      },
      carts() {
        return store.getters.carts;
      }
    },
    watch: {
      result: {
        handler(n, o) {
          if(n === null){
            return;
          }
          this.refreshComputedPriceAmount();
          if (n.length !== this.carts.length) {
            this.checked = false;
          }
        },
        immediate: true,
        deep: true
      },
      carts: {
        handler(n, o) {

          this.result = [];
          if (this.checked) {
            for (let i = 0; i < n.length; i++) {
              this.result.push(i + "");
            }
          }
        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      submitOrder() {
        if (store.getters.isAuthorize === false) {
          const toast = Toast.fail({
            duration: 0,       // 持续展示 toast
            forbidClick: true, // 禁用背景点击
            message: "请先授权微信登录~",
            loadingType: "spinner",
            selector: "#van-toast"
          });
          setTimeout(() => {
            if (toast !== null) {
              redirect("/pages/me/main", "switchTab");
              Toast.clear();
            }
          }, 2000);
          return;
        }
        if (this.result.length === 0) {
          Toast.fail("请添加商品后再提交订单~");
          return;
        }
        redirect("/pages/orders/confirm/main");
      },
      selectAll() {
        this.checked = !this.checked;
        this.result = [];
        if (this.checked) {
          for (let i = 0; i < this.carts.length; i++) {
            this.result.push(i + "");
          }
        }
      },
      onCheckboxChange(event) {
        this.result = event.mp.detail;
      },
      onCartNumsChange(event) {
        store.dispatch("UpdateCartNums", {
          index: event.currentTarget.dataset.id,
          nums: event.mp.detail
        });
        this.refreshComputedPriceAmount();
      },
      refreshComputedPriceAmount() {
        this.priceAmount = 0;
        forEachValue(this.carts, (cart, index) => {
          if (this.result.indexOf(index + "") !== -1) {
            this.priceAmount += cart.nums * cart.sku.price;
          }
        });
        this.priceAmount *= 100;
      },
      remove() {
        if (this.result.length === 0) {
          Toast.fail("请选择需要删除的商品！");
          return;
        }
        if (this.result.length === this.carts.length) {
          Dialog.confirm({
            message: "确定全部删除吗？"
          }).then(() => {
            store.dispatch('RemoveAllCart');
            Dialog.close();
            this.isDelete = false;
          }).catch(() => {
            Dialog.close();
          });
        } else {
          Dialog.confirm({
            message: "确定删除吗？"
          }).then(() => {
            forEachValue(this.result, (index, i) => {
              store.dispatch("RemoveCart", this.carts[i]);
            });
            Dialog.close();
          }).catch(() => {
            Dialog.close();
          });
        }
      },
      openDelete() {
        if (this.carts.length === 0) {
          Toast.fail("请添加商品！");
          this.isDelete = false;
          return;
        }
        this.isDelete = true;
      }
    },
    created() {
    },
    mounted() {
      var title = "购物车";
      console.log(title, "mounted");
      store.dispatch("GetCarts");
      this.checked = true;
      this.isDelete = false;
      this.result = [];
      if (this.checked) {
        for (let i = 0; i < this.carts.length; i++) {
          this.result.push(i + "");
        }
      }
      this.refreshComputedPriceAmount();
    },
    //下拉刷新
    async onPullDownRefresh() {
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      store.dispatch("UpdateCarts");
      this.refreshComputedPriceAmount();
      wx.hideNavigationBarLoading(); //完成停止加载
      wx.stopPullDownRefresh(); //停止下拉刷新
    },
    onShow() {
      this.isDelete = false;
    }
  };
</script>
<style socped>


  .shopping-crat-nav {
    margin-bottom: 120px;
  }

  .item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    margin: 15rpx;
  }

  .item-checkbox {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    text-align: center;
    width: 100rpx;
  }

  .item-details {
    width: 80%;
  }

</style>
