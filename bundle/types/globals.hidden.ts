import type {
    UnscopedInitPluginApi,
    UnscopedPluginApi,
    UnscopedPreInitPluginApi,
} from '@violytra/plugins/types'

declare global {
    export var violytra:
        | UnscopedPreInitPluginApi
        | UnscopedInitPluginApi
        | UnscopedPluginApi
        | undefined
}
