import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraDiscordSetting: SettingsItem = {
    parent: Setting.Violytra,
    IconComponent: () => <TableRowAssetIcon name="DiscordIcon" />,
    useTitle: () => 'Discord',
    useDescription: () => 'Join the Violytra community',
    onPress: () => {
        Linking.openURL('https://discord.gg/zhtzbpg6M')
    },
    type: 'pressable',
}

export default ViolytraDiscordSetting