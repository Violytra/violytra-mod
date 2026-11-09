import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { reloadApp } from '@violytra/modules/native/app'
import {
    isDefaultsOnlyBoot,
    requestNextBootDefaultsOnly,
} from '@violytra/plugins/_'
import { Setting } from '~plugins/start/settings/constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraEnterRecoveryModeSetting: SettingsItem = {
    parent: Setting.Violytra,
    type: 'pressable',
    useIsDisabled: () => isDefaultsOnlyBoot,
    useTitle: () => 'Enter Recovery Mode',
    useDescription: () =>
        isDefaultsOnlyBoot
            ? 'Currently in Recovery Mode. Reload to exit.'
            : 'Run Violytra with default plugins only for one boot. Use if plugins are causing issues.',
    IconComponent: () => <TableRowAssetIcon name="ShieldIcon" />,
    onPress: () => {
        requestNextBootDefaultsOnly()
        reloadApp()
    },
}

export default ViolytraEnterRecoveryModeSetting
