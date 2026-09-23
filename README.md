# Yash Pandey — Portfolio

Personal site for [Yash Pandey](https://github.com/yashpandey002), a full-stack / platform engineer based in Bengaluru. Currently Product Engineer at SnowmountainAI.

Single-page site with experience, about, toolkit, and contact.

## Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- [React](https://react.dev) 19
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS](https://tailwindcss.com) 4
- [Biome](https://biomejs.dev) for lint and format
- [pnpm](https://pnpm.io)

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the development server |
| `pnpm build` | Create a production build |
| `pnpm start` | Serve the production build |
| `pnpm lint` | Run Biome checks |
| `pnpm format` | Format files with Biome |

## Project structure

```
src/
  app/          # Layout, page, and global styles
  components/   # Nav, hero, about, work, toolkit, contact, footer
  lib/          # Shared data (social links)
```

Content lives in the section components — experience in `src/components/work.tsx`, toolkit in `src/components/toolkit.tsx`, and socials in `src/lib/socials.ts`.
