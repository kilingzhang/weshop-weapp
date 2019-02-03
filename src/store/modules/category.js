import { getParentCategories } from "@api/category";
import {
  getProductCategoriesStorage,
  setProductCategoriesStorageSync
} from "@utils/storage";

const state = {
  productCategories: []
};

// getters
const getters = {};

// actions
const actions = {
  UpdateProductCategories({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];
    getParentCategories(res => {

      if (res.code !== 0) {
        //TODO
        return;
      }

      const productCategories = res.result.data;

      commit("UPDATE_PRODUCT_CATEGORIES", productCategories);

      if (success) {
        success(productCategories);
      }

      setProductCategoriesStorageSync(productCategories);
    }, res => {
      if (fail) {
        fail(res);
      }
    }, res => {
      if (complete) {
        complete(res);
      }
    });
  },
  GetProductCategories({ commit }) {
    getProductCategoriesStorage(
      (res) => {
        // success
        commit("UPDATE_PRODUCT_CATEGORIES", res.data);

      },
      () => {
        // fail
        commit("UPDATE_PRODUCT_CATEGORIES", []);
      }
    );
  }
};

// mutations
const mutations = {
  UPDATE_PRODUCT_CATEGORIES(state, productCategories) {
    state.productCategories = productCategories;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
