/// <reference types="@violytra/types/plugins/settings.plugins" />

import { ToastActionCreators } from '@violytra/discord/actions'
import { Design } from '@violytra/discord/design'
import { onSettingsModulesLoaded } from '@violytra/discord/modules/settings'
import { ReactNavigationNative } from '@violytra/externals/react-navigation'
import { registerInternalPlugin } from '@violytra/plugins/_'
import { lookupGeneratedIconComponent } from '@violytra/utils/discord'
import { RouteNames, Setting } from './constants'
import manifest from './manifest.json'
import { isThemePlugin } from './utils/plugins'
import type { PluginApi, PreInitPluginApi } from '@violytra/plugins/types'

export let themesInternal: PreInitPluginApi['themesInternal']
export let pluginSettings: PluginApi['pluginSettings']

interface Settings {
	guideShownAt?: number
}

registerInternalPlugin<{ jsonStorage: Settings }>(manifest, {
	jsonStorage: {
		load: true,
	},
	preInit({ themesInternal: internal }) {
		themesInternal = internal
	},
	start({ cleanup, pluginSettings: settings, plugin }) {
		pluginSettings = settings
		// Manage theme plugins under Themes instead of standard plugins settings
		settings.claimPlugins(isThemePlugin)
		cleanup(
			onSettingsModulesLoaded(() => {
				// @as-require
				import('./register')
			}),
		)

		if (plugin.startedLate) {
			ToastActionCreators.open('Violytra_THEMES_GUIDE', {
				icon: lookupGeneratedIconComponent('LightbulbIcon'),
				text: (
					<Design.Text variant="text-md/normal" color="text-strong">
						You can now access:{' \n'}
						<Design.Text variant="text-md/bold">
							Settings &gt; Violytra &gt; Themes
						</Design.Text>
					</Design.Text>
				),
				duration: 10000,
			})
		}
	},
	SettingsComponent: () => {
		const navigation = ReactNavigationNative.useNavigation()
		navigation.replace(RouteNames[Setting.ViolytraThemes])

		return (
			<Design.Text>This page isn't supposed to exist. :clueless:</Design.Text>
		)
	},
})
