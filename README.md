# Sports Articles Full-Stack Application

A modern full-stack web application for managing sports articles with a GraphQL API backend and a Next.js frontend.  
This project was built as part of a **Fullstack Engineer Test Assessment** and strictly follows the provided requirements.

---

## 🏗️ Project Architecture

- **Backend**: Node.js + TypeScript + Express + Apollo Server (GraphQL)
- **Frontend**: Next.js + React + TypeScript + Tailwind CSS + Apollo Client (GraphQL)
- **Database**: PostgreSQL with TypeORM
- **API**: GraphQL (Apollo Server v4)
- **Monorepo**: pnpm workspaces

---

## 🧩 Runtime Versions

- **Node.js**: v18.x (recommended)
- **pnpm**: v8+

---

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js v18+ (https://nodejs.org/)
- **pnpm** package manager (`npm install -g pnpm`)
- **Docker** (recommended for database setup)
- PostgreSQL v12+ (only required if not using Docker)

---

## 🚀 Quick Start

### 1. Clone and Install Dependencies

```bash
# Clone the repository
git clone <repository-url>
cd Fullstack-Engineer-Test-Assessment

# Install all dependencies (root and workspaces)
pnpm install
```

---

### 2. Database Setup (PostgreSQL via Docker)

Docker is used **only** to provide a consistent PostgreSQL setup across environments.

```bash
# Start PostgreSQL
docker compose up -d

# Check status
docker compose ps
```

The database and schema are created automatically by the container.

---

> **⚠️ Attention:**  
> If the database fails to start or the port is already in use, see the  
> **Troubleshooting Docker** section below.


### 3. Backend Configuration

```bash
# Copy environment template
cp apps/backend/.env.example apps/backend/.env
```

Edit `apps/backend/.env`:

```env
PORT=4000

DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=sports_articles
DB_SSL=false
```


---

### 4. Database Migrations & Seed

```bash
pnpm --filter backend migration:run
pnpm --filter backend seed
```

---

### 5. Frontend Configuration

Create `apps/frontend/.env`:

```env
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

---

### 6. Run the Application

```bash
# Backend
pnpm --filter backend dev

# Frontend
pnpm --filter frontend dev
```

---

## 🌐 Access URLs

- Frontend: http://localhost:3000
- GraphQL Playground: http://localhost:4000/graphql
- Backend Health Check: http://localhost:4000/health

---

## 🔍 Server-Side Rendering (SSR)

This project uses **Next.js SSR**, as required by the assessment:

- **Articles List Page (`/`)**
  - Fetches the first 10 articles via `getServerSideProps`
  - Improves SEO and initial render performance

- **Article Details Page (`/article/[id]`)**
  - Fetches a single article using SSR
  - Supports direct access and SEO-friendly rendering

---

## 📁 Project Structure

```
/apps
  /backend
    /src
      /entities
      /migrations
      /schema
      /resolvers
      /scripts
      index.ts
  /frontend
    /src
      /components
      /lib
      /pages
```

---

## 🗄️ Database Schema

### SportsArticle

| Field     | Type      | Description            |
|---------- |---------- |------------------------|
| id        | SERIAL    | Primary key            |
| title     | string    | Required               |
| content   | string    | Required               |
| imageUrl  | string    | Optional               |
| createdAt | timestamp | Creation date          |
| deletedAt | timestamp | Soft delete (nullable) |

> Soft deletes are supported. Deleted articles remain in the database.

---

## 🌐 GraphQL API

### Queries

```graphql
query GetArticles($limit: Int, $offset: Int) {
  articles(limit: $limit, offset: $offset) {
    id
    title
    content
    imageUrl
    createdAt
  }
}

query GetArticle($id: ID!) {
  article(id: $id) {
    id
    title
    content
    imageUrl
    createdAt
  }
}
```

---

### Mutations

```graphql
mutation CreateArticle($input: ArticleInput!) {
  createArticle(input: $input) {
    id
    title
    content
    imageUrl
    createdAt
  }
}

mutation UpdateArticle($id: ID!, $input: ArticleInput!) {
  updateArticle(id: $id, input: $input) {
    id
    title
    content
    imageUrl
    createdAt
  }
}

mutation DeleteArticle($id: ID!) {
  deleteArticle(id: $id)
}
```

---

## ♾️ Pagination Strategy

Offset-based pagination using `limit` and `offset`.

Infinite loading was intentionally not implemented to keep the focus on:
- SSR correctness
- Clear GraphQL pagination behavior
- Simpler UI logic

---

## 🧪 Validation & Error Handling

- Client-side validation for required fields (`title`, `content`)
- Server-side validation with readable GraphQL errors
- Proper error handling for failed queries and mutations

---

## 🐳 Docker Notes

Docker is intentionally used **only for the database** to keep the developer experience simple.
Backend and frontend are run directly using pnpm, as required by the assessment.

---

## Troubleshooting Docker

### Port 5432 Already in Use

If you see `port is already allocated`, you have a local PostgreSQL running.

#### Option 1: Stop local PostgreSQL

**macOS**
```bash
brew services list | grep postgresql
brew services stop postgresql
# OR
pg_ctl -D /usr/local/var/postgres stop
```

**Linux**
```bash
sudo systemctl status postgresql
sudo systemctl stop postgresql
```

**Windows**
- Stop PostgreSQL from **Services** (`services.msc`), or
- If installed via the PostgreSQL installer, stop it from the PostgreSQL tray icon

#### Option 2: Use different port (recommended)

Change `docker-compose.yml` ports (if needed) to:

```yml
ports:
  - "5433:5432"
```

And update backend `.env`:

```env
DB_PORT=5433
```

## Common Pitfalls

1. **Port already in use**: If port 5432 is occupied, stop local PostgreSQL or change the port mapping.

2. **Connection refused**: Wait a few seconds after `docker compose up` for PostgreSQL to initialize. Check with `docker compose ps`.

3. **Volume persistence**: Data persists in the `postgres_data` volume. Use `docker compose down -v` to start fresh.

4. **Wrong host**:
   - Backend running on host machine → `DB_HOST=localhost`
   - Backend running inside Docker Compose → `DB_HOST=postgres`

5. **Migration timing**: Run migrations only after PostgreSQL is healthy. Check with `docker compose ps` or wait 5–10 seconds.


## 📝 License

Provided as-is for assessment purposes.
