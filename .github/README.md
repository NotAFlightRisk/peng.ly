<h1 align="center">Peng.ly</h1>
<p align="center">
<i>Just the source for my website</i>
<br />
<b>🌐 <a href="https://peng.ly/">peng.ly</a></b><br />
</p>

---


## Developing

Static site built with SvelteKit. Data is pulled from GitHub API, so a `GITHUB_TOKEN` is needed.

```sh
npm install
npm run dev      # local dev server
npm run preview  # serve the build locally
npm run check    # type and a11y checks
```

---

## Deploying

Follow the developing instructions, then run `npm run build` and upload the `build/` folder to any static host.

The contact form posts to a Cloudflare Worker in [`worker/`](../worker), which emails each message to me through Cloudflare Email Routing. It runs on the `peng.ly/api/contact` route, so the domain needs to stay proxied through Cloudflare. CI deploys it whenever it changes on `main`, given `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets. `TO` is the inbox it sends to, must be a verified destination address in Email Routing, and only needs setting once.

```sh
npx wrangler secret put TO --config worker/wrangler.toml
npx wrangler deploy --config worker/wrangler.toml   # or by hand
```

---

## Licence

Licensed under [MIT](../LICENSE)

```
Copyright 2026 NotAFlightRisk <Peng.ly>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the “Software”), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies
of the Software, and to permit persons to whom the Software is furnished to do so,
subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE
OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
```



<p  align="center">
  <a href="https://github.com/NotAFlightRisk"><img width="64" src="https://pixelflare.cc/iain/gif/penguin-dance.gif" /></a><br>
  <sup>
    <i>© <a href="https://github.com/NotAFlightRisk">NotAFlightRisk</a> 2026</i>
  </sup>
</p>

