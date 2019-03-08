import http from '@/libs/http'

export function queryTemplateList(queryData) {

    const data = {
        data : queryData
    }

    return http({
        url: '/queryRuleTemplateList/1.0.0',
        method: 'post',
        data
    })
}

export function queryTemplateDetail(queryData) {

    const data = {
        data : queryData
    }
    return http({
        url: '/queryRuleTemplateDetail/1.0.0',
        method: 'post',
        data
    })
}

export function addTemplate(operData) {

    const data = {
        data : operData
    }

    return http({
        url: '/addRuleTemplate/1.0.0',
        method: 'post',
        data
    })
}

export function editTemplate(operData) {

    const data = {
        data : operData
    }

    return http({
        url: '/modifyRuleTemplate/1.0.0',
        method: 'post',
        data
    })
}