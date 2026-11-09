import { lookupModule } from '@violytra/modules/finders'
import { withDependencies, withProps } from '@violytra/modules/finders/filters'
import { ReactModuleId, ReactNativeModuleId } from '@violytra/react'
import { proxify } from '@violytra/utils/proxy'
import { ImportTrackerModuleId } from '../../patches/import-tracker'
import type { DiscordModules } from '../../types'

const { partial, relative, last } = withDependencies

export type SettingListRenderer =
    DiscordModules.Modules.Settings.SettingListRenderer

// modules/settings/native/renderer/SettingListRenderer.tsx
export let SettingListRenderer: SettingListRenderer = proxify(
    () => {
        const [module] = lookupModule(
            withProps<SettingListRenderer>('SettingsList')
                .and(
                    withDependencies(
                        partial([
                            ReactModuleId,
                            ReactNativeModuleId,
                            relative(1),
                        ]),
                    ).and(withDependencies(last([ImportTrackerModuleId]))),
                )
                .keyAs(
                    'violytra.discord.modules.settings.renderer.SettingListRenderer',
                ),
        )

        if (module) return (SettingListRenderer = module)
    },
    {
        hint: {},
    },
)!
