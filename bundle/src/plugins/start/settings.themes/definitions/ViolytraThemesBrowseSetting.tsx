import { TableRowAssetIcon } from '@violytra/components'
import { RouteNames, Setting } from '../constants'
import * as ViolytraThemesBrowseSettingScreen from '../screens/ViolytraThemesBrowseSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

/** Repository theme plugins page. Opened from Themes screen; omitted from main settings list. */
const ViolytraThemesBrowseSetting: SettingsItem = {
	parent: null,
	type: 'route',
	IconComponent: () => <TableRowAssetIcon name="PlusMediumIcon" />,
	useTitle: () => 'Browse Themes',
	screen: {
		route: RouteNames[Setting.ViolytraThemesBrowse],
		getComponent: () => ViolytraThemesBrowseSettingScreen.default,
	},
}

export default ViolytraThemesBrowseSetting

