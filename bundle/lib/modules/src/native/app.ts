import { callNativeMethodSync } from '@violytra/modules/native'

export function reloadApp() {
    callNativeMethodSync('violytra.app.reload', [])
}

declare module '@violytra/modules/native' {
    interface NativeMethods {
        'violytra.app.reload': [[], null]
    }
}
