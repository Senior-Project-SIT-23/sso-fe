import { observable, action, computed } from 'mobx'
import { getCreateApplicationFormData } from '../../../form/applicationHelper'
import { apiCreateApplication, apiDeleteApplication, apiFetchAllMyApplication } from '../../../service/applicationService'

export class ApplicationStore {
  @observable applications = []

  @computed get applicationAll() {
    return this.applications
  }

  @action async fetchAllApplication() {
    try {
      const { data } = await apiFetchAllMyApplication()
      this.setApplicationAll(data)
    } catch (error) {}
  }

  @action setApplicationAll(data) {
    this.applications = data
  }

  @action async deleteApplication(id) {
    await apiDeleteApplication(id)
  }

  @action async createApplication(data) {
    await apiCreateApplication(data)
  }
}
