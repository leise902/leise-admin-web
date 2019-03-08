import ViewTemplate from '../ViewTemplate.vue'
import AddTemplate from '../AddTemplate.vue'
import EditTemplate from '../EditTemplate.vue'

let templateRender = {

}

templateRender.viewTemplateInfo = function (vm, templateId) {
    let data = templateId
    vm.$Modal.info({
        scrollable: true,
        width: 800,
        okText: '关闭',
        render: (h) => {
            return h(ViewTemplate, {
                props: {
                    templateId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

templateRender.addTemplateInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(AddTemplate, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

templateRender.editTemplateInfo = function (vm, templateId) {
    let data = templateId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(EditTemplate, {
                props: {
                    templateId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default templateRender