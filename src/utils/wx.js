export function toast(type = "success", message = "success", duration = 500) {
  const options = {
    duration: duration,       // 持续展示 toast
    mask: true, // 禁用背景点击
    title: message,
    icon: type
  };

  switch (type) {
    case "success":
      wx.showLoading(options);
      break;
    case "fail":
      wx.showLoading(options);
      break;
    case "loading":
      wx.showLoading({
        title: message,
        mask: true
      });
      break;
  }

}

export function clearToast() {
  wx.hideLoading();
}
