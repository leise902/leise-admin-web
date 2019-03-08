import ViewFlowInfo from '../components/ViewFlowInfo.vue'
import ViewFlowVersionInfo from '../components/ViewFlowVersionInfo.vue'
import AddFlowInfo from '../components/AddFlowInfo.vue'
import ConfigAdminFlowData from '../components/ConfigAdminFlowData.vue'
import ConfigFlowData from '../components/ConfigFlowData.vue'
import ModifyFlowBaseInfo from '../components/ModifyFlowBaseInfo.vue'
import ManageFlowVersions from '../components/ManageFlowVersions.vue'

let flowRender = {}

flowRender.configAdminFlowData = function (vm, flowInfoId) {
  let data = flowInfoId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(ConfigAdminFlowData, {
        props: {
          flowInfoId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

flowRender.viewFlowInfo = function (vm, flowInfoId) {
  let data = flowInfoId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(ViewFlowInfo, {
        props: {
          flowInfoId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

flowRender.addFlowModel = function (vm) {
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(AddFlowInfo, {
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

flowRender.configFlowData = function (vm, flowInfoId) {
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      let data = flowInfoId
      return h(ConfigFlowData, {
        props: {
          flowInfoId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

flowRender.modifyFlowBaseInfo = function (vm, flowInfoId) {
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      let data = flowInfoId
      return h(ModifyFlowBaseInfo, {
        props: {
          flowInfoId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

flowRender.manageFlowVersions = function (vm, flowInfoId) {
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 1080,
    render: h => {
      let data = flowInfoId
      return h(ManageFlowVersions, {
        props: {
          flowInfoId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

flowRender.viewFlowVersionInfo = function (vm, version) {
  let data = version
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 800,
    render: h => {
      return h(ViewFlowVersionInfo, {
        props: {
          version: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

export default flowRender
