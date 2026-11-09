import { registerInternalManifest } from '@violytra/plugins/_'
import type { InternalPluginManifest } from '@violytra/plugins/_'

const manifests = import.meta.glob<InternalPluginManifest>(
    './*/*/manifest.json',
    {
        eager: true,
        import: 'default',
    },
)

for (const manifest of Object.values(manifests)) {
    if (manifest.build?.devOnly && !__DEV__) continue
    registerInternalManifest(manifest)
}
