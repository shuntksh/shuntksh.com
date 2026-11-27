# shuntksh.com

Source for [shuntksh.com](https://shuntksh.com), a small static personal site
built with [Astro](https://astro.build) and hosted on Cloudflare Pages.

## Development

Requires [Bun](https://bun.sh) and Node 22.23.4 or newer. With Nix and direnv,
`direnv allow` provides the toolchain from `flake.nix`.

```sh
bun install
bun run dev    # start the local development server
bun test       # run unit tests
bun check      # type check
bun run build  # build to dist/
```

## License

All rights reserved for the site content and personal data (text, hiking log,
and favicon). The Atkinson Hyperlegible fonts in `public/fonts/` are licensed
under the SIL Open Font License 1.1.

## Edit the hiking page

Edit `src/data/thruhiking.json`. Astro reads this file at build time and generates
the page at `/thruhiking-bucket-list/`. No browser script is needed for the list.

- Change `title` or `description` to edit the page introduction.
- Add or edit trips in a category's `trips` array. Each category sorts A–Z at build time.
- Set `done` to `true` for a checkmark and a hand-drawn strike line.
- Add `year` for the completion year and `note` for your personal route details.
- Use `text` for the highlighted trail name and optional `country` for the
  country shown outside the highlight.
- Use `description` for the distance and route. Use `source` for its source link.
  `source`, `year`, and `note` are optional.
- Add another category with a `title` and a `trips` array to create a new section.
- Edit `memorableRoutes.paragraph` to change the closing paragraph. Each part has
  `text` and `highlight`. Set `highlight` to `true` for a yellow marker effect.
  Keep spaces between text parts.

Example trip:

```json
{
  "text": "Trail name",
  "description": "100 km (62 mi) from the start to the finish.",
  "done": false,
  "note": "A future hike."
}
```

Use double quotes and no trailing commas in JSON. Run `bun run dev` to see edits
locally. Run `bun run build` to generate the updated HTML. Publishing the changes
still requires deployment.
