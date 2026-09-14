import { type Request, type Response } from 'express';
import db from '../db/database.js';
import { error } from 'console';

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

export function createProduct(req: Request, res: Response) {
  const { category_id, name, description, price, image_url, stock } = req.body;

  if (!name || !price) {
    return res.status(409).json({ error: 'Name and price are required' });
  }

  const result = db
    .prepare(
      `
    INSERT INTO products (category_id, name, description, price, image_url, stock) VALUES (?,?,?,?,?,?)
    `,
    )
    .run(
      category_id ?? null,
      name,
      description ?? '',
      price,
      image_url ?? '',
      stock ?? 0,
    );

  const newProduct = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(newProduct);
}
