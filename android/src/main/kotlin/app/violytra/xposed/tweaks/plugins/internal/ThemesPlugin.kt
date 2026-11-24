package app.violytra.xposed.tweaks.plugins.internal

import app.violytra.plugins.PluginDependency
import app.violytra.plugins.PluginManifest
import app.violytra.plugins.RESERVED_DEPENDENCY_IDS
import app.violytra.plugins.Version
import app.violytra.plugins.VersionRange
import app.violytra.themes.themesPlugin
import app.violytra.xposed.tweaks.plugins.PluginFactory

private val themesManifest = run {
    val base = PluginManifest(
        id = "violytra.api.themes",
        name = "Themes API",
        description = "Lets theme plugins provide color themes, font packs, icon packs, and emoji packs.",
        author = "Violytra",
        icon = "PaintPaletteIcon",
        version = Version.parse("1.0.2"),
        dependencies = mapOf(
            "violytra.api" to PluginDependency(VersionRange.parse(">=1 <2")),
            "discord" to PluginDependency(VersionRange.parse(">=352.2")),
        ),
    )
    val missing = RESERVED_DEPENDENCY_IDS - base.dependencies.keys
    if (missing.isEmpty()) base else base.copy(dependencies = base.dependencies + missing.associateWith { PluginDependency() })
}

internal val internalThemesPlugin = PluginFactory(
    themesManifest,
    setOf(InternalPluginFlags.INTERNAL, InternalPluginFlags.ENABLED_BY_DEFAULT, InternalPluginFlags.API),
) { themesPlugin }
