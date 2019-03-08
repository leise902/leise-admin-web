import http from '@/libs/http'

export function queryOperlogList(data) {

    return http({
        url: '/queryOperlogList',
        method: 'post',
        data
    })
}

export function queryOperlogDetail(data) {

    return http({
        url: '/queryOperlogDetail',
        method: 'post',
        data
    })
}