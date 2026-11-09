import {
    addSettingsItemToSection,
    registerSettingsItems,
} from '@violytra/discord/modules/settings'
import { Setting } from './constants'
import ViolytraPluginsAdvancedSetting from './definitions/ViolytraPluginsAdvancedSetting'
import ViolytraPluginsBrowseSetting from './definitions/ViolytraPluginsBrowseSetting'
import ViolytraPluginsSetting from './definitions/ViolytraPluginsSetting'
import ViolytraPluginsUpdatesSetting from './definitions/ViolytraPluginsUpdatesSetting'

registerSettingsItems({
    [Setting.ViolytraPlugins]: ViolytraPluginsSetting,
    [Setting.ViolytraPluginsAdvanced]: ViolytraPluginsAdvancedSetting,
    [Setting.ViolytraPluginsBrowse]: ViolytraPluginsBrowseSetting,
    [Setting.ViolytraPluginsUpdates]: ViolytraPluginsUpdatesSetting,
})

// The settings plugin registers this section, and it always starts before us (we depend on it).
addSettingsItemToSection('VIOLYTRA', Setting.ViolytraPlugins, 1)
