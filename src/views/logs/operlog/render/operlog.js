import ViewOperlog from '../ViewOperlog.vue'

let operlogRender = {

}

operlogRender.viewOperlogInfo = function (vm, logId) {
    const data = logId
    vm.$Modal.info({
        scrollable: true,
        width: 600,
        okText: '关闭',
        render: (h) => {
            return h(ViewOperlog, {
                props: {
                   logId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default operlogRender