import ViewDict from '../ViewDict.vue'
import AddDict from '../AddDict.vue'
import EditDict from '../EditDict.vue'

let dictRender = {

}

dictRender.viewDictInfo = function (vm, dictId) {
    const data = dictId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        render: (h) => {
            return h(ViewDict, {
                props: {
                    dictId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

dictRender.addDictInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(AddDict, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

dictRender.editDictInfo = function (vm, dictId) {
    let data = dictId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(EditDict, {
                props: {
                    dictId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default dictRender