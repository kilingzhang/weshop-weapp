import { getToken } from "@api/user";
import {
  setTokenStorageSync,
  setIsAuthorizeStorageSync,
  setUserInfoStorageSync
} from "@utils/storage";

const state = {
  token: "",
  isAuthorize: false,
  info: {}
};

// getters
const getters = {};

// actions
const actions = {
  UpdateUserInfo({ commit }, userinfo) {
    commit("UPDATE_USERINFO", userinfo);
    setUserInfoStorageSync(userinfo);
  },
  UpdateAuthorize({ commit }, isAuthorize = true) {
    commit("UPDATE_AUTHORIZE", isAuthorize);
    setIsAuthorizeStorageSync(isAuthorize);
  },
  GetToken({ commit }, code) {
    getToken(code, data => {
      const token = data.result.token;
      commit("UPDATE_TOKEN", token);
      setTokenStorageSync(token);
    });
  },
  UpdateToken({ commit }, token) {
    commit("UPDATE_TOKEN", token);
    setTokenStorageSync(token);
  }
};

// mutations
const mutations = {
  UPDATE_USERINFO(state, userinfo) {
    state.info = userinfo;
  },
  UPDATE_AUTHORIZE(state, isAuthorize) {
    state.isAuthorize = isAuthorize;
  },
  UPDATE_TOKEN(state, token) {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
