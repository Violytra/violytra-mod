import { lookupModule } from '@violytra/modules/finders'
import { withDependencies, withProps } from '@violytra/modules/finders/filters'
import { ReactModuleId, ReactNativeModuleId } from '@violytra/react'
import { proxify } from '@violytra/utils/proxy'

const { ordered, relative } = withDependencies

export let NetInfo: typeof import('@react-native-community/netinfo') = proxify(
    () => {
        const [module] = lookupModule(
            withProps<typeof NetInfo>('useNetInfo').and(
                withDependencies(
                    ordered([
                        ReactModuleId,
                        ReactNativeModuleId,
                        relative(1),
                        relative(2),
                        [],
                    ]),
                ),
            ),
        )

        if (module) return (NetInfo = module)
    },
    {
        hint: {},
    },
)!
