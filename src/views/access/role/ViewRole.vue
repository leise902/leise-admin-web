<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="person"></Icon>
            查看角色信息
        </p>
        <Form ref="formItem" :loading="searchLoading" :label-width="80">
            <FormItem label="角色编号" prop="roleId">
                <Input v-model="roleId" disabled />
            </FormItem>
            <FormItem label="角色名称">
                <Input v-model="roleName" disabled />
            </FormItem>
            <FormItem label="描述信息">
                <Input v-model="description" disabled />
            </FormItem>
        </Form>
    </Card>
</template>
<script>
import { queryRoleDetail } from '@/api/role.js' 
    export default {   
        name: 'viewRole',
        data () {
            return {
                searchLoading: false,
                roleName: '',
                description: ''
            }
        },

        props: ['roleId'],

        methods: {
            init () {
                let params = {
                    'roleId': this.roleId
                }
                return new Promise((resolve, reject) => {
                    queryRoleDetail(params).then(response => {
                        this.searchLoading = true
                        let responseData = response.data
                        this.roleName = responseData.roleName,
                        this.description = responseData.description
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