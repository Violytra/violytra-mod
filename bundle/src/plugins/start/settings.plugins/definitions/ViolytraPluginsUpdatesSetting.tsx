import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { RouteNames, Setting } from '../constants'
import defer * as ViolytraPluginsUpdatesSettingScreen from '../screens/ViolytraPluginsUpdatesSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraPluginsUpdatesSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="DownloadIcon" />,
    useTitle: () => 'Plugin Updates',
    screen: {
        route: RouteNames[Setting.ViolytraPluginsUpdates],
        getComponent: () => ViolytraPluginsUpdatesSettingScreen.default,
    },
}

export default ViolytraPluginsUpdatesSetting
