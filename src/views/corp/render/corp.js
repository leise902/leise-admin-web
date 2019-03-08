import ViewCorp from '../ViewCorp.vue'
import AddCorp from '../AddCorp.vue'
import EditCorp from '../EditCorp.vue'

let corpRender = {

}

corpRender.viewCorpInfo = function (vm, corpId) {
    const data = corpId
    vm.$Modal.info({
        scrollable: true,
        width: 800,
        okText: '关闭',
        render: (h) => {
            return h(ViewCorp, {
                props: {
                   corpId: data
                }
            })
        },
        onOk: () => {
            vm.init();
        }  
   })
}

corpRender.addCorpInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(AddCorp, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

corpRender.editCorpInfo = function (vm, corpId) {
    let data = corpId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(EditCorp, {
                props: {
                    corpId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default corpRender