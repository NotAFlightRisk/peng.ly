# Peng.ly

Source for [peng.ly](https://peng.ly). Built with SvelteKit and prerendered to plain HTML. The only client-side JS is on the home page, for the penguin's eyes.

## Commands

```sh
npm run dev      # local dev server
npm run build    # static site in build/
npm run preview  # serve the build locally
npm run check    # type and a11y checks
```

## Contributions data

The `/contributions` page is built from the GitHub API, so `npm run build` fetches it. Copy `.env.example` to `.env` and put a `GITHUB_TOKEN` in it, or the build falls back to unauthenticated requests, which run out of allowance quickly. It shows merged pull requests only, skips your own repos, and skips repos you've sent more than ten to. That limit is `busiest` in `src/routes/(pages)/contributions/+page.server.ts`. The list only changes when the site is rebuilt.

## Where things live

- Site name, description, links and panel titles are in `src/lib/config.ts`
- Open source contributions, security reports, projects and blog posts are in `src/lib/content.ts`
- Colours, fonts, sizes and animation timings are CSS variables at the top of `src/app.css`
- The penguin is an inline SVG in `src/lib/Penguin.svelte`, and `src/lib/assets/avatar.jpg` is only used for social previews
- SEO tags and the footer are in `src/routes/+layout.svelte`

New pages go in `src/routes/(pages)/<name>/`, which gives them the nav bar and page layout. Return `{ title, description }` from the page's `+page.ts`: they become the heading, the intro line and the SEO tags. Pages are added to the sitemap automatically.

## Deploying

Upload the `build/` folder to any static host.
