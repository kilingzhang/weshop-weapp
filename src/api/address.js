import { request } from "@utils";

export function addAddress(
  data,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/addresses",
    method: "post",
    data: data,
    success: (res) => {
      success(res);
    },
    fail: (res) => {
      fail(res);
    },
    complete: (res) => {
      complete(res);
    }
  });
}

export function getAddresses(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  urequest({
    uri: "/account/addresses",
    method: "get",
    data: {},
    success: (res) => {
      success(res);
    },
    fail: (res) => {
      fail(res);
    },
    complete: (res) => {
      complete(res);
    }
  });
}

export function setDefaultAddress(
  id,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/addresses/" + id + "/default",
    method: "put",
    data: {},
    success: (res) => {
      success(res);
    },
    fail: (res) => {
      fail(res);
    },
    complete: (res) => {
      complete(res);
    }
  });
}

