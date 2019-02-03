import { toast } from "@utils/vant";
import {
  getCartsStorageSync,
  setCartsStorageSync
} from "@utils/storage";


const state = {
  carts: []
};

// getters
const getters = {};

// actions
const actions = {
  GetCarts: function({ commit }) {
    var carts = getCartsStorageSync();
    console.log("carts", carts);
    if (!carts) {
      carts = [];
    }
    commit("UPDATE_CARTS", carts);
  },
  UpdateCarts({ commit }) {
  },
  AddCart({ commit }, cart) {
    commit("ADD_CART", cart);
  },
  RemoveCart({ commit }, index) {
    commit("REMOVE_CART", index);
  },
  RemoveAllCart({ commit }) {
    commit("REMOVE_ALL_CARTS");
  },
  UpdateCart({ commit }, cart) {
    commit("UPDATE_CART", cart);
  },
  UpdateCartNums({ commit }, { index, nums }) {
    commit("UPDATE_CART_NUMS", { index, nums });
  }
};

// mutations
const mutations = {
  ADD_CART(state, cart) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].sku.id === cart.sku.id) {
        cart.nums += state.carts[i].nums;
        if (state.carts[i].sku.stock <= cart.nums) {
          cart.nums = state.carts[i].sku.stock;
        }
        state.carts[i] = cart;
        setCartsStorageSync(state.carts);
        return;
      }
    }
    state.carts.push(cart);
    setCartsStorageSync(state.carts);
  },
  UPDATE_CARTS(state, carts) {
    state.carts = carts;
    setCartsStorageSync(state.carts);
  },
  REMOVE_CART_BY_INDEX(state, index) {
    state.carts.splice(index, 1);
    setCartsStorageSync(state.carts);
  },
  REMOVE_ALL_CARTS(state) {
    state.carts = [];
    setCartsStorageSync(state.carts);
  },
  UPDATE_CART(state, cart) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].sku.id === cart.sku.id) {
        cart.nums += state.carts[i].nums;
        if (state.carts[i].sku.stock <= cart.nums) {
          cart.nums = state.carts[i].sku.stock;
        }
        state.carts[i] = cart;
        setCartsStorageSync(state.carts);
        return;
      }
    }
  },
  UPDATE_CART_NUMS(state, { index, nums }) {
    state.carts[index].nums = nums;
    if (state.carts[index].sku.stock <= nums) {
      state.carts[index].nums = state.carts[index].sku.stock;
    }
    setCartsStorageSync(state.carts);
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
