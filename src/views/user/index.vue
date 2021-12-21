<template>
  <div class="root">
    <el-card class="search-card">
      <el-form ref="searchFormRef" :model="queryParams" label-width="80" inline>
        <el-form-item label="用户姓名" prop="realName">
          <el-input v-model="queryParams.realName" type="text" placeholder="请输入用户姓名" />
        </el-form-item>
        <el-form-item label="用户性别" prop="userSex">
          <el-select v-model="queryParams.userSex" placeholder="请选择性别">
            <el-option :value="0" label="女" />
            <el-option :value="1" label="男" />
          </el-select>
        </el-form-item>
        <el-form-item label="用户角色" prop="userRole">
          <el-select v-model="queryParams.userRole" placeholder="请选择用户角色">
            <el-option :value="0" label="管理员" />
            <el-option :value="1" label="普通员工" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          <el-button type="normal" icon="el-icon-refresh-left" @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card class="table-card">
      <div class="tool-bar">
        <el-button type="success" icon="el-icon-plus" plain size="small" @click="handleAdd">添加</el-button>
        <el-button type="warning" icon="el-icon-edit" plain size="small" :disabled="isEditDisabled" @click="handleEdit">
          编辑
        </el-button>
        <el-button type="danger" icon="el-icon-delete" plain size="small" :disabled="isDelDisabled" @click="handleDel">
          删除
        </el-button>
        <el-button icon="el-icon-refresh-left" plain size="small" @click="handleRefresh">刷新</el-button>
      </div>

      <el-table
        v-loading="loading"
        :data="tableData"
        border
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        max-height="550px"
        highlight-current-row
        @selection-change="handleSelectionChanged"
      >
        <el-table-column type="selection" width="50" align="center" fixed="left" />
        <el-table-column label="用户编号" width="100" prop="userId" align="center" />
        <el-table-column label="用户账号" width="120" prop="userName" align="center" />
        <el-table-column label="用户姓名" width="100" prop="realName" align="center" />
        <el-table-column label="用户邮箱" width="150" prop="userEmail" align="center" />
        <el-table-column label="用户电话" width="150" prop="userPhone" align="center" />
        <el-table-column label="用户性别" width="100" prop="userSex" align="center">
          <template slot-scope="scoped">
            <el-tag :type="scoped.row.userSex === 0 ? 'success' : ''">
              {{ scoped.row.userSex === 0 ? '女' : '男' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户密码" width="100" prop="userPassword" align="center" />
        <el-table-column label="用户角色" width="100" prop="userRole" align="center">
          <template slot-scope="scoped">
            <el-tag :type="scoped.row.userRole === 0 ? 'danger' : 'warning'">
              {{ scoped.row.userRole === 0 ? '管理员' : '普通员工' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="用户状态" width="150" prop="userStatus" align="center">
          <template slot-scope="scoped">
            <el-switch
              v-model="scoped.row.userStatus"
              inactive-text="禁用"
              active-text="正常"
              :inactive-value="1"
              :active-value="0"
              @change="handleStatusChanged(scoped.row)"
            />
          </template>
        </el-table-column>
        <el-table-column label="创建时间" width="160" prop="createTime" align="center" />
        <el-table-column label="更新时间" width="160" prop="updateTime" align="center" />
        <el-table-column label="备注" prop="remark" align="center" />
        <el-table-column label="操作" align="center" fixed="right" width="230">
          <template slot-scope="scoped">
            <el-button size="mini" @click="handleDisplay(scoped.row)">查看</el-button>
            <el-button type="primary" size="mini" @click="handleEdit(scoped.row)">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDel(scoped.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        layout="sizes, prev, pager, next, total"
        :total="pageConfigParams.total"
        :current-page="queryParams.pageNum"
        :page-size="queryParams.pageSize"
        :page-sizes="pageConfigParams.pageSizes"
        @size-change="handleSizeChanged"
        @current-change="handleCurrentChanged"
      />
      <user-dialog
        :id="id"
        :is-show="isShow"
        :is-edit="isEdit"
        :is-read-only="isReadOnly"
        @close-dialog="handleCloseDialog"
      />
    </el-card>
  </div>
</template>

<script>
import UserDialog from '@/views/user/components/UserDialog'
import { allUser, deleteUserById, batchDelete, updateUserStatusById } from '@/api/user'

export default {
  name: 'UserList',
  components: { UserDialog },
  data() {
    return {
      // 表格数据
      tableData: [],
      // 分页配置参数
      pageConfigParams: {
        total: 0,
        pageSizes: [10, 20, 50, 100]
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        realName: '',
        userSex: '',
        userRole: ''
      },
      // 时否显示弹窗
      isShow: false,
      // 是否是编辑状态
      isEdit: false,
      // 是否只读
      isReadOnly: false,
      // 编号，用于弹窗数据回显
      id: 0,
      // 表格中选中的数据
      selectedRows: [],
      // 是否处于加载状态
      loading: false
    }
  },

  computed: {
    isEditDisabled() {
      return this.selectedRows.length !== 1
    },
    isDelDisabled() {
      return this.selectedRows.length === 0
    }
  },

  mounted() {
    this.getAllUser()
  },

  methods: {
    // 获取用户信息
    getAllUser() {
      this.loading = true
      allUser(this.queryParams)
        .then(res => {
          this.pageConfigParams.total = res.data.total
          this.tableData = res.data.list
        })
        .finally(_ => {
          this.loading = false
        })
    },
    // 按条件搜索
    handleSearch() {
      this.getAllUser()
    },
    // 重置搜索表单
    handleReset() {
      this.$refs['searchFormRef'].resetFields()
      this.getAllUser()
    },
    // 添加用户信息
    handleAdd() {
      this.resetDialog()
      this.isShow = true
    },
    // 更新用户信息
    handleEdit(val) {
      this.resetDialog()
      const isEvent = val instanceof MouseEvent
      // 获取当前选中的用户信息
      const user = isEvent ? this.selectedRows[0] : val
      this.id = user.userId
      this.isEdit = true
      this.isShow = true
    },
    // 查看用户信息
    handleDisplay(row) {
      this.resetDialog()
      this.id = row.userId
      this.isReadOnly = true
      this.isShow = true
    },
    // 删除用户信息
    handleDel(val) {
      const isEvent = val instanceof MouseEvent
      this.$confirm('确认要删除吗', '风险提示', {
        confirmButtonText: '继续',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false
      }).then(_ => {
        if (isEvent) {
          const ids = []
          this.selectedRows.forEach(e => {
            ids.push(e.userId)
          })
          console.log('ids', ids)
          batchDelete(ids).then(_ => {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
            this.getAllUser()
          })
          return
        }
        const id = val.userId
        console.log('id', id)
        deleteUserById({ id: id }).then(_ => {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getAllUser()
        })
      }).catch(_ => {})
    },

    // 手动刷新
    handleRefresh() {
      this.getAllUser()
      this.$message.success('刷新成功')
    },

    // 更新用户状态
    handleStatusChanged(row) {
      const info = row.userStatus === 0 ? '启用' : '停用'
      this.$confirm('确认要' + info + '吗', '风险提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(_ => {
          updateUserStatusById({ id: row.userId, status: row.userStatus }).then(_ => {
            this.$message({
              message: '状态更新成功',
              type: 'success'
            })
            this.getAllUser()
          })
        })
        .catch(_ => {
          row.userStatus = row.userStatus === 0 ? 1 : 0
        })
    },
    // 表格复选框选中数据
    handleSelectionChanged(selections) {
      this.selectedRows = selections
    },
    // 页容量改变
    handleSizeChanged(newSize) {
      this.queryParams.pageSize = newSize
      this.getAllUser()
    },
    // 当前页码改变
    handleCurrentChanged(curPage) {
      this.queryParams.pageNum = curPage
      this.getAllUser()
    },
    // 关闭弹窗
    handleCloseDialog() {
      this.isShow = false
      this.getAllUser()
    },

    resetDialog() {
      this.isReadOnly = false
      this.isEdit = false
      this.id = 0
    }
  }
}
</script>

<style scoped></style>
