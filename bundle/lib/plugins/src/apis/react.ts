import * as PluginApiReact_ from '@violytra/react'
import * as PluginApiReactJsxRuntime from '@violytra/react/jsx-runtime'
import * as PluginApiReactNative from '@violytra/react/native'
import { spreadDescriptors } from '.'

export type PluginApiReact = typeof PluginApiReact_ & {
    jsxRuntime: typeof PluginApiReactJsxRuntime
    native: typeof PluginApiReactNative
}

export const react: PluginApiReact = spreadDescriptors(PluginApiReact_, {
    jsxRuntime: PluginApiReactJsxRuntime,
    native: PluginApiReactNative,
})
