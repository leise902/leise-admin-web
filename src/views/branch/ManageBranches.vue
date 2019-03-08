<template>
    <div>
        <Row>
            <Col>
                <Card>
                    <p slot="title">
                        <Icon type="mouse"></Icon>
                        您可以进行机构管理的操作
                    </p>
                </Card>
                <br>
                <Col span="12">
                    <Card>
                        <p slot="title" style="color:#2D8CF0">
                        <Icon type="information-circled"></Icon>
                            机构列表
                        </p>
                        <Row class="margin-top-10 searchable-table-con1">
                            <Tree :data="branchList" :render="renderContent"></Tree>
                        </Row>
                    </Card>
                </Col>
                <Col span="12">
                    <Card v-if="showBranchDetail">
                        <p slot="title" style="color:#2D8CF0">
                            <Icon type="information-circled"></Icon>
                            机构基本信息
                        </p>
                        <Form ref="formItem" :model="formItem" :rules="ruleValidate" :label-width="80">
                            <Row>
                                <Col span="12">
                                    <FormItem label="机构编号">
                                        <Input v-model="formItem.branchId" disabled></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="机构名称" prop="title">
                                        <Input v-model="formItem.branchName" placeholder="请输入机构名称" ></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="机构地址" prop="branchAddress">
                                        <Input v-model="formItem.branchAddress" placeholder="请输入机构地址" ></Input>
                                    </FormItem>
                                </Col>
                                <Col span="12">
                                    <FormItem label="联系方式" prop="telephone">
                                        <Input v-model="formItem.telephone" placeholder="请输入联系方式" ></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row>
                                <Col span="12">
                                    <FormItem label="机构级别" prop="level">
                                        <Input v-model="formItem.level" placeholder="请输入机构级别" ></Input>
                                    </FormItem>
                                </Col>
                            </Row>
                            <FormItem>
                                <Button type="primary" @click="handleSubmit('formItem')">保存</Button>
                                <Button type="ghost" @click="handleReset('formItem')" style="margin-left: 8px">重置</Button>
                            </FormItem>
                        </Form>
                    </Card>
                </Col>
            </Col>
        </Row>
    </div>
</template>

<script>
import { queryBranchList } from '@/api/branch.js'

export default {
    name: 'manageBranchs',
    data () {
        return {
           branchList: [],
           showBranchDetail: false,
           formItem: {
               branchId: '',
               branchName: '',
               branchAddress: '',
               telephone: '',
               level: ''
           }
        };
    },
    methods: {

        init() {
            this.handleSearch()
        },

        handleSearch () {
            this.loading = true
            let params = {
               
            }
            return new Promise((resolve, reject) => {
                queryBranchList(params).then(response => {
                    let responseData = response.data
                    this.branchList = responseData.list
                    this.loading = false
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })

        },

        renderContent (h, { root, node, data }) {
            return h('span', {
                style: {
                    display: 'inline-block',
                    width: '100%'
                }
            }, [
                h('span', [
                    h('Icon', {
                        props: {
                            type: "university"
                        },
                        style: {
                            marginRight: '8px'
                        }
                    }),
                    h('span', data.branchName)
                ]),
                h('span', {
                    style: {
                        display: 'inline-block',
                        float: 'right',
                        marginRight: '32px'
                    }
                }, [
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-plus-empty',
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '8px'
                        },
                        on: {
                            click: () => { this.append(data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'ios-minus-empty',
                            type: 'primary'
                        }),
                        style: {
                            marginRight: '8px',
                            display: data.level > 1 ? 'true' : 'none',
                        },
                        on: {
                            click: () => { this.remove(root, node, data) }
                        }
                    }),
                    h('Button', {
                        props: Object.assign({}, this.buttonProps, {
                            icon: 'eye',
                            type: 'primary'
                        }),
                        on: {
                            click: () => { this.view(root, node, data) }
                        }
                    })
                ])
            ]);
        },
        append (data) {
            const children = data.children || [];
            children.push({
                branchName: '请输入机构名称',
                expand: true,
                level: data.level + 1
            });
            this.$set(data, 'children', children);
        },
        remove (root, node, data) {
            this.showBranchDetail = false
            const parentKey = root.find(el => el === node).parent;
            const parent = root.find(el => el.nodeKey === parentKey).node;
            const index = parent.children.indexOf(data);
            parent.children.splice(index, 1);
        },
        view (root, node, data) {
            this.showBranchDetail = true
            this.formItem = data
        }
    },

    created () {
        this.init();
    }
};
</script>

<style lang="less" scoped>
    @import '../../styles/common.less';
    @import '../../styles/table.less';
</style>