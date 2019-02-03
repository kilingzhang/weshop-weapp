<script>
  import store from "@store";
  import { login, checkToken } from "@api/user";
  import {
    getTokenStorageSync,
    isAuthorizenStorageSync,
    getUserInfoStorage
  } from "@utils/storage";

  export default {
    store,
    methods: {
      getSession() {
        const _this = this;
        const { $store } = this;
        wx.checkSession({
          success() {
            // session_key 未过期，并且在本生命周期一直有效
            let token = getTokenStorageSync();
            if (token) {
              $store.dispatch("UpdateToken", token);
            } else {
              _this.refreshSession();
            }
          },
          fail() {
            _this.refreshSession();
          }
        });
      },
      refreshSession() {
        console.log("refreshSession");
        const { $store } = this;
        login(code => {
          $store.dispatch("GetToken", code);
        });
      },
      initAuthorize() {
        //初始化小程序是否已授权
        const isAuthorize = isAuthorizenStorageSync();
        store.dispatch("UpdateAuthorize", isAuthorize);

        //如果已经授权
        if (store.getters.isAuthorize && store.getters.isAuthorize === true) {
          const { $store } = this;
          const _this = this;
          //获取用户信息
          getUserInfoStorage(
            function(res) {
              // success 读取本地userinfo更新vuex用户信息
              checkToken(() => {
                $store.dispatch("UpdateUserInfo", res.data);
              }, res => {
                $store.dispatch("UpdateAuthorize", false);
                _this.refreshSession();
              });
            }, function(res) {
              //数据库拉取用户信息
            },
            function(res) {
              // complete
              console.log("userinfo->init->", $store.getters.userInfo, res.errMsg);
            }
          );
        } else {
          //未授权
          console.log("用户未授权，即将更新token及用户授权");
          // 1. 获取session_key
          this.getSession();
        }
      }
    },
    created() {
      console.log("小程序created了~");
      this.initAuthorize();
    },
    mounted() {
    },
    onLoad() {
      console.log("小程序onLoad了~");
    }
  };
</script>
<style>
  * {
    padding: 0;
    margin: 0;
    font-family: "PingFang SC", "Helvetica Neue", Helvetica, "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .loading {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    padding: 10rpx;
  }
</style>

