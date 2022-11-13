import request from '@/utils/request'

export function getToken() {
  return request({
    url: '/qiniu/upload/token',
    method: 'get'
  })
}
