import axios from 'axios'
// import qs from 'qs'
import store from '@/store/index'
// import { request } from 'https'
import guid from './guid'
import formatter from './formatter'

const http = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 30000
})

http.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'
http.defaults.headers.get['X-Requested-With'] = 'XMLHttpRequest'
http.defaults.responseType = 'json'
// http.defaults.transformRequest = [
//     data => qs.stringify(data)
// ]

http.defaults.validateStatus = status => true

http.interceptors.request.use(
  config => {
    config.headers.Accept = 'application/json'
    if (store.getters.token) {
      config.headers.Authorization = `token ${store.getters.token}`
    }
    config.data['randomNum'] = guid.genGUID()
    config.data['reqTime'] = formatter.dateTimeFormat()
    config.data['appkey'] = 'f9cc1d277da36d34ec26b6471b2b1653'
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use(
  response => {
    if (response.config && response.config.responseType === 'blob') {
      const blob = new Blob([response.data])
      let filename = 'excel.zip'
      if ('download' in document.createElement('a')) {
        const downloadElement = document.createElement('a')
        let href = ''
        if (window.URL) {
          href = window.URL.createObjectURL(blob)
        } else {
          href = window.webkitURL.createObjectURL(blob)
        }
        downloadElement.href = href
        downloadElement.download = filename
        document.body.appendChild(downloadElement)
        downloadElement.click()

        if (window.URL) {
          window.URL.revokeObjectURL(href)
        } else {
          window.webkitURL.revokeObjectURL(href)
        }
        document.body.removeChild(downloadElement)
      } else {
        navigator.msSaveBlob(blob, filename)
      }
      return
    }

    let res = response.data
    console.log('response', res)
    let status = response.status
    if (status === 200) {
      return Promise.resolve(res)
      // if (res.errorCode === 0) {
      //   return Promise.resolve(res)
      // } else {
      //   return Promise.reject(res)
      // }
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error)
  }
)

export default http
