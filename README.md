# Task API with SQLite

A CRUD task API built with Express and SQLite. Tasks are persisted in a real database instead of an in-memory array, so data survives server restarts.

## Why SQLite

SQLite is a lightweight, zero-configuration, serverless database stored in a single file on disk. It was chosen for this project because:

- **No installation or server required** — the database is just a file (`tasks.db`) that is created automatically the first time the application runs.
- **Real SQL** — we write actual SQL queries (`SELECT`, `INSERT`, `UPDATE`, `DELETE`) instead of manipulating arrays in memory.
- **Persistence** — data survives server restarts, unlike the in-memory version from Assignment 1.
- **Perfect for learning** — it behaves like a real relational database (tables, primary keys, queries) but with zero operational overhead, which makes it easy to later migrate to PostgreSQL, MySQL, or SQL Server.

## Where the database file is stored

The database file is stored in the **project root** and is called:

```
tasks.db
```

It is created automatically the first time the application starts (see `db.js`). If the file is deleted, it will be recreated — along with the `tasks` table and the three example tasks — on the next run.

> The `tasks.db` file and `node_modules/` are listed in `.gitignore` and are **not** committed to the repository. Anyone cloning the project will get a fresh database automatically when they run it.

## How to start the project

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

# 2. Install dependencies
npm install

# 3. Start the server
npm start
```

The server will start on:

```
http://localhost:3000
```

On first run you should see:

```
Seeded 3 example tasks.
Server running on http://localhost:3000
```

On subsequent runs, the seeding message will **not** appear because the table already contains data.

## API Endpoints

| Method | Path          | Description           | Success | Errors                     |
|--------|---------------|-----------------------|---------|----------------------------|
| GET    | `/tasks`      | List all tasks        | 200     | —                          |
| GET    | `/tasks/:id`  | Get a single task     | 200     | 404 if id not found        |
| POST   | `/tasks`      | Create a new task     | 201     | 400 if `title` is missing  |
| PUT    | `/tasks/:id`  | Update a task         | 200     | 404 if id not found        |
| DELETE | `/tasks/:id`  | Delete a task         | 204     | 404 if id not found        |

### Example requests

**Create a task**

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy milk"}'
```

**Update a task**

```bash
curl -X PUT http://localhost:3000/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"done":true}'
```

**Delete a task**

```bash
curl -X DELETE http://localhost:3000/tasks/2
```

## Example SQL query executed

One example query executed manually in DB Browser for SQLite during Stage 4:

```sql
SELECT * FROM tasks WHERE done = 1;
```

This returns only the completed tasks directly from the database. Any change made manually in the database is immediately reflected by the API, since the API reads from the same SQLite file.

## Screenshot

Below is a screenshot of the `tasks` table viewed in DB Browser for SQLite:

![DB Browser screenshot](screenshot.png)

## Project structure

```
.
├── db.js           # Creates the database, table, and seeds example tasks
├── server.js       # Express server with all CRUD endpoints
├── package.json
├── README.md
├── screenshot.png  # Screenshot of the database viewer
└── tasks.db        # Auto-generated SQLite database (not committed)
```