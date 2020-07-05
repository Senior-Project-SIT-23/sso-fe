import { observable, action, computed } from 'mobx'
import { checkClientId as apiCheckClientId } from '../service/applicationService'

export class ApplicationStore {
  @observable app = null
  @observable uri = null

  @computed get currentApp() {
    return this.app
  }

  @computed get redirectURI() {
    return this.uri
  }

  @action setCurrentApp(data) {
    this.app = data
  }

  @action setRedirectURI(uri) {
    this.uri = uri
  }

  @action async checkClientId(client_id) {
    const response = await apiCheckClientId(client_id)
    return response
  }
}
