import { request } from "@utils";

export function getCategories(
  parentId,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/product/categories?parent_id=" + parentId,
    method: "get",
    data: {
      page: 1,
      limit: 1000000
    },
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

export function getParentCategories(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  return getCategories(0, success, fail, complete);
}


