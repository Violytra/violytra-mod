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

		plugin.api.themes.registerTheme(GROUP_ID, 'ocean', {
			name: 'Violytra Ocean',
			description: 'A cool teal-blue Violytra theme.',
			getColors() {
				const accent = '#4CC9F0'
				const accentDark = '#2F9EC2'
				const accentSoft = '#8BE3FF'
				return {
					semantic: {
						dark: {
							'BACKGROUND_PRIMARY': '#0F1820',
							'BACKGROUND_SECONDARY': '#091018',
							'BACKGROUND_SECONDARY_ALT': '#0F1820',
							'BACKGROUND_TERTIARY': '#091018',
							'BACKGROUND_ACCENT': accentDark,
							'BACKGROUND_FLOATING': '#152433',
							'BACKGROUND_MOBILE_PRIMARY': '#0F1820',
							'BACKGROUND_MOBILE_SECONDARY': '#091018',
							'BACKGROUND_NESTED_FLOATING': '#0F1820',
							'BACKGROUND_MODIFIER_ACCENT': 'rgba(76, 201, 240, 0.18)',
							'BACKGROUND_MODIFIER_HOVER': 'rgba(76, 201, 240, 0.08)',
							'BACKGROUND_MODIFIER_ACTIVE': 'rgba(76, 201, 240, 0.14)',
							'BACKGROUND_MODIFIER_SELECTED': 'rgba(76, 201, 240, 0.22)',
							'BRAND_260': accentSoft,
							'BRAND_360': accent,
							'BRAND_500': accent,
							'BRAND_560': accentDark,
							'TEXT_BRAND': accentSoft,
							'TEXT_LINK': accentSoft,
							'INTERACTIVE_ACTIVE': '#EAFBFF',
							'INTERACTIVE_HOVER': '#CFF3FF',
							'INTERACTIVE_NORMAL': '#9BC7D8',
						},
					},
					raw: {
						'BRAND_260': accentSoft,
						'BRAND_360': accent,
						'BRAND_500': accent,
						'BRAND_560': accentDark,
					},
				}
			},
		})

		plugin.api.themes.registerTheme(GROUP_ID, 'rose', {
			name: 'Violytra Rose',
			description: 'A warm rose Violytra theme.',
			getColors() {
				const accent = '#FF6FAE'
				const accentDark = '#D94F8C'
				const accentSoft = '#FFADD0'
				return {
					semantic: {
						dark: {
							'BACKGROUND_PRIMARY': '#1C1018',
							'BACKGROUND_SECONDARY': '#140A12',
							'BACKGROUND_SECONDARY_ALT': '#1C1018',
							'BACKGROUND_TERTIARY': '#140A12',
							'BACKGROUND_ACCENT': accentDark,
							'BACKGROUND_FLOATING': '#281722',
							'BACKGROUND_MOBILE_PRIMARY': '#1C1018',
							'BACKGROUND_MOBILE_SECONDARY': '#140A12',
							'BACKGROUND_NESTED_FLOATING': '#1C1018',
							'BACKGROUND_MODIFIER_ACCENT': 'rgba(255, 111, 174, 0.18)',
							'BACKGROUND_MODIFIER_HOVER': 'rgba(255, 111, 174, 0.08)',
							'BACKGROUND_MODIFIER_ACTIVE': 'rgba(255, 111, 174, 0.14)',
							'BACKGROUND_MODIFIER_SELECTED': 'rgba(255, 111, 174, 0.22)',
							'BRAND_260': accentSoft,
							'BRAND_360': accent,
							'BRAND_500': accent,
							'BRAND_560': accentDark,
							'TEXT_BRAND': accentSoft,
							'TEXT_LINK': accentSoft,
							'INTERACTIVE_ACTIVE': '#FFF0F6',
							'INTERACTIVE_HOVER': '#FFD6E7',
							'INTERACTIVE_NORMAL': '#D8A7BE',
						},
					},
					raw: {
						'BRAND_260': accentSoft,
						'BRAND_360': accent,
						'BRAND_500': accent,
						'BRAND_560': accentDark,
					},
				}
			},
		})
	},
})