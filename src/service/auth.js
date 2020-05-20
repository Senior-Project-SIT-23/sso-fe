import api from '.././utils/libs/connectApi'

export function login(data) {
  return api.post('/login', data)
}
export function continueLogin() {
  return api.get('/login/auth-code')
}
export function fecthUserDataByAuthCode(data) {
  return api.get(`/oauth/token?client_id=test&client_secret=test&grant_type=${data}&code=${data}`)
}
