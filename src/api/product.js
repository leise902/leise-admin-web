import http from '@/libs/http'

export function queryProductList(data) {

    return http({
        url: '/queryProductList',
        method: 'post',
        data
    })
}

export function queryProductDetail(data) {

    return http({
        url: '/queryProductDetail',
        method: 'post',
        data
    })
}