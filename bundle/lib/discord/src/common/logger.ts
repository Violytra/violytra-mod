import { lookupModule } from '@violytra/modules/finders'
import { withName } from '@violytra/modules/finders/filters'
import type { DiscordModules } from '@violytra/discord/types'
import type { Metro } from '@violytra/modules/types'

// ../discord_common/js/packages/logger/Logger.tsx
export const [Logger, LoggerModuleId] = lookupModule(
    withName<typeof DiscordModules.Logger>('Logger'),
) as [typeof DiscordModules.Logger, Metro.ModuleID]
