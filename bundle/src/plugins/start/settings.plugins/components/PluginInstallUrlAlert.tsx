import { AlertActionCreators } from '@violytra/discord/actions'
import { Design } from '@violytra/discord/design'
import { callPluginSystemMethod } from '@violytra/plugins/_'
import { useState } from 'react'
import { showErrorToast } from '../utils/alerts'
import { messageOf } from '../utils/strings'

const { AlertModal, AlertActionButton, TextInput } = Design

export function showInstallFromUrlAlert() {
    AlertActionCreators.openAlert(
        'violytra-install-from-url',
        <PluginInstallUrlAlert />,
    )
}

function PluginInstallUrlAlert() {
    const [url, setUrl] = useState('')
    const [busy, setBusy] = useState(false)

    return (
        <AlertModal
            title="Install plugin from URL"
            content="Paste a direct link to a Violytra plugin ZIP file."
            extraContent={
                <TextInput
                    autoFocus
                    label="Plugin URL"
                    onChange={setUrl}
                    placeholder="https://example.com/plugin.zip"
                    size="md"
                    value={url}
                />
            }
            actions={
                <>
                    <AlertActionButton
                        text="Install"
                        variant="primary"
                        loading={busy}
                        disabled={busy || !url.trim()}
                        onPress={async () => {
                            const target = url.trim()
                            setBusy(true)
                            try {
                                await callPluginSystemMethod(
                                    'violytra.plugins.installUrl',
                                    [target],
                                )
                                AlertActionCreators.dismissAlert(
                                    'violytra-install-from-url',
                                )
                            } catch (e) {
                                showErrorToast(
                                    messageOf(e),
                                    'INSTALL_URL_ERROR',
                                )
                                setBusy(false)
                            }
                        }}
                    />
                    <AlertActionButton
                        text="Cancel"
                        variant="secondary"
                        onPress={() =>
                            AlertActionCreators.dismissAlert(
                                'violytra-install-from-url',
                            )
                        }
                    />
                </>
            }
        />
    )
}