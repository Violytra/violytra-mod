import {
	callNativeMethod,
	callNativeMethodSync,
} from '@violytra/modules/native'
import type {
	BackgroundSettings,
	ColorsSelection,
	EmojiSelection,
	FontsSelection,
	FontVariant,
	IconsSelection,
	ThemesState,
} from './types'

export function readThemesState(): ThemesState {
	return JSON.parse(callNativeMethodSync('violytra.themes.getState', []))
}

export function writeColorsSelection(selection: ColorsSelection | null) {
	return callNativeMethod('violytra.themes.setColors', [
		selection && JSON.stringify(selection),
	])
}

export function writeFontsSelection(selection: FontsSelection | null) {
	return callNativeMethod('violytra.themes.setFonts', [
		selection && JSON.stringify(selection),
	])
}

export function writeIconsSelection(selection: IconsSelection | null) {
	return callNativeMethod('violytra.themes.setIcons', [
		selection && JSON.stringify(selection),
	])
}

export function writeEmojiSelection(selection: EmojiSelection | null) {
	return callNativeMethod('violytra.themes.setEmoji', [
		selection && JSON.stringify(selection),
	])
}

export function writeBackgroundSettings(settings: BackgroundSettings | null) {
	return callNativeMethod('violytra.themes.setBackground', [
		settings && JSON.stringify(settings),
	])
}

/** Copies a picked image (`file://` or `content://`) into storage. Resolves to its absolute path. */
export function importBackgroundImage(uri: string) {
	return callNativeMethod('violytra.themes.importBackground', [uri])
}

/** Registers {@link name} as a font family React Native can render previews with. */
export function registerPreviewFont(
	name: string,
	variants: Required<FontVariant>[],
) {
	callNativeMethodSync('violytra.themes.previewFont', [
		JSON.stringify({ name, variants }),
	])
}

/**
 * Returns image paths of {@link codepoints} in {@link pack}, or Discord's when {@link pack} is `null`.
 *
 * @returns `null` when neither source provides a preview.
 */
export async function readPreviewEmoji(
	pack: Pick<EmojiSelection, 'images' | 'font'> | null,
	codepoints: string[],
): Promise<(string | null)[]> {
	return JSON.parse(
		await callNativeMethod('violytra.themes.previewEmoji', [
			JSON.stringify({ pack, codepoints }),
		]),
	)
}

declare module '@violytra/modules/native' {
	interface NativeMethods {
		'violytra.themes.getState': [[], string]
		'violytra.themes.setColors': [[json: string | null], null]
		'violytra.themes.setFonts': [[json: string | null], null]
		'violytra.themes.setIcons': [[json: string | null], null]
		'violytra.themes.setEmoji': [[json: string | null], null]
		'violytra.themes.setBackground': [[json: string | null], null]
		'violytra.themes.importBackground': [[uri: string], string]
		'violytra.themes.previewFont': [[json: string], null]
		'violytra.themes.previewEmoji': [[json: string], string]
	}
}


