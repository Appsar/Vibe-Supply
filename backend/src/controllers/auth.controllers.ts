import { type Request, type Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';

const JWT_SECRET = process.env.JWT_SECRET as string;

//Endpoint for registering a new user
export async function register(req: Request, res: Response) {
  const { email, password, name } = req.body;

  //Validate that data is there
  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Email, password and name required' });
  }

  //Check if new user already exists
  const existingUser = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get(email);

  //If user exists return error
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

//Endpoint for login user
export async function login(req: Request, res: Response) {
  const { email, password } = req.body;

  //Validate that data is there
  if (!email || !password) {
    return res.status(400).json({ error: 'Email or password are required' });
  }

  //Check if user exists
  const user = db
    .prepare('SELECT * FROM users WHERE email = ?')
    .get(email) as any;

  //If user dont exist return error
  if (!user) {
    return res.status(401).json({ error: 'Invalid user or password' });
  }

  //Password hash
  const passwordMatches = await bcrypt.compare(password, user.password);

  if (!passwordMatches) {
    return res.status(401).json({ error: 'Invalid user or password' });
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: '7d' });

  res
    .status(200)
    .json({ token, user: { id: user.id, email: user.email, name: user.name } });
}
