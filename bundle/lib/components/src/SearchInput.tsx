import { Design } from '@violytra/discord/design'
import { lookupGeneratedIconComponent } from '@violytra/utils/discord'
import type { DiscordModules } from '@violytra/discord/types'

const MagnifyingGlassIcon = lookupGeneratedIconComponent('MagnifyingGlassIcon')

export default function SearchInput(
    props: DiscordModules.Components.TextInputProps,
) {
    return (
        <Design.TextInput
            leadingIcon={MagnifyingGlassIcon}
            placeholder="Search"
            returnKeyType="search"
            size="md"
            {...props}
        />
    )
}
