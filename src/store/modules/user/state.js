import { getToken } from '@/utils/auth'
export default function() {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  }
}
