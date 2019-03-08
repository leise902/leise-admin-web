<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="plus-circled"></Icon>
            添加模板信息
        </p>
        <Row>
            <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                <Row>
                    <Col span="12">
                        <FormItem label="模板代码">
                            <Input v-model="formItem.templateCode" placeholder="请输入模板代码" />
                        </FormItem>
                    </Col>
                    <Col span="12">
                        <FormItem label="模板名称" prop="templateName">
                            <Input v-model="formItem.templateName" placeholder="请输入模板名称" />
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
                    <FormItem label="模板内容" prop="templateContent">
                        <textarea rows="8" cols="100" v-model="formItem.templateContent" style="resize:none;line-height:150%"></textarea>
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
    import { addTemplate } from '@/api/template'
    export default {
        data () {
            return {

                content:'',  
                formItem: {
                    templateCode: '',
                    templateName: '',
                    templateContent: '',
                    enable: true,
                    description: ''

                },
                ruleValidate: {
                    templateName: [
                        { required: true, message: '模板名称不能为空', trigger: 'blur' }
                    ],
                    templateContent: [
                        { required: true, message: '模板内容不能为空', trigger: 'blur' }
                    ]
                }
            }
        },

        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        addTemplate(this.formItem).then(response => {
                            let responseData = response.data
                            this.$Message.success('操作成功!');
                        }).catch(error => {
                           this.$Message.error('操作失败!');
                        })
                    } else {
                        this.$Message.error('操作失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>

<style>
   
</style>
