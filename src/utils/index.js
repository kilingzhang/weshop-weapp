import { requestConfigMap } from "@config";
import { getTokenStorageSync } from "@utils/storage";

import Toast from "@vant/toast/toast";

/**
 * @type {{fail: fail, methods: string, success: success, params: {}, uri: string}}
 * @param payload
 */
export function request(payload) {
  var headers = {
    Authorization: "Bearer " + getTokenStorageSync()
  };
  if (payload["headers"]) {
    headers = headers.concat(payload["headers"]);
  }
  wx.request({
    url: requestConfigMap.host + payload["uri"],
    method: payload["method"],
    header: headers,
    data: payload["data"],
    success(res) {
      /**
       * {data: {…}, header: {…}, statusCode: 200, errMsg: "request:ok"}
       */
      if (res.statusCode === 200 || res.statusCode === 201) {

        if (res.data.code === 404) {

          Toast.fail("资源不存在");

        } else if (res.data.code === 400) {
          // 参数不合法
          Toast.fail(res.data.message);

        } else {

          if (payload["success"]) {
            payload["success"](res.data);
          }

        }

        if (payload["complete"]) {
          payload["complete"](res);
        }
      } else {

        if (payload["fail"]) {
          payload["fail"](res);
        }

        if (payload["complete"]) {
          payload["complete"](res);
        }

        //TODO 方便调试
        Toast.fail("statusCode:" + res.statusCode);
      }
    },
    fail(res) {
      requestFail(res);
    }
  });
}

export function requestFail(res) {
  redirect("/pages/error/main?codeStatus=500");
}

export function redirect(uri, openType = "navigateTo") {

  if (uri === "" || uri === undefined || uri === null) {
    return false;
  }

  if (uri.startsWith("http://") || uri.startsWith("https://")) {
    //TODO
    return false;
  }

  switch (openType) {
    case "navigateTo":
      wx.navigateTo({
        url: uri
      });
      break;
    case "redirectTo":
      wx.redirectTo({
        url: uri
      });
      break;
    case "switchTab":
      wx.switchTab({
        url: uri
      });
      break;
    case "navigateBack":
      wx.navigateBack({
        url: uri
      });
      break;
    case "webTo":
      return false;
    default:
      return false;
  }
}

/**
 * Get the first item that pass the test
 * by second argument function
 *
 * @param {Array} list
 * @param {Function} f
 * @return {*}
 */
export function find(list, f) {
  return list.filter(f)[0];
}

/**
 * Deep copy the given object considering circular structure.
 * This function caches all nested objects and its copies.
 * If it detects circular structure, use cached copy to avoid infinite loop.
 *
 * @param {*} obj
 * @param {Array<Object>} cache
 * @return {*}
 */
export function deepCopy(obj, cache = []) {
  // just return if obj is immutable value
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // if obj is hit, it is in circular structure
  const hit = find(cache, c => c.original === obj);
  if (hit) {
    return hit.copy;
  }

  const copy = Array.isArray(obj) ? [] : {};
  // put the copy into cache at first
  // because we want to refer it in recursive deepCopy
  cache.push({
    original: obj,
    copy
  });

  Object.keys(obj).forEach(key => {
    copy[key] = deepCopy(obj[key], cache);
  });

  return copy;
}

/**
 * forEach for object
 */
export function forEachValue(obj, fn) {
  Object.keys(obj).forEach(key => fn(obj[key], key));
}

export function isObject(obj) {
  return obj !== null && typeof obj === "object";
}

export function isPromise(val) {
  return val && typeof val.then === "function";
}

export function assert(condition, msg) {
  if (!condition) throw new Error(`[vuex] ${msg}`);
}
