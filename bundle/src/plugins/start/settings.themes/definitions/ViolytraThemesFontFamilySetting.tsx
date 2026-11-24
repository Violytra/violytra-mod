import { RouteNames, Setting } from '../constants'
import * as ViolytraThemesFontFamilySettingScreen from '../screens/ViolytraThemesFontFamilySettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

/** Font packs providing a specific font family. Opened from font families page; omitted from main settings list. */
const ViolytraThemesFontFamilySetting: SettingsItem = {
	parent: null,
	type: 'route',
	useTitle: () => 'Font Family',
	unsearchable: true,
	screen: {
		route: RouteNames[Setting.ViolytraThemesFontFamily],
		getComponent: () => ViolytraThemesFontFamilySettingScreen.default,
	},
}

export default ViolytraThemesFontFamilySetting

