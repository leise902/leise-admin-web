import ViewError from '../ViewError.vue'
import AddError from '../AddError.vue'
import EditError from '../EditError.vue'

let errorRender = {

}

errorRender.viewErrorInfo = function (vm, errorId) {
    const data = errorId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        render: (h) => {
            return h(ViewError, {
                props: {
                    errorId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

errorRender.addErrorInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(AddError, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

errorRender.editErrorInfo = function (vm, errorId) {
    let data = errorId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(EditError, {
                props: {
                    errorId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default errorRender