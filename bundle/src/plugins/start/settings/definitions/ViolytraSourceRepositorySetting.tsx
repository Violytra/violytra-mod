import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraSourceRepositorySetting: SettingsItem = {
    parent: Setting.Violytra,
    IconComponent: () => <TableRowAssetIcon name="PaperIcon" />,
    useTitle: () => 'Source Code',
    useDescription: () => __BUILD_SOURCE_REPOSITORY_URL__,
    onPress: () => {
        Linking.openURL(__BUILD_SOURCE_REPOSITORY_URL__)
    },
    type: 'pressable',
}

export default ViolytraSourceRepositorySetting
