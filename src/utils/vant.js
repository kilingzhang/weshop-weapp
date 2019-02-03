import Toast from "@vant/toast/toast";

export function toast(type = "success", message = "success", duration = 500, selector = "#van-toast") {
  const options = {
    duration: duration,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击
    message: message,
    loadingType: "spinner",
    selector: selector
  };

  switch (type) {
    case "success":
      Toast.success(options);
      break;
    case "fail":
      Toast.fail(options);
      break;
    case "loading":
      Toast.loading(options);
      break;
  }

}

export function clearToast() {
  Toast.clear();
}
