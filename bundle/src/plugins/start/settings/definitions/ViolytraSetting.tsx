import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { FullVersion } from '~/constants'
import ViolytraIcon from '~assets/ViolytraIcon'
import { RouteNames, Setting } from '../constants'
import defer * as ViolytraSettingScreen from '../screens/ViolytraSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon id={ViolytraIcon} />,
    useTitle: () => 'Violytra',
    useTrailing: () => FullVersion,
    screen: {
        route: RouteNames[Setting.Violytra],
        getComponent: () => ViolytraSettingScreen.default,
    },
}

export default ViolytraSetting
