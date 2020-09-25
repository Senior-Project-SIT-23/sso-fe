import apiManage from '.././utils/libs/connectApiManage'

export function apiFetchAllRole() {
  return apiManage.get('/roles')
}
export function apiFetchUserByID(id) {
  return apiManage.get(`/users/${id}`)
}
export function apiFetchAllUsersWithRole() {
  return apiManage.get('/roles/users')
}
export function apiAddUsersRole(data) {
  return apiManage.post('/roles/users', data)
}
export function apiRemoveUsersRole(data) {
  return apiManage.delete('/roles/users', data)
}
