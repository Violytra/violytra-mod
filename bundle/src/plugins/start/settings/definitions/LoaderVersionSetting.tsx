import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { getBridgeInfo } from '@violytra/modules/native'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const bridgeInfo = getBridgeInfo()

const LoaderVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Violytra,
        IconComponent: () => <TableRowAssetIcon name="SendMessageIcon" />,
        useTitle: () => 'Loader',
        usePredicate: () => Boolean(bridgeInfo),
    },
    () => `${bridgeInfo!.name} (${bridgeInfo!.version})`,
)

export default LoaderVersionSetting
