<template>
  <div v-if="details != null" @touchmove.stop="preventD">
    <van-action-sheet
      class="van-action-sheet"
      :i="sub(details.productAttribute.product_name)"
      :title="title"
      :show="show"
      @close="onClose"
      @cancel="onCancel"
    >
      <div>
        <van-cell-group custom-class="quick-addition">
          <div class="quick-addition-header">
            <img class="quick-addition-header-image" style="margin-top:10px;" :src="details.productSkus[active].pic"
                 @click="previewImage">
            <div class="quick-addition-header-details">
              <span style="color:#ff4e22" v-text="'￥'+details.productSkus[active].price"></span>
              <br>
              <span style="color:#bfbfbf;font-size:15px;" v-text="'库存 '+details.productSkus[active].stock"></span>
              <span style="color:#bfbfbf;font-size:15px;" v-text="'已选择: '+ values"></span>
            </div>
          </div>
          <scroll-view
            class="quick-attribute"
            scroll-y
            :style="'margin-top:30rpx;height:' + scrollViewHeight + 'rpx;'"
            @scrolltoupper="upper"
            @scrolltolower="lower"
          >

            <van-cell
              v-for="(item,key) in attributes"
              :key="key"
            >
              <view slot="title">
                <view v-text="item"></view>
                <div
                  style="margin: 5px;"
                  v-for="(value,i) in details.productAttribute.values[key]"
                  :key="i"
                  @click="clickSku(key,i)"
                >
                  <van-tag
                    size="large"
                    :color="attributeActives[key] === i ? '#FF0036' : ''"
                    round>
                    <span
                      style="margin:10px;"
                      v-text="value"></span>
                  </van-tag>
                </div>
              </view>
            </van-cell>
            <van-cell
              title="购买数量"
            >
              <van-stepper
                :value="nums"
                integer
                :disabled="details.productSkus[active].stock === 0"
                min="1"
                :max="details.productSkus[active].stock"
                @change="onStepperChange"
              />
            </van-cell>
            <div style="height: 50px;"></div>

          </scroll-view>
        </van-cell-group>
        <van-goods-action>
          <van-goods-action-button v-if="type === undefined || type === 0" type="warning" text="加入购物车"
                                   @click="addCart"/>
          <van-goods-action-button v-if="type === undefined || type === 0" text="立即购买" @click="nowBuy"/>
          <van-goods-action-button v-if="type !== undefined && type !== 0" text="确定" @click="confirm"/>
        </van-goods-action>
      </div>
    </van-action-sheet>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
  import * as md5 from "md5";
  import { toast } from "@utils/vant";

  export default {
    /**
     * type 0: 全部显示  1： 购物车  2：立即购买
     */
    props: ["show", "details", "type"],
    data() {
      return {
        active: 0,
        attributeActives: [],
        title: "",
        nums: 1,
        type: 0,
        scrollViewHeight: 500,
        attributes: [],
        values: []
      };
    },
    computed: {},
    watch: {
      details: {
        handler(newdetails, oledetails) {
          if (newdetails == null) {
            return;
          }
          for (let k of Object.keys(newdetails.productSkuMap)) {
            this.active = newdetails.productSkuMap[k];
            break;
          }
          this.item = newdetails.productSkus[this.active];
          this.title = newdetails.productAttribute.product_title;
          this.attributes = newdetails.productAttribute.attributes;
          this.attributeActives = [];
          for (let i = 0; i < newdetails.productAttribute.attributes.length; i++) {
            this.attributeActives[i] = newdetails.productAttribute.values[i].indexOf(this.item.values[i]);
          }

          this.values = this.details.productSkus[this.active].values;

        },
        immediate: true,
        deep: true
      }
    },
    methods: {
      preventD() {
      },
      confirm() {
        const cart = {
          sku: this.details.productSkus[this.active],
          product: {
            id: this.details.productAttribute.product_id,
            name: this.details.productAttribute.product_name,
            title: this.details.productAttribute.product_title,
            unit:this.details.productAttribute.product_unit,
            categoryId: this.details.productAttribute.category_id,
            categoryTitle:this.details.productAttribute.category_title,
          },
          nums: this.nums
        };
        this.$emit("confirm", this.type, cart);
      },
      nowBuy() {
        const cart = {
          sku: this.details.productSkus[this.active],
          product: {
            id: this.details.productAttribute.product_id,
            name: this.details.productAttribute.product_name,
            title: this.details.productAttribute.product_title,
            unit:this.details.productAttribute.product_unit,
            categoryId: this.details.productAttribute.category_id,
            categoryTitle:this.details.productAttribute.category_title,
          },
          nums: this.nums
        };
        this.$emit("now-buy", cart);
      },
      addCart() {
        const cart = {
          sku: this.details.productSkus[this.active],
          product: {
            id: this.details.productAttribute.product_id,
            name: this.details.productAttribute.product_name,
            title: this.details.productAttribute.product_title,
            unit:this.details.productAttribute.product_unit,
            categoryId: this.details.productAttribute.category_id,
            categoryTitle:this.details.productAttribute.category_title,
          },
          nums: this.nums
        };
        this.$emit("add-cart", cart);
      },
      onClose(e) {
        this.$emit("close", e);
      },
      onCancel(e) {
        this.$emit("cancel", e);
      },
      onStepperChange(e) {
        this.nums = e.mp.detail;
      },
      previewImage() {
        let pics = [];
        for (let i = 0; i < this.details.productSkus.length; i++) {
          pics.push(this.details.productSkus[i].pic);
        }
        wx.previewImage({
          current: this.details.productSkus[this.active].pic, // 当前显示图片的http链接
          urls: pics, // 需要预览的图片http链接列表
          fail: (res) => {
            console.error("previewImage", res);
          }
        });
      },
      clickSku(attributeIndex, valueIndex) {
        this.nums = 1;

        let unique = this.getUniqueKey(attributeIndex, valueIndex);

        if (this.details.productSkuMap[unique] === undefined) {
          if (attributeIndex === 0) {
            this.attributeActives[attributeIndex] = valueIndex;
            this.values = [this.details.productAttribute.values[attributeIndex][valueIndex]];
            return;
          }
          toast("fail", "暂无库存");
          return;
        }
        this.attributeActives[attributeIndex] = valueIndex;
        this.active = this.details.productSkuMap[unique];
        this.values = this.details.productSkus[this.active].values;
      },
      getUniqueKey(attributeIndex, valueIndex) {
        let unique = this.details.productAttribute.product_id;
        for (let i = 0; i < this.details.productAttribute.values.length; i++) {
          let value = this.details.productAttribute.values[i];
          if (attributeIndex === i) {
            unique += value[valueIndex];
          } else {
            unique += value[this.attributeActives[i]];
          }
        }
        unique = md5(unique);
        return unique;
      },
      sub(str) {
        if (str.length > 25) {
          this.title = str.substring(0, 25) + "...";
        } else {
          this.title = str;
        }
        return this.title;
      }
    },
    created() {
    },
    mounted() {
    }
  };
</script>

<style socped>

  .van-action-sheet {
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .quick-addition {
    min-height: 300rpx;
  }

  .quick-addition-header {
    display: flex;
    flex-flow: row nowrap;
  }

  .quick-addition-header-details {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    align-self: flex-end;
  }

  .quick-addition-header-image {
    width: 100px;
    height: 100px;
    margin-left: 20px;
    margin-right: 20px;
  }

  .radio-group {
    display: flex;
    flex-flow: row wrap;
    padding-top: 20rpx;
    padding-bottom: 20rpx;
    padding-left: 20rpx;
  }

  .radio-span {
    margin: 15rpx;
    font-size: 30rpx;
    color: #bfbfbf;
    border: 1px solid #bfbfbf;
    border-radius: 20rpx;
    padding: 10rpx;
  }

  .active {
    color: #FF6600;
    border: 1px solid #FF6600;
  }


</style>
