#pragma once

#include <limits.h>

#ifdef __cplusplus
extern "C" {
#endif

#define VIOLYTRA_CORE_INVALID INT_MIN

char *ViolytraCore_VersionParse(const char *value, char **errorOut);
int ViolytraCore_VersionCompare(const char *a, const char *b);
char *ViolytraCore_VersionRangeParse(const char *value, char **errorOut);
int ViolytraCore_VersionRangeSatisfies(const char *range, const char *version);
char *ViolytraCore_ManifestParse(const char *json, char **errorOut);

char *ViolytraCore_RepoIndexParse(const char *json, const char *repoUrl, char **errorOut);
char *ViolytraCore_RepoStoreList(char **errorOut);
int ViolytraCore_RepoStoreSet(const char *entriesJson, char **errorOut);
char *ViolytraCore_RepoStoreCacheDir(const char *url, char **errorOut);
char *ViolytraCore_RepoStoreCachedIndexFile(const char *url, char **errorOut);
char *ViolytraCore_RepoStoreCachedETagFile(const char *url, char **errorOut);

char *ViolytraCore_SourcesStoreAll(char **errorOut);
int ViolytraCore_SourcesStoreSet(const char *pluginId, const char *sourceJson, char **errorOut);
int ViolytraCore_SourcesStoreRemove(const char *pluginId, char **errorOut);
int ViolytraCore_SourcesStoreForgetRepos(const char *repoUrlsJson, char **errorOut);
char *ViolytraCore_SourcesStoreSetHeld(const char *pluginId, int held, char **errorOut);

char *ViolytraCore_ResolveInstall(const char *pluginId, const char *optionsJson,
                                  const char *installedJson, const char *installedDepsJson,
                                  char **errorOut);

char *ViolytraCore_FindUpdates(const char *installedJson, const char *pendingJson,
                               const char *installedDepsJson, char **errorOut);

int ViolytraCore_PluginIdIsValid(const char *id);

char *ViolytraCore_Sha256Hex(const char *data, unsigned long long length, char **errorOut);

char *ViolytraCore_PluginsLoadOrder(const char *manifestsJson, char **errorOut);

char *ViolytraCore_RequiredDependents(const char *manifestsJson, const char *pluginId, char **errorOut);

char *ViolytraCore_StagePluginZip(const char *zipPath, const char *tmpName, char **codeOut, char **errorOut);

char *ViolytraCore_OrderPluginsByDependencies(const char *requestJson, char **errorOut);

char *ViolytraCore_PluginStatesGetSlots(char **errorOut);
char *ViolytraCore_PluginStatesRead(char **errorOut);
int ViolytraCore_PluginStatesSetActiveSlot(const char *slot, int oneShot, char **errorOut);
char *ViolytraCore_PluginStatesUpdate(const char *slot, const char *pluginId,
                                      const char *stateJson, char **errorOut);
int ViolytraCore_PluginStatesActiveFlags(const char *pluginId, char **errorOut);
int ViolytraCore_PluginStatesBootFlags(const char *pluginId, char **errorOut);
int ViolytraCore_PluginStatesSetActiveFlags(const char *pluginId, int mask, char **errorOut);
int ViolytraCore_PluginStatesRemoveAll(const char *pluginId, char **errorOut);
int ViolytraCore_PluginStatesDefaultsBoot(void);
char *ViolytraCore_PluginStatesBootSlot(char **errorOut);

void ViolytraCore_FreeString(char *value);

#ifdef __cplusplus
}
#endif
