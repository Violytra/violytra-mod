import { defineLazyProperty } from '@violytra/utils/object'
import type { InitPluginApi } from '@violytra/plugins/types'

export function init({
    decorate,
    unscoped: {
        discord: {
            common: {
                logger: { Logger },
            },
        },
    },
}: InitPluginApi) {
    decorate(plugin => {
        defineLazyProperty(
            plugin.api,
            'logger',
            () => new Logger(`Violytra > Plugins (${plugin.manifest.id})`),
        )
    })
}
