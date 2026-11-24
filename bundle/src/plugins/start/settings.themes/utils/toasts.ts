import { ToastActionCreators } from '@violytra/discord/actions'

export function showErrorToast(e: unknown) {
	ToastActionCreators.open('Violytra_THEMES_ERROR', {
		text: e instanceof Error ? e.message : String(e),
		variant: 'critical',
	})
}


