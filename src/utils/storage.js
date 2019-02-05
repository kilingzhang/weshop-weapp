export function getStorageSync(key) {
  return wx.getStorageSync(key);
}

export function getStorage(
  key,
  success,
  fail = () => {
  },
  complete = () => {
  }
) {
  return wx.getStorage({
    key: key,
    success: function(res) {
      success(res);
    },
    fail: function(res) {
      fail(res);
    },
    complete: function(res) {
      complete(res);
    }
  });
}

export function setStorageSync(key, value) {
  return wx.setStorageSync(key, value);
}

export function clearStorage() {
  return wx.clearStorage(key);
}

export function clearStorageSync() {
  return wx.clearStorageSync();
}

export function getTokenStorageSync() {
  return getStorageSync("token");
}

export function setTokenStorageSync(token) {
  return setStorageSync("token", token);
}

export function isAuthorizenStorageSync() {
  return getStorageSync("isAuthorize") === true;
}

export function setIsAuthorizeStorageSync(isAuthorize) {
  return setStorageSync("isAuthorize", isAuthorize);
}

export function getUserInfoStorageSync() {
  return getStorageSync("userinfo");
}

export function getUserInfoStorage(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  return getStorage("userinfo", success, fail, complete);
}

export function setUserInfoStorageSync(userinfo) {
  return wx.setStorageSync("userinfo", userinfo);
}

export function setHomePushStorageSync(homePush) {
  return setStorageSync("HomePushSet", homePush);
}

export function getHomePushStorage(
  success,
  fail = () => {
  },
  complete = () => {
  }) {
  return getStorage("HomePushSet", success, fail, complete);
}

export function setProductCategoriesStorageSync(productCategories) {
  return setStorageSync("productCategories", productCategories);
}

export function getProductCategoriesStorage(
  success,
  fail = () => {
  },
  complete = () => {
  }
) {
  return getStorage("productCategories", success, fail, complete);
}


export function setProductsStorageSync(products) {
  return setStorageSync("products", products);
}

export function getProductsStorage(
  success,
  fail = () => {
  },
  complete = () => {
  }
) {
  return getStorage("products", success, fail, complete);
}

export function clearProductsStorageSync() {
  return setProductsStorageSync([]);
}

export function setPinterestStorageSync(pinterest) {
  return setStorageSync("pinterest", pinterest);
}

export function getPinterestStorage(
  success,
  fail = () => {
  },
  complete = () => {
  }
) {
  return getStorage("pinterest", success, fail, complete);
}

export function clearPinterestStorageSync() {
  return setPinterestStorageSync([]);
}

export function setBannersStorageSync(banners) {
  return setStorageSync("banners", banners);
}

export function getBannersStorage(
  success,
  fail = () => {
  },
  complete = () => {
  }
) {
  return getStorage("banners", success, fail, complete);
}

export function getBannersStorageSync() {
  return getStorageSync("banners");;
}


export function clearCartsStorageSync() {
  return setCartsStorageSync([]);
}

export function setCartsStorageSync(carts) {
  return setStorageSync("carts", carts);
}

export function getCartsStorage(
  success,
  fail = () => {
  },
  complete = () => {
  }
) {
  return getStorage("carts", success, fail, complete);
}

export function getCartsStorageSync() {
  return getStorageSync("carts");
}

export function setAddressesStorageSync(addresses) {
  return setStorageSync("addresses", addresses);
}

export function getAddressesStorageSync() {
  return getStorageSync("addresses");
}
