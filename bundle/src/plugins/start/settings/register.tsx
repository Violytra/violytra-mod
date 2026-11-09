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
import ViolytraDiscordSetting from './definitions/ViolytraDiscordSetting'
import ViolytraLicenseSetting from './definitions/ViolytraLicenseSetting'
import ViolytraSetting from './definitions/ViolytraSetting'
import ViolytraSourceRepositorySetting from './definitions/ViolytraSourceRepositorySetting'
import ViolytraVersionSetting from './definitions/ViolytraVersionSetting'

registerSettingsItems({
    [Setting.Violytra]: ViolytraSetting,
    [Setting.ViolytraSourceRepository]: ViolytraSourceRepositorySetting,
    [Setting.ViolytraLicense]: ViolytraLicenseSetting,
    [Setting.ViolytraDiscord]: ViolytraDiscordSetting,
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
