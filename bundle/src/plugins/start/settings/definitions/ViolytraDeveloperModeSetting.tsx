import TableRowAssetIcon from '@violytra/components/TableRowAssetIcon'
import { ToastActionCreators } from '@violytra/discord/actions'
import {
    disablePluginInActiveSlot,
    enablePluginInActiveSlot,
    isDefaultsOnlyBoot,
    pList,
    runPluginLate,
} from '@violytra/plugins/_'
import { usePluginEnabledById } from '@violytra/plugins/_/react'
import pluginHiddenApi from '~plugins/preinit/api.hidden'
import { Setting } from '../constants'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const ViolytraDeveloperModeSetting: SettingsItem = {
    parent: Setting.Violytra,
    type: 'toggle',
    IconComponent: () => <TableRowAssetIcon name="WrenchIcon" />,
    useTitle: () => 'Developer Mode',
    useDescription: () =>
        isDefaultsOnlyBoot
            ? 'Unavailable in Recovery Mode. Reload to exit.'
            : 'Exposes internal Violytra APIs for development purposes. Makes client mod detection easier. Use with caution.',
    useIsDisabled: () => isDefaultsOnlyBoot,
    useValue: () => usePluginEnabledById(pluginHiddenApi),
    onValueChange: enabled => {
        const plugin = pList.get(pluginHiddenApi)
        if (!plugin) return

        if (enabled)
            enablePluginInActiveSlot(plugin, true)
                .then(() => runPluginLate(plugin))
                .catch(showFailureToast)
        else disablePluginInActiveSlot(plugin).catch(showFailureToast)
    },
}

function showFailureToast(e: unknown) {
    ToastActionCreators.open('VIOLYTRA_DEVELOPER_MODE_FAILED', {
        text: `Failed to toggle Developer Mode: ${e instanceof Error ? e.message : String(e)}`,
        variant: 'critical',
    })
}

export default ViolytraDeveloperModeSetting
