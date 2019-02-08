import { request } from "@utils";

export function addCarts(
  carts,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/shoppingCarts",
    method: "post",
    data: carts,
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

export function syncCarts(
  carts,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/shoppingCarts/sync",
    method: "post",
    data: carts,
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

export function deleteCarts(
  carts,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/shoppingCarts",
    method: "delete",
    data: carts,
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

export function deleteAllCarts(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/shoppingCarts/all",
    method: "delete",
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

export function updateCartQuantity(
  cart,
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/shoppingCart/quantity",
    method: "put",
    data: cart,
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

export function getCarts(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  request({
    uri: "/account/shoppingCarts",
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
