import defer * as Browserify from '@violytra/externals/browserify'
import defer * as Gorhom from '@violytra/externals/gorhom'
import defer * as ReactNativeClipboard from '@violytra/externals/react-native-clipboard'
import defer * as ReactNativeCommunity from '@violytra/externals/react-native-community'
import defer * as ReactNativeSafeAreaContext from '@violytra/externals/react-native-safe-area-context'
import defer * as ReactNavigation from '@violytra/externals/react-navigation'
import defer * as Shopify from '@violytra/externals/shopify'
import defer * as Zustand from '@violytra/externals/zustand'
import { defineLazyProperties } from '@violytra/utils/object'

export interface PluginApiExternals {
    Browserify: typeof import('@violytra/externals/browserify')
    Gorhom: typeof import('@violytra/externals/gorhom')
    ReactNativeClipboard: typeof import('@violytra/externals/react-native-clipboard')
    ReactNativeCommunity: typeof import('@violytra/externals/react-native-community')
    ReactNativeSafeAreaContext: typeof import('@violytra/externals/react-native-safe-area-context')
    ReactNavigation: typeof import('@violytra/externals/react-navigation')
    Shopify: typeof import('@violytra/externals/shopify')
    Zustand: typeof import('@violytra/externals/zustand')
}

export const externals: PluginApiExternals = defineLazyProperties(
    {} as PluginApiExternals,
    {
        Browserify: () => {
            return Browserify
        },
        Gorhom: () => {
            return Gorhom
        },
        ReactNativeClipboard: () => {
            return ReactNativeClipboard
        },
        ReactNativeCommunity: () => {
            return ReactNativeCommunity
        },
        ReactNativeSafeAreaContext: () => {
            return ReactNativeSafeAreaContext
        },
        ReactNavigation: () => {
            return ReactNavigation
        },
        Shopify: () => {
            return Shopify
        },
        Zustand: () => {
            return Zustand
        },
    },
)
