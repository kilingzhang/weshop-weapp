import { request } from "@utils";

export function getHomePush(
  success,
  fail = () => {},
  complete = () => {}) {
  request({
    uri: "/marketing/push/home",
    method: "get",
    data: {},
    success: (res) => {
      /**
       * {
       *     "text": "We零店今日特惠，全场1折起！全场1折起！全场1折起！快来抢购吧~",
       *     "icon": "/static/imgs/default_avatar.png",
       *     "link": "/pages/details/main?commodity_id=23333",
       * }
       */
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


