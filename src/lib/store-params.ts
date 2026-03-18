import { createLoader } from 'nuqs/server'

import { storeParamsParsers } from './store-params-parsers'

export { storeParamsParsers }
export const loadStoreParams = createLoader(storeParamsParsers)
export type StoreParams = Awaited<ReturnType<typeof loadStoreParams>>
