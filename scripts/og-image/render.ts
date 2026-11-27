/**
 * Render the social preview image to public/og-image.png with headless Chrome.
 *
 * Usage: bun run og
 * Set CHROME_PATH to use a browser other than Google Chrome on macOS.
 */
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { markerPath, seededRandom } from "../../src/lib/marker";

const WIDTH = 1200;
const HEIGHT = 630;
const root = join(import.meta.dir, "..", "..");
const output = join(root, "public", "og-image.png");
const chrome =
	process.env["CHROME_PATH"] ??
	"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

async function fontDataURL(path: string): Promise<string> {
	const bytes = await readFile(path);
	return `data:font/woff;base64,${bytes.toString("base64")}`;
}

async function main(): Promise<void> {
	const random = seededRandom(2026);
	const fonts = join(root, "src", "assets", "fonts");
	const replacements: Record<string, string> = {
		// Inline the fonts: Chrome refuses font files from other file:// folders.
		"{{FONT_REGULAR}}": await fontDataURL(join(fonts, "atkinson-regular.woff")),
		"{{FONT_BOLD}}": await fontDataURL(join(fonts, "atkinson-bold.woff")),
		"{{MARKER_A}}": markerPath(random),
		"{{MARKER_B}}": markerPath(random),
	};

	let html = await readFile(join(import.meta.dir, "template.html"), "utf8");
	for (const [token, value] of Object.entries(replacements)) {
		html = html.replaceAll(token, value);
	}

	const workDir = await mkdtemp(join(tmpdir(), "og-image-"));
	try {
		const page = join(workDir, "index.html");
		await writeFile(page, html);
		const result = Bun.spawnSync([
			chrome,
			"--headless",
			"--disable-gpu",
			"--hide-scrollbars",
			"--force-device-scale-factor=1",
			"--virtual-time-budget=2000",
			`--window-size=${WIDTH},${HEIGHT}`,
			`--user-data-dir=${join(workDir, "profile")}`,
			`--screenshot=${output}`,
			pathToFileURL(page).href,
		]);
		if (result.exitCode !== 0) {
			throw new Error(
				`Chrome exited with ${result.exitCode}: ${result.stderr.toString()}`,
			);
		}
	} finally {
		await rm(workDir, { recursive: true, force: true });
	}
}

await main();
