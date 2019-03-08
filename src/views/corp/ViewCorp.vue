<template>
    <Card>
        <p slot="title" style="color:#2D8CF0">
            <Icon type="eye"></Icon>
            查看企业信息
        </p>
        <Tabs type="card">
            <Tab-pane label="企业身份信息">
                <CorpInfo :corpId="corpId" opType="view"></CorpInfo>
            </Tab-pane>
            <Tab-pane label="企业详细信息"> 
                <CorpDetail :corpId="corpId" opType="view"></CorpDetail>
            </Tab-pane>
            <Tab-pane label="企业出资人信息">
               <CorpInvestor :corpId="corpId" opType="view"></CorpInvestor>
            </Tab-pane>
            <Tab-pane label="企业管理人员信息">
                
            </Tab-pane>
        </Tabs>
    </Card>
</template>
<script>
import { queryCorpInfo, queryCorpDetail } from '@/api/corp.js' 
import CorpInfo from './components/CorpInfo.vue'
import CorpDetail from './components/CorpDetail.vue'
import CorpInvestor from './components/CorpInvestor.vue'
    export default {   
        name: 'viewCorp',
        data () {
            return {

            }
        },

        props: ['corpId'],

        components: {
            CorpInfo,
            CorpDetail,
            CorpInvestor
        }

    }
</script>