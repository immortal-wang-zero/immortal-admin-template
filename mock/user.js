const Mock = require('mockjs')
const { getListByPageParams } = require('./utils')
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}

// 用户数据集合
const data = Mock.mock({
  'items|15': [
    {
      'userId|+1': 1,
      userName: '12563252',
      realName: '张三',
      userEmail: '22@qq.com',
      userPhone: '15117185665',
      'userSex|1': [0, 1],
      userPassword: '123456',
      'userRole|1': [0, 1],
      'userStatus|1': [0, 1],
      createTime: '@datetime',
      updateTime: '2021-12-20 00:00:00',
      remark: '暂无'
    }
  ]
})

module.exports = [
  // 用户登录
  {
    url: '/api/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // 没有token时
      if (!token) {
        return {
          code: 60204,
          message: '用户名或密码错误'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // 获取用户信息
  {
    url: '/api/user/info.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // 没有用户信息时
      if (!info) {
        return {
          code: 50008,
          message: '登录失败，不能获取用户信息'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // 注销登录
  {
    url: '/api/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  // 根据参数获取所有用户数据
  {
    url: '/api/user/all',
    type: 'get',
    response: (req, res) => {
      const pageNum = parseInt(req.query.pageNum)
      const pageSize = parseInt(req.query.pageSize)
      // 内存分页
      const curData = getListByPageParams(pageNum, pageSize, data.items)

      return {
        code: 20000,
        msg: 'query success',
        data: {
          total: data.items.length,
          list: curData
        }
      }
    }
  },

  // 根据用户编号查询用户数据
  {
    url: '/api/user/byId',
    type: 'get',
    response: (req, res) => {
      const id = parseInt(req.query.id)
      const user = data.items.filter(e => e.userId === id)
      const result = user.length === 0 ? null : user[0]
      // 这里只做演示，使用了20000一个状态码，其实可以定义多个
      return {
        code: 20000,
        msg: 'query success',
        data: result
      }
    }
  },

  // 添加用户信息
  {
    url: '/api/user/add',
    type: 'post',
    response: (req, res) => {
      const user = req.body
      const count = data.items.length
      user.userId = count + 1
      user.userName = '12562'
      user.createTime = '2021-12-20 00:00:00'
      user.updateTime = '2021-12-20 00:00:00'
      data.items.push(user)
      return {
        code: 20000,
        msg: 'add success',
        data: null
      }
    }
  },

  // 根据用户编号更新用户信息
  {
    url: '/api/user/update',
    type: 'put',
    response: (req, res) => {
      const user = req.body
      let msg = 'update failure'
      // 根据编号查询并更新用户信息
      for (let i = 0; i < data.items.length; ++i) {
        if (data.items[i].userId === user.userId) {
          data.items[i] = user
          msg = 'update success'
          break
        }
      }
      return {
        code: 20000,
        msg: msg,
        data: null
      }
    }
  },

  // 根据编号更新用户状态
  {
    url: '/api/user/updateStatus',
    method: 'put',
    response: (req, res) => {
      const id = parseInt(req.query.id)
      console.log('id', id)
      let msg = 'update failure'
      for (let i = 0; i < data.items.length; ++i) {
        if (data.items[i].userId === id) {
          const status = data.items[i].userStatus
          const newStatus = status === 1 ? 0 : 1
          data.items[i].userStatus = newStatus
          msg = 'update success'
          break
        }
      }
      return {
        code: 20000,
        msg: msg,
        data: null
      }
    }
  },

  // 根据编号删除用户信息
  {
    url: '/api/user/delete',
    type: 'delete',
    response: (req, res) => {
      const id = parseInt(req.query.id)
      console.log('id', id)
      const index = data.items.findIndex(e => e.userId === id)
      if (index !== -1) {
        data.items.splice(index, 1)
      }
      return {
        code: 20000,
        msg: 'delete success',
        data: null
      }
    }
  },

  // 根据编号集批量删除用户信息
  {
    url: '/api/user/batchDelete',
    type: 'delete',
    response: (req, res) => {
      const ids = req.body
      console.log('ids', ids)
      // 遍历移除元素
      ids.forEach(id => {
        const index = data.items.findIndex(e => e.userId === id)
        if (index !== -1) {
          data.items.splice(index, 1)
        }
      })
      return {
        code: 20000,
        msg: 'add success',
        data: null
      }
    }
  }
]
