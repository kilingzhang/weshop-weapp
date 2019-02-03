import Vue from 'vue'
import App from './index'

Vue.config.productionTip = false

const app = new Vue(App)

app.$mount()

export default {
    config: {
        window: {
            enablePullDownRefresh: true
        }
    }
}