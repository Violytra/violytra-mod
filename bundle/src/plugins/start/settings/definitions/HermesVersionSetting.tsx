import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const props = HermesInternal.getRuntimeProperties()

const HermesVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Violytra,
        IconComponent: () => <TableRowAssetIcon name="TranscriptOutlineIcon" />,
        useTitle: () => 'Hermes',
    },
    () => `${props['Bytecode Version']} (${props.Build})`,
)

export default HermesVersionSetting
