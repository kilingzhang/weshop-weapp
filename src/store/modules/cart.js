import { toast } from "@utils/wx";
import {
  getCarts,
  deleteCarts,
  deleteAllCarts,
  addCarts,
  syncCarts,
  updateCartQuantity
} from "@api/cart";
import {
  getCartsStorageSync,
  setCartsStorageSync
} from "@utils/storage";
import { forEachValue } from "@/utils";


const state = {
  carts: []
};

// getters
const getters = {};

// actions
const actions = {
  GetCarts: function({ commit }) {
    var carts = getCartsStorageSync();
    if (!carts) {
      carts = [];
    }
    commit("UPDATE_CARTS", carts);
  },
  UpdateCarts({ commit }, { isAuthorize = false, success, fail, complete }) {

    if (!isAuthorize) {
      var carts = getCartsStorageSync();
      if (!carts) {
        carts = [];
      }
      commit("UPDATE_CARTS", carts);
      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }
    getCarts(res => {

      const carts = res.result;
      commit("UPDATE_CARTS", carts);
      if (success) {
        success(carts);
      }
    }, res => {
      if (fail) {
        fail();
      }
    }, res => {
      if (complete) {
        complete();
      }
    });
  },
  AddCart({ commit }, { cart, isAuthorize = false, success, fail, complete }) {

    if (!isAuthorize) {
      commit("ADD_CART", cart);
      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }

    addCarts({
      carts: [
        {
          "product_id": cart["product"]["id"],
          "sku_id": cart["sku"]["id"],
          "quantity": cart["quantity"]
        }
      ]
    }, res => {

      if (res.code !== 0) {
        return;
      }

      if (success) {
        success();
      }

      commit("ADD_CART", cart);

    }, fail, complete);


  },
  AddCarts({ commit }, { carts, success, fail, complete }) {
    const cartsData = [];
    forEachValue(carts, (cart, index) => {
      cartsData.push({
        "product_id": cart["product"]["id"],
        "sku_id": cart["sku"]["id"],
        "quantity": cart["quantity"]
      });
    });
    syncCarts({
      carts: cartsData
    }, res => {

      if (res.code !== 0) {
        return;
      }

      const carts = res.result;

      if (success) {
        success(carts);
      }

      commit("ADD_CARTS", carts);

    }, fail, complete);


  },
  RemoveCarts({ commit, state }, { indexs, isAuthorize = false, success, fail, complete }) {
    const carts = [];
    forEachValue(indexs, (index, i) => {
      carts.push({
        product_id: state.carts[index].product.id,
        sku_id: state.carts[index].sku.id
      });
    });

    if (!isAuthorize) {
      commit("REMOVE_CART_BY_INDEXS", indexs);
      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }

    deleteCarts(
      { carts },
      res => {

        if (res.code !== 0) {
          return;
        }

        if (success) {
          success();
        }

        commit("REMOVE_CART_BY_INDEXS", indexs);

      }, fail, complete);
  },
  RemoveAllCarts({ commit }, { isAuthorize = false, success, fail, complete }) {

    if (!isAuthorize) {
      commit("REMOVE_ALL_CARTS");
      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }

    deleteAllCarts(
      res => {

        if (res.code !== 0) {
          return;
        }

        if (success) {
          success();
        }

        commit("REMOVE_ALL_CARTS");

      }, fail, complete);
  },
  UpdateCartQuantityMinus({ commit, state }, { isAuthorize = false, index, success, fail, complete }) {
    const quantity = state.carts[index].quantity - 1;
    if (quantity <= 0) {
      return;
    }

    if (!isAuthorize) {

      commit("UPDATE_CART_QUANTITY", { index, quantity });

      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }

    updateCartQuantity({
      product_id: state.carts[index].product.id,
      sku_id: state.carts[index].sku.id,
      quantity: quantity
    }, res => {

      if (res.code !== 0) {
        return;
      }

      if (success) {
        success();
      }

      commit("UPDATE_CART_QUANTITY", { index, quantity });

    }, fail, complete);
  },
  UpdateCartQuantityPlus({ commit, state }, { isAuthorize = false, index, success, fail, complete }) {
    const quantity = state.carts[index].quantity + 1;
    if (quantity > state.carts[index].sku.stock) {
      return;
    }

    if (!isAuthorize) {

      commit("UPDATE_CART_QUANTITY", { index, quantity });

      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }
    updateCartQuantity({
      product_id: state.carts[index].product.id,
      sku_id: state.carts[index].sku.id,
      quantity: quantity
    }, res => {

      if (res.code !== 0) {
        return;
      }

      if (success) {
        success();
      }

      commit("UPDATE_CART_QUANTITY", { index, quantity });

    }, fail, complete);
  },
  UpdateCartQuantity({ commit, state }, { isAuthorize = false, index, quantity, success, fail, complete }) {

    quantity++;
    quantity--;

    if (!isAuthorize) {

      commit("UPDATE_CART_QUANTITY", { index, quantity });

      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }
    updateCartQuantity({
      product_id: state.carts[index].product.id,
      sku_id: state.carts[index].sku.id,
      quantity: quantity
    }, res => {

      if (res.code !== 0) {
        return;
      }

      if (success) {
        success();
      }

      commit("UPDATE_CART_QUANTITY", { index, quantity });

    }, fail, complete);
  }
};

// mutations
const mutations = {
  ADD_CART(state, cart) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].sku.id === cart.sku.id) {
        cart.quantity += state.carts[i].quantity;
        if (state.carts[i].sku.stock <= cart.quantity) {
          cart.quantity = state.carts[i].sku.stock;
        }
        state.carts[i] = cart;
        setCartsStorageSync(state.carts);
        return;
      }
    }
    state.carts.push(cart);
    setCartsStorageSync(state.carts);
  },
  ADD_CARTS(state, carts) {
    state.carts = carts;
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
  REMOVE_CART_BY_INDEXS(state, indexs) {
    forEachValue(indexs, (index, i) => {
      state.carts.splice(index, 1);
    });
    setCartsStorageSync(state.carts);
  },
  REMOVE_ALL_CARTS(state) {
    state.carts = [];
    setCartsStorageSync(state.carts);
  },
  UPDATE_CART(state, cart) {
    for (let i = 0; i < state.carts.length; i++) {
      if (state.carts[i].sku.id === cart.sku.id) {
        cart.quantity += state.carts[i].quantity;
        if (state.carts[i].sku.stock <= cart.quantity) {
          cart.quantity = state.carts[i].sku.stock;
        }
        state.carts[i] = cart;
        setCartsStorageSync(state.carts);
        return;
      }
    }
  },
  UPDATE_CART_QUANTITY(state, { index, quantity }) {
    state.carts[index].quantity = quantity;
    if (state.carts[index].sku.stock <= quantity) {
      state.carts[index].quantity = state.carts[index].sku.stock;
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
