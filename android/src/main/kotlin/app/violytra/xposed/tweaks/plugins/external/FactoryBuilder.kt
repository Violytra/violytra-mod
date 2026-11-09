package app.violytra.xposed.tweaks.plugins.external

import app.violytra.plugins.PluginDependencyGraph
import app.violytra.plugins.PluginManifest
import app.violytra.plugins.PluginSystemError
import app.violytra.plugins.external.ExternalManifest
import app.violytra.plugins.external.MANIFEST_FILE
import app.violytra.plugins.external.validate
import app.violytra.plugins.plugin
import app.violytra.plugins.pluginLog
import app.violytra.xposed.ViolytraJson
import app.violytra.xposed.requireInside
import app.violytra.xposed.tweaks.plugins.PluginFactory
import java.io.File

/** Parses and validates a `<id>/manifest.json`. */
internal fun parseExternalPluginDir(dir: File): ParsedExternalPlugin = ParsedExternalPlugin(
    dir,
    ViolytraJson.decodeFromString(ExternalManifest.serializer(), File(dir, MANIFEST_FILE).readText())
        .also { it.validate() },
)

/**
 * Creates [PluginFactory] from `<id>/` directory.
 *
 * Throws on malformed manifest, missing required dependencies/unsatisfied version range.
 * Unavailable optional dependencies are dropped with a warning.
 *
 * @param knownManifests Every plugin installed, used to resolve this plugin's dependencies.
 */
internal fun readExternalPluginDir(dir: File, knownManifests: Map<String, PluginManifest>): PluginFactory =
    readParsedPlugin(parseExternalPluginDir(dir), knownManifests)

/** [readExternalPluginDir] for a directory that is already parsed. */
internal fun readParsedPlugin(
    parsed: ParsedExternalPlugin,
    knownManifests: Map<String, PluginManifest>,
): PluginFactory {
    val manifest = parsed.manifest.toPluginManifest()
    val id = manifest.id

    val graph = PluginDependencyGraph(knownManifests + (id to manifest))

    for (depId in manifest.dependencies.keys) {
        val problem = graph.problem(id, depId) ?: continue

        if (manifest.dependencies.getValue(depId).optional) {
            pluginLog.w("Optional ${problem.reason} for plugin '$id'; ignoring")
        } else {
            throw PluginSystemError(problem.code, "Plugin '$id': ${problem.reason}")
        }
    }

    return buildExternalFactory(parsed)
}

internal fun buildExternalFactory(parsed: ParsedExternalPlugin): PluginFactory {
    val (dir, manifest) = parsed.dir to parsed.manifest

    val pluginManifest = manifest.toPluginManifest()

    val scriptPath = manifest.dist?.script?.let { script ->
        val file = File(dir, script)
        file.requireInside(dir, "dist.script", script)
        if (!file.isFile) {
            pluginLog.i("dist.script does not exist, skipping JS for ${pluginManifest.id}: $script")
            null
        } else {
            file.absolutePath
        }
    }

    val android = manifest.dist?.android

    pluginLog.i("Discovered external plugin: ${pluginManifest.id} ${pluginManifest.version}")

    return PluginFactory(pluginManifest, scriptPath = scriptPath) { chain ->
        // JS-only plugin, no native body.
        if (android == null) plugin {}
        else {
            val dexCache = File(dir.parentFile, DEX_CACHE_DIR).apply { mkdirs() }
            loadNativeBuilder(dir, dexCache, android, manifest.id, chain.mapNotNull { nativePluginLoaders[it] })
        }
    }
}
