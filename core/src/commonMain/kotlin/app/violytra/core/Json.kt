package app.violytra.core

import kotlinx.serialization.json.Json

/** JSON reader/writer for every document the loader owns. Tolerant of unknown keys so old documents keep parsing. */
val ViolytraJson: Json = Json { ignoreUnknownKeys = true }
