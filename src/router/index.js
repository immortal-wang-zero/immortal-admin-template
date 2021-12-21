import Vue from 'vue'
import Router from 'vue-router'
/* 布局组件 */
import Layout from '@/layout'

Vue.use(Router)

// 解决路由版本高带来的问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

/**
 * 只有子菜单数量大于等于1时，子菜单才会显示
 * 详情: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果为true，则不会显示在侧边栏中（默认为false）
 * alwaysShow: true               如果为true，则一直显示根菜单
 *                                如果为false，当菜单有一个或多个菜单项时，会变成嵌套路由，否则不显示根菜单
 * redirect: noRedirect           如果为noRedirect，则在面包屑导航中不可重定向
 * name:'router-name'             此名称会用于路由页面缓存，必须设置
 * meta : {
    roles: ['admin','editor']    控制可访问页面的角色，可以有多个
    title: 'title'               此名称将展示在侧边栏或面包屑中，建议设置
    icon: 'svg-name'/'el-icon-x' 侧边栏显示的图标
    breadcrumb: false            如果为false, 则菜单在面包屑导航中会隐藏
    activeMenu: '/example/list'  如果设置路径, 则侧边栏会高亮匹配的路径
  }
 */

// 静态路由，不需要权限可被访问的
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: '首页', icon: 'dashboard', affix: true }
      }
    ]
  },

  {
    path: '/user',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },

  // 404页面必须放在最后
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // 需要服务的支持
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// 详情: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

export default router
