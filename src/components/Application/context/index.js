import { createContext } from 'react'

import { ApplicationStore } from './ApplicationStore'

export const applicationStoreStoresContext = createContext({
  applicationStore: new ApplicationStore(),
})
