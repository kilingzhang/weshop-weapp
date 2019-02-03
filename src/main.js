import Vue from 'vue'
import App from './App'

const app = new Vue(App)

Vue.config.productionTip = false

app.mpType = 'app'

app.$mount()

export default {
    config: {
        pages: [
            '^/pages/home/main',
        ],
        window: {
            backgroundTextStyle: "light",
            navigationBarBackgroundColor: "#fff",
            navigationBarTitleText: "We零店",
            navigationBarTextStyle: "black"
        },
        tabBar: {
            selectedColor: "#b8c734",
            list: [
                {
                    "pagePath": "pages/home/main",
                    "text": "首页",
                    "iconPath": "static/imgs/icon_home.png",
                    "selectedIconPath": "static/imgs/icon_home_pressed.png"
                },
                {
                    "pagePath": "pages/categories/main",
                    "text": "分类",
                    "iconPath": "static/imgs/icon_category.png",
                    "selectedIconPath": "static/imgs/icon_category_pressed.png"
                },
                {
                    "pagePath": "pages/shoppingCart/main",
                    "text": "购物车",
                    "iconPath": "static/imgs/icon_shopping-cart.png",
                    "selectedIconPath": "static/imgs/icon_shopping-cart_pressed.png"
                },
                {
                    "pagePath": "pages/me/main",
                    "text": "我的",
                    "iconPath": "static/imgs/icon_me.png",
                    "selectedIconPath": "static/imgs/icon_me_pressed.png"
                }
            ]
        },
        usingComponents: {
            "van-button": "/static/vant/button/index",
            "van-card": "/static/vant/card/index",
            "van-icon": "/static/vant/icon/index",
            "van-submit-bar": "/static/vant/submit-bar/index",
            "van-goods-action": "/static/vant/goods-action/index",
            "van-goods-action-icon": "/static/vant/goods-action-icon/index",
            "van-goods-action-button": "/static/vant/goods-action-button/index",
            "van-action-sheet": "/static/vant/action-sheet/index",
            "van-stepper": "/static/vant/stepper/index",
            "van-checkbox": "/static/vant/checkbox/index",
            "van-checkbox-group": "/static/vant/checkbox-group/index",
        }
    }
}
