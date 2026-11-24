import { RouteNames, Setting } from '../constants'
import * as ViolytraThemesFontFamiliesSettingScreen from '../screens/ViolytraThemesFontFamiliesSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

/** Displays all font families supplied by registered packs. Opened from Fonts page; omitted from main settings list. */
const ViolytraThemesFontFamiliesSetting: SettingsItem = {
	parent: null,
	type: 'route',
	useTitle: () => 'Font Families',
	unsearchable: true,
	screen: {
		route: RouteNames[Setting.ViolytraThemesFontFamilies],
		getComponent: () => ViolytraThemesFontFamiliesSettingScreen.default,
	},
}

export default ViolytraThemesFontFamiliesSetting

