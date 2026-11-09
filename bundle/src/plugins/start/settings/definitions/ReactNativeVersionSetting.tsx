import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Setting } from '../constants'
import { CopyableSetting, getRNVersion } from './shared'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ReactNativeVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Violytra,
        IconComponent: () => <TableRowAssetIcon name="ScienceIcon" />,
        useTitle: () => 'React Native',
    },
    getRNVersion,
)

export default ReactNativeVersionSetting
