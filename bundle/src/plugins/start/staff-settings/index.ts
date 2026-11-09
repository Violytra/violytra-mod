import { ToastActionCreators } from '@violytra/discord/actions'
import { getStore, Stores } from '@violytra/discord/flux'
import { getModules } from '@violytra/modules/finders'
import { withProps } from '@violytra/modules/finders/filters'
import { instead } from '@violytra/patcher'
import { registerInternalPlugin } from '@violytra/plugins/_'
import { lookupGeneratedIconComponent } from '@violytra/utils/discord'
import manifest from './manifest.json'
import type { DiscordModules } from '@violytra/discord/types'

registerInternalPlugin(manifest, {
    start({ cleanup, logger, plugin }) {
        const CircleInformationIcon = lookupGeneratedIconComponent(
            'CircleInformationIcon',
            'CircleInformationIcon-secondary',
            'CircleInformationIcon-primary',
        )

        const showToast = () =>
            ToastActionCreators.open('VIOLYTRA_STAFF_SETTINGS_ACTION', {
                text: 'Navigate out of Settings to apply changes',
                icon: CircleInformationIcon,
            })

        function reset() {
            getStore<{
                initialize(): void
            }>('DeveloperExperimentStore', store => {
                logger.log(
                    'Reinitializing DeveloperExperimentStore to apply changes...',
                )

                const unpatch = instead(
                    Object,
                    'defineProperties',
                    args => args[0],
                )

                store.initialize()
                unpatch()
            })
        }

        cleanup(
            getModules(withProps('isStaffEnv'), UserStoreUtils => {
                logger.log('Patching UserStoreUtils...')

                cleanup(
                    instead(
                        UserStoreUtils,
                        'isStaffEnv',
                        ([user]) =>
                            user ===
                            (
                                Stores.UserStore as DiscordModules.Flux.Store<{
                                    getCurrentUser(): unknown
                                }>
                            ).getCurrentUser(),
                    ),
                    reset,
                    showToast,
                )

                reset()
                if (plugin.startedLate) showToast()
            }, { max: 1 }),
        )
    },
})
