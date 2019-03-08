<template>
    <div>
        <Row>
            <Col>
                <Card>
                    <p slot="title">
                        <Icon type="mouse"></Icon>
                        点击搜索进行查询
                    </p>
                    <Row>
                        <Input v-model="searchById" icon="search" placeholder="请输入角色编号搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByName" icon="search" placeholder="请输入角色名称搜搜..." style="margin: 10px;width: 200px;" />
                        <span @click="handleSearch" style="margin: 0px 10px;">
                            <Button type="primary" icon="search">搜索</Button>
                        </span>
                        <Button @click="handleCancel" type="ghost" >取消</Button>
                    </Row>
                </Card>
                <br>
                <Card>
                    <Row>
                        <span @click="handleRenderAdd" style="margin: 0px 10px;">
                            <Button type="primary" icon="person-add">添加</Button>
                        </span>
                    </Row>  
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table size="small" :loading="searchLoading" :columns="columns" :data="data"></Table>
                    </Row><br>              
                    <Row>
                        <Page :total="totalCount" :page-size="pageSize" show-total  @on-change="changePage" ></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { queryRoleList, addRole, queryRoleDetail } from '@/api/role.js'
import roleRender from './render/role.js'

export default {
    name: 'manageUsers',
    data () {
        return {
            searchLoading: false,
            totalCount: 0,
            pageSize: 10,
            currentPage: 2,
            searchById: '',
            searchByName: '',
            columns: [{
                 type: 'index',
                 title: '序号',
                 width: 80,
                 align: 'center'
            },{
                 key: 'roleId',
                 title: '角色编号',
                 sortable: true
            },
            {
                key: 'roleName',
                title: '角色名称'
            },
            {
                key: 'createTime',
                title: '创建时间'
            },
            {
                key: 'modifyTime',
                title: '修改时间'
            },
            {
                key: 'operation',
                title: '操作',
                width: 180,
                align: 'center',
                render: (h, params) => {
                    return h ('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'eye'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.handleRenderView(params.row.roleId)
                                }
                            }
                        }, '查看'),
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small',
                                icon: 'edit'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.handleRenderEdit(params.row.roleId)
                                }
                            }
                        }, '编辑')
                    ])
                }
            }],

            data: []
        };
    },

    methods: {
        init () {
            this.handleSearch()
        },

        handleSearch () {
            this.loading = true
            let params = {
                'searchByName': this.searchByName,
                'searchByMobile': this.searchByMobile,
                'page': {
                    'currentPage': this.currentPage,
                    'pageSize': this.pageSize
                }
            }
            return new Promise((resolve, reject) => {
                queryRoleList(params).then(response => {
                    let responseData = response.data
                    let page = responseData.page
                    this.totalCount = page.totalCount
                    this.pageSize = page.pageSize
                    this.currentPage = page.currentPage
                    this.data = responseData.list
                    this.loading = false
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        handleCancel () {
            
        },

        changePage () {
            this.handleSearch()
        },

        handleRenderAdd () {
            let vm = this
            roleRender.addRoleInfo(vm)
        },

        handleRenderView (roleId) {
            let vm = this
            roleRender.viewRoleInfo(vm, roleId)
        },

        handleRenderEdit (roleId) {
            let vm = this
            roleRender.editRoleInfo(vm, roleId)
        }
    },
    mounted () {
        this.init();
    }
};
</script>

<style lang="less" scoped>
    @import '../../../styles/common.less';
    @import '../../../styles/table.less';
</style>