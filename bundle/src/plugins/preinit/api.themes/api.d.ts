import type { ThemesApi } from '@violytra/themes-api/types'

declare module '@violytra/plugins/types' {
	interface PreInitPluginApi<
		O extends PluginApiExtensionsOptions = PluginApiExtensionsOptions,
	> {
		themes: ThemesApi
	}
}

