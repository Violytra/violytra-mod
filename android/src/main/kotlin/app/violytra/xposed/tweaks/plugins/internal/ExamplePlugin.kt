package app.violytra.xposed.tweaks.plugins.internal

import app.violytra.plugins.API_VERSION
import app.violytra.plugins.PluginManifest
import app.violytra.xposed.api.registerNativeMethod

private val manifest = PluginManifest(
    id = "violytra.example",
    name = "Example Plugin",
    description = "Example plugin.",
    author = "Violytra",
    version = API_VERSION,
)

internal val examplePlugin =
    internalPlugin(manifest, setOf(InternalPluginFlags.INTERNAL, InternalPluginFlags.ESSENTIAL)) {
        start {
            log.i("started in ${appInfo.packageName}")
            registerNativeMethod("violytra.example.test") { args ->
                log.i("violytra.example.test($args)")
                null
            }

            registerNativeMethod("violytra.example.test.error") {
                errors.tryEmit(Exception("Test exception!"))
            }
        }
    }