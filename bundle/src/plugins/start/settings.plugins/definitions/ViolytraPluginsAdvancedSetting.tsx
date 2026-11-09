import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { RouteNames, Setting } from '../constants'
import defer * as ViolytraPluginsAdvancedSettingScreen from '../screens/ViolytraPluginsAdvancedSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraPluginsAdvancedSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="SettingsIcon" />,
    useTitle: () => 'Advanced',
    screen: {
        route: RouteNames[Setting.ViolytraPluginsAdvanced],
        getComponent: () => ViolytraPluginsAdvancedSettingScreen.default,
    },
}

export default ViolytraPluginsAdvancedSetting
