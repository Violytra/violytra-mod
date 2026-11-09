import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { RouteNames, Setting } from '../constants'
import defer * as ViolytraPluginsBrowseSettingScreen from '../screens/ViolytraPluginsBrowseSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraPluginsBrowseSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="PlusLargeIcon" />,
    useTitle: () => 'Browse Plugins',
    screen: {
        route: RouteNames[Setting.ViolytraPluginsBrowse],
        getComponent: () => ViolytraPluginsBrowseSettingScreen.default,
    },
}

export default ViolytraPluginsBrowseSetting
