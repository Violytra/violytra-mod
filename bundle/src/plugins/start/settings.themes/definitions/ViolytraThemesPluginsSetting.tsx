import { RouteNames, Setting } from '../constants'
import defer * as ViolytraThemesPluginsSettingScreen from '../screens/ViolytraThemesPluginsSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

/** Management screen for installed theme plugins. Opened from Themes screen; omitted from main settings list. */
const ViolytraThemesPluginsSetting: SettingsItem = {
	parent: null,
	type: 'route',
	useTitle: () => 'Theme Plugins',
	screen: {
		route: RouteNames[Setting.ViolytraThemesPlugins],
		getComponent: () => ViolytraThemesPluginsSettingScreen.default,
	},
}

export default ViolytraThemesPluginsSetting

