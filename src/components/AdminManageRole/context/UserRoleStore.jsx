import { observable, action, computed } from 'mobx'
import { apiFetchAllRole, apiFetchAllUsersWithRole } from '../../../service/userService'
export class UserRoleStore {
  @observable usersRole = []
  @observable roles = []

  @action async setRoles(data) {
    this.roles = data
  }
  @action async setUsersRole(data) {
    this.usersRole = data
  }

  @action async fetchRoles() {
    const { data } = await apiFetchAllRole()
    this.setRoles(data)
  }
  @action async fetchUserRoles() {
    const { data } = await apiFetchAllUsersWithRole()
    this.setUsersRole(data)
  }
}
