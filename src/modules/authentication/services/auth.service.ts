import http from '@/plugins/axios'
import { AxiosResponse } from 'axios'

type Auth = {
  email: string
  password: string
}
type Admin = { id: string; name: string; email: string }

type ResponseAuth = {
  admin: Admin
  refreshToken: string
  token: string
}

class AuthService {
  login(payload: Auth): Promise<AxiosResponse<ResponseAuth>> {
    return http.post('/auth/admin-signin', payload)
  }
}
export default new AuthService()
