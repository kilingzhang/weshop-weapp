import { getToken } from "@api/user";
import {
  getAddresses,
  addAddress,
  setDefaultAddress
} from "@api/address";
import {
  setTokenStorageSync,
  setIsAuthorizeStorageSync,
  setUserInfoStorageSync,
  getAddressesStorageSync,
  setAddressesStorageSync
} from "@utils/storage";

const state = {
  token: "",
  isAuthorize: false,
  info: {},
  addresses: [],
  address: null
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
  },
  GetAddresses({ commit }) {
    const addresses = getAddressesStorageSync();
    commit("UPDATE_ADDRESSES", addresses);
    const address = addresses.length === 0 ? null : addresses;
    commit("UPDATE_ADDRESS", address);
  },
  UpdateAddresses({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    getAddresses(res => {

      if (res.code !== 0) {
        return;
      }

      const addresses = res.result;

      if (success) {
        success(addresses);
      }

      commit("UPDATE_ADDRESSES", addresses);
      const address = addresses.length === 0 ? null : addresses[0];
      commit("UPDATE_ADDRESS", address);
      setAddressesStorageSync(addresses);

    }, res => {

      if (fail) {
        fail(res);
      }

      const addresses = [];

      commit("UPDATE_ADDRESSES", addresses);
      const address = addresses.length === 0 ? null : addresses[0];
      commit("UPDATE_ADDRESS", address);
      setAddressesStorageSync(addresses);

    }, res => {

      if (complete) {
        complete(res);
      }

    });
  },
  AddAddress({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    var address = payload["address"];

    addAddress(
      address,
      res => {

        if (success) {
          success();
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
  SetDefaultAddress({ commit }, payload = {}) {
    var success = payload["success"];
    var fail = payload["fail"];
    var complete = payload["complete"];

    var addressId = payload["addressId"];

    setDefaultAddress(
      addressId,
      res => {

        if (success) {
          success();
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
  },
  UPDATE_ADDRESSES(state, addresses) {
    state.addresses = addresses;
  },
  UPDATE_ADDRESS(state, address) {
    state.address = address;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};
