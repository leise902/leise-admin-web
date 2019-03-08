<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            添加服务信息
        </p>
        <Row>
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="服务编号">
                            <Input v-model="formItem.serviceId" disabled placeholder="系统自动生成" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="服务名称" prop="serviceName">
                            <Input v-model="formItem.serviceName" placeholder="请输入服务名称..." />
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <FormItem label="描述信息">
                        <Input v-model="formItem.description" placeholder="请输入描述信息..." />
                    </FormItem>
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
                formItem: {
                    serviceId: '',
                    serviceName: ''

                },
                ruleValidate: {
                    serviceName: [
                        { required: true, message: 'The name cannot be empty', trigger: 'blur' }
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
                        this.$Message.service('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>