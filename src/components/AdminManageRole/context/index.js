import { createContext } from 'react'

import { UserRoleStore } from './UserRoleStore'

export const userRoleStoreStoreStoresContext = createContext({
  userRoleStore: new UserRoleStore(),
})
