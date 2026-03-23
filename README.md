<div align="center">
  <a href="https://github.com/issam-seghir/portfolio.dev">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="public/images/dark-header.png">
      <img alt="Project Cover" src="public/images/light-header.png">
    </picture>
  </a>

  <h1 align="center">
    portfolio.dev
  </h1>

  <img src="https://img.shields.io/badge/Next.js-000000.svg?style=for-the-badge&logo=Next.js&labelColor=000" alt="Framework" />
  <img src="https://img.shields.io/github/languages/top/issam-seghir/portfolio.dev?style=for-the-badge&labelColor=000" alt="Language" />
  <img src="https://img.shields.io/github/license/issam-seghir/portfolio.dev?style=for-the-badge&labelColor=000" alt="License" />
</div>

Welcome to my personal blog and portfolio website! This repository contains a modern Next.js application where I share my thoughts, projects, and insights.

## Features

### Core Technologies

- Next.js 16 with App Router
- TypeScript with strict configuration
- Tailwind CSS for styling
- MDX for content
- Drizzle ORM
- I18n for internationalization support (English & Arabic with RTL)

### UI/UX

- Radix UI for accessible UI components
- Responsive design
- Light/Dark mode
- Image zoom in blog posts
- Shiki for code syntax highlighting
- Motion for animations
- Table of contents for blog posts

### Blog Features

- Comment system
- Like functionality
- Post view counter
- Blog post search
- RSS feed (`/rss.xml` per locale, e.g. `/ar/rss.xml` for Arabic; `/feed`, `/rss`, and `/atom` redirect to the default feed)
- Sitemap (includes RSS URLs)

### Performance & SEO

- Lighthouse score of nearly 100
- SEO optimized with meta tags and JSON-LD
- Dynamic open graph images using `next/og`

### Development Experience

- Vitest for unit/integration testing
- Playwright for E2E testing
- ESLint configuration
- Prettier code formatting
- Lefthook
- Conventional commit lint

### Authentication & Data

- Better Auth
- Redis caching
- Upstash for API rate limiting
- t3-env for environment variables
- Umami Analytics

## Getting Started

### Prerequisites

- Node.js >= 24
- pnpm >= 10
- Docker
- [Visual Studio Code](https://code.visualstudio.com/) with [recommended extensions](.vscode/extensions.json)
- **[Portless](https://github.com/vercel-labs/portless)** (recommended for local dev — install globally per [their docs](https://github.com/vercel-labs/portless): `npm install -g portless` — do not add as a project dependency)

## Project Structure

```
portfolio.dev/
├── public/           # Static assets (images, fonts, videos)
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # React components
│   ├── config/       # Configuration files
│   ├── content/      # MDX blog posts and content
│   ├── db/           # Database schema and migrations
│   ├── emails/       # Email templates
│   ├── hooks/        # Custom React hooks
│   ├── i18n/         # Internationalization
│   ├── lib/          # Utility libraries
│   ├── orpc/         # oRPC API routes
│   ├── styles/       # Global styles
│   └── utils/        # Utility functions
├── docker-compose.yml
└── package.json
```

## Development

To run this project locally, you need to set up the development environment.

### Setup

1. Clone the repository:

```bash
git clone https://github.com/issam-seghir/portfolio.dev
```

2. Navigate to the project directory:

```bash
cd portfolio.dev
```

3. Install dependencies using pnpm:

```bash
pnpm install
```

### Environment Setup

1. Copy `.env.example` to `.env.local` and update the environment variables as needed.

```bash
cp .env.example .env.local
```

2. Run required services using Docker:

```bash
docker compose up -d
```

3. Run the database migrations:

```bash
pnpm db:migrate
```

4. Seed the database:

```bash
pnpm db:seed
```

5. Set **`NEXT_PUBLIC_SITE_URL`** in `.env.local` to match how you open the app (see table below).

6. Run the app:

```bash
pnpm dev          # Next.js via Portless (stable named URL, avoids port clashes)
pnpm dev:direct   # Plain Next on port 3005 (no Portless — use for E2E or if Portless isn’t installed)
# or
pnpm email:dev    # Run the email preview server separately
```

#### Portless (default `pnpm dev`)

This repo follows [Portless](https://github.com/vercel-labs/portless) best practices: **global CLI**, not an npm dependency. If `portless` is not found, run `npm install -g portless` or use **`pnpm dev:direct`** instead.

- **One-time** (optional, for HTTPS): `portless proxy start --https` (see upstream README for OS trust / sudo notes).
- Run **`pnpm dev`** — Portless assigns a port and serves the app at a stable URL based on the package name (`portfolio-dev` → e.g. **`http://portfolio-dev.localhost:1355`**; proxy default port **1355**).
- Set **`NEXT_PUBLIC_SITE_URL`** in `.env.local` to that URL (or the `https://…` variant if you use `--https`).
- **Bypass Portless** for a run: `PORTLESS=0 pnpm dev` or use **`pnpm dev:direct`** (fixed **`http://localhost:3005`**) and set `NEXT_PUBLIC_SITE_URL` accordingly.

**Playwright E2E** starts **`pnpm dev:direct`** so the server matches `http://localhost:3005`.

The services will be available at the following URLs:

| Service          | URL |
| ---------------- | --- |
| App (Portless)   | e.g. `http://portfolio-dev.localhost:1355` (see terminal after `pnpm dev`) |
| App (direct)     | `http://localhost:3005` (`pnpm dev:direct`) |
| React Email      | `localhost:3006` |
| Database         | `localhost:5433` |
| Redis            | `localhost:6380` |
| Redis serverless | `localhost:8080` |

### Available Scripts

```bash
pnpm dev              # Start development server (Portless + Next)
pnpm dev:direct       # Next only on :3005 (no Portless)
pnpm build            # Build for production
pnpm start            # Start production server
pnpm lint             # Run ESLint
pnpm typecheck        # Run TypeScript type checking
pnpm format           # Format code with Prettier
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests
pnpm db:migrate       # Run database migrations
pnpm db:seed          # Seed the database
pnpm db:studio        # Open Drizzle Studio
```

## Credits

This project is a fork of [nelsonlai.dev](https://github.com/nelsonlaidev/nelsonlai.dev) by Nelson Lai. Special thanks to the original author and the open-source community.

## Author

- [@issam-seghir](https://github.com/issam-seghir)

## License

This project is open source and available under the [MIT License](LICENSE).

---

<p align="center">
Made with ❤️ in Algeria
</p>
