# Sports Articles Backend

A robust GraphQL API for managing sports articles, built with Node.js, Express, Apollo Server v4, and TypeORM.

## Tech Stack

- **Runtime:** Node.js (v18+ recommended)
- **Language:** TypeScript
- **Server:** Express + Apollo Server v4
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Package Manager:** pnpm

## Prerequisites

- Node.js installed
- pnpm installed (`npm install -g pnpm`)
- A PostgreSQL database (Local or Cloud like Neon/Railway)

## Setup Instructions

1. **Install Dependencies**
   From the project root:
   ```bash
   pnpm install
   ```

2. **Environment Variables**
   Create a `.env` file in `apps/backend/` based on `.env.example`:
   ```bash
   cp apps/backend/.env.example apps/backend/.env
   ```
   Fill in your database credentials in `apps/backend/.env`.

3. **Database Migrations**
   The project uses TypeORM migrations to manage the database schema. To create the necessary tables, run:
   ```bash
   pnpm --filter backend migration:run
   ```

4. **Seed Data**
   Load the initial 30 sports articles into your database:
   ```bash
   pnpm --filter backend seed
   ```

> **Note:** Access to a shared Neon database is provided. The tables and seed data are already present, so the migration and seed commands are only necessary if you choose to use a fresh personal database. 
> 
> The database credentials for your `.env` file will be shared separately via email or the submission platform to maintain security.

## Running the Application

To start the development server with hot-reloading:

```bash
pnpm --filter backend dev
```

The GraphQL server will be available at: `http://localhost:4000/graphql`

## Available Scripts

In the `apps/backend` directory, you can run:

- `pnpm dev`: Starts the Apollo Server using `ts-node`.
- `pnpm seed`: Clears the database and inserts fresh mock data.
- `pnpm migration:run`: Applies all pending database migrations.
- `pnpm migration:generate -- name`: Generates a new migration based on entity changes.
- `pnpm migration:revert`: Reverts the last applied migration.

## GraphQL API Overview

### Queries
- `articles(limit: Int, offset: Int)`: Fetch a paginated list of articles.
- `article(id: ID!)`: Fetch a single article by its numeric ID.

### Mutations
- `createArticle(input: ArticleInput!)`: Create a new article.
- `updateArticle(id: ID!, input: ArticleInput!)`: Update an existing article.
- `deleteArticle(id: ID!)`: Soft-delete an article.


