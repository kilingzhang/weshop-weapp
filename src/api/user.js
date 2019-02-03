import { request } from "@utils";
import Toast from "@vant/toast/toast";

export function getToken(
  code,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/login",
    method: "post",
    data: {
      code: code
    },
    success(res) {
      success(res);
    },
    fail(res) {
      fail(res);
    },
    complete(res) {
      complete(res);
    }
  });
}

export function checkToken(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/checksession",
    method: "get",
    data: {},
    success(res) {
      success(res);
    },
    fail(res) {
      fail(res);
    },
    complete(res) {
      complete(res);
    }
  });
}

export function login(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  wx.login({
    success(res) {
      if (res.code) {
        // 发起网络请求
        success(res.code);
      } else {
        Toast.fail("登陆失败：" + res.errMsg);
        login(success, fail, complete);
      }
    },
    fail(res) {
      login(success, fail, complete);
    },
    complete(res) {
      complete(res);
    }
  });
}


export function authorize(
  token,
  iv,
  encryptedData,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  console.log("token:", iv, "       ", encryptedData);
  request({
    uri: "/account/authorize",
    method: "post",
    data: {
      token: token,
      iv: iv,
      encryptedData: encryptedData
    },
    success(res) {
      success(res);
    },
    fail(res) {
      fail(res);
    },
    complete(res) {
      complete(res);
    }
  });
}
