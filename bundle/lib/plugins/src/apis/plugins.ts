import * as PluginsApiConstants from '@violytra/plugins/constants'
import * as PluginsApiUtils from '@violytra/plugins/utils'

export interface PluginApiPlugins {
    utils: typeof import('@violytra/plugins/utils')
    constants: typeof import('@violytra/plugins/constants')
}

export const plugins: PluginApiPlugins = {
    constants: PluginsApiConstants,
    utils: PluginsApiUtils,
}
