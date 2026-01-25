# Sports Articles Full-Stack Application

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?logo=node.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white)
![GraphQL](https://img.shields.io/badge/GraphQL-Apollo-E10098?logo=graphql&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169E1?logo=postgresql&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-32%20passed-brightgreen?logo=checkmarx&logoColor=white)

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

```bash
# Copy environment template
cp apps/frontend/.env.example apps/frontend/.env
```

The default values should work for local development:

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

## 🧹 Code Quality

This project includes ESLint and Prettier for code quality and consistent formatting.

```bash
# Run linting across all workspaces
pnpm lint

# Format code across all workspaces
pnpm format
```

You can also run these commands for individual workspaces:

```bash
# Backend only
pnpm --filter backend lint
pnpm --filter backend format

# Frontend only
pnpm --filter frontend lint
pnpm --filter frontend format
```

---

## 🧪 Testing

Both backend and frontend include test suites to ensure code quality and functionality.

### Backend Tests (Jest)

```bash
pnpm --filter backend test
```

Backend tests cover:
- GraphQL resolvers (queries and mutations)
- Input validation
- Error handling

<details>
<summary>📋 Backend Test Output</summary>

```
> backend@1.0.0 test
> jest --runInBand

 PASS  test/pagination/pagination.drift.test.ts
 PASS  test/validations/mutations.validation.test.ts
 PASS  test/validations/queries.validation.test.ts
 PASS  test/scalars/datetime.scalar.test.ts

Test Suites: 4 passed, 4 total
Tests:       30 passed, 30 total
Snapshots:   0 total
Time:        1.361 s
Ran all test suites.
```

</details>

### Frontend Tests (Playwright E2E)

```bash
# Make sure backend and frontend are running first
pnpm --filter frontend test:e2e
```

End-to-end tests cover:
- Article listing page
- Create, edit, and delete flows
- Form validation
- Navigation

<details>
<summary>📋 Frontend E2E Test Output</summary>

```
> frontend@0.1.0 test:e2e
> playwright test

Running 2 tests using 2 workers

[chromium] › e2e/crud.spec.ts:11:7 › Article CRUD Flow › should create, view, edit, and delete an article

--- Step 1: Navigating to Home ---
--- Step 2: Creating Article with title: "E2E Test Article" ---
Article Created. ID: 950

--- Step 3: Verifying details for Article ID: 950 ---
--- Step 4: Verifying Article appears in Home list ---
--- Step 5: Editing Article ID: 950 -> New Title: "E2E Test Article - Updated" ---
--- Step 6: Verifying Updated Title in Home ---
--- Step 7: Deleting Article ID: 950 ---
--- Step 8: Verifying Article ID: 950 is gone ---

[chromium] › e2e/pagination.spec.ts:4:7 › Pagination and Deletion Behavior

Initial IDs (20): ['949', '948', '947', ...]
Deleting ID: 947
Final IDs (20): ['949', '948', '946', ...]

  2 passed (4.5s)
```

</details>

---

## ✅ Validation & Error Handling

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
