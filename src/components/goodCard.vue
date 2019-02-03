<template>
  <div class="goodcard">
    <img
      :style="'border-radius:'+ (radius === undefined ? '10rpx' : radius)"
      class="imagecard"
      :src="item.img"
      @click="link('/pages/details/main?product_id='+item.id)"
    >
    <div class="show-info-one" v-if="item.name">
      <span class="title" v-text="name"></span>
    </div>

    <div class="show-info-one" v-if="item.name">
      <span class="nums">
        销量：
        <span v-text="item.sale"></span>
      </span>
      <span class="nums">
        库存：
        <span v-text="item.stock"></span>
      </span>
    </div>

    <div class="show-info-two" v-if="item.price !== null" @click="iconClickItem">
      <span class="price">￥{{item.price}}</span>

      <van-icon
        name="cart-o"
        size="45rpx"
        color="#FF4E22"
        custom-style="text-align: center;line-height:45rpx;margin-top:5rpx;margin-right:5rpx;"
      />
    </div>
  </div>
</template>

<script>
  import { redirect } from "@utils";

  export default {
    props: ["item"],
    computed: {
      name() {
        return this.item.name;
      }
    },
    data() {
      return {};
    },
    methods: {
      link(uri) {
        redirect(uri);
      },
      iconClickItem() {
        this.$emit("icon-click", this.item);
        console.log("iconClickItem");
      }
    },
    created() {
    }
  };
</script>

<style socped>
  .goodcard {
    margin: 10rpx;
  }

  .imagecard {
    width: 100%;
    height: 150px;
  }

  .show-info-one {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-end;
    justify-content: space-between;
    text-align: center;
  }

  .show-info-two {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    text-align: center;
  }

  .title {
    color: #333333;
    font-size: 35rpx;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .price {
    font-size: 35rpx;
    color: #ff4e22;
    text-align: center;
  }

  .nums {
    font-size: 25rpx;
    color: #bfbfbf;
    text-align: center;
  }
</style>
