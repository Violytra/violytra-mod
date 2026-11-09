import {
    callNativeMethod,
    callNativeMethodSync,
} from '@violytra/modules/native'

export function readFile(path: string) {
    return callNativeMethod('violytra.fs.read', [path])
}

export function writeFile(path: string, data: string) {
    return callNativeMethod('violytra.fs.write', [path, data])
}

export function exists(path: string) {
    return callNativeMethod('violytra.fs.exists', [path])
}

export function rm(path: string) {
    return callNativeMethod('violytra.fs.delete', [path])
}

export function existsSync(path: string) {
    return callNativeMethodSync('violytra.fs.exists', [path])
}

export function readFileSync(path: string) {
    return callNativeMethodSync('violytra.fs.read', [path])
}

export function writeFileSync(path: string, data: string) {
    return callNativeMethodSync('violytra.fs.write', [path, data])
}

export function rmSync(path: string) {
    return callNativeMethodSync('violytra.fs.delete', [path])
}

export function deleteFileSync(path: string) {
    return callNativeMethodSync('violytra.fs.delete', [path])
}

export function getConstants() {
    return callNativeMethodSync('violytra.fs.getConstants', [])
}

declare module '@violytra/modules/native' {
    export interface NativeMethods {
        'violytra.fs.getConstants': [
            [],
            {
                data: string
                files: string
                cache: string
            },
        ]
        'violytra.fs.read': [[path: string], string]
        'violytra.fs.write': [[path: string, data: string], void]
        'violytra.fs.exists': [[path: string], boolean]
        'violytra.fs.delete': [[path: string], boolean]
    }
}
