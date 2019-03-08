<template>
  <div class="main" :class="{'main-hide-text': shrink}">
    <!-- 左侧边栏 -->
    <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
      <ShrinkableMenu :shrink="shrink" @on-change="handleSubmenuChange" :theme="menuTheme" :before-push="beforePush" :open-names="openedSubmenuArr" :menu-list="menuList">
        <div slot="top" class="logo-con">
          <img v-show="!shrink" src="@/assets/images/logo.jpg" key="max-logo" />
          <img v-show="shrink" src="@/assets/images/logo-min.jpg" key="min-logo" />
        </div>
      </ShrinkableMenu>
    </div>
    <div class="header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
      <div class="header">
        <div class="navicon-con">
          <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
            <Icon type="md-menu" size="32"></Icon>
          </Button>
        </div>
        <div class="middle-con">
          <div class="breadcrumb">
            <BreadcrumbNav :currentPath="currentPath"></BreadcrumbNav>
          </div>
        </div>
        <div class="avator-con">
          <FullScreen v-model="isFullScreen" @on-change="fullscreenChange"></FullScreen>
          <!-- <lock-screen></lock-screen> -->
          <MessageTip v-model="mesCount"></MessageTip>
          <!-- <theme-switch></theme-switch> -->

          <div class="user-dropdown-menu-con">
            <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
              <Dropdown transfer trigger="click" @on-click="handleClickUserDropdown">
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span>
                  <Icon type="arrow-down-b"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="ownSpace">个人中心</DropdownItem>
                  <DropdownItem name="loginout" divided>退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar :src="avatorPath" style="background: #619fe7margin-left: 10px"></Avatar>
            </Row>
          </div>
        </div>
        <div class="tags-con">
          <TagsPageOpened :pageTagsList="pageTagsList"></TagsPageOpened>
        </div>
      </div>
    </div>
    <div class="container-con" :style="{left: shrink?'60px':'200px'}">
      <div class="single-page">
        <keep-alive :include="cachePage">
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import ShrinkableMenu from './components/shrinkableMenu/ShrinkableMenu.vue'
import BreadcrumbNav from './components/BreadcrumbNav.vue'
import FullScreen from './components/FullScreen.vue'
import MessageTip from './components/MessageTip.vue'
import TagsPageOpened from './components/TagsPageOpened'
import util from '@/libs/util'
export default {
  components: {
    ShrinkableMenu,
    BreadcrumbNav,
    FullScreen,
    MessageTip,
    TagsPageOpened
  },
  data() {
    return {
      shrink: false,
      userName: '',
      isFullScreen: false,
      openedSubmenuArr: this.$store.getters.openedSubmenuArr
    }
  },
  computed: {
    menuList() {
      return this.$store.getters.menuList
    },
    pageTagsList() {
      return this.$store.getters.pageOpenedList // 打开的页面的页面对象
    },
    currentPath() {
      return this.$store.getters.currentPath // 当前面包屑数组
    },
    avatorPath() {
      return sessionStorage.avatorImgPath
    },
    cachePage() {
      // return this.$store.state.app.cachePage
      const list = [...this.pageTagsList.length ? this.pageTagsList.filter(item => !(item.meta && item.meta.notCache)).map(item => item.name) : []]
      return list
    },
    lang() {
      return this.$store.state.app.lang
    },
    menuTheme() {
      return this.$store.state.app.menuTheme
    },
    mesCount() {
      return this.$store.state.app.messageCount
    }
  },
  methods: {
    init() {
      let pathArr = util.setCurrentPath(this, this.$route.name)
      this.$store.commit('SET_MENU_LIST')
      // this.$store.commit('updateMenulist')
      if (pathArr.length >= 2) {
        this.$store.commit('ADD_OPEN_SUBMENU', pathArr[1].name)
      }
      this.userName = sessionStorage.userName
      let messageCount = 3
      this.messageCount = messageCount.toString()
      // this.checkTag(this.$route.name)
      // this.$store.commit('setMessageCount', 3)
    },
    handleSubmenuChange() {},
    beforePush(name) {
      return true
    },
    toggleClick() {
      this.shrink = !this.shrink
    },
    fullscreenChange(isFullScreen) {},
    handleClickUserDropdown(name) {
      if (name === 'ownSpace') {
        util.openNewPage(this, 'ownspace_index')
        this.$router.push({
          name: 'ownspace_index'
        })
      } else if (name === 'loginout') {
        // 退出登录
        this.$store.commit('logout', this)
        this.$store.commit('clearOpenedSubmenu')
        this.$router.push({
          name: 'login'
        })
      }
    }
  },
  watch: {
    $route(to) {
      this.$store.commit('SET_CURRENT_PAGENAME', to.name)
      let pathArr = util.setCurrentPath(this, to.name)
      if (pathArr.length > 2) {
        this.$store.commit('ADD_OPEN_SUBMENU', pathArr[1].name)
      }
      //   this.checkTag(to.name)
      sessionStorage.currentPageName = to.name
    },
    lang() {
      util.setCurrentPath(this, this.$route.name) // 在切换语言时用于刷新面包屑
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style lang="less">
@import './main.less';
</style>
