<style lang="less">
@import './menu.less';
</style>

<template>
  <div :style="{background: bgColor}" class="ivu-shrinkable-menu">
    <slot name="top"></slot>
    <SidebarMenu v-show="!shrink" :menu-theme="theme" :menu-list="menuList" :open-names="openNames" @on-change="handleChange" />
    <SidebarMenuShrink v-show="shrink" :menu-theme="theme" :menu-list="menuList" :icon-color="shrinkIconColor" @on-change="handleChange" />
  </div>
</template>

<script>
import SidebarMenu from './SidebarMenu.vue'
import SidebarMenuShrink from './SidebarMenuShrink.vue'
import util from '@/libs/util'
export default {
  name: 'shrinkableMenu',
  components: {
    SidebarMenu,
    SidebarMenuShrink
  },
  props: {
    shrink: {
      type: Boolean,
      default: false
    },
    menuList: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      default: 'dark',
      validator(val) {
        return util.oneOf(val, ['dark', 'light'])
      }
    },
    beforePush: {
      type: Function
    },
    openNames: {
      type: Array
    }
  },
  computed: {
    bgColor() {
      return this.theme === 'dark' ? '#001529' : '#fff'
    },
    shrinkIconColor() {
      return this.theme === 'dark' ? '#fff' : '#001529'
    }
  },
  methods: {
    handleChange(name) {
      let willpush = true
      if (this.beforePush !== undefined) {
        if (!this.beforePush(name)) {
          willpush = false
        }
      }
      if (willpush) {
        this.$router.push({
          name: name
        })
      }
      this.$emit('on-change', name)
    }
  }
}
</script>
