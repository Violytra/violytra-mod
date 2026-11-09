import ViolytraIcon from '~assets/ViolytraIcon'
// TODO(PalmDevs): switch to external fetches
import Data from './data.json'
import type { ImageSourcePropType } from 'react-native'

// TODO(PalmDevs): possibly fetch from external source?
export const Badges = {
    violytra_team: {
        label: 'Violytra Team',
        description: 'This user is a Violytra team member.',
        icon: ViolytraIcon,
        bnw: true,
        showDialog: true,
    },
} satisfies Record<string, Badge>

export const UsersWithBadges = Data as Record<string, BadgeId[]>

export type Badge = {
    label: string
    icon: ImageSourcePropType
    description: string
    /**
     * Black and white icon
     * @default false
     */
    bnw?: boolean
    showDialog?: boolean
}

export type BadgeId = keyof typeof Badges
