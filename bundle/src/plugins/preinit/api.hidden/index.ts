/// <reference path="../../../../types/globals.hidden.ts" />

import { hiddenApi } from '@violytra/hidden'
import { registerInternalPlugin } from '@violytra/plugins/_'
import manifest from './manifest.json'

const pluginHiddenApi = registerInternalPlugin(manifest, {
    preInit({ cleanup, unscoped }) {
        globalThis.violytra = unscoped
        unscoped.hidden = hiddenApi

        cleanup(() => {
            // biome-ignore lint/performance/noDelete: We want to remove the API completely
            delete globalThis.violytra
            // biome-ignore lint/performance/noDelete: We want to remove the API completely
            delete unscoped.hidden
        })
    },
})

export default pluginHiddenApi
