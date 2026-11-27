import { expect, test } from "bun:test";
import { pageTitle, SITE_NAME } from "./site";

test("uses the site name alone when a page has no title", () => {
	expect(pageTitle()).toBe(SITE_NAME);
	expect(pageTitle("")).toBe(SITE_NAME);
	expect(pageTitle("   ")).toBe(SITE_NAME);
});

test("appends the site name to a page title", () => {
	expect(pageTitle("Page not found")).toBe("Page not found · shuntksh");
	expect(pageTitle("  Hiking  ")).toBe("Hiking · shuntksh");
});
