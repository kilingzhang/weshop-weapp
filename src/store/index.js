import Vue from "vue";
import Vuex from "vuex";

import advertise from "@modules/advertise";
import push from "@modules/push";
import user from "@modules/user";
import category from "@modules/category";
import product from "@modules/product";
import cart from "@modules/cart";
import order from "@modules/order";
import getters from '@store/getters'

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";


Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    advertise,
    push,
    user,
    category,
    product,
    cart,
    order,
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters,
  strict: debug
})
