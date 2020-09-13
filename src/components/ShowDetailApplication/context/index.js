import { createContext } from 'react'

import { ApplicationDetail } from './ApplicationDetail'

export const applicationDetailStoresContext = createContext({
  applicationDetail: new ApplicationDetail(),
})
