import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // 在跨域请求时发送cookies
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      // 每次请求都携带token
      // 例如，自定义X-Token请求头
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // 打印错误信息到控制台，便于调试
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // 如果code不等于20000, 则认为请求失败
    if (res.code !== 20000) {
      Message({
        message: res.message || '错误',
        type: 'error',
        duration: 5 * 1000
      })

      // 可以自定义响应码，例如， 50008: 非法token; 50012: 其它客户端登录; 50014: token失效
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 重新登录
        MessageBox.confirm('登录失效，是否重新登录', '是否登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return Promise.reject(new Error(res.message || '错误'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error)
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
