import { registerInternalPlugin } from '@violytra/plugins/_'
import manifest from './manifest.json'

const GROUP_ID = 'violytra'
const THEME_ID = 'signature'

const BRAND = '#7C5CFC'
const BRAND_DARK = '#5B3FD9'
const BRAND_SOFT = '#A18BFF'
const BG = '#120F1A'
const BG_ALT = '#1A1625'
const BG_SURFACE = '#211C2E'

registerInternalPlugin(manifest, {
	start({ plugin }) {
		plugin.api.themes.registerGroup(GROUP_ID, {
			name: 'Violytra',
			description: 'Themes made for Violytra.',
		})

		plugin.api.themes.registerTheme(GROUP_ID, THEME_ID, {
			name: 'Violytra Signature',
			description: 'A purple Violytra brand theme.',
			getColors() {
				return {
					semantic: {
						dark: {
							'BACKGROUND_PRIMARY': BG_ALT,
							'BACKGROUND_SECONDARY': BG,
							'BACKGROUND_SECONDARY_ALT': BG_ALT,
							'BACKGROUND_TERTIARY': BG,
							'BACKGROUND_ACCENT': BRAND_DARK,
							'BACKGROUND_FLOATING': BG_SURFACE,
							'BACKGROUND_MOBILE_PRIMARY': BG_ALT,
							'BACKGROUND_MOBILE_SECONDARY': BG,
							'BACKGROUND_NESTED_FLOATING': BG_ALT,
							'BACKGROUND_MODIFIER_ACCENT': 'rgba(124, 92, 252, 0.2)',
							'BACKGROUND_MODIFIER_HOVER': 'rgba(124, 92, 252, 0.08)',
							'BACKGROUND_MODIFIER_ACTIVE': 'rgba(124, 92, 252, 0.16)',
							'BACKGROUND_MODIFIER_SELECTED': 'rgba(124, 92, 252, 0.24)',
							'BRAND_260': BRAND_SOFT,
							'BRAND_360': BRAND,
							'BRAND_500': BRAND,
							'BRAND_560': BRAND_DARK,
							'TEXT_BRAND': BRAND_SOFT,
							'TEXT_LINK': BRAND_SOFT,
							'INTERACTIVE_ACTIVE': '#F2EEFF',
							'INTERACTIVE_HOVER': '#DDD2FF',
							'INTERACTIVE_NORMAL': '#B8A7E6',
						},
					},
					raw: {
						'BRAND_260': BRAND_SOFT,
						'BRAND_360': BRAND,
						'BRAND_500': BRAND,
						'BRAND_560': BRAND_DARK,
					},
				}
			},
		})

		plugin.api.themes.registerTheme(GROUP_ID, 'midnight', {
			name: 'Violytra Midnight',
			description: 'A deep AMOLED-black Violytra theme.',
			getColors() {
				return {
					semantic: {
						dark: {
							'BACKGROUND_PRIMARY': '#0B0812',
							'BACKGROUND_SECONDARY': '#050308',
							'BACKGROUND_SECONDARY_ALT': '#0B0812',
							'BACKGROUND_TERTIARY': '#050308',
							'BACKGROUND_ACCENT': BRAND_DARK,
							'BACKGROUND_FLOATING': '#141021',
							'BACKGROUND_MOBILE_PRIMARY': '#0B0812',
							'BACKGROUND_MOBILE_SECONDARY': '#050308',
							'BACKGROUND_NESTED_FLOATING': '#0B0812',
							'BACKGROUND_MODIFIER_ACCENT': 'rgba(124, 92, 252, 0.18)',
							'BACKGROUND_MODIFIER_HOVER': 'rgba(124, 92, 252, 0.08)',
							'BACKGROUND_MODIFIER_ACTIVE': 'rgba(124, 92, 252, 0.14)',
							'BACKGROUND_MODIFIER_SELECTED': 'rgba(124, 92, 252, 0.22)',
							'BRAND_260': BRAND_SOFT,
							'BRAND_360': BRAND,
							'BRAND_500': BRAND,
							'BRAND_560': BRAND_DARK,
							'TEXT_BRAND': BRAND_SOFT,
							'TEXT_LINK': BRAND_SOFT,
							'INTERACTIVE_ACTIVE': '#F2EEFF',
							'INTERACTIVE_HOVER': '#DDD2FF',
							'INTERACTIVE_NORMAL': '#A999D4',
						},
					},
					raw: {
						'BRAND_260': BRAND_SOFT,
						'BRAND_360': BRAND,
						'BRAND_500': BRAND,
						'BRAND_560': BRAND_DARK,
					},
				}
			},
		})
	},
})