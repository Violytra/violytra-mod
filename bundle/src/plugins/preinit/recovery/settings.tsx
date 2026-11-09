import {
    onSettingsModulesLoaded,
    registerSettingsItem,
} from '@violytra/discord/modules/settings'
import { Setting } from '~plugins/start/settings/constants'
import ViolytraEnterRecoveryModeSetting from './definitions/ViolytraEnterRecoveryModeSetting'

onSettingsModulesLoaded(() => {
    registerSettingsItem(
        Setting.ViolytraEnterRecoveryMode,
        ViolytraEnterRecoveryModeSetting,
    )
})
