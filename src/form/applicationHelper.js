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
    redirect_uri: _.get(values, 'redirect_uri'),
  }
  formData.append('data', JSON.stringify(data))

  return formData
}

export function getPagesFormData(values) {
  const formData = new FormData()
  const data = {
    BACKGROUND_COLOR: _.get(values, 'rightBGColor'),
    BUTTON_COLOR: _.get(values, 'btnColor'),
    BUTTON_TEXT_COLOR: _.get(values, 'btnColorText'),
    BUTTON_HOVER_COLOR: _.get(values, 'btnHover'),
    BUTTON_HOVER_TEXT_COLOR: _.get(values, 'btnHoverColorText'),
    ICON_COLOR: _.get(values, 'iconColor'),
    SIGN_IN_WORD: _.get(values, 'singIn'),
    LABEL_WORD: _.get(values, 'label'),
    IMAGE_URL: _.get(values, 'backgroundImage'),
    TEXT_COLOR: _.get(values, 'color'),
  }
  formData.append('data', JSON.stringify(data))

  return formData
}
