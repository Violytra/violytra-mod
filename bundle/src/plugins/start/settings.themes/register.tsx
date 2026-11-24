import {
	addSettingsItemToSection,
	refreshSettings,
	registerSettingsItems,
} from '@violytra/discord/modules/settings'
import { Setting } from './constants'
import ViolytraThemesBackgroundSetting from './definitions/ViolytraThemesBackgroundSetting'
import ViolytraThemesBrowseSetting from './definitions/ViolytraThemesBrowseSetting'
import ViolytraThemesFontFamiliesSetting from './definitions/ViolytraThemesFontFamiliesSetting'
import ViolytraThemesFontFamilySetting from './definitions/ViolytraThemesFontFamilySetting'
import ViolytraThemesGroupSetting from './definitions/ViolytraThemesGroupSetting'
import ViolytraThemesKindSetting from './definitions/ViolytraThemesKindSetting'
import ViolytraThemesPluginsSetting from './definitions/ViolytraThemesPluginsSetting'
import ViolytraThemesSetting from './definitions/ViolytraThemesSetting'

export default function register() {
	const unregisterItems = registerSettingsItems({
		[Setting.ViolytraThemes]: ViolytraThemesSetting,
		[Setting.ViolytraThemesKind]: ViolytraThemesKindSetting,
		[Setting.ViolytraThemesGroup]: ViolytraThemesGroupSetting,
		[Setting.ViolytraThemesFontFamilies]: ViolytraThemesFontFamiliesSetting,
		[Setting.ViolytraThemesFontFamily]: ViolytraThemesFontFamilySetting,
		[Setting.ViolytraThemesPlugins]: ViolytraThemesPluginsSetting,
		[Setting.ViolytraThemesBrowse]: ViolytraThemesBrowseSetting,
		[Setting.ViolytraThemesBackground]: ViolytraThemesBackgroundSetting,
	})
	const removeFromSection = addSettingsItemToSection(
		'VIOLYTRA',
		Setting.ViolytraThemes,
		2,
	)

	refreshSettings()

	return () => {
		removeFromSection()
		unregisterItems()
		refreshSettings()
	}
}


