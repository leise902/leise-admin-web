import ViewRule from '../ViewRule.vue'
import AddRule from '../AddRule.vue'
import EditRule from '../EditRule.vue'
import ConfigRule from '../ConfigRule.vue'

let ruleRender = {

}

ruleRender.viewRuleInfo = function (vm, ruleId) {
    const data = ruleId
    vm.$Modal.info({
        scrollable: true,
        width: 800,
        okText: '关闭',
        render: (h) => {
            return h(ViewRule, {
                props: {
                    ruleId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

ruleRender.addRuleInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(AddRule, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

ruleRender.editRuleInfo = function (vm, ruleId) {
    let data = ruleId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(EditRule, {
                props: {
                    ruleId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

ruleRender.configRuleInfo= function (vm, item) {
    let data = item
    let props = {
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(ConfigRule, {
                props: {
                    ruleItem: item
                },
                on: {
                    emitRuleCondition: (data) => {
                        item.ruleCondition = data
                    }
                }
            })
        }
    }

    let render = ('render' in props) ? props.render : undefined

    let modal = vm.$Modal.newInstance({
        closable: false,
        maskClosable: false,
        footerHide: true,
        render: render
    })

    props.onRemove = function () {
        modal = null;
    };

    modal.show(props);
}

export default ruleRender