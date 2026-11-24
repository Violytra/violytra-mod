import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraChangelogSetting: SettingsItem = {
    parent: Setting.Violytra,
    IconComponent: () => <TableRowAssetIcon name="BookCheckIcon" />,
    useTitle: () => 'Changelog',
    useDescription: () => 'See what\'s new in Violytra',
    onPress: () => {
        Linking.openURL('https://github.com/Violytra/violytra-mod/releases')
    },
    type: 'pressable',
}

export default ViolytraChangelogSetting