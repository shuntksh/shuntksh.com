import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
	site: "https://shuntksh.com",
	// Pages build to `page/index.html`, so match the URLs Cloudflare Pages serves.
	trailingSlash: "always",
	integrations: [sitemap()],
	// No Markdown pages; Shiki's inline styles would also conflict with the CSP.
	markdown: { syntaxHighlight: false },
	fonts: [
		{
			provider: fontProviders.local(),
			name: "Atkinson Hyperlegible",
			cssVariable: "--font-atkinson",
			fallbacks: ["sans-serif"],
			options: {
				variants: [
					{
						src: ["./src/assets/fonts/atkinson-regular.woff"],
						weight: 400,
						style: "normal",
					},
					{
						src: ["./src/assets/fonts/atkinson-bold.woff"],
						weight: 700,
						style: "normal",
					},
				],
			},
		},
	],
	security: {
		csp: {
			directives: [
				"default-src 'self'",
				"img-src 'self' data:",
				"font-src 'self'",
				"object-src 'none'",
				"base-uri 'self'",
				"form-action 'none'",
			],
			// The trip checklist sets a per-item CSS variable in a style attribute.
			styleDirective: {
				resources: ["'self'", "'unsafe-inline'"],
			},
		},
	},
});
