import api from '.././utils/libs/connectApi'

export function logout() {
  return api.get('/logout')
}
export function login(data) {
  return api.post('/login', data)
}
export function continueLogin() {
  return api.get('/login/auth-code')
}
export function fetchUserDataByAuthCode(currentApp,code) {
  return api.get(`/oauth/token?client_id=${currentApp?.app_id}&client_secret=${currentApp?.secret_id}&code=${code}`)
}
export function fetchMe() {
  return api.get(`/me`)
}
