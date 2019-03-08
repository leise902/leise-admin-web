<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="edit"></Icon>
            编辑数据字典信息
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
            <FormItem label="数据字典编号">
                <Input v-model="formItem.dictId" disabled></Input>
            </FormItem>
            <FormItem label="数据字典名称" prop="dictName">
                <Input v-model="formItem.dictName" placeholder="Enter the dictName"></Input>
            </FormItem>
            <FormItem label="描述信息" prop="description">
                <Input v-model="formItem.description" placeholder="Enter the description"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formItem')">修改</Button>
                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryDictDetail } from '@/api/dict.js'
    export default {
        data () {
            return {
                formItem: {
                    dictId: '',
                    dictName: '',
                    description: ''
                },
                ruleValidate: {
                    dictName: [
                        { required: true, message: 'The dictName cannot be empty', trigger: 'blur' }
                    ]
                }
            }
        },

        props:['dictId'],

        methods: {

            init () {
                this.handleSearch()
            },

            handleSearch () {
                let params = {
                    'dictId': this.dictId
                }
                return new Promise((resolve, reject) => {
                    queryDictDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.formItem = responseData
                        this.formItem.dictId = this.dictId
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