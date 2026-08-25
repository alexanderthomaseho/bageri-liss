# Tina Starter 🦙

![tina-nextjs-starter-demo](https://user-images.githubusercontent.com/103008/130587027-995ccc45-a852-4f90-b658-13e8e0517339.gif)

This Next.js starter is powered by [TinaCMS](https://app.tina.io) for you and your team to visually live edit the structured content of your website. ✨

The content is managed through Markdown and JSON files stored in your GitHub repository, and queried through Tina GraphQL API.

### Features

- [Tina Headless CMS](https://app.tina.io) for authentication, content modeling, visual editing and team management.
- [Vercel](https://vercel.com) deployment to visually edit your site from the `/admin` route.
- Local development workflow from the filesystem with a local GraqhQL server.

## Requirements

- Git, [Node.js Active LTS](https://nodejs.org/en/about/releases/), npm installed for local development.
- A [TinaCMS](https://app.tina.io) account for live editing.

## Local Development

Install the project's dependencies:

```
npm install
```

Run the project locally:

```
npm run dev
```

### Local URLs

- http://localhost:3000 : browse the website
- http://localhost:3000/admin : connect to Tina Cloud and go in edit mode
- http://localhost:3000/exit-admin : log out of Tina Cloud
- http://localhost:4001/altair/ : GraphQL playground to test queries and browse the API documentation

### Developing on a remote machine

TinaCMS bakes `http://localhost:4001` into the admin page and into its bundle. If the
dev server runs on a different machine than your browser, that address points at *your
own* machine, so `/admin` fails to load.

**SSH tunnel (simplest).** Forward both ports and then use `http://localhost:3000` as if
everything were local — hot reload in the admin UI included:

```bash
ssh -L 3000:localhost:3000 -L 4001:127.0.0.1:4001 <user>@<host>
```

The Tina server binds to `127.0.0.1` (see `build.host` in `tina/config.tsx`), which is why
the second forward names that address explicitly rather than `localhost`.

**Same-origin proxy (already set up).** If you cannot tunnel, `http://<host>:3000/admin`
works as-is: in dev, `next.config.ts` proxies `/admin/*`, `/graphql`, `/media*` and
`/altair` to the Tina server, and `scripts/patch-tina-admin-html.mjs` rewrites the
generated admin page to origin-relative URLs. One gap remains — Next cannot proxy
websockets, so Vite's hot reload does not reach the admin UI. Reload the page manually
after changing `tina/config.tsx` or the schema.

Neither route exposes the Tina server to the network. It has no authentication and is not
meant to be reachable from the internet.

## Deployment

### GitHub Pages

This starter can be deployed to GitHub Pages. A GitHub Actions workflow is included that handles the build and deployment process. 

To deploy to GitHub Pages:

1. In your repository settings, ensure GitHub Pages is enabled and set to deploy from the `gh-pages` branch
2. Push changes to your main branch - the workflow will automatically build and deploy the site

> [!NOTE]
> When deploying to GitHub Pages, you'll need to update your secrets in Settings | Secrets and variables | Actions to include:
> - `NEXT_PUBLIC_TINA_CLIENT_ID`
> - `TINA_TOKEN`
>
> You get these from your TinaCloud project - [read the docs](https://tina.io/docs/tina-cloud/deployment-options/github-pages)

> [!IMPORTANT]
> GitHub Pages does not support server side code, so this will run as a static site. If you don't want to deploy to GitHub pages, just delete `.github/workflows/build-and-deploy.yml`

### Building the Starter Locally (Using the hosted content API)

Replace the `.env.example`, with `.env`

```
NEXT_PUBLIC_TINA_CLIENT_ID=<get this from the project you create at app.tina.io>
TINA_TOKEN=<get this from the project you create at app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<Specify the branch with Tina configured>
```

Build the project:

```bash
npm run build
```

## Getting Help

To get help with any TinaCMS challenges you may have:

- Visit the [documentation](https://tina.io/docs/) to learn about Tina.
- [Join our Discord](https://discord.gg/zumN63Ybpf) to share feedback.
- Visit the [community forum](https://community.tinacms.org/) to ask questions.
- Get support through the chat widget on the TinaCMS Dashboard
- [Email us](mailto:support@tina.io) to schedule a call with our team and share more about your context and what you're trying to achieve.
- [Search or open an issue](https://github.com/tinacms/tinacms/issues) if something is not working.
- Reach out on Twitter at [@tina_cms](https://twitter.com/tina_cms).

## Development tips

### Visual Studio Code GraphQL extension

[Install the GraphQL extension](https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql) to benefit from type auto-completion.

### Typescript

A good way to ensure your components match the shape of your data is to leverage the auto-generated TypeScript types.
These are rebuilt when your `tina` config changes.

### Patched TinaCMS CLI

`scripts/patch-tina-cli.mjs` edits two spots in `node_modules/@tinacms/cli/dist/index.js`.
It runs from `predev` and `postinstall`, so you will see its output after every install —
installing resets `node_modules`, so the patch has to be re-applied. It is idempotent, and
if the CLI has changed so that a patch site no longer matches, it prints a warning and
exits cleanly instead of failing the install.

**`optimizeDeps.force`** — the CLI forces Vite's dependency scan on every start. That makes
the cache useless and runs a second esbuild process alongside the first: peak memory was
~1.5 GB for the larger process and ~2.1 GB for both together, which is enough for the OOM
killer on a 4 GB machine. Setting it to `false`, together with `GOGC=20 GOMEMLIMIT=350MiB`
in the `dev` script to rein in Go's garbage collector, brings the peak down to ~730 MB at
unchanged startup time. Note that the first start after an install still has to build the
cache once and will spike again. If the admin bundle ever looks stale, `npm run dev:fresh`
clears the Vite cache before starting.

**`__API_URL__`** — the GraphQL address compiled into the admin bundle. The patch turns it
into an origin-relative `/graphql`, but only when `TINA_ADMIN_RELATIVE_API=1` is set (the
`dev` script does) and only for localhost addresses, so builds are unaffected. See
[Developing on a remote machine](#developing-on-a-remote-machine) for the wider picture.

## LICENSE

Licensed under the [Apache 2.0 license](./LICENSE).


# Repository cleaned of LFS content
# Repository cleaned of LFS content - Wed Sep 17 15:00:42 AEST 2025

