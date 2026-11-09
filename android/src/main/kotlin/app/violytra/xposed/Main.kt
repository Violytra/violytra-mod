package app.violytra.xposed

import android.app.Activity
import android.content.Context
import android.content.pm.ApplicationInfo
import de.robv.android.xposed.IXposedHookLoadPackage
import de.robv.android.xposed.IXposedHookZygoteInit
import de.robv.android.xposed.callbacks.XC_LoadPackage
import app.violytra.bridge.ViolytraBridge
import app.violytra.xposed.api.HostScope
import app.violytra.xposed.tweaks.*
import app.violytra.xposed.tweaks.base.lifecycleSupport
import app.violytra.xposed.tweaks.base.scriptLoader
import app.violytra.xposed.tweaks.bridge.ViolytraBridgeRegistry
import app.violytra.xposed.tweaks.bridge.additionalBridgeMethods
import app.violytra.xposed.tweaks.bridge.violytraBridgeSupport
import app.violytra.xposed.tweaks.plugins.pluginInstallMethods
import app.violytra.xposed.tweaks.plugins.pluginLoader
import app.violytra.xposed.tweaks.plugins.pluginMethods
import app.violytra.xposed.tweaks.plugins.pluginStates
import app.violytra.xposed.tweaks.plugins.repos.pluginRepos

private lateinit var modulePath: String

@Suppress("UNUSED")
class Main : IXposedHookLoadPackage, IXposedHookZygoteInit {
    @Volatile
    private var hooked = false

    private val tweaks: List<TweakSpec> = listOf(
        // Framework
        lifecycleSupport,
        violytraBridgeSupport,
        scriptLoader,
        discordVersionRetriever,

        // Static patches
        fixResources,

        // Persistence
        caches,
        pluginStates,
        pluginRepos,

        // Async updater
        devLoader,
        violytraBundleManifest,

        // Consumers
        recoveryCompanion,
        discordDevSupport,
        additionalBridgeMethods,
        pluginLoader,
        pluginMethods,
        pluginInstallMethods,
        violytraScriptLoader,
    )

    override fun initZygote(startupParam: IXposedHookZygoteInit.StartupParam) {
        modulePath = startupParam.modulePath
    }

    override fun handleLoadPackage(param: XC_LoadPackage.LoadPackageParam) {
        // Only hook the main process.
        // Discord uses ProcessPhoenix to spawn a ":phoenix" process to restart the app. It will cause concurrency issues.
        if (param.processName != param.packageName) return

        if (hooked) return
        hooked = true

        val ctx = HostScopeImpl(
            modulePath = modulePath,
            appInfo = param.appInfo,
            classLoader = param.classLoader,
        )
        DexFinder.init(param.appInfo, param.classLoader, modulePath)
        for (spec in tweaks) spec.applyTo(ctx)
        DexFinder.release()
    }
}

private class HostScopeImpl(
    override val modulePath: String,
    override val appInfo: ApplicationInfo,
    override val classLoader: ClassLoader,
) : HostScope {
    override val bridge: ViolytraBridge get() = ViolytraBridgeRegistry
    override val dexFinder: DexFinder get() = DexFinder
    override fun withAppContext(block: (Context) -> Unit) = app.violytra.xposed.tweaks.base.withAppContext(block)
    override fun withAppActivity(block: (Activity) -> Unit) =
        app.violytra.xposed.tweaks.base.withAppActivity(block)
}