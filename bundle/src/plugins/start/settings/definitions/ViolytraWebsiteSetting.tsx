import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { Linking } from 'react-native'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraWebsiteSetting: SettingsItem = {
    parent: Setting.Violytra,
    IconComponent: () => <TableRowAssetIcon name="GlobeEarthIcon" />,
    useTitle: () => 'Website',
    useDescription: () => 'violytra.cc.cd',
    onPress: () => {
        Linking.openURL('https://violytra.cc.cd')
    },
    type: 'pressable',
}

export default ViolytraWebsiteSetting