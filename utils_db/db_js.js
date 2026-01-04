const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database_db.db');

db.serialize(() => {
    // Users table
    db.run(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        email TEXT UNIQUE,
        name TEXT,
        surname TEXT,
        password TEXT
    )`);

    // Tasks table
    db.run(`CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        title TEXT,
        description TEXT,
        status TEXT,
        priority TEXT,
        due_date TEXT,
        recurring TEXT,
        dependencies TEXT,
        tags TEXT,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )`);
});

module.exports = db;
