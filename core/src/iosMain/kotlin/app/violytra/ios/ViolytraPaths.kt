@file:OptIn(kotlinx.cinterop.ExperimentalForeignApi::class)

package app.violytra.ios

import app.violytra.plugins.PluginPaths
import app.violytra.plugins.repos.RepoStore
import app.violytra.plugins.repos.SourcesStore
import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.CPointer
import kotlinx.cinterop.toKString
import okio.FileSystem
import okio.Path.Companion.toPath
import platform.Foundation.NSDocumentDirectory
import platform.Foundation.NSFileManager
import platform.Foundation.NSURL
import platform.Foundation.NSUserDomainMask

internal val pluginPaths: PluginPaths by lazy {
    val violytraDir = violytraDirectory()
    val paths = PluginPaths(FileSystem.SYSTEM, violytraDir, rootOverride = violytraDir / "plugins")
    RepoStore.ensureLoaded(paths)
    SourcesStore.ensureLoaded(paths)
    paths
}

private fun violytraDirectory() = run {
    val documents = (NSFileManager.defaultManager
        .URLsForDirectory(NSDocumentDirectory, NSUserDomainMask)
        .lastOrNull() as? NSURL)?.path ?: error("No Documents directory available")
    "$documents/violytra".toPath()
}

internal fun pluginPath(url: CPointer<ByteVar>?, label: String): String {
    pluginPaths
    return url?.toKString() ?: error("missing $label")
}
