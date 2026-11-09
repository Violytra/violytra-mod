export type Nullish = null | undefined
export type If<T, Then, Else> = T extends true ? Then : Else
export type Not<T extends boolean> = T extends true ? false : true
export type AnyObject = Record<PropertyKey, any>
export type AnyFunction = (...args: any[]) => any
export type LogicalOr<T1, T2> = T1 extends true
    ? true
    : T2 extends true
      ? true
      : false
export type LogicalAnd<T1, T2> = T1 extends true
    ? T2 extends true
        ? true
        : false
    : false
export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends AnyObject ? DeepPartial<T[K]> : T[K]
}
export type ExtractPredicate<T> = T extends (arg: any) => arg is infer R
    ? R
    : never
export type KeyWithType<O extends AnyObject, T> = {
    [K in keyof O]: O[K] extends T ? K : never
}[keyof O]

/// PLUGIN API EXTENSIONS

export interface PreInitPluginApiUtils {
    bitset: typeof import('@violytra/utils/bitset')
    callback: typeof import('@violytra/utils/callback')
    error: typeof import('@violytra/utils/error')
    object: typeof import('@violytra/utils/object')
    promise: typeof import('@violytra/utils/promise')
    proxy: typeof import('@violytra/utils/proxy')
    tree: typeof import('@violytra/utils/tree')
    react: typeof import('@violytra/utils/react')
    /** This API is available in and after the `init` phase.  */
    discord: unknown
}

export interface PluginApiUtils extends PreInitPluginApiUtils {
    discord: typeof import('@violytra/utils/discord')
}

declare module '@violytra/plugins/types' {
    export interface UnscopedPreInitPluginApi {
        utils: PreInitPluginApiUtils
    }

    export interface UnscopedInitPluginApi {
        utils: PluginApiUtils
    }
}
