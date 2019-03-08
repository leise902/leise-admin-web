import http from '@/libs/http'

export function queryServiceList(data) {

    return http({
        url: '/queryServiceList',
        method: 'post',
        data
    })
}

export function queryServiceDetail(data) {

    return http({
        url: '/queryServiceDetail',
        method: 'post',
        data
    })
}