package app.violytra.xposed.tweaks.bridge

import app.violytra.bridge.asDelegate
import app.violytra.reloadApp
import app.violytra.xposed.api.registerNativeMethod
import app.violytra.xposed.openFileGuarded
import app.violytra.xposed.tweak
import java.io.File

/**
 * `violytra.fs.*` + `violytra.app.*` bridge methods.
 */
val additionalBridgeMethods by tweak {
    registerNativeMethod("violytra.app.reload") {
        reloadApp()
    }

    withAppContext { ctx ->
        registerNativeMethod("violytra.fs.getConstants") {
            mapOf(
                "data" to ctx.dataDir.absolutePath,
                "files" to ctx.filesDir.absolutePath,
                "cache" to ctx.cacheDir.absolutePath,
            )
        }

        registerNativeMethod("violytra.fs.delete") { args ->
            val argv = args.asDelegate()
            val path by argv.string()
            val f = File(path)
            if (f.isDirectory) f.deleteRecursively() else f.delete()
        }

        registerNativeMethod("violytra.fs.exists") { args ->
            val argv = args.asDelegate()
            val path by argv.string()
            File(path).exists()
        }

        registerNativeMethod("violytra.fs.read") { args ->
            val argv = args.asDelegate()
            val path by argv.string()
            val file = File(path).also { it.openFileGuarded() }
            file.bufferedReader().use { it.readText() }
        }

        registerNativeMethod("violytra.fs.write") { args ->
            val argv = args.asDelegate()
            val path by argv.string()
            val contents by argv.string()
            File(path).apply {
                if (isDirectory) throw Error("Path is a directory: $path")
                parentFile?.mkdirs()
                writeText(contents)
            }

            null
        }
    }
}
