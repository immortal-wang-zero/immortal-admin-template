export default {
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  mounted() {
    // 修复在ios设备上点击设备触发mouseleave事件的问题
    // 详情，https://github.com/PanJiaChen/vue-element-admin/issues/1135
    this.fixBugIniOS()
  },
  methods: {
    fixBugIniOS() {
      const $subMenu = this.$refs.subMenu
      if ($subMenu) {
        const handleMouseleave = $subMenu.handleMouseleave
        $subMenu.handleMouseleave = e => {
          if (this.device === 'mobile') {
            return
          }
          handleMouseleave(e)
        }
      }
    }
  }
}
