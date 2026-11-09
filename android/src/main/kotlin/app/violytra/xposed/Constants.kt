package app.violytra.xposed

object ViolytraConstants {
    const val TARGET_PACKAGE = "com.discord"

    const val FILES_DIR = "files/violytra"
    const val CACHE_DIR = "cache/violytra"
    const val MAIN_SCRIPT_FILE = "bundle.js"
    const val BUNDLE_MANIFEST_FILE = "manifest.json"
    const val PRELOADS_DIR = "preloads"

    const val LOADER_NAME = "ViolytraAndroid"
    val LOADER_VERSION
        get() = BuildConfig.VERSION_NAME
    val USER_AGENT
        get() = "ViolytraAndroid/$LOADER_VERSION"

    /**
     * Hermes bundle shipped inside this APK's `assets/` directory, built by the `:bundle` project.
     * Loaded by [app.violytra.xposed.tweaks.violytraScriptLoader].
     */
    const val BUNDLE_ASSET = "assets://violytra.bundle"
}

/**
 * Hermes bytecode assets shipped inside the Xposed module APK.
 */
val scriptAssets = emptyList<String>()
