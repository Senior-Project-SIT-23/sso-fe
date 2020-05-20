import axios from 'axios'

const createInstance = () => {
  if (Cookies.get('accessToken')) {
    return axios.create({
      baseURL: ENV.PATH_BE,
      headers: {
        Authorization: `Bearer ${Cookies.get('accessToken')}`,
        'Content-Type': 'application/json'
      }
    })
  } else {
    return axios.create({
      baseURL: ENV.PATH_BE,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
}

const handleResponse = res =>
  !res.data.error
    ? Promise.resolve(res)
    : Promise.reject(new Error(res.data.error))

const catchError = err => Promise.reject(err)

export default {
  get: path =>
    createInstance()
      .get(path)
      .then(handleResponse)
      .catch(catchError),

  post: (path, body = {}) =>
    createInstance()
      .request({
        url: path,
        method: 'POST',
        data: body
      })
      .then(handleResponse)
      .catch(catchError),

  put: (path, body = {}) =>
    createInstance()
      .request({
        url: path,
        method: 'PUT',
        data: body
      })
      .then(handleResponse)
      .catch(catchError),

  delete: (path, body = {}) =>
    createInstance()
      .request({
        url: path,
        method: 'DELETE',
        data: body
      })
      .then(handleResponse)
      .catch(catchError)
}
