package app.violytra.xposed.tweaks

import android.content.res.XModuleResources
import app.violytra.plugins.API_VERSION
import app.violytra.plugins.BUNDLE_MANIFEST_FORMAT
import app.violytra.plugins.BundleManifest
import app.violytra.plugins.parseBundleManifest
import app.violytra.xposed.ViolytraConstants
import app.violytra.xposed.tweak

lateinit var bundleManifest: BundleManifest

val violytraBundleManifest by tweak {
    runCatching { DevLoader.readBundleManifest() }
        .onFailure { log.e("Unable to read development bundle manifest", it) }
        .getOrNull()?.let {
            if (setBundleManifest(it)) {
                log.i("Development bundle manifest: $bundleManifest")
                return@tweak
            }
        }

    log.i("Using module bundle manifest...")
    runCatching {
        XModuleResources.createInstance(modulePath, null)
            .assets.open(ViolytraConstants.BUNDLE_MANIFEST_FILE)
            .use { it.readBytes().decodeToString() }
    }
        .onFailure { log.w("No bundle manifest in module assets", it) }
        .getOrNull()?.let {
            if (setBundleManifest(it)) return@tweak
        }

    log.w("Using fallback manifest...")
    bundleManifest = BundleManifest(BUNDLE_MANIFEST_FORMAT, API_VERSION.toString(), emptyList())
}

private fun setBundleManifest(json: String): Boolean {
    bundleManifest = parseBundleManifest(json) ?: return false

    return true
}
