import http from '@/libs/http'

export function queryUserList(data) {

    return http({
        url: '/queryUserList',
        method: 'post',
        data
    })
}

export function addUser(data) {

    return http({
        url: '/addUser',
        method: 'post',
        data
    })
}

export function editUser(data) {

    return http({
        url: '/editUser',
        method: 'post',
        data
    })
}

export function queryUserDetail(data) {

    return http({
        url: '/queryUserDetail',
        method: 'post',
        data
    })
}