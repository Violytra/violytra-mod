@file:OptIn(kotlin.experimental.ExperimentalNativeApi::class, kotlinx.cinterop.ExperimentalForeignApi::class)

package app.violytra.ios

import app.violytra.core.ViolytraJson
import app.violytra.core.logger
import app.violytra.plugins.repos.RepoIndex
import app.violytra.plugins.repos.RepoStore
import app.violytra.plugins.repos.UserRepo
import app.violytra.plugins.repos.parseRepoIndex
import kotlinx.cinterop.ByteVar
import kotlinx.cinterop.CPointer
import kotlinx.cinterop.CPointerVarOf
import kotlinx.cinterop.toKString
import kotlinx.serialization.builtins.ListSerializer

@CName("ViolytraCore_RepoIndexParse")
fun repoIndexParse(
    json: CPointer<ByteVar>?,
    repoUrl: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?,
): CPointer<ByteVar>? = guard(errorOut) {
    val parsed = parseRepoIndex(
        json = json?.toKString() ?: error("missing index JSON"),
        repoUrl = repoUrl?.toKString() ?: "",
        log = logger("RepoIndex"),
    )
    ViolytraJson.encodeToString(RepoIndex.serializer(), parsed)
}

@CName("ViolytraCore_RepoStoreList")
fun repoStoreList(errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?): CPointer<ByteVar>? = guard(errorOut) {
    pluginPaths
    ViolytraJson.encodeToString(ListSerializer(UserRepo.serializer()), RepoStore.list())
}

@CName("ViolytraCore_RepoStoreSet")
fun repoStoreSet(
    entriesJson: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?,
): Int = guardInt(errorOut) {
    pluginPaths
    val entries = ViolytraJson.decodeFromString(
        ListSerializer(UserRepo.serializer()),
        entriesJson?.toKString() ?: error("missing repos JSON"),
    )
    RepoStore.set(entries)
}

@CName("ViolytraCore_RepoStoreCacheDir")
fun repoStoreCacheDir(
    url: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?
): CPointer<ByteVar>? = guard(errorOut) {
    pluginPath(url, "repo URL").let { RepoStore.cacheDirFor(it).toString() }
}

@CName("ViolytraCore_RepoStoreCachedIndexFile")
fun repoStoreCachedIndexFile(
    url: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?
): CPointer<ByteVar>? = guard(errorOut) {
    pluginPath(url, "repo URL").let { RepoStore.cachedIndexFile(it).toString() }
}

@CName("ViolytraCore_RepoStoreCachedETagFile")
fun repoStoreCachedETagFile(
    url: CPointer<ByteVar>?,
    errorOut: CPointer<CPointerVarOf<CPointer<ByteVar>>>?
): CPointer<ByteVar>? = guard(errorOut) {
    pluginPath(url, "repo URL").let { RepoStore.cachedETagFile(it).toString() }
}
