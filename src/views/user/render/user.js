import ViewUser from '../ViewUser.vue'
import AddUser from '../AddUser.vue'
import EditUser from '../EditUser.vue'

let userRender = {

}

userRender.viewUserInfo = function (vm, userId) {
    const data = userId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        render: (h) => {
            return h(ViewUser, {
                props: {
                   userId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

userRender.addUserInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(AddUser, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

userRender.editUserInfo = function (vm, userId) {
    let data = userId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 500,
        render: (h) => {
            return h(EditUser, {
                props: {
                    userId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default userRender