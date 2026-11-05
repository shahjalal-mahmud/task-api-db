const Database = require('better-sqlite3');
const db = new Database('tasks.db');

// Create table (only if it doesn't exist)
db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL DEFAULT 0
  )
`);

// Insert 3 example tasks only when the table is empty
const count = db.prepare('SELECT COUNT(*) AS c FROM tasks').get().c;
if (count === 0) {
  const insert = db.prepare('INSERT INTO tasks (title, done) VALUES (?, ?)');
  insert.run('Learn SQLite', 0);
  insert.run('Build CRUD API', 0);
  insert.run('Commit to GitHub', 1);
  console.log('Seeded 3 example tasks.');
}

module.exports = db;