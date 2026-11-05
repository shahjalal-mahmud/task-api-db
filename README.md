# Task API with SQLite

A CRUD task API that persists data in SQLite instead of memory.

## Why SQLite

SQLite is a lightweight, zero-configuration database stored in a single file. It is perfect for learning because you get real SQL persistence without installing a database server.

## Database location

The database file is `tasks.db` in the project root. It is created automatically on first run.

## How to run

```bash
npm install
npm start