import ViewService from '../ViewService.vue'
import AddService from '../AddService.vue'
import EditService from '../EditService.vue'

let serviceRender = {

}

serviceRender.viewServiceInfo = function (vm, serviceId) {
    const data = serviceId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        render: (h) => {
            return h(ViewService, {
                props: {
                    serviceId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

serviceRender.addServiceInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(AddService, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

serviceRender.editServiceInfo = function (vm, serviceId) {
    let data = serviceId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(EditService, {
                props: {
                    serviceId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default serviceRender