import request from '@/utils/request'

export function loginUser(data) {
  return request({
    url: '/vue-element-admin/user/login',
    method: 'post',
    data
  })
}

export function getInfoUser(token) {
  return request({
    url: '/vue-element-admin/user/info',
    method: 'get',
    params: { token }
  })
}

export function logoutUser() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
