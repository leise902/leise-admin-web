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
                        <Input v-model="searchById" icon="search" placeholder="请输入日志编号搜搜..." style="margin: 10px;width: 200px;" />
                        <Input v-model="searchByType" icon="search" placeholder="请输入日志类型搜搜..." style="margin: 10px;width: 200px;" />
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
import { queryOperlogList } from '@/api/log.js'
import operlogRender from './render/operlog.js'


export default {
    name: 'queryOperlogs',
    data () {
        return {
            searchLoading: false,
            totalCount: 0,
            pageSize: 10,
            currentPage: 2,
            searchById: '',
            searchByType: '',
            logId: '',
            columns: [{
                 type: 'index',
                 title: '序号',
                 width: 80,
                 align: 'center'
            },
            {
                 key: 'logId',
                 title: '日志编号',
                 sortable: true
            },
            {
                key: 'operType',
                title: '操作类型'
            },
            {
                key: 'bizKeyName',
                title: '业务主键项'
            },
            {
                key: 'bizKeyValue',
                title: '业务主键值'
            },
            {
                key: 'operName',
                title: '操作员'
            },
            {
                key: 'operResult',
                title: '操作结果'
            },
            {
                key: 'operTime',
                title: '操作时间'
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
                                    this.handleRenderView(params.row.logId)
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
                'searchById': this.searchById,
                'searchByType': this.searchByType,
                'page': {
                    'currentPage': this.currentPage,
                    'pageSize': this.pageSize
                }
            }
            return new Promise((resolve, reject) => {
                queryOperlogList(params).then(response => {
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
        handleRenderView (data) {
            let vm = this
            operlogRender.viewOperlogInfo(vm, data)
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