import { type Request, type Response } from 'express';
import db from '../db/database.js';
import { error } from 'node:console';

// Get all products from database
export function getAllProducts(req: Request, res: Response) {
  const products = db.prepare('SELECT * FROM products').all();
  res.json(products);
}

// Get single product from database with help from product id
export function getProductById(req: Request, res: Response) {
  const id = req.params.id;
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

  if (!product) {
    return res.status(404).json({ error: 'Products not found' });
  }

  res.json(product);
}

// Create a new product and add to database
export function createProduct(req: Request, res: Response) {
  const { name, description, price, image_url, stock, sku } = req.body;

  if (!name || !price) {
    return res.status(409).json({ error: 'Name and price are required' });
  }

  const result = db
    .prepare(
      `
    INSERT INTO products ( name, description, price, image_url, stock, sku) VALUES (?,?,?,?,?,?)
    `,
    )
    .run(
      name,
      description ?? '',
      price,
      image_url ?? '',
      stock ?? 0,
      sku ?? '',
    );

  const newProduct = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(newProduct);
}

export function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;
  const product = db.prepare('DELETE FROM products WHERE id = ?').run(id);

  if (product.changes === 0) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  res.json({ message: 'Product Deleteted' });
}
