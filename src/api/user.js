import { request } from "@utils";
import { toast } from "@utils/wx";

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
        toast("fail", "登陆失败：" + res.errMsg);
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
  console.log("authorize:token:", iv, "       ", encryptedData);
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


export function bindPhone(
  iv,
  encryptedData,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  console.log("bindphone:", iv, "       ", encryptedData);
  request({
    uri: "/account/phone",
    method: "put",
    data: {
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
