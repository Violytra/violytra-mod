import {
    registerSettingsItems,
    registerSettingsSection,
} from '@violytra/discord/modules/settings'
import { Setting } from './constants'
import HermesVersionSetting from './definitions/HermesVersionSetting'
import LoaderVersionSetting from './definitions/LoaderVersionSetting'
import ReactNativeVersionSetting from './definitions/ReactNativeVersionSetting'
import ReactVersionSetting from './definitions/ReactVersionSetting'
import ReloadSetting from './definitions/ReloadSetting'
import ViolytraDeveloperModeSetting from './definitions/ViolytraDeveloperModeSetting'
import ViolytraChangelogSetting from './definitions/ViolytraChangelogSetting'
import ViolytraDiscordSetting from './definitions/ViolytraDiscordSetting'
import ViolytraLicenseSetting from './definitions/ViolytraLicenseSetting'
import ViolytraPluginsSetting from './definitions/ViolytraPluginsSetting'
import ViolytraSetting from './definitions/ViolytraSetting'
import ViolytraSourceRepositorySetting from './definitions/ViolytraSourceRepositorySetting'
import ViolytraVersionSetting from './definitions/ViolytraVersionSetting'
import ViolytraWebsiteSetting from './definitions/ViolytraWebsiteSetting'

registerSettingsItems({
    [Setting.Violytra]: ViolytraSetting,
    [Setting.ViolytraSourceRepository]: ViolytraSourceRepositorySetting,
    [Setting.ViolytraDiscord]: ViolytraDiscordSetting,
    [Setting.ViolytraWebsite]: ViolytraWebsiteSetting,
    [Setting.ViolytraPlugins]: ViolytraPluginsSetting,
    [Setting.ViolytraChangelog]: ViolytraChangelogSetting,
    [Setting.ViolytraLicense]: ViolytraLicenseSetting,
    [Setting.Reload]: ReloadSetting,
    [Setting.ViolytraDeveloperMode]: ViolytraDeveloperModeSetting,
    [Setting.ViolytraVersion]: ViolytraVersionSetting,
    [Setting.ReactVersion]: ReactVersionSetting,
    [Setting.ReactNativeVersion]: ReactNativeVersionSetting,
    [Setting.HermesVersion]: HermesVersionSetting,
    [Setting.LoaderVersion]: LoaderVersionSetting,
})

registerSettingsSection('VIOLYTRA', {
    label: 'Violytra',
    settings: [Setting.Violytra],
})
