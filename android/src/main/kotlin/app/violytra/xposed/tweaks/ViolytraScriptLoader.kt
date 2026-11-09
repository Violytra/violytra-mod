package app.violytra.xposed.tweaks

import app.violytra.xposed.ViolytraConstants
import app.violytra.xposed.tweak
import app.violytra.xposed.tweaks.base.InjectorScope
import app.violytra.xposed.tweaks.base.registerScriptInjector

/**
 * Loads the Violytra bundle shipped in this module's APK. Depends on [app.violytra.xposed.tweaks.base.scriptLoader].
 *
 * Debug builds can run preloads and a development bundle from [DevLoader] instead.
 */
val violytraScriptLoader by tweak {
    registerScriptInjector { scope: InjectorScope ->
        runViolytraScripts(scope)
    }
}

private fun runViolytraScripts(scope: InjectorScope) {
    val log = scope.tweakLog
    log.i("Running Violytra scripts...")

    try {
        val devBundle = DevLoader.awaitBundle()

        for (f in DevLoader.preloads()) {
            log.d("Running preload: ${f.absolutePath}")
            scope.runFile(f.absolutePath)
        }

        if (devBundle != null) {
            log.i("Loading development bundle: ${devBundle.absolutePath}")
            scope.runFile(devBundle.absolutePath)
        } else {
            scope.runAsset(ViolytraConstants.BUNDLE_ASSET)
        }
    } catch (e: Throwable) {
        log.e("Unable to run Violytra scripts", e)
    }
}
