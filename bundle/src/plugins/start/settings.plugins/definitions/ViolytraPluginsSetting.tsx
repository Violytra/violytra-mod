import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { isDefaultsOnlyBoot } from '@violytra/plugins/_'
import { useEnabledPluginCountInActiveSlot } from '@violytra/plugins/_/react'
import { RouteNames, Setting } from '../constants'
import defer * as ViolytraPluginsSettingScreen from '../screens/ViolytraPluginsSettingScreen'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraPluginsSetting: SettingsItem = {
    parent: null,
    type: 'route',
    IconComponent: () => <TableRowAssetIcon name="PuzzlePieceIcon" />,
    useTitle: () => 'Plugins',
    useTrailing: () =>
        `${useEnabledPluginCountInActiveSlot()} enabled` +
        (isDefaultsOnlyBoot ? ' (recovery)' : ''),
    screen: {
        route: RouteNames[Setting.ViolytraPlugins],
        getComponent: () => ViolytraPluginsSettingScreen.default,
    },
}

export default ViolytraPluginsSetting
