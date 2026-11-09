import type { DiscordModules } from '.'

declare module '@violytra/plugins/types' {
    export interface InitPluginApi<O extends PluginApiExtensionsOptions> {
        logger: DiscordModules.Logger
    }
}
