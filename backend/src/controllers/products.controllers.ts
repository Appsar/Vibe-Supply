import { type Request, type Response } from 'express';
import db from '../db/database.js';

export function getAllProducts(req: Request, res: Response) {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
}

export function getProductById(req: Request, res: Response) {
  const id = req.params.id;
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

  if (!product) {
    return res.status(404).json({ error: 'Products not found' });
  }

  res.json(product);
}
