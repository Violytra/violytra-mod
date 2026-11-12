plugins {
    base
}

val isMacHost = System.getProperty("os.name").equals("Mac OS X", ignoreCase = true)

val theosDir = providers.environmentVariable("THEOS")
    .orElse(providers.systemProperty("user.home").map { "$it/theos" })

val coreFrameworkDir = rootProject.layout.projectDirectory
    .dir("core/build/bin/iosArm64/debugFramework")

val coreStaticLib = rootProject.layout.projectDirectory
    .file("core/build/bin/iosArm64/debugStatic/libViolytraCore.a")

/** The release JS bundle from `:bundle`, shipped next to the tweak. */
val bundleScope = configurations.dependencyScope("releaseBundle")
dependencies.add(bundleScope.name, dependencies.project(":bundle", "releaseBundle"))
val bundleFiles = configurations.resolvable("releaseBundleFiles") { extendsFrom(bundleScope.get()) }
val bundleDir: FileCollection = files(bundleFiles)

val packageTweak = tasks.register<Exec>("packageTweak") {
    group = "build"
    description = "Builds the ViolytraTweak deb with Theos."

    workingDir = layout.projectDirectory.asFile
    commandLine("make", "package")
    environment("THEOS", theosDir.get())
    inputs.files(bundleDir)
    doFirst { environment("VIOLYTRA_BUNDLE_DIR", bundleDir.singleFile.absolutePath) }
    if (isMacHost) {
        dependsOn(":core:linkDebugFrameworkIosArm64")
        environment("VIOLYTRA_CORE_FW", coreFrameworkDir.asFile.absolutePath)
    } else {
        dependsOn(":core:linkViolytraCoreStaticIosArm64")
        environment("VIOLYTRA_CORE_LIB", coreStaticLib.asFile.absolutePath)
    }

    onlyIf("Theos is installed ($theosDir)") { file(theosDir.get()).isDirectory }
}

tasks.named("assemble") {
    dependsOn(packageTweak)
}

val cleanTheos = tasks.register<Exec>("cleanTheos") {
    group = "build"
    description = "Removes Theos build intermediates (.theos/)."
    workingDir = layout.projectDirectory.asFile
    commandLine("make", "clean")
    environment("THEOS", theosDir.get())
    isIgnoreExitValue = true
}

tasks.named<Delete>("clean") {
    dependsOn(cleanTheos)
}
