import { lookupModule, lookupModules } from '@violytra/modules/finders'
import {
    anyOf,
    withDependencies,
    withProps,
} from '@violytra/modules/finders/filters'
import { getModuleDependencies } from '@violytra/modules/metro/utils'
import {
    ReactJSXRuntimeModuleId,
    ReactModuleId,
    ReactNativeModuleId,
} from '@violytra/react'
import { proxify } from '@violytra/utils/proxy'
import { DispatcherModuleId } from './common/flux'
import { ImportTrackerModuleId } from './common/import-tracker'
import type { Metro } from '@violytra/modules/types'
import type { DiscordModules } from './types'

const { atMost, relative, ordered } = withDependencies

// modules/action_sheet/native/ActionSheetActionCreators.tsx
export let [ActionSheetActionCreators, ActionSheetActionCreatorsModuleId]: [
    DiscordModules.Actions.ActionSheetActionCreators,
    Metro.ModuleID,
] = proxify(
    () => {
        const [module, id] = lookupModule(
            withProps<DiscordModules.Actions.ActionSheetActionCreators>(
                'hideActionSheet',
                'openLazy',
            )
                .and(
                    anyOf(
                        // [?, React, +1, JSXRuntime, +2, +3, ?, Dispatcher, ImportTracker] as of 352202
                        withDependencies(
                            ordered([
                                ReactModuleId,
                                // [?, Dispatcher, ImportTracker]
                                relative.withDependencies(
                                    ordered([
                                        DispatcherModuleId,
                                        ImportTrackerModuleId,
                                    ]),
                                    1,
                                ),
                                ReactJSXRuntimeModuleId,
                                relative(2),
                                relative(3),
                                DispatcherModuleId,
                                ImportTrackerModuleId,
                            ]),
                        ),
                        // TODO: Remove when stable >= 352202
                        withDependencies(
                            ordered([
                                ReactModuleId,
                                ReactJSXRuntimeModuleId,
                                relative.withDependencies(
                                    ordered([
                                        relative(2, true),
                                        relative(3, true),
                                        ImportTrackerModuleId,
                                    ]),
                                    1,
                                ),
                                relative(2),
                            ]),
                        ).and(
                            withDependencies(
                                ordered([
                                    DispatcherModuleId,
                                    ImportTrackerModuleId,
                                ]),
                            ),
                        ),
                    ),
                )
                .keyAs('violytra.discord.actions.ActionSheetActionCreators'),
        )

        if (module) {
            ActionSheetActionCreators = module
            ActionSheetActionCreatorsModuleId = id!
            return [module, id!]
        }
    },
    {
        hint: {},
    },
)!

// actions/native/AlertActionCreators.tsx
export let [AlertActionCreators, AlertActionCreatorsModuleId]: [
    DiscordModules.Actions.AlertActionCreators,
    Metro.ModuleID,
] = proxify(
    () => {
        const [module, id] = lookupModule(
            withProps<DiscordModules.Actions.AlertActionCreators>('openAlert')
                .and(
                    withDependencies([
                        null,
                        null,
                        [ReactNativeModuleId, ImportTrackerModuleId],
                        relative(1),
                        relative(3),
                        ImportTrackerModuleId,
                    ]),
                )
                .keyAs('violytra.discord.actions.AlertActionCreators'),
        )

        if (module) {
            AlertActionCreators = module
            AlertActionCreatorsModuleId = id!
            return [module, id!]
        }
    },
    {
        hint: {},
    },
)!

// modules/toast/native/ToastActionCreators.tsx
export let [ToastActionCreators, ToastActionCreatorsModuleId]: [
    DiscordModules.Actions.ToastActionCreators,
    Metro.ModuleID,
] = proxify(
    () => {
        const generator = lookupModules(
            withProps<DiscordModules.Actions.ToastActionCreators>(
                'open',
                'close',
            )
                .and(
                    anyOf(
                        // TODO: Remove atMost and ordered when stable > 350204
                        withDependencies(
                            atMost(
                                3,
                                ordered([
                                    relative.withDependencies(
                                        [ImportTrackerModuleId, relative(1)],
                                        1,
                                    ),
                                    ImportTrackerModuleId,
                                ]),
                            ),
                        ),
                        // TODO: Remove when stable > 350204
                        // [useToastStore (+1), DesignSystemsNotificationComponents, toManaToast, Dispatcher, ImportTracker]
                        withDependencies(
                            ordered([
                                // useToastStore: [ImportTracker, +1]
                                relative.withDependencies(
                                    [ImportTrackerModuleId, relative(1)],
                                    1,
                                ),
                                // toManaToast: [+1, ImportTracker]
                                [relative(1), ImportTrackerModuleId],
                                DispatcherModuleId,
                                ImportTrackerModuleId,
                            ]),
                        ),
                    ),
                )
                .keyAs('violytra.discord.actions.ToastActionCreators'),
        )

        for (const [module, id] of generator)
            if (
                getModuleDependencies(id)![0] === ImportTrackerModuleId
                    ? module.open.length === 1
                    : true
            ) {
                ToastActionCreators = module
                ToastActionCreatorsModuleId = id
                return [module, id]
            }
    },
    {
        hint: {},
    },
)!
