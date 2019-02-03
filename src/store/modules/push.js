import { getHomePush } from "@api/push";
import {
  setHomePushStorageSync,
  getHomePushStorage
} from "@utils/storage";

const state = {
  homePushSet: null
};

// getters
const getters = {};

// actions
const actions = {
  UpdateHomePush({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    getHomePush(res => {

      if (res.code !== 0) {
        //TODO
        return;
      }

      const push = res.result;

      commit("UPDATE_TO_HOME_PUSH", push);

      if (success) {
        success(res.result);
      }

      setHomePushStorageSync(push);
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
  GetHomePush({ commit }) {
    getHomePushStorage(
      (res) => {
        // success
        commit("UPDATE_TO_HOME_PUSH", res.data);
      },
      (res) => {
        // fail
        commit("UPDATE_TO_HOME_PUSH", null);
      }
    );
  }
};

// mutations
const mutations = {
  UPDATE_TO_HOME_PUSH(state, toHomePushSet) {
    state.homePushSet = toHomePushSet;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
