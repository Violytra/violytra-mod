export const Setting = {
    ViolytraPlugins: 'ViolytraPlugins',
    ViolytraPluginsAdvanced: 'ViolytraPluginsAdvanced',
    ViolytraPluginsBrowse: 'ViolytraPluginsBrowse',
    ViolytraPluginsUpdates: 'ViolytraPluginsUpdates',
} as const

export const RouteNames = {
    [Setting.ViolytraPlugins]: 'Violytra Plugins',
    [Setting.ViolytraPluginsAdvanced]: 'Violytra Plugins Advanced',
    [Setting.ViolytraPluginsBrowse]: 'Browse Plugins',
    [Setting.ViolytraPluginsUpdates]: 'Plugin Updates',
} as const
