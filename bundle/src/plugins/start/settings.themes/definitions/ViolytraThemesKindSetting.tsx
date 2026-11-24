import { RouteNames, Setting } from '../constants'
import * as ViolytraThemesKindSettingScreen from '../screens/ViolytraThemesKindSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

/** Groups offering a specific theme kind. Opened from dashboard tile; omitted from main settings list. */
const ViolytraThemesKindSetting: SettingsItem = {
	parent: null,
	type: 'route',
	useTitle: () => 'Theme Items',
	unsearchable: true,
	screen: {
		route: RouteNames[Setting.ViolytraThemesKind],
		getComponent: () => ViolytraThemesKindSettingScreen.default,
	},
}

export default ViolytraThemesKindSetting

