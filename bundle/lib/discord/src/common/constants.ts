import { lookupModule } from '@violytra/modules/finders'
import { withDependencies, withProps } from '@violytra/modules/finders/filters'
import type { DiscordModules } from '@violytra/discord/types'

const { partial, relative } = withDependencies

export const [Constants, ConstantsModuleId] = lookupModule(
    withProps<DiscordModules.Constants>('ME')
        .and(
            withDependencies(
                partial([
                    null,
                    relative.withDependencies(partial([relative(2, true)]), 1),
                ]),
            ),
        )
        .keyAs('violytra.discord.common.Constants'),
)
