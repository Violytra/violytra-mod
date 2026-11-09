import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { BuildEnvironment, FullVersion } from '~/constants'
import ViolytraIcon from '~assets/ViolytraIcon'
import { Setting } from '../constants'
import { CopyableSetting } from './shared'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraVersionSetting: SettingsItem = CopyableSetting(
    {
        parent: Setting.Violytra,
        IconComponent: () => <TableRowAssetIcon id={ViolytraIcon} />,
        useTitle: () => 'Violytra',
    },
    () => `${FullVersion} (${BuildEnvironment})`,
)

export default ViolytraVersionSetting
