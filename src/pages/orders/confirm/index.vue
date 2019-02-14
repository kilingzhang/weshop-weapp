<template>
  <div>
    <div style="margin-bottom: 55px;">
      <div class="card address-manager" v-if="getters.address !== null" @click="linkAddress">
        <div class="address-manager-left-icon">
          <van-icon
            name="location"/>
        </div>
        <div
          slot="title"
          class="address-title">
          <div class="address-user" style="display:flex;flex-flow: row nowrap;justify-content: space-between;">
            <span>收货人：{{getters.address.name}}</span> <span v-text="getters.address.phone"></span>
          </div>
          <div class="address-address" style="display:flex;flex-flow: row nowrap;justify-content: space-between;">
            <span>收件地址：{{getters.address.province}}&nbsp;{{getters.address.city}}&nbsp;{{getters.address.county}}&nbsp;{{getters.address.address_detail}}</span>
          </div>
        </div>
        <div
          class="address-manager-right-icon">
          <van-icon
            name="setting"/>
        </div>
      </div>
      <div class="card address-manager-add" v-else @click="linkAddress">
        添加配送地址
      </div>

      <div class="-items">
        <div class="card -item" :key="index" v-for="(orderinfo, index) in getters.orderinfo">
          <van-cell
            @click="link('/pages/details/main?product_id'+orderinfo.product.id)"
            icon="shop"
            :title="orderinfo.product.title"
            is-link>
          </van-cell>

          <ul>
            <li :key="i" v-for="(sku, i) in orderinfo.skus">
              <van-card
                @click="link('/pages/details/main?product_id'+orderinfo.product.id+'&sku_id='+sku.id)"
                :num="sku.quantity"
                :price="sku.price"
                :origin-price="sku.original_price"
                :title="'已选择: ' + sku.values"
                :thumb="sku.pic"
                lazy-load="true"
              />
            </li>
          </ul>

          <van-cell
            title="配送方式"
            value="市区内免配送"
            is-link
            arrow-direction="down"
          />
          <van-field
            label="留言"
            type="textarea"
            :value="marks[orderinfo.product.id]"
            :data-id="orderinfo.product.id"
            @input="mark"
            placeholder="请输入留言"
            autosize
          />
          <van-cell
            title-class="title-class"
            value-class="value-class"
            :title="'共 ' + orderinfo.length + ' 件商品'"
            :value="'小计: ￥ ' + orderinfo.amount"
          />
        </div>
      </div>

    </div>
    <van-submit-bar
      :price="amount"
      button-text="提交订单"
      @submit="submitOrder"
    >
    </van-submit-bar>
    <van-dialog id="van-dialog"/>

  </div>
</template>
<script>
  import store from "@store";
  import { redirect, forEachValue } from "@utils";
  import { toast, clearToast } from "@utils/wx";
  import Dialog from "@vant/dialog/dialog";

  export default {
    data() {
      return {
        marks: {}
      };
    },
    store,
    computed: {
      getters() {
        return store.getters;
      },
      amount() {
        var amount = 0;
        if (this.getters.orderinfo === null) {
          return 0;
        }
        forEachValue(this.getters.orderinfo, function(order, index) {
          amount += order.amount;
        });
        return amount * 100;
      }
    },
    methods: {
      mark(e) {
        this.marks[e.mp.currentTarget.dataset.id] = e.mp.detail;
        this.setStorageMarks();
      },
      setStorageMarks() {
        wx.setStorage(({
          key: "marks",
          data: this.marks,
          success: (res) => {
          }
        }));
      },
      getStorageMarks() {
        this.marks = wx.getStorageSync("marks") ? wx.getStorageSync("marks") : {};
      },
      preventD() {
      },
      submitOrder() {
        if (this.getters.orderinfo === null) {
          toast("fail", "请添加购物车后提交订单～", 1000);
          return;
        }

        if (this.getters.address === null) {
          toast("fail", "请添加订单地址后提交订单～", 1000);
          return;
        }
        Dialog.confirm({
          title: "确认",
          message: "确认提交该订单吗？提交后不可修改!"
        }).then(() => {
          this.link("/pages/orders/make/main");
        }).catch(() => {
        });
      },
      linkAddress() {
        redirect("/pages/address/main");
      },
      link(uri) {
        redirect(uri);
      },
      refreshConfirm(callback) {
        store.dispatch("UpdateConfirmOrder", {
          complete: res => {
            callback(res);
          }
        });
      }
    },
    created() {
    },
    mounted() {
      var title = "确认订单";
      console.log(title, "mounted");
      this.getStorageMarks();
    },
    onShow() {
      wx.startPullDownRefresh();
    },
    onShareAppMessage(e) {
      console.log("onShareAppMessage", e);
    },
    //下拉刷新
    async onPullDownRefresh() {
      console.log("onPullDownRefresh");
      toast("loading", "Loading...", 0);
      wx.showNavigationBarLoading(); //在标题栏中显示加载
      this.refreshConfirm(() => {
        wx.hideNavigationBarLoading(); //完成停止加载
        wx.stopPullDownRefresh(); //停止下拉刷新
        clearToast();
      });
    }
  };
</script>
<style socped>
  * {
    padding: 0;
    margin: 0;
    color: #333;
  }

  .title-class {
    color: #666;;
  }

  .value-class {
    color: #f50;
  }

  .coupon-title {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 20rpx;
  }

  
  .address-manager {
    padding-top: 20px;
    padding-bottom: 20px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    font-size: 15px;
  }

  .address-manager-add {
    padding-top: 20px;
    padding-bottom: 20px;
    text-align: center;
    font-size: 15px;
  }

  .address-title {
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-between;
  }


  .address-address {
    padding-top: 10px;
  }

  .address-manager-left-icon {
    width: 100rpx;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    text-align: center;
  }

  .address-manager-right-icon {
    width: 100rpx;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    text-align: center;
  }

  .-items {
    margin-top: 10px;
  }

  .card {
    background-color: white;
    box-shadow: 0px 5px 20px #999;
  }

  .-item {
    margin-top: 10px;
  }
</style>
