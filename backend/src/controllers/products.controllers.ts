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

  //Return data that matches url params 'id'
  const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

  //Error handeling if not product is found
  if (!product) {
    return res.status(404).json({ error: 'Products not found' });
  }

  res.json(product);
}

// Create a new product and add to database
export function createProduct(req: Request, res: Response) {
  const { name, description, price, image_url, stock, sku } = req.body;

  //Validate that data is there
  if (!name || !price) {
    return res.status(409).json({ error: 'Name and price are required' });
  }

  //Insert new data into database based on data from body
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

  //Returns 201 and the new product made
  const newProduct = db
    .prepare('SELECT * FROM products WHERE id = ?')
    .get(result.lastInsertRowid);

  res.status(201).json(newProduct);
}

// Delete a product from database based on id params
export function deleteProduct(req: Request, res: Response) {
  const id = req.params.id;
  const product = db.prepare('DELETE FROM products WHERE id = ?').run(id);

  if (product.changes === 0) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  res.json({ message: 'Product Deleteted' });
}
