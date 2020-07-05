import api from '.././utils/libs/connectApi'

export function checkClientId(client_id) {
  return api.get(`/applications/${client_id}`)
}
