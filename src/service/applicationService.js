import apiGateWay from '.././utils/libs/connectApi'
import apiManage from '.././utils/libs/connectApiManage'

export function checkClientId(client_id) {
  return apiGateWay.get(`/applications/client/${client_id}`)
}

export function apiCreateApplication(data) {
  return apiManage.post(`/applications`, data)
}

export function apiDeleteApplication(id) {
  return apiManage.delete(`/applications/${id}`)
}

export function apiUpdateStatus(id, data) {
  return apiManage.put(`applications/approve-reject/${id}`, data)
}

export function apiFetchAllMyApplication() {
  return apiManage.get(`/my-applications`)
}

export function apiFetchAllPending() {
  return apiManage.get(`/applications/status/pending`)
}

export function apiFetchAllApprove() {
  return apiManage.get(`/applications/status/approve`)
}

export function apiFetchAllReject() {
  return apiManage.get(`/applications/status/reject`)
}
