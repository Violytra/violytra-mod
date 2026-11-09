export const Setting = {
    // MAIN SETTINGS

    Violytra: 'Violytra',

    // SUBSETTINGS

    ViolytraDiscord: 'ViolytraDiscord',
    ViolytraSourceRepository: 'ViolytraSourceRepository',
    ViolytraLicense: 'ViolytraLicense',
    Reload: 'Reload',
    ViolytraDeveloperMode: 'ViolytraDeveloperMode',
    ViolytraEnterRecoveryMode: 'ViolytraEnterRecoveryMode',

    ViolytraVersion: 'ViolytraVersion',
    ReactVersion: 'ReactVersion',
    ReactNativeVersion: 'ReactNativeVersion',
    HermesVersion: 'HermesVersion',
    LoaderVersion: 'LoaderVersion',
} as const

export const RouteNames = {
    [Setting.Violytra]: 'Violytra',
} as const
