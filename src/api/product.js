import { request } from "@utils";

export function getProducts(
  params,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  const categoryId = params["categoryId"];
  const page = params["page"] === undefined ? 1 : params["page"];
  const limit = params["limit"] === undefined ? 8 : params["limit"];

  const categoryUri = categoryId === 0 ? "" : ("?category_id=" + categoryId);
  request({
    uri: "/products" + categoryUri,
    method: "get",
    data: {
      page: page,
      limit: limit
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


export function getAllProducts(
  params,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  return getProducts(params, success, fail, complete);
}

export function getProductsByCategoryId(
  params,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  return getProducts(params, success, fail, complete);
}

export function getQuickProduct(
  params,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  const productId = params["productId"];
  request({
    uri: "/products/" + productId + "/quick",
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

export function getPinterest(
  params,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/product/pinterest",
    method: "get",
    data: {
      page: params["page"] === undefined ? 1 : params["page"],
      limit: params["limit"] === undefined ? 10 : params["limit"]
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

export function getProductById(
  productId,
  success,
  fail = () => {
  },
  complete = () => {
  }) {

  request({
    uri: "/products/" + productId,
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
