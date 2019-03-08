<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="eye"></Icon>
            查看模板信息
        </p>
        <Form ref="formItem" :model="formItem" :loading="searchLoading" :label-width="80">
            <Row>
                <Col span="12">
                    <FormItem label="模板编号">
                        <Input v-model="templateId" disabled />
                    </FormItem>
                </Col>
                <Col span="12">
                    <FormItem label="模板代码">
                        <Input v-model="formItem.templateCode" disabled />
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="12">
                    <FormItem label="模板名称">
                        <Input v-model="formItem.templateName" disabled />
                    </FormItem>
                </Col>
                <!-- <Col span="12">
                    <FormItem label="是否启用">
                        <Input v-model="formItem.enable" disabled />
                    </FormItem>
                </Col> -->
                 <Col span="12">
                    <FormItem label="是否启用" prop="enable">
                        <i-switch v-model="formItem.enable" size="large" disabled>
                            <span slot="open">开启</span>
                            <span slot="close">关闭</span>
                        </i-switch>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <FormItem label="描述信息">
                    <Input v-model="formItem.description" disabled />
                </FormItem>
            </Row>
            <Row>
                <FormItem label="模板内容">
                    <textarea rows="8" cols="100" v-model="formItem.templateContent" style="resize:none;line-height:150%" disabled></textarea>
                </FormItem>
            </Row>
        </Form>
    </Card>
</template>
<script>
import { queryTemplateDetail } from '@/api/template' 
    export default {   
        name: 'viewTemplate',
        data () {
            return {
                searchLoading: false,
                formItem: {
                    templateCode: '',
                    templateName: '',
                    enable: false,
                    description: '',
                    templateContent: ''
                }
            }
        },

        props: ['templateId'],

        methods: {
            init () {
                let params = {
                    'templateId': this.templateId
                }
                queryTemplateDetail(params).then(response => {   
                    let responseData = response.data
                    this.formItem = responseData  
                }).catch(error => {
                    
                })
            }     
        },

        created () {
            this.init();
        } 

    }
</script>