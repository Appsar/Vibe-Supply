import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';

const JWT_SECRET = process.env.JWT_SECRET as string;

export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password and name required' });
  }

  const existingUser = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get(email);

  if (existingUser) {
    return res.status(409).json({ error: 'Email already in use' });
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const result = db
    .prepare('INSERT INTO users (email, password, name) VALUES (?,?,?)')
    .run(email, passwordHash, name);

  const token = jwt.sign({ userId: result.lastInsertRowid }, JWT_SECRET, {
    expiresIn: '7d',
  });

  res
    .status(201)
    .json({ token, user: { id: result.lastInsertRowid, email, name } });
}

export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email or password are required' });
  }

  const user = db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email) as any;

  if (!user) {
    return res.status(401).json({ error: 'Invalid user or password' });
  }

  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid user or password' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  res
    .status(200)
    .json({ token, user: { id: user.id, email: user.email, name: user.name } });
}
