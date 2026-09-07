import Database from 'better-sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, '../../vibe-supply.db');

const db: Database.Database = new Database(dbPath, { verbose: console.log });

db.pragma('foreign_keys = ON');

export default db;
