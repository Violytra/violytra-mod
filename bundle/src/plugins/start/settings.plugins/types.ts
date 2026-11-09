import type { RouteNames, Setting } from './constants'

declare module '@violytra/externals/react-navigation' {
    interface ReactNavigationParamList extends PluginsSettingsParamList {}
}

type PluginsSettingsParamList = {
    [K in (typeof RouteNames)[keyof typeof RouteNames]]: object
} & {
    [K in (typeof RouteNames)[(typeof Setting)['ViolytraPlugins']]]: {
        sort?: string
        filter?: string[]
        matchAll?: boolean
        reverse?: boolean
    }
}
