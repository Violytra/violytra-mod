import { Design } from '@violytra/discord/design'
import { Clipboard } from '@violytra/externals/react-native-clipboard'
import { formatPluginSystemErrorPayload } from '@violytra/plugins/_'
import type { PluginSystemErrorPayload } from '@violytra/plugins/_'

const { AlertModal, AlertActionButton, Text } = Design

export default function PluginInstallFailedAlert({
    error,
}: {
    error: PluginSystemErrorPayload
}) {
    return (
        <AlertModal
            title="Plugin install failed"
            content={
                <Text variant="text-md/medium" color="text-feedback-critical">
                    {error.message}
                </Text>
            }
            actions={
                <>
                    <AlertActionButton text="Got it" />
                    <AlertActionButton
                        text="Copy details"
                        variant="secondary"
                        onPress={() => {
                            Clipboard.setString(
                                formatPluginSystemErrorPayload(error),
                            )
                        }}
                    />
                </>
            }
        />
    )
}
