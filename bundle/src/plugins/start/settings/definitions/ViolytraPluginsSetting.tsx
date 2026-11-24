import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraPluginsSetting: SettingsItem = {
    parent: Setting.Violytra,
    IconComponent: () => <TableRowAssetIcon name="PuzzlePieceIcon" />,
    useTitle: () => 'Community Plugins',
    useDescription: () => 'Browse and install Violytra plugins',
    onPress: () => {
        Linking.openURL('https://github.com/Violytra/violytra-community-plugins')
    },
    type: 'pressable',
}

export default ViolytraPluginsSetting