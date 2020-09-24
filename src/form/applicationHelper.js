import _ from 'lodash'

export function getStatusFormData(status) {
  const formData = new FormData()
  const data = {
    status: status ? 'approve' : 'reject',
  }
  formData.append('data', JSON.stringify(data))

  return formData
}

export function getCreateApplicationFormData(values) {
  const formData = new FormData()

  const data = {
    name: _.get(values, 'name'),
    detail: _.get(values, 'detail'),
  }
  formData.append('data', JSON.stringify(data))

  return formData
}
