import { request } from "@utils";

export function getAdvertises(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/marketing/advertises",
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

export function getBanners(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/marketing/advertise/banners",
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


