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
                        <Input v-model="searchById" icon="search" placeholder="请输入用户编号搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByName" icon="search" placeholder="请输入姓名搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByMobile" icon="search" placeholder="请输入手机号搜搜..." style="margin: 10px;width: 200px;" />
                        <span @click="handleSearch" style="margin: 0px 10px;">
                            <Button type="primary" icon="search">搜索</Button>
                        </span>
                        <Button @click="handleCancel" type="ghost" >取消</Button>
                    </Row>
                </Card>
                <br>
                <Card>
                    <Row class="margin-top-10 searchable-table-con1">
                        <Table :loading="searchLoading" :columns="columns" :data="data"></Table>
                    </Row>
                    <Row><br></Row>              
                    <Row>
                        <Page :total="totalCount" :page-size="pageSize" show-total  @on-change="changePage" ></Page>
                    </Row>
                </Card>
            </Col>
        </Row>
    </div>
</template>

<script>
import { queryUserList } from '@/api/user.js'
// import ViewUser from './ViewUser.vue'
import userRender from './render/user.js'


export default {
    name: 'queryUsers',
    data () {
        return {
            searchLoading: false,
            totalCount: 0,
            pageSize: 10,
            currentPage: 2,
            searchById: '',
            searchByName: '',
            searchByMobile: '',
            userId: '',
            columns: [{
                 type: 'index',
                 title: '序号',
                 width: 80,
                 align: 'center'
            },{
                 key: 'userId',
                 title: '用户编号',
                 sortable: true
            },
            {
                key: 'userName',
                title: '姓名'
            },
            {
                key: 'mobile',
                title: '电话号码'
            },
            {
                key: 'roles',
                title: '角色'
            },
            {
                key: 'operation',
                title: '操作',
                width: 150,
                align: 'center',
                render: (h, params) => {
                    return h ('div', [
                        h('Button', {
                            props: {
                                type: 'primary',
                                size: 'small'
                            },
                            style: {
                                marginRight: '5px'
                            },
                            on: {
                                click: () => {
                                    this.handleRenderView(params.row.userId)
                                }
                            }
                        }, '查看')
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
            let params = {
                'searchByName': this.searchByName,
                'searchByMobile': this.searchByMobile,
                'page': {
                    'currentPage': this.currentPage,
                    'pageSize': this.pageSize
                }
            }
            return new Promise((resolve, reject) => {
                queryUserList(params).then(response => {
                    this.searchLoading = true
                    let responseData = response.data
                    let page = responseData.page
                    this.totalCount = page.totalCount
                    this.pageSize = page.pageSize
                    this.currentPage = page.currentPage
                    this.data = responseData.list
                    this.searchLoading = false
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

        handleView (index) {
            this.$Modal.info({
                title: 'User Info',
                content: `id:${this.data[index].id}<br>name: ${this.data[index].name}<br>roles:${this.data[index].roles}`
            })
        },

        handleRenderView (data) {
            let vm = this
            userRender.viewUserInfo(vm, data)
        }
    },

    mounted () {
        this.init();
    }
};
</script>

<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>