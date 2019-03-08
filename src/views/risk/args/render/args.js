import ViewArgs from '../ViewArgs.vue'
import AddArgs from '../AddArgs.vue'
import EditArgs from '../EditArgs.vue'

let argsRender = {

}

argsRender.viewArgsInfo = function (vm, argsId) {
    const data = argsId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        render: (h) => {
            return h(ViewArgs, {
                props: {
                    argsId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

argsRender.addArgsInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(AddArgs, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

argsRender.editArgsInfo = function (vm, argsId) {
    let data = argsId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(EditArgs, {
                props: {
                    argsId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default argsRender