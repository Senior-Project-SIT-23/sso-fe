import _ from 'lodash'

export function getAuthFormData(values) {
  const formData = new FormData()

  formData.append('username', _.get(values, 'username'))
  formData.append('password', _.get(values, 'password'))

  return formData
}
