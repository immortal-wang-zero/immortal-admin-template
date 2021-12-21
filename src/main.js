import Vue from 'vue'

import App from './App'
import store from './store' // 状态管理
import router from './router' // 路由

import 'normalize.css/normalize.css' // 标准化CSS文件，可以让不同的浏览器在渲染网页元素的时候形式更统一

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // 全局样式

import '@/icons' // 图标
import '@/permission' // 权限控制

/**
 * 如果您不想使用mock-server，想使用MockJS作为mock api，您可以使用mockXHR()函数
 * 当前的MockJS将被用在生产环境中，请在项目上线时移除它
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
