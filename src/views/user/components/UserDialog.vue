<template>
  <el-dialog
    width="38%"
    :title="getTitle"
    :visible.sync="isShow"
    :before-close="sendClose"
    :close-on-click-modal="false"
    @open="handleOpen"
    @closed="handleClosed"
  >
    <div
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-form ref="userFormRef" :model="userForm" label-width="80px" :disabled="isReadOnly">
        <el-row v-if="isEdit || isReadOnly" :gutter="6">
          <el-col :span="12">
            <el-form-item label="用户编号">
              <el-input v-model="userForm.userId" type="text" disabled />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户账号">
              <el-input v-model="userForm.userName" type="text" placeholder="请输入用户账号" disabled />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="12">
            <el-form-item label="用户姓名">
              <el-input v-model="userForm.realName" type="text" placeholder="请输入用户姓名" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户邮箱">
              <el-input v-model="userForm.userEmail" type="text" placeholder="请输入用户邮箱" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="12">
            <el-form-item label="用户电话">
              <el-input v-model="userForm.userPhone" type="text" placeholder="请输入用户电话" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-switch
                v-model="userForm.userSex"
                inactive-text="男"
                active-text="女"
                :inactive-value="1"
                :active-value="0"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="16">
            <el-form-item label="用户密码">
              <el-input v-model="userForm.userPassword" type="text" placeholder="请输入用户密码" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="6">
          <el-col :span="12">
            <el-form-item label="用户角色">
              <el-select v-model="userForm.userRole" placeholder="请选择用户角色">
                <el-option :value="0" label="管理员" />
                <el-option :value="1" label="普通员工" />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="userForm.userStatus">
                <el-radio :label="0">正常</el-radio>
                <el-radio :label="1">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="备注">
          <el-input v-model="userForm.remark" type="textarea" placeholder="请输入备注" />
        </el-form-item>
        <el-form-item v-if="!isReadOnly">
          <el-button type="primary" @click="handleSubmit">立即提交</el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { addUser, getUserById, updateUserById } from '@/api/user'

export default {
  name: 'UserDialog',
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    isReadOnly: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    },
    id: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // 用户表单初始值
      defaultUserForm: {
        userId: '',
        userName: '',
        realName: '',
        userEmail: '',
        userPhone: '',
        userSex: 0,
        userPassword: '',
        userRole: 1,
        userStatus: 0,
        remark: ''
      },
      // 用户表单
      userForm: {
        userId: '',
        userName: '',
        realName: '',
        userEmail: '',
        userPhone: '',
        userSex: 0,
        userPassword: '',
        userRole: 1,
        userStatus: 0,
        remark: ''
      },
      // 是否加载中
      loading: false
    }
  },
  computed: {
    getTitle() {
      if (this.isReadOnly) {
        return '查看用户信息'
      }
      if (this.isEdit) {
        return '编辑用户信息'
      }
      return '添加用户信息'
    }
  },

  methods: {
    handleOpen() {
      if (this.isEdit || this.isReadOnly) {
        this.getUserInfo()
      }
    },

    handleClosed() {
      // 手动重置表单 使用resetFields()方法容易出错
      this.userForm = this.defaultUserForm
    },

    getUserInfo() {
      this.loading = true
      const params = {
        id: this.id
      }
      // 根据用户编号获取用户信息
      getUserById(params).then(res => {
        const user = res.data
        // 移除时间相关属性
        delete user.createTime
        delete user.updateTime
        // 表单重新回显
        this.userForm = user
      }).finally(_ => {
        this.loading = false
      })
    },

    handleSubmit() {
      if (this.isEdit) {
        updateUserById(this.userForm)
          .then(_ => {
            this.$message({
              message: '更新成功',
              type: 'success'
            })
          })
          .finally(_ => {
            this.sendClose()
          })
      } else {
        addUser(this.userForm)
          .then(_ => {
            this.$message({
              message: '添加成功',
              type: 'success'
            })
          })
          .finally(_ => {
            this.sendClose()
          })
      }
    },

    handleCancel() {
      this.sendClose()
    },

    // 关闭弹窗
    sendClose() {
      this.$emit('close-dialog')
    }
  }
}
</script>

<style scoped>
/* 重写表单样式 */
.el-form {
  width: 90%;
  margin: 0 auto;
}
</style>
