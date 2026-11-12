import { SettingListRenderer } from '@violytra/discord/modules/settings/renderer'
import { ScrollView } from 'react-native'
import { Setting } from '../constants'

export default function ViolytraSettingScreen() {
    return (
        <ScrollView style={{ flex: 1 }}>
            <SettingListRenderer.SettingsList
                node={{
                    type: 'list',
                    sections: [
                        {
                            label: 'Violytra',
                            settings: [
                                Setting.ViolytraVersion,
                                Setting.LoaderVersion,
                                Setting.ViolytraSourceRepository,
                                Setting.ViolytraLicense,
                            ],
                        },
                        {
                            label: 'Versions',
                            settings: [
                                Setting.ReactVersion,
                                Setting.ReactNativeVersion,
                                Setting.HermesVersion,
                            ],
                        },
                        {
                            label: 'Actions',
                            settings: [
                                Setting.Reload,
                                Setting.ViolytraEnterRecoveryMode,
                            ],
                        },
                        {
                            label: 'Developer',
                            settings: [Setting.ViolytraDeveloperMode],
                        },
                    ],
                }}
            />
        </ScrollView>
    )
}
