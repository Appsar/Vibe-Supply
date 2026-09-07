import db from './database.js';

db.exec(`
    DELETE FROM order_items;
    DELETE FROM orders;
    DELETE FROM products;
    DELETE FROM categories;
    DELETE FROM users;
    `);

const insertCategory = db.prepare(`INSERT INTO categories (name) VALUES (?)`);

const categories = ['Hoodies', 'T-Shirts', 'Pants', 'Shoes', 'Accessories'];
const categoryIds: Record<string, number> = {};

for (const name of categories) {
  const result = insertCategory.run(name);
  categoryIds[name] = result.lastInsertRowid as number;
}

const insertProducts = db.prepare(
  `INSERT INTO products (category_id, name, description, price, image_url, stock) VALUES (?,?,?,?,?,?)`,
);

const products = [
  {
    category: 'Hoodies',
    name: 'Classic Oversized Hoodie',
    description: 'A relaxed-fit hoodie made from heavyweight cotton fleece.',
    price: 549.0,
    image_url: '/images/hoodie-classic.jpg',
    stock: 25,
  },
  {
    category: 'Hoodies',
    name: 'Zip-Up Track Hoodie',
    description: 'Lightweight zip hoodie, perfect for layering.',
    price: 499.0,
    image_url: '/images/hoodie-zip.jpg',
    stock: 18,
  },
  {
    category: 'T-Shirts',
    name: 'Essential Crewneck Tee',
    description: 'Soft, breathable cotton tee in a classic fit.',
    price: 199.0,
    image_url: '/images/tee-essential.jpg',
    stock: 50,
  },
  {
    category: 'T-Shirts',
    name: 'Vibe Supply Logo Tee',
    description: 'Our signature tee featuring the Vibe Supply logo print.',
    price: 229.0,
    image_url: '/images/tee-logo.jpg',
    stock: 40,
  },
  {
    category: 'Pants',
    name: 'Relaxed Cargo Pants',
    description: 'Utility-inspired cargo pants with multiple pockets.',
    price: 649.0,
    image_url: '/images/pants-cargo.jpg',
    stock: 15,
  },
  {
    category: 'Shoes',
    name: 'Canvas Low-Top Sneakers',
    description: 'Everyday low-top sneakers with a durable canvas upper.',
    price: 799.0,
    image_url: '/images/shoes-canvas.jpg',
    stock: 20,
  },
  {
    category: 'Accessories',
    name: 'Embroidered Cap',
    description: 'Adjustable cotton cap with embroidered logo.',
    price: 149.0,
    image_url: '/images/cap-embroidered.jpg',
    stock: 35,
  },
];

for (const p of products) {
  insertProducts.run(
    categoryIds[p.category],
    p.name,
    p.description,
    p.price,
    p.image_url,
    p.stock,
  );
}

console.log(
  `Seeded ${categories.length} categories and ${products.length} products.`,
);
