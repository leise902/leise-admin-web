import AddModuleInfo from '../components/AddModuleInfo.vue'
import ViewModuleInfo from '../components/ViewModuleInfo.vue'
import ConfigModuleEnv from '../components/ConfigModuleEnv.vue'

let moduleRender = {}

moduleRender.addModuleInfo = function (vm) {
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(AddModuleInfo, {
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

moduleRender.viewModuleInfo = function (vm, moduleInfoId) {
  let data = moduleInfoId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(ViewModuleInfo, {
        props: {
          moduleInfoId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

moduleRender.editModuleInfo = function (vm, moduleInfoId) {
  let data = moduleInfoId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(ViewModuleInfo, {
        props: {
          moduleInfoId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

moduleRender.configModuleEnv = function (vm, data) {
  let moduleInfoId = data
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(ConfigModuleEnv, {
        props: {
          moduleInfoId: moduleInfoId
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

export default moduleRender
