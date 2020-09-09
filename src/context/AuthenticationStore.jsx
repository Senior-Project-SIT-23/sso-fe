import { observable, action, computed } from 'mobx'
import Cookies from 'js-cookie'
import { login, logout, fetchMe } from '../service/auth'

export class AuthenticationStore {
  @observable user = null

  @computed get currentUser() {
    return this.user
  }

  @computed get is_auth() {
    const accessToken = Cookies.get(process.env.REACT_APP_ACCESS_TOKEN_NAME)
    return accessToken
  }

  @action async me() {
    try {
      const { data } = await fetchMe()
      this.setCurrentUser(data)
      return data
    } catch (error) {
      this.removeToken()
      return false
    }
  }

  @action setCurrentUser(user) {
    this.user = user
  }

  @action async signIn(formData) {
    const response = await login(formData)
    const { token } = response.data
    console.log(token)
    this.setToken(token)
    return response
  }

  @action async signOut() {
    await logout()
    this.user = null
    this.removeToken()
    window.location.reload()
  }

  @action setToken(token) {
    Cookies.set(process.env.REACT_APP_ACCESS_TOKEN_NAME, token)
  }

  @action removeToken() {
    Cookies.remove(process.env.REACT_APP_ACCESS_TOKEN_NAME)
  }
}
