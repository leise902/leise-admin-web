<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="edit"></Icon>
            编辑产品信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="产品编号">
                        <Input v-model="formItem.productId" disabled></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="产品代码">
                        <Input v-model="formItem.productCode" placeholder="请输入产品代码..."></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="产品名称" prop="productName">
                        <Input v-model="formItem.productName" placeholder="请输入产品名称..."></Input>
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="是否启用" prop="enable">
                        <i-switch v-model="formItem.enable" size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="描述信息" prop="description">
                    <Input v-model="formItem.description" placeholder="请输入描述信息..."></Input>
                </FormItem>
            </Row>
            <Row>
                <FormItem label="产品内容" prop="productContent">
                    <textarea rows="8" cols="100" v-model="formItem.productContent"></textarea>
                </FormItem>
            </Row>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryProductDetail } from '@/api/product.js'
    export default {
        data () {
            return {
                formItem: {
                    productCode: '',
                    productName: '',
                    enable: true,
                    description: ''
                },
                ruleValidate: {
                    productName: [
                        { required: true, message: '产品名称不能为空', trigger: 'blur' }
                    ],
                    productCode: [
                        { required: true, message: '模板代码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['productId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'productId': this.productId
                }
                return new Promise((resolve, reject) => {
                    queryProductDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.productId = this.productId
                        this.searchLoading = false
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },

        created () {
            this.init();
        } 
    }
</script>