import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

/**
 * 获取所有用户信息
 * @param {Obejct} params 条件信息，{xx:xx, xx:xx}
 * @returns Promise请求对象
 */
export function allUser(params) {
  return request({
    url: '/api/user/all',
    method: 'get',
    params
  })
}

export function getUserById(params) {
  return request({
    url: '/api/user/byId',
    method: 'get',
    params
  })
}

/**
 * 添加用户信息
 * @param {Object} data 用户信息，{xx:xx, xx:xx}
 * @returns Promise请求对象
 */
export function addUser(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

/**
 * 更新用户信息
 * @param {Object} data 用户数据，{xx:xx, xx:xx}格式
 * @returns Promise请求对象
 */
export function updateUserById(data) {
  return request({
    url: '/api/user/update',
    method: 'put',
    data
  })
}

/**
 * 根据用户编号更新用户状态
 * @param {Object} params  {id: 用户编号}
 * @returns Promise请求对象
 */
export function updateUserStatusById(params) {
  return request({
    url: '/api/user/updateStatus',
    mehtod: 'put',
    params
  })
}

/**
 * 根据用户编号删除用户
 * @param {Object} params {id:用户编号}
 * @returns Promise请求对象
 */
export function deleteUserById(params) {
  return request({
    url: '/api/user/delete',
    method: 'delete',
    params
  })
}

/**
 * 批量删除用户信息
 * @param {Array} data 用户编号数组，[1,2]
 * @returns Promise请求
 */
export function batchDelete(data) {
  return request({
    url: '/api/user/batchDelete',
    method: 'delete',
    data
  })
}
