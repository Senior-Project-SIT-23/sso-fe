import apiGateWay from '.././utils/libs/connectApi'
import apiManage from '.././utils/libs/connectApiManage'

export function checkClientId(client_id, redirect_uri) {
  return apiGateWay.get(`/applications/client/${client_id}?redirect_uri=${redirect_uri || ''}`)
}

export function apiCreateApplication(data) {
  return apiManage.post(`/applications`, data)
}

export function apiUpdateApplicationPage(id, data) {
  return apiManage.post(`/applications/${id}/pages`, data)
}

export function apiDeleteApplication(id) {
  return apiManage.delete(`/applications/${id}`)
}

export function apiUpdateStatus(id, data) {
  return apiManage.put(`applications/approve-reject/${id}`, data)
}

export function apiUpdateApplicationById(id, data) {
  return apiManage.put(`/applications/${id}`, data)
}

export function apiFetchApplicationById(id) {
  return apiManage.get(`/applications/${id}`)
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
