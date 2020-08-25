import axios from 'axios'
import Cookie from 'js-cookie'

const createInstance = (headers) => {
  if (Cookie.get(process.env.REACT_APP_ACCESS_TOKEN_NAME)) {
    return axios.create({
      baseURL: process.env.REACT_APP_BE,
      headers: {
        Authorization: `Bearer ${Cookie.get(process.env.REACT_APP_ACCESS_TOKEN_NAME)}`,
        'Content-Type': 'application/json',
      },
    })
  } else {
    return axios.create({
      baseURL: process.env.REACT_APP_BE,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
}

const handleResponse = (res) => (!res.data.error ? Promise.resolve(res) : Promise.reject(new Error(res)))

const catchError = (err) => {
  return Promise.reject(err)
}

export default {
  get: (path, headers = {}) => createInstance(headers).get(path).then(handleResponse).catch(catchError),
  post: (path, body = {}, headers = {}) =>
    createInstance(headers)
      .request({
        url: path,
        method: 'POST',
        data: body,
      })
      .then(handleResponse)
      .catch(catchError),
  put: (path, body = {}, headers = {}) =>
    createInstance(headers)
      .request({
        url: path,
        method: 'PUT',
        data: body,
      })
      .then(handleResponse)
      .catch(catchError),
  delete: (path, body = {}, headers = {}) =>
    createInstance(headers)
      .request({
        url: path,
        method: 'DELETE',
      })
      .then(handleResponse)
      .catch(catchError),
}
