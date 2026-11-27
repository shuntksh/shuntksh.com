export const SITE_NAME = "shuntksh";

/** Build the document title, using the site name alone for the homepage. */
export function pageTitle(title?: string): string {
	const trimmed = title?.trim() ?? "";
	return trimmed === "" ? SITE_NAME : `${trimmed} · ${SITE_NAME}`;
}
