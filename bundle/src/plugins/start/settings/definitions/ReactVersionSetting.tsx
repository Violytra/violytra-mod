import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { version } from 'react'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ReactVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Violytra,
        IconComponent: () => <TableRowAssetIcon name="ScienceIcon" />,
        useTitle: () => 'React',
    },
    () => version,
)

export default ReactVersionSetting
