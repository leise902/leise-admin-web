import ViewProduct from '../ViewProduct.vue'
import AddProduct from '../AddProduct.vue'
import EditProduct from '../EditProduct.vue'

let productRender = {

}

productRender.viewProductInfo = function (vm, productId) {
    const data = productId
    vm.$Modal.info({
        scrollable: true,
        width: 800,
        okText: '关闭',
        render: (h) => {
            return h(ViewProduct, {
                props: {
                    productId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

productRender.addProductInfo = function (vm) {
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(AddProduct, {
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

productRender.editProductInfo = function (vm, productId) {
    let data = productId
    vm.$Modal.info({
        scrollable: true,
        okText: '关闭',
        width: 800,
        render: (h) => {
            return h(EditProduct, {
                props: {
                    productId: data
                },
                onOK: () => {
                    vm.$Modal.remove()
                }
            })
        }
   })
}

export default productRender