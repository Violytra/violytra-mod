import { Design } from '@violytra/discord/design'
import { reloadApp } from '@violytra/modules/native/app'
import { useReloadNeeded } from '../utils/reload'

const { Button } = Design

/** Prompt banner requesting an app reload when unapplied theme changes exist. */
export default function ReloadButton() {
	if (!useReloadNeeded()) return null

	return (
		<Button
			onPress={reloadApp}
			text="Reload to apply changes"
			variant="primary"
		/>
	)
}

