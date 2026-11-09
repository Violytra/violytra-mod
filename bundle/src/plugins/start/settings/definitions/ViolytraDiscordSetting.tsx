import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraDiscordSetting: SettingsItem = {
    parent: Setting.Violytra,
    IconComponent: () => <TableRowAssetIcon name="Discord" />,
    useTitle: () => 'Discord Server',
    useDescription: () => __BUILD_DISCORD_SERVER_URL__,
    onPress: () => {
        Linking.openURL(__BUILD_DISCORD_SERVER_URL__)
    },
    type: 'pressable',
}

export default ViolytraDiscordSetting
