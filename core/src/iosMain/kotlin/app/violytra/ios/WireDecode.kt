package app.violytra.ios

import app.violytra.core.ViolytraJson
import app.violytra.plugins.Version
import app.violytra.plugins.VersionRange
import app.violytra.plugins.repos.RepoIndex
import app.violytra.plugins.repos.RepoStore
import kotlinx.serialization.builtins.MapSerializer
import kotlinx.serialization.builtins.serializer

internal fun decodeVersions(json: String?, tolerant: Boolean = false): Map<String, Version> =
    json?.let { ViolytraJson.decodeFromString(MapSerializer(String.serializer(), String.serializer()), it) }
        .orEmpty().mapNotNull { (key, value) ->
            try {
                key to Version.parse(value)
            } catch (t: Throwable) {
                if (tolerant) null else error("invalid installed version for '$key': $value")
            }
        }.toMap()

internal fun decodeRanges(json: String?, label: String): Map<String, Map<String, VersionRange>> =
    json?.let {
        ViolytraJson.decodeFromString(
            MapSerializer(String.serializer(), MapSerializer(String.serializer(), String.serializer())),
            it,
        )
    }.orEmpty().mapValues { (dependent, deps) ->
        deps.mapValues { (dep, range) ->
            try {
                VersionRange.parse(range)
            } catch (t: Throwable) {
                error("invalid $label range for '$dependent' -> '$dep': $range")
            }
        }
    }

internal fun indexedRepos(filter: Set<String>? = null): List<Pair<String, RepoIndex>> =
    RepoStore.list()
        .filter { it.enabled && (filter == null || it.url in filter) }
        .mapNotNull { repo -> RepoStore.cachedIndex(repo.url)?.let { repo.url to it } }
