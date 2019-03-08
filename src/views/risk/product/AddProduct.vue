<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="plus-circled"></Icon>
            添加产品信息
        </p>
        <Row>
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="产品编号">
                            <Input v-model="formItem.productId" disabled placeholder="系统自动生成" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="产品名称" prop="productName">
                            <Input v-model="formItem.productName" placeholder="请输入产品名称" />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="是否启用" prop="enable">
                        <i-switch v-model="formItem.enable" size="large">
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                </Row>
                <Row>
                    <FormItem label="描述信息" prop="description">
                        <Input v-model="formItem.description" placeholder="请输入描述信息..." />
                    </FormItem>
                </Row>
                <Row>
                    <!-- <FormItem label="产品内容" prop="productContent">
                        <textarea rows="8" cols="100" v-model="formItem.productContent"></textarea>
                    </FormItem> -->
                    <Transfer
                        :data="sourceData"
                        :target-keys="targetKeys"
                        filterable
                        :filter-method="filterMethod"
                        :render-format="handleRender"
                        @on-change="handleChange"></Transfer>
                </Row>
                <Row>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                        <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                    </FormItem>
                </Row>
            </Form>
        </Row>
    </Card>
</template>
<script>
    export default {
        data () {
            return {

                content:'',  
                sourceData: [{
                    label: '规则1',
                    value: '231231'
                }],
                targetKeys: ["1","2"],
                formItem: {
                    productId: '',
                    productCode: '',
                    productName: '',
                    productContent: '',
                    enable: true,
                    description: ''

                },
                ruleValidate: {
                    productName: [
                        { required: true, message: '产品名称不能为空', trigger: 'blur' }
                    ],
                    productCode: [
                        { required: true, message: '产品代码不能为空', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
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
            },
            filterMethod () {

            },
            handleChange () {

            },
            handleRender (item) {
                return item.label + ':' + item.value
                // return `<template><Row><span>${item.label}</span><span><Button @click="handleView(${item.value})"/></span></Row></template>`
            }
        }
    }
</script>