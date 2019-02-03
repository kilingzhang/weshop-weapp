import { getBanners } from "@api/advertise";
import {
  setBannersStorageSync,
  getBannersStorageSync
} from "@utils/storage";


const state = {
  banners: []
};

// getters
const getters = {};

// actions
const actions = {
  UpdateBanners({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];
    getBanners(res => {

      const banners = res.result;
      commit("UPDATE_BANNERS", banners);
      if (success) {
        success();
      }
      setBannersStorageSync(banners);
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
  GetBanners({ commit }) {
    let banners = getBannersStorageSync();
    commit("UPDATE_BANNERS", banners);
  }
};

// mutations
const mutations = {
  UPDATE_BANNERS(state, banners) {
    state.banners = banners;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
