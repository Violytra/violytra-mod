// Initialize init libraries
import '@violytra/react/init'
import '@violytra/json-storage/init'

import { onRunApplication } from '@violytra/react/native'
import { onError } from '~index'

const unsub = onRunApplication(() => {
    unsub()

    try {
        // @as-require
        import('./start')
    } catch (e) {
        onError(e)
    }
})

// Run all init plugins
// @as-require
import '~/plugins/init'
// @as-require
import '@violytra/plugins/init'
