import {
    callNativeMethod,
    callNativeMethodSync,
} from '@violytra/modules/native'
import { debounce } from '@violytra/utils/callback'
import type { Metro } from '@violytra/modules/types'
import type { Asset } from './types'

const ExpectedCacheVersion = 2

export const Uncached: Cache = {
    data: {},
    version: ExpectedCacheVersion,
}

// In-memory cache
export let cache: Cache =
    callNativeMethodSync('violytra.caches.assets.read', []) ?? Uncached

if (cache.version !== ExpectedCacheVersion) {
    Uncached.outdated = true
    cache = Uncached
}

export interface Cache {
    data: {
        [key: Asset['name']]: {
            [key: Asset['type']]: Metro.ModuleID
        }
    }
    version: number
    /** Indicates if the loader cache on an outdated format */
    outdated?: boolean
}

const save = debounce(() => {
    callNativeMethod('violytra.caches.assets.write', [cache.data])
}, 1000)

/**
 * Whether the cache has every packager asset. Saving before complete would save a partial cache,
 * used by subsequent loads causing issues like assets not being found.
 */
let complete = cache !== Uncached

export function markCacheComplete() {
    complete = true
    save()
}

export function cacheAsset(asset: Asset, moduleId: Metro.ModuleID) {
    const reg = (cache.data[asset.name] ??= {})
    reg[asset.type] = moduleId

    if (complete) save()
}

declare module '@violytra/modules/native' {
    interface NativeMethods {
        'violytra.caches.assets.read': [[], Cache | null]
        'violytra.caches.assets.write': [[data: Cache['data']], void]
    }
}
