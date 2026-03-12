const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const dbPath = path.join(__dirname, '../../../database.sqlite');
const schemaPath = path.join(__dirname, 'schema.sqlite.sql');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening SQLite database:', err.message);
    } else {
        console.log('Connected to SQLite database.');
        initializeDatabase();
    }
});

function initializeDatabase() {
    const schema = fs.readFileSync(schemaPath, 'utf8');
    db.exec(schema, (err) => {
        if (err) {
            console.error('Error initializing database:', err.message);
        } else {
            console.log('Database schema initialized.');
        }
    });
}

/**
 * Promise-based query wrapper to mimic mysql2 interface [rows, fields]
 */
const query = (sql, params = []) => {
    return new Promise((resolve, reject) => {
        const command = sql.trim().toUpperCase();

        if (command.startsWith('SELECT')) {
            db.all(sql, params, (err, rows) => {
                if (err) reject(err);
                else resolve([rows]);
            });
        } else {
            db.run(sql, params, function (err) {
                if (err) reject(err);
                else resolve([{
                    affectedRows: this.changes,
                    insertId: this.lastID
                }]);
            });
        }
    });
};

module.exports = { query };
