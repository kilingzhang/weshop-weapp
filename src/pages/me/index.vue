<template>
  <div class="me">
    <van-toast id="van-toast"/>
    <div class="header">
      <image v-if="canIUse && !getters.isAuthorize" src="/static/imgs/default_avatar.png" class="avatar-img"/>
      <button
        v-if="canIUse && !getters.isAuthorize"
        class="nickname logoutNickname"
        @click="onAuthorize"
        open-type="getUserInfo"
        size="mini"
        @getuserinfo="onGetUserInfo"
        style="margin-top:50rpx;"
      >点击微信登录
      </button>
      <span v-if="!canIUse">请升级微信版本</span>
      <div class="userinfo-avatar" v-show="getters.isAuthorize">
        <open-data open-type="getUserInfo" type="userAvatarUrl"></open-data>
      </div>
      <open-data
        open-type="getUserInfo"
        v-show="getters.isAuthorize"
        class="nickname logoutNickname"
        type="userNickName"
      ></open-data>
    </div>
    <div class="main">
      <div style="margin-top:30rpx;">
        <van-cell-group v-if="getters.isAuthorize">
          <van-cell value="绑定" icon="phone" is-link @click="link('/pages/binging/main')">
            <view slot="title">
              <span class="van-cell-text" open-type="getPhoneNumber">绑定手机号、优惠多多</span>
            </view>
          </van-cell>
        </van-cell-group>
      </div>

      <div style="margin-top:20rpx;">
        <van-cell-group v-if="getters.isAuthorize">
          <van-cell value="我的订单" is-link @click="link('/pages/orders/main')">
            <view slot="title">
              <span class="van-cell-text">查看全部订单</span>
            </view>
          </van-cell>
          <van-cell>
            <van-row style="text-align: center;">
              <van-col @click="link('/pages/orders/main?tab=pending-payment')" span="6">
                <van-icon name="pending-payment"/>
                <br>待付款
              </van-col>
              <van-col @click="link('/pages/orders/main?tab=pending-deliver')" span="6">
                <van-icon name="pending-deliver"/>
                <br>待发货
              </van-col>
              <van-col @click="link('/pages/orders/main?tab=logistics')" span="6">
                <van-icon name="logistics"/>
                <br>已发货
              </van-col>
              <van-col @click="link('/pages/orders/main?tab=completed')" span="6">
                <van-icon name="completed"/>
                <br>已完成
              </van-col>
            </van-row>
          </van-cell>
        </van-cell-group>
      </div>

      <div style="margin-top:20rpx;" v-if="getters.isAuthorize">
        <van-cell-group style="margin-top:100rpx;">
          <van-cell title="我的地址" icon="location" is-link @click="link('/pages/address/main')"/>
        </van-cell-group>
      </div>
    </div>
    <div class="footer">
      <image src="/static/imgs/default_avatar.png" class="avatar-img"/>
      <span style="margin-top:10px;">®心意花店</span>
    </div>
    <van-dialog id="van-dialog"/>
  </div>
</template>
<script>
  import store from "@store";
  import { authorize } from "@api/user";
  import { redirect } from "@utils";
  import { toast, clearToast } from "@utils/vant";

  export default {
    store,
    computed: {
      getters() {
        return store.getters;
      }
    },
    data() {
      return {
        canIUse: wx.canIUse("button.open-type.getUserInfo")
      };
    },
    methods: {
      link(uri) {
        if (store.getters.isAuthorize === false) {
          toast("fail", "请先授权微信登录~", 0);
          return;
        }
        redirect(uri);
      },
      onAuthorize() {
        toast("loading", "登陆中..", 0);
      },
      onGetUserInfo(e) {
        const { $store } = this;
        clearToast();
        if (e.mp.detail.userInfo === undefined) {
          toast("fail", "授权失败~");
        } else {
          store.dispatch("UpdateUserInfo", e.mp.detail.userInfo);
          authorize(
            store.getters.token,
            e.mp.detail.iv,
            e.mp.detail.encryptedData,
            data => {
              if (data.code === 0) {
                $store.dispatch("UpdateUserInfo", data.result);
                $store.dispatch("UpdateAuthorize", true);

                toast("loading", "购物车同步中..", 0);
                store.dispatch("AddCarts",
                  {
                    carts: this.getters.carts,
                    success: res => {
                      clearToast();
                      toast("success", "购物车同步成功~");
                    },
                    fail: res => {
                      clearToast();
                      toast("fail", "购物车同步失败～");
                    }
                  });


              } else if (data.code === 1) {
                $store.dispatch("UpdateAuthorize", false);
                toast("fail", "授权失败,请重新尝试");
                console.log("授权失败,请重新尝试", data);
              }
            }
          );
        }
      }
    },
    created() {
    },
    mounted() {
      var title = "个人中心";
      console.log(title, "mounted");
    },
    onShow() {
    },
    onLoad: function() {
    }
  };
</script>
<style socped>
  body {
    background-color: #e6e6e6;
  }

  .me {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-self: center;
  }

  .header {
    display: flex;
    flex-flow: column nowrap;
    align-self: center;
    justify-content: center;
  }

  .footer {
    display: flex;
    flex-flow: column nowrap;
    align-self: center;
    margin-top: 80rpx;
    margin-bottom: 30rpx;
    text-align: center;
    font-size: 30rpx;
    color: #707070;
  }

  .userinfo-avatar {
    overflow: hidden;
    display: block;
    width: 160rpx;
    height: 160rpx;
    margin: 20rpx;
    margin-top: 50rpx;
    border-radius: 50%;
    border: 2px solid #fff;
    box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.2);
  }

  .avatar-img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 50%;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    display: block;
  }

  .logoutNickname {
    color: brown;
  }

  .nickname {
    font-size: 30rpx;
    text-align: center;
  }
</style>
