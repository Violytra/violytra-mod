import { lookupModule } from '@violytra/modules/finders'
import { withProps } from '@violytra/modules/finders/filters'
import type { Metro } from '@violytra/modules/types'

// ../discord_common/js/packages/tokens/native.tsx
export const [Tokens, TokensModuleId] = lookupModule(withProps('RawColor')) as [
    any,
    Metro.ModuleID,
]
