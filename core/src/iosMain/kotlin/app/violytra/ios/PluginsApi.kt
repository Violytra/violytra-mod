@file:OptIn(kotlin.experimental.ExperimentalNativeApi::class, kotlinx.cinterop.ExperimentalForeignApi::class)

package app.violytra.ios

import app.violytra.core.ViolytraJson
import app.violytra.plugins.PluginDependency
import app.violytra.plugins.PluginDependencyGraph
import app.violytra.plugins.PluginErrorCodes
import app.violytra.plugins.PluginManifest
import app.violytra.plugins.PluginSystemError
import app.violytra.plugins.Version
import app.violytra.plugins.VersionRange
import app.violytra.plugins.external.requireValidPluginId
import app.violytra.plugins.external.stagePluginZip
import app.violytra.plugins.repos.orderPluginIdsByDependencies
import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.CPointer
import kotlinx.cinterop.CPointerVarOf
import kotlinx.cinterop.pointed
import kotlinx.cinterop.toKString
import kotlinx.cinterop.value
import kotlinx.serialization.Serializable
import kotlinx.serialization.builtins.ListSerializer
import kotlinx.serialization.builtins.serializer
import okio.Path.Companion.toPath

@CName("ViolytraCore_PluginIdIsValid")
fun pluginIdIsValid(id: CPointer<ByteVar>?): Int {
    val text = id?.toKString() ?: return 0
    return try {
        requireValidPluginId(text)
        1
    } catch (t: Throwable) {
        0
    }
}

@Serializable
internal data class GraphManifest(
    val id: String,
    val version: String,
    val dependencies: Map<String, NormalizedDependency> = emptyMap(),
)

@Serializable
internal data class GraphProblem(val code: String, val reason: String)

@Serializable
internal data class GraphResult(
    val ordered: List<String>,
    val dropped: Map<String, List<GraphProblem>>,
    val cycles: List<String>,
    val unsatisfiedOptional: Map<String, List<String>>,
)

private fun GraphManifest.toPluginManifest(): PluginManifest = PluginManifest(
    id = id,
    name = id,
    description = "",
    author = "",
    dependencies = dependencies.mapValues { (_, dep) ->
        PluginDependency(version = VersionRange.parse(dep.version), optional = dep.optional)
    },
    version = Version.parse(version),
)

private fun decodeGraphManifests(manifestsJson: CPointer<ByteVar>?): Map<String, PluginManifest> =
    ViolytraJson.decodeFromString(
        ListSerializer(GraphManifest.serializer()),
        manifestsJson?.toKString() ?: error("missing manifests JSON"),
    ).associate { wire -> wire.id to wire.toPluginManifest() }

@CName("ViolytraCore_PluginsLoadOrder")
fun pluginsLoadOrder(
    manifestsJson: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?,
): CPointer<ByteVar>? = guard(errorOut) {
    val manifests = decodeGraphManifests(manifestsJson)
    val graph = PluginDependencyGraph(manifests)
    val order = graph.loadOrder()
    val unsatisfiedOptional = manifests.keys
        .mapNotNull { id ->
            graph.unsatisfiedOptionalDependencies(id).takeIf { it.isNotEmpty() }?.let { id to it.toList() }
        }
        .toMap()
    ViolytraJson.encodeToString(
        GraphResult.serializer(),
        GraphResult(
            ordered = order.ordered,
            dropped = order.dropped.mapValues { (_, problems) -> problems.map { GraphProblem(it.code, it.reason) } },
            cycles = order.cycles.toList(),
            unsatisfiedOptional = unsatisfiedOptional,
        ),
    )
}

@CName("ViolytraCore_RequiredDependents")
fun requiredDependentsC(
    manifestsJson: CPointer<ByteVar>?,
    pluginId: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?,
): CPointer<ByteVar>? = guard(errorOut) {
    val id = pluginId?.toKString() ?: error("missing plugin id")
    val graph = PluginDependencyGraph(decodeGraphManifests(manifestsJson))
    ViolytraJson.encodeToString(
        ListSerializer(String.serializer()),
        graph.requiredDependents(id).toList(),
    )
}

@CName("ViolytraCore_StagePluginZip")
fun stagePluginZipC(
    zipPath: CPointer<ByteVar>?,
    tmpName: CPointer<ByteVar>?,
    codeOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?,
): CPointer<ByteVar>? = try {
    val paths = pluginPaths
    val source = zipPath?.toKString()?.toPath() ?: error("missing ZIP path")
    val tmp = tmpName?.toKString() ?: error("missing staging name")
    val staged = stagePluginZip(paths, tmp) { sink ->
        val reader = paths.fs.source(source)
        try {
            sink.writeAll(reader)
        } finally {
            reader.close()
        }
    }
    staged.dir.toString().toC()
} catch (e: PluginSystemError) {
    codeOut?.pointed?.value = e.code.toC()
    errorOut?.pointed?.value = (e.message ?: e.toString()).toC()
    null
} catch (t: Throwable) {
    codeOut?.pointed?.value = PluginErrorCodes.INSTALL_FAILED.toC()
    errorOut?.pointed?.value = (t.message ?: t.toString()).toC()
    null
}

@Serializable
internal data class DependencyOrderRequest(
    val ids: List<String>,
    val dependencies: Map<String, List<String>> = emptyMap(),
)

@CName("ViolytraCore_OrderPluginsByDependencies")
fun orderPluginsByDependencies(
    requestJson: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?,
): CPointer<ByteVar>? = guard(errorOut) {
    val request = ViolytraJson.decodeFromString(
        DependencyOrderRequest.serializer(),
        requestJson?.toKString() ?: error("missing ordering request"),
    )
    ViolytraJson.encodeToString(
        ListSerializer(String.serializer()),
        orderPluginIdsByDependencies(request.ids) { request.dependencies[it].orEmpty() },
    )
}
