package app.violytra.xposed.tweaks

import android.content.res.Resources
import app.violytra.xposed.ViolytraConstants
import app.violytra.xposed.hook
import app.violytra.xposed.method
import app.violytra.xposed.tweak

/**
 * Hooks [Resources.getIdentifier] to rewrite the package name to `com.discord` when the host app was repackaged.
 */
val fixResources by tweak {
    val hostPkg = appInfo.packageName
    if (hostPkg == ViolytraConstants.TARGET_PACKAGE) return@tweak

    Resources::class.java.method(
        "getIdentifier",
        String::class.java,
        String::class.java,
        String::class.java,
    ).hook {
        before {
            if (args[2] == hostPkg) args[2] = ViolytraConstants.TARGET_PACKAGE
        }
    }
}
