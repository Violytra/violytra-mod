import defer * as DiscordActions from '@violytra/discord/actions'
import defer * as DiscordCommonConstants from '@violytra/discord/common/constants'
import defer * as DiscordCommonFlux from '@violytra/discord/common/flux'
import defer * as DiscordCommonLogger from '@violytra/discord/common/logger'
import defer * as DiscordCommonTokens from '@violytra/discord/common/tokens'
import defer * as DiscordDesign from '@violytra/discord/design'
import defer * as DiscordFlux from '@violytra/discord/flux'
import defer * as DiscordModulesMainTabsV2 from '@violytra/discord/modules/main_tabs_v2'
import defer * as DiscordNative from '@violytra/discord/native'
import defer * as DiscordUtilsFinders from '@violytra/discord/utils/modules/finders'
import defer * as DiscordUtilsMetroSubscriptions from '@violytra/discord/utils/modules/metro/subscriptions'
import { defineLazyProperties } from '@violytra/utils/object'
import { guardIndexInitialized } from '.'

export interface PreInitPluginApiDiscord {
    actions: PluginApiDiscord.Actions
    common: PreInitPluginApiDiscordCommon
    design: PluginApiDiscord.Design
    flux: PluginApiDiscord.Flux
    modules: PluginApiDiscord.Modules
    native: PluginApiDiscord.Native
    utils: PluginApiDiscord.Utils
}

export interface InitPluginApiDiscord extends PreInitPluginApiDiscord {
    common: InitPluginApiDiscordCommon
}

interface PreInitPluginApiDiscordCommon {
    appStartPerformance: typeof import('@violytra/discord/common/app-start-performance')
    importTracker: typeof import('@violytra/discord/common/import-tracker')
    utils: typeof import('@violytra/discord/common/utils')
    /** This API is available in and after the `init` phase. */
    constants: unknown
    /** This API is available in and after the `init` phase. */
    flux: unknown
    /** This API is available in and after the `init` phase. */
    logger: unknown
    /** This API is available in and after the `init` phase. */
    tokens: unknown
}

interface InitPluginApiDiscordCommon extends PreInitPluginApiDiscordCommon {
    constants: typeof import('@violytra/discord/common/constants')
    flux: typeof import('@violytra/discord/common/flux')
    logger: typeof import('@violytra/discord/common/logger')
    tokens: typeof import('@violytra/discord/common/tokens')
}

export type PluginApiDiscord = PreInitPluginApiDiscord | InitPluginApiDiscord

export namespace PluginApiDiscord {
    export type Actions = typeof import('@violytra/discord/actions')
    export type Common =
        | PreInitPluginApiDiscordCommon
        | InitPluginApiDiscordCommon
    export type Design = typeof import('@violytra/discord/design')
    export type Flux = typeof import('@violytra/discord/flux')
    export type Native = typeof import('@violytra/discord/native')

    export interface Utils {
        modules: {
            finders: typeof import('@violytra/discord/utils/modules/finders')
            metro: {
                subscriptions: typeof import('@violytra/discord/utils/modules/metro/subscriptions')
            }
        }
    }

    export interface Modules {
        mainTabsV2: typeof import('@violytra/discord/modules/main_tabs_v2')
        settings: typeof import('@violytra/discord/modules/settings') & {
            renderer: typeof import('@violytra/discord/modules/settings/renderer')
        }
    }
}

export const discord = defineLazyProperties(
    {
        common: defineLazyProperties(
            {
                appStartPerformance: require('@violytra/discord/common/app-start-performance'),
                importTracker: require('@violytra/discord/common/import-tracker'),
                utils: require('@violytra/discord/common/utils'),
            } as InitPluginApiDiscordCommon,
            {
                constants: () => {
                    guardIndexInitialized('Discord.common.constants')
                    return DiscordCommonConstants
                },
                flux: () => {
                    guardIndexInitialized('Discord.common.flux')
                    return DiscordCommonFlux
                },
                logger: () => {
                    guardIndexInitialized('Discord.common.logger')
                    return DiscordCommonLogger
                },
                tokens: () => {
                    guardIndexInitialized('Discord.common.tokens')
                    return DiscordCommonTokens
                },
            },
        ),
        modules: defineLazyProperties({} as PluginApiDiscord.Modules, {
            mainTabsV2: () => {
                return DiscordModulesMainTabsV2
            },
            settings: () => ({
                ...require('@violytra/discord/modules/settings'),
                renderer: require('@violytra/discord/modules/settings/renderer'),
            }),
        }),
        utils: {
            modules: {
                finders: DiscordUtilsFinders,
                metro: {
                    subscriptions: DiscordUtilsMetroSubscriptions,
                },
            },
        },
    } as PluginApiDiscord,
    {
        actions: () => {
            guardIndexInitialized('Discord.actions')
            return DiscordActions
        },
        flux: () => {
            return DiscordFlux
        },
        design: () => {
            guardIndexInitialized('Discord.design')
            return DiscordDesign
        },
        native: () => {
            return DiscordNative
        },
    },
)
