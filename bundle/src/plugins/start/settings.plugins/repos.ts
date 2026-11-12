import {
    listRepos,
    refreshRepo,
    setRepos,
} from '@violytra/plugins/_/repositories'
import { noop } from '@violytra/utils/callback'
import { api } from '.'
import type { Repo, RepoConfigEntry } from '@violytra/plugins/_/repositories'

const OLD_DEFAULT_PLUGIN_REPOSITORY_URL =
    'https://raw.githubusercontent.com/danishtesting4/violytra-community-plugins/main/index.json'

export async function addDefaultRepoIfNeeded(
    refresh = false,
): Promise<boolean> {
    if (!__BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__) return false

    const repos = await listRepos()
    const hasDefault = repos.some(
        repo => repo.url === __BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__,
    )
    if (hasDefault) return false

    let userRepos = toConfig(repos.filter(repo => !repo.internal))
    userRepos = userRepos.map(repo =>
        repo.url === OLD_DEFAULT_PLUGIN_REPOSITORY_URL
            ? { url: __BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__, enabled: repo.enabled }
            : repo,
    )

    const hasOld = repos.some(repo => repo.url === OLD_DEFAULT_PLUGIN_REPOSITORY_URL)
    if (hasOld && !userRepos.some(repo => repo.url === __BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__)) {
        userRepos = [{ url: __BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__, enabled: true }, ...userRepos]
    } else if (!hasOld && !userRepos.some(repo => repo.url === __BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__)) {
        userRepos = [{ url: __BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__, enabled: true }, ...userRepos]
    }

    await setRepos(userRepos)

    await api.jsonStorage.set({ defaultRepoRestored: true }).catch(noop)

    if (refresh)
        await refreshRepo(__BUILD_DEFAULT_PLUGIN_REPOSITORY_URL__).catch(noop)

    return true
}

export function toConfig(list: Repo[]): RepoConfigEntry[] {
    return list.map(({ url, enabled }) => ({ url, enabled }))
}
