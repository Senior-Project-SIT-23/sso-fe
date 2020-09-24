import { observable, action, computed } from 'mobx'
import { getStatusFormData } from '../../../form/applicationHelper'
import { apiFetchAllApprove, apiFetchAllPending, apiFetchAllReject, apiUpdateStatus } from '../../../service/applicationService'

export class ApplicationManageStore {
  @observable pending = []
  @observable reject = []
  @observable approve = []

  @computed get applicationApprove() {
    return this.approve
  }

  @computed get applicationPending() {
    return this.pending
  }

  @computed get applicationReject() {
    return this.reject
  }

  @action async fetchAllPending() {
    try {
      const { data } = await apiFetchAllPending()
      this.setApplicationPending(data)
    } catch (error) {}
  }

  @action async fetchAllApprove() {
    try {
      const { data } = await apiFetchAllApprove()
      this.setApplicationApprove(data)
    } catch (error) {}
  }

  @action async fetchAllReject() {
    try {
      const { data } = await apiFetchAllReject()
      this.setApplicationReject(data)
    } catch (error) {}
  }

  @action setApplicationPending(data) {
    this.pending = data
  }

  @action setApplicationApprove(data) {
    this.approve = data
  }

  @action setApplicationReject(data) {
    this.reject = data
  }

  @action async updateStatusById(id, status) {
    try {
      await apiUpdateStatus(id, getStatusFormData(status))
    } catch (error) {}
  }
}
