import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { reloadApp } from '@violytra/modules/native/app'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ReloadSetting: SettingsItem = {
    parent: Setting.Violytra,
    IconComponent: () => <TableRowAssetIcon name="RetryIcon" />,
    useTitle: () => 'Reload App',
    onPress: () => {
        reloadApp()
    },
    type: 'pressable',
}

export default ReloadSetting
