import { RouteNames, Setting } from '../constants'
import defer * as ViolytraThemesBackgroundSettingScreen from '../screens/ViolytraThemesBackgroundSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

/** Background overrides. Opened from the Colors page; omitted from main settings list. */
const ViolytraThemesBackgroundSetting: SettingsItem = {
	parent: null,
	type: 'route',
	useTitle: () => 'Background',
	unsearchable: true,
	screen: {
		route: RouteNames[Setting.ViolytraThemesBackground],
		getComponent: () => ViolytraThemesBackgroundSettingScreen.default,
	},
}

export default ViolytraThemesBackgroundSetting

