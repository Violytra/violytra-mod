import { RouteNames, Setting } from '../constants'
import defer * as ViolytraThemesGroupSettingScreen from '../screens/ViolytraThemesGroupSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

/** Complete option list for a single group. Opened from "See all"; omitted from main settings list. */
const ViolytraThemesGroupSetting: SettingsItem = {
	parent: null,
	type: 'route',
	useTitle: () => 'Theme Group',
	unsearchable: true,
	screen: {
		route: RouteNames[Setting.ViolytraThemesGroup],
		getComponent: () => ViolytraThemesGroupSettingScreen.default,
	},
}

export default ViolytraThemesGroupSetting

