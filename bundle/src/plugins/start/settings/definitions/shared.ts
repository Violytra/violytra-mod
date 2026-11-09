import { ToastActionCreators } from '@violytra/discord/actions'
import { Clipboard } from '@violytra/externals/react-native-clipboard'
import { ReactNative } from '@violytra/react'
import { lookupGeneratedIconComponent } from '@violytra/utils/discord'
import type { SettingsItem } from '@violytra/discord/modules/settings'

const CopyIcon = lookupGeneratedIconComponent('CopyIcon')

export const CopyableSetting = (
    item: Omit<SettingsItem, 'type' | 'onClick'>,
    description: () => string,
): SettingsItem => ({
    ...item,
    useDescription: item.useDescription ?? (() => description()),
    type: 'pressable',
    onPress() {
        Clipboard.setString(description())
        ToastActionCreators.open('VIOLYTRA_SETTING_COPIED', {
            text: 'Copied to clipboard',
            icon: CopyIcon,
        })
    },
})

export const getRNVersion = () => {
    const { major, minor, patch, prerelease } =
        ReactNative.Platform.constants.reactNativeVersion
    return `${major}.${minor}.${patch}${prerelease ? `-${prerelease}` : ''}`
}
