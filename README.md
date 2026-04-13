# Karate Kata Database

A comprehensive reference database for karate techniques, stances, and kata movements. This application provides an organized catalog of traditional karate elements for practitioners and instructors.

**Live App:** [karate-kata.vercel.app](https://karate-kata.vercel.app)

## Features

- **Techniques Database** - Browse and manage karate techniques with Japanese names (hiragana/kanji), types, and descriptions
- **Stances Library** - Reference of karate stances with proper terminology
- **Kata Management** - Organize and track kata sequences with detailed move breakdowns
- **Interactive Data Tables** - Search, sort, and filter through the database
- **Authentication** - Secure sign-in required for adding or editing data (view-only access available publicly)
- **Bulk CSV Upload** - Import multiple techniques, stances, or kata moves efficiently

## Local Development

This project uses Docker for local development with a Next.js app and a PostgreSQL database.

### Prerequisites

- Open [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- Login to Docker Hardened Image registry:
  ```bash
  docker login dhi.io
  ```

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/cmsato09/kata-db.git
   cd kata-db
   ```

2. Build and start the containers:
   ```bash
   docker compose up --build --watch
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

On subsequent runs (no changes to `Dockerfile.dev`):
```bash
docker compose up --watch
```

### Stopping

```bash
docker compose down          # stop containers (database data is preserved)
docker compose down -v       # stop containers and delete database data
```

## Tech Stack

- **Framework:** [Next.js 16](https://nextjs.org) (React, App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL with [Prisma](https://www.prisma.io) ORM
- **Authentication:** [Clerk](https://clerk.com)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com) + [Tailwind CSS](https://tailwindcss.com)
- **Deployment:** [Vercel](https://vercel.com)

