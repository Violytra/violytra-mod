import * as UtilsBitset from '@violytra/utils/bitset'
import * as UtilsCallback from '@violytra/utils/callback'
import defer * as UtilsDiscord from '@violytra/utils/discord'
import * as UtilsError from '@violytra/utils/error'
import * as UtilsObject from '@violytra/utils/object'
import * as UtilsPromise from '@violytra/utils/promise'
import * as UtilsProxy from '@violytra/utils/proxy'
import * as UtilsReact from '@violytra/utils/react'
import * as UtilsTree from '@violytra/utils/tree'
import { guardIndexInitialized } from '.'
import type { PluginApiUtils } from '@violytra/utils/types'

export const utils = UtilsObject.defineLazyProperties(
    {
        bitset: UtilsBitset,
        callback: UtilsCallback,
        error: UtilsError,
        object: UtilsObject,
        promise: UtilsPromise,
        proxy: UtilsProxy,
        tree: UtilsTree,
        react: UtilsReact,
    } as PluginApiUtils,
    {
        discord: () => {
            guardIndexInitialized('utils.discord')
            return UtilsDiscord
        },
    },
)
