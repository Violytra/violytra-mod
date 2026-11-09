import { lookupModule } from '@violytra/modules/finders'
import { withDependencies, withProps } from '@violytra/modules/finders/filters'
import { ReactModuleId, ReactNativeModuleId } from '@violytra/react'
import { destructure, proxify } from '@violytra/utils/proxy'

const { relative } = withDependencies

let ClipboardModule: typeof import('@react-native-clipboard/clipboard') =
    proxify(
        () => {
            // ID: 4790

            // r6 = 4790;
            // r5 = [4791, 4792];

            // r6 = 4791;
            // r5 = [175, 4792];

            // r6 = 4792;
            // r5 = [27, 4793];

            const [module] = lookupModule(
                withProps<typeof ClipboardModule>('useClipboard').and(
                    withDependencies([
                        relative.withDependencies(
                            [ReactModuleId, relative(2, true)],
                            1,
                        ),
                        relative.withDependencies(
                            [ReactNativeModuleId, relative(3, true)],
                            2,
                        ),
                    ]),
                ),
            )

            if (module) {
                Clipboard = module.default
                useClipboard = module.useClipboard
                return (ClipboardModule = module)
            }
        },
        {
            hint: {},
        },
    )!

export let Clipboard: typeof ClipboardModule.default
export let useClipboard: typeof ClipboardModule.useClipboard

;({ default: Clipboard, useClipboard } = destructure(ClipboardModule, {
    default: {
        hint: {},
    },
    useClipboard: {
        hint: () => {},
    },
}))
