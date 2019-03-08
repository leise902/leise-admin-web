import Upload from '../Upload.vue'

let uploadRender = {}

uploadRender.viewUpload = function (vm) {
  vm.$Modal.info({
    scrollable: true,
    width: 500,
    okText: '关闭',
    render: h => {
      return h(Upload, {
        props: {},
        onOK: () => {
          vm.$Modal.remove()
        }
      })
    }
  })
}

export default uploadRender
