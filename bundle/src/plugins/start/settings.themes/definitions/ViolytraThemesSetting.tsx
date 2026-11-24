import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { RouteNames, Setting } from '../constants'
import * as ViolytraThemesSettingScreen from '../screens/ViolytraThemesSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraThemesSetting: SettingsItem = {
	parent: null,
	type: 'route',
	IconComponent: () => <TableRowAssetIcon name="PaintPaletteIcon" />,
	useTitle: () => 'Themes',
	screen: {
		route: RouteNames[Setting.ViolytraThemes],
		getComponent: () => ViolytraThemesSettingScreen.default,
	},
}

export default ViolytraThemesSetting

