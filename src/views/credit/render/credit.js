import ViewCredit from '../ViewCredit.vue'
import AddCredit from '../AddCredit.vue'
import EditCredit from '../EditCredit.vue'

let creditRender = {}

creditRender.viewCreditInfo = function(vm, creditId) {
  const data = creditId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    render: h => {
      return h(ViewCredit, {
        props: {
          creditId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

creditRender.addCreditInfo = function(vm) {
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 500,
    render: h => {
      return h(AddCredit, {
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

creditRender.editCreditInfo = function(vm, creditId) {
  let data = creditId
  vm.$Modal.info({
    scrollable: true,
    okText: '关闭',
    width: 500,
    render: h => {
      return h(EditCredit, {
        props: {
          creditId: data
        },
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

export default creditRender
