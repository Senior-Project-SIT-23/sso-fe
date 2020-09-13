import { observable, action, computed } from 'mobx'
import { apiFetchApplicationById, apiUpdateApplicationById } from '../../../service/applicationService'

export class ApplicationDetail {
  @observable app = {}

  @computed get application() {
    return this.app
  }

  @action async fetchAllApplication(id) {
    try {
      const { data } = await apiFetchApplicationById(id)
      this.setApplication(data)
    } catch (error) {}
  }

  @action setApplication(data) {
    this.app = data
  }

  @action async updateApplication(id, data) {
    await apiUpdateApplicationById(id, data)
  }
}
