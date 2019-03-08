<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="eye"></Icon>
            查看产品信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="产品编号" prop="productId">
                        <Input v-model="productId" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="产品代码" prop="productCode">
                        <Input v-model="formItem.productCode" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="产品名称">
                        <Input v-model="formItem.productName" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="是否启用" prop="enable">
                        <Input v-model="formItem.enable" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="描述信息">
                    <Input v-model="formItem.description" disabled />
                </FormItem>
            </Row>
            <Row>
                <FormItem label="产品内容" prop="productContent">
                    <textarea rows="8" cols="100" v-model="formItem.productContent"></textarea>
                </FormItem>
            </Row>
        </Form>
    </Card>
</template>
<script>
import { queryProductDetail } from '@/api/product.js' 
    export default {   
        name: 'viewArg',
        data () {
            return {
                searchLoading: false,
                formItem: {
                    productCode: '',
                    productName: '',
                    enable: false,
                    description: '',
                    productContent: ''
                }
            }
        },

        props: ['productId'],

        methods: {
            init () {
                let params = {
                    'productId': this.productId
                }
                return new Promise((resolve, reject) => {
                    queryProductDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData,
                        this.searchLoading = false
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }     
        },

        created () {
            this.init();
        } 

    }
</script>