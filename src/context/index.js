import { createContext } from 'react'

import { AuthenticationStore } from './AuthenticationStore'
import { ApplicationStore } from './ApplicationStore'

export const storesContext = createContext({
  authenticationStore: new AuthenticationStore(),
  applicationStore: new ApplicationStore(),
})
