import { createContext } from 'react'

import { ApplicationManageStore } from './ApplicationManageStore'

export const applicationMangeStoresContext = createContext({
  applicationManageStore: new ApplicationManageStore(),
})
