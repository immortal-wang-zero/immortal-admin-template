import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 进度条样式
import { getToken } from '@/utils/auth' // 从cookie获取token
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // 配置进度条

const whiteList = ['/login'] // 不需要重定向的白名单

router.beforeEach(async(to, from, next) => {
  // 开启进度条
  NProgress.start()

  // 设置页签标题
  document.title = getPageTitle(to.meta.title)

  // 判断用户是否登录
  const hasToken = getToken()

  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录则重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        next()
      } else {
        try {
          // 获取用户信息
          await store.dispatch('user/getInfo')

          next()
        } catch (error) {
          // 移除token并且，重定向到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在重定向白名单里，继续下一步操作
      next()
    } else {
      // 其它情况均重定向到登录页面
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // 关闭进度条
  NProgress.done()
})
