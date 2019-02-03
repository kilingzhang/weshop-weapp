import {
  getProductsByCategoryId,
  getQuickProduct,
  getPinterest
} from "@api/product";
import {
  setProductsStorageSync,
  getProductsStorage,
  clearProductsStorageSync,
  setPinterestStorageSync,
  getPinterestStorage,
  clearPinterestStorageSync
} from "@utils/storage";
import Toast from "@vant/toast/toast";

const state = {
  products: [],
  productsResult: null,
  quickProduct: null,
  pinterest: [],
  pinterestResult: null
};

// getters
const getters = {};

// actions
const actions = {
  UpdateProducts({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    getProductsByCategoryId(
      payload,
      res => {

        if (res.code !== 0) {
          //TODO
          return;
        }

        const products = res.result.data;
        const productsResult = res.result;
        commit("UPDATE_PRODUCTS", products);
        commit("UPDATE_PRODUCTS_RESULT", productsResult);

        if (success) {
          success(products);
        }

        setProductsStorageSync(products);
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
  MoreProducts({ commit, state }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    payload["page"] = state.productsResult.current_page + 1;
    payload["limit"] = state.productsResult.per_page;

    if (state.productsResult.last_page < payload["page"]) {
      Toast.success("我是有底线滴～");
      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }

    getProductsByCategoryId(
      payload,
      res => {

        if (res.code !== 0) {
          //TODO
          return;
        }

        const products = state.products.concat(res.result.data);
        const productsResult = res.result;
        commit("UPDATE_PRODUCTS", products);
        commit("UPDATE_PRODUCTS_RESULT", productsResult);

        if (success) {
          success(products);
        }

        setProductsStorageSync(products);
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
  ClearProducts({ commit }) {
    commit("UPDATE_PRODUCTS", []);
    commit("UPDATE_PRODUCTS_RESULT", null);
    clearProductsStorageSync();
  },
  GetQuickProduct({ commit }, payload) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];
    getQuickProduct(
      payload,
      res => {

        if (res.code !== 0) {
          //TODO
          return;
        }

        const quickProduct = res.result;
        commit("UPDATE_QUICK_PRODUCT", quickProduct);

        if (success) {
          success(quickProduct);
        }

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
  GetPinterest({ commit }) {
    return getPinterestStorage(
      (res) => {
        // success
        commit("UPDATE_PINTEREST", res.data);
      },
      (res) => {
        // fail
        commit("UPDATE_PINTEREST", null);
      }
    );
  },
  UpdatePinterest({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    getPinterest(
      payload,
      res => {

        if (res.code !== 0) {
          //TODO
          return;
        }

        const pinterest = res.result.data;
        const pinterestResult = res.result;
        commit("UPDATE_PINTEREST", pinterest);
        commit("UPDATE_PINTEREST_RESULT", pinterestResult);

        if (success) {
          success(pinterest);
        }

        setPinterestStorageSync(pinterest);
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
  MorePinterest({ commit, state }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    if (state.pinterestResult === null) {
      console.log("pinterestResult === null");
      if (complete) {
        complete();
      }
      return;
    }

    payload["page"] = state.pinterestResult.current_page + 1;
    payload["limit"] = state.pinterestResult.per_page;

    if (state.pinterestResult.last_page < payload["page"]) {
      Toast.success("我是有底线滴～");
      if (success) {
        success();
      }
      if (complete) {
        complete();
      }
      return;
    }

    getPinterest(
      payload,
      res => {

        if (res.code !== 0) {
          //TODO
          return;
        }

        const pinterest = state.pinterest.concat(res.result.data);
        const pinterestResult = res.result;
        commit("UPDATE_PINTEREST", pinterest);
        commit("UPDATE_PINTEREST_RESULT", pinterestResult);

        if (success) {
          success(pinterest);
        }

        setPinterestStorageSync(pinterest);
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
  ClearPinterest({ commit }) {
    commit("UPDATE_PINTEREST", []);
    commit("UPDATE_PINTEREST_RESULT", null);
    clearPinterestStorageSync();
  }
};

// mutations
const mutations = {
  UPDATE_PRODUCTS(state, products) {
    state.products = products;
  },
  UPDATE_PRODUCTS_RESULT(state, productsResult) {
    state.productsResult = productsResult;
  },
  UPDATE_PINTEREST(state, pinterest) {
    state.pinterest = pinterest;
  },
  UPDATE_PINTEREST_RESULT(state, pinterestResult) {
    state.pinterestResult = pinterestResult;
  },
  UPDATE_QUICK_PRODUCT(state, quickProduct) {
    state.quickProduct = quickProduct;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
