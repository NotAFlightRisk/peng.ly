# Peng.ly

Source for [peng.ly](https://peng.ly). Built with SvelteKit and prerendered to plain HTML. The only client-side JS is on the home page, for the penguin's eyes.

## Commands

```sh
npm run dev      # local dev server
npm run build    # static site in build/
npm run preview  # serve the build locally
npm run check    # type and a11y checks
```

## Where things live

- Site name, description and links are in `src/lib/config.ts`
- Colours, fonts, sizes and animation timings are CSS variables at the top of `src/app.css`
- The penguin is an inline SVG in `src/lib/Penguin.svelte`, and `src/lib/assets/avatar.jpg` is only used for social previews
- SEO tags and the footer are in `src/routes/+layout.svelte`

New pages go in `src/routes/<name>/+page.svelte` and are added to the sitemap automatically. To give one its own title, return `{ title: 'About' }` from a `+page.ts` load function.

## Deploying

Upload the `build/` folder to any static host.
