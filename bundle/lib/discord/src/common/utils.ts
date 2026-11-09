import { lookupModule } from '@violytra/modules/finders'
import { withDependencies, withName } from '@violytra/modules/finders/filters'
import { proxify } from '@violytra/utils/proxy'
import { ImportTrackerModuleId } from '../patches/import-tracker'
import type { DiscordModules } from '../types'

// ../discord_common/js/shared/utils/TypedEventEmitter.tsx
/**
 * Do not use the `error` event, as the module will handle it specially for some reason.
 */
export let TypedEventEmitter: typeof DiscordModules.Utils.TypedEventEmitter =
    proxify(() => {
        const [module] = lookupModule(
            withName<typeof DiscordModules.Utils.TypedEventEmitter>(
                'TypedEventEmitter',
            )
                .and(withDependencies([[], ImportTrackerModuleId]))
                .keyAs('violytra.discord.common.utils.TypedEventEmitter'),
        )

        if (module) return (TypedEventEmitter = module)
    })!
