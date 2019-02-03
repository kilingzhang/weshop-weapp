<template>
  <div class="tree-select">
    <scroll-view class="left-nav" scroll-y scroll-with-animation :scroll-into-view="leftToView">
      <ul>
        <li
          class="left-tab"
          v-for="(item, index) in leftTabs"
          v-bind:class="{pressed : index === active}"
          @click="leftTabClick(item,index)"
          :key="index"
          :id="'left-tab-'+index"
        >
          <span class="left-tab-title" v-text="item.title"></span>
        </li>
      </ul>
    </scroll-view>
    <div class="right-nav">
      <ul
        class="right-tab"
        v-for="(items, index) in rightItems"
        :key="index"
        :id="'right-tab-'+index"
        v-show="index === active"
      >
        <div class="right-tab-title">
          <span v-if="leftTabs[index] !== undefined" v-text="leftTabs[index].title"></span>
        </div>
        <li>
          <ul class="right-item">
            <li
              class="item"
              v-for="(item, i) in items"
              :key="item.id"
              :data-id="i"
              :id="'right-tab-'+index+'-'+item.id"
            >
              <van-card
                @click="rightItemClick(item)"
                lazy-load
                custom-class="card"
                :thumb-link="'/pages/details/main?product_id=' + item.id"
                thumb-mode="redirectTo"
                :num="item.stock"
                :tag="item.icon_text"
                :price="item.price"
                :origin-price="item.original_price"
                :desc="item.description"
                :title="item.name"
                :thumb="item.img"
              >
                <view slot="footer">
                  <van-button @click.stop="add(item)" type="danger" size="mini">添加</van-button>
                </view>
              </van-card>
            </li>
            <div v-show="isBottomLoading" class="loading">
              <van-loading
                style="margin-left:auto;margin-right:auto;display:block;"
                type="spinner"
                color="#f4ea2a"
              />
            </div>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import NoResource from "./noResource";

  export default {
    components: { NoResource },
    props: ["leftTabs", "rightTabs", "active"],
    watch: {
      // 如果 `rightTabs` 发生改变，这个函数就会运行
      rightTabs: function(newrightTabs, oldrightTabs) {
        this.rightItems[this.active] = newrightTabs;
      }
    },
    data() {
      return {
        leftToView: "",
        rightToView: "",
        PER_BAR_HEIGHT: 0,
        PER_ITEM_HEIGHT: 0,
        rightItems: [],
        isBottomLoading: false,
        isFinished: false
      };
    },
    methods: {
      leftTabClick(item, index) {

        if (index === this.active) {
          return;
        }

        this.active = index;
        this.leftToView = "left-tab-" + this.active;
        this.rightToView = "right-tab-" + this.active;
        this.$emit("left-tab-click", item, index);
      },
      scroll: function(event) {
        this.$emit("item-scroll", event);
      },
      rightItemClick(item) {
        this.$emit("right-item-click", item);
      },
      add(item) {
        this.$emit("right-item-add", item);
      },
      moreItems() {
        this.isBottomLoading = true;
        this.$emit("moreItems", this.active, () => {
          this.isBottomLoading = false;
        });
      }
    },
    created() {
      this.leftToView = "left-tab-" + this.active;
      this.rightToView = "right-tab-" + this.active;
    },
    mounted() {
      this.isFinished = true;
    },
    onReachBottom() {
      this.moreItems();
    }
  };
</script>
<style socped>
  * {
    padding: 0;
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
    color: transparent;
  }

  .card {
    width: 600rpx;
  }

  .tree-select {
    display: flex;
    flex-flow: row nowrap;
  }

  .left-nav {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    position: fixed;
    width: 150rpx;
    height: 100vh;
    background-color: #f8f9f9;
  }

  .left-tab {
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    font-size: 28rpx;
    color: gray;
  }

  .left-tab-title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .pressed {
    color: #b8c734;
    background-color: white;
    border-style: solid;
    border-left-color: #f4ea2a;
    border-left-width: 6rpx;
    border-top-width: 0rpx;
    border-right-width: 0rpx;
    border-bottom-width: 0rpx;
  }

  .right-nav {
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    margin-left: 150rpx;
  }

  .right-tab {
    width: 600rpx;
    display: flex;
    flex-flow: column nowrap;
    align-items: center;
  }

  .right-tab-title {
    height: 80rpx;
    text-align: center;
    line-height: 80rpx;
    font-size: 34rpx;
    color: gray;
  }


  .right-item {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }

  .item {
    width: 100%;
    margin: 5rpx;
  }
</style>
