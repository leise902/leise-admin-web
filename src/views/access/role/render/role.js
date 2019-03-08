import ViewRole from '../ViewRole.vue'
import AddRole from '../AddRole.vue'
import EditRole from '../EditRole.vue'

let roleRender = {}

roleRender.viewRoleInfo = function (vm, roleId) {
  const data = roleId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    render: h => {
      return h(ViewRole, {
        props: {
          roleId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

roleRender.addRoleInfo = function (vm) {
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 500,
    render: h => {
      return h(AddRole, {
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

roleRender.editRoleInfo = function (vm, roleId) {
  let data = roleId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 500,
    render: h => {
      return h(EditRole, {
        props: {
          roleId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

export default roleRender
