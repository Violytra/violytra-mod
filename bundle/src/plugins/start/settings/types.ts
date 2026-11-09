import type { RouteNames } from './constants'

declare module '@violytra/externals/react-navigation' {
    interface ReactNavigationParamList extends ViolytraSettingsParamList {}
}

type ViolytraSettingsParamList = {
    [K in (typeof RouteNames)[keyof typeof RouteNames]]: object
}
