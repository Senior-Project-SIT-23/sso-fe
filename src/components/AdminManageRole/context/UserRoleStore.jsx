import { observable, action, computed } from 'mobx'
import { getUserRoleFormData } from '../../../form/userHelper'
import { apiAddUsersRole, apiFetchAllRole, apiFetchAllUsersWithRole, apiFetchUserByID, apiRemoveUsersRole } from '../../../service/userService'
export class UserRoleStore {
  @observable usersRole = []
  @observable roles = []
  @observable user = {}

  @computed get currentUser() {
    return this.user
  }

  @action async setRoles(data) {
    this.roles = data
  }

  @action async setUser(data) {
    this.user = data
  }

  @action async setUsersRole(data) {
    this.usersRole = data
  }

  @action async fetchUserByID(id) {
    const { data } = await apiFetchUserByID(id)
    this.setUser(data)
  }

  @action async fetchRoles() {
    const { data } = await apiFetchAllRole()
    this.setRoles(data)
  }

  @action async fetchUserRoles() {
    const { data } = await apiFetchAllUsersWithRole()
    this.setUsersRole(data)
  }
  @action async handleChangeRole(hasRole, role_id, user_id) {
    const data = {
      user_id,
      role_id,
    }
    if (!hasRole) {
      await apiAddUsersRole(getUserRoleFormData(data))
    } else {
      await apiRemoveUsersRole(getUserRoleFormData(data))
    }
  }
}
