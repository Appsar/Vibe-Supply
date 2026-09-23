import db from './database.js';
import { initDB } from './schema.js';

initDB();

// Reset function for database
const runSeed = db.transaction(() => {
  db.exec(`
    DELETE FROM products;
    DELETE FROM users;
    DELETE FROM sqlite_sequence;
    `);

  //Inserts test data into database
  const insertProducts = db.prepare(
    `INSERT INTO products (name, description, price, image_url, stock, sku) VALUES (?,?,?,?,?,?)`,
  );

  // Data to use during testing
  const products = [
    {
      category: 'Hoodies',
      name: 'Classic Oversized Hoodie',
      description: 'A relaxed-fit hoodie made from heavyweight cotton fleece.',
      price: 549.0,
      image_url: '/images/Hoodie.png',
      stock: 25,
      sku: 'HOD100',
    },
    {
      category: 'Hoodies',
      name: 'Zip-Up Track Hoodie',
      description: 'Lightweight zip hoodie, perfect for layering.',
      price: 499.0,
      image_url: '/images/Hoodie.png',
      stock: 18,
      sku: 'HOD101',
    },
    {
      category: 'T-Shirts',
      name: 'Essential Crewneck Tee',
      description: 'Soft, breathable cotton tee in a classic fit.',
      price: 199.0,
      image_url: '/images/Shirt.png',
      stock: 50,
      sku: 'TEE100',
    },
    {
      category: 'T-Shirts',
      name: 'Vibe Supply Logo Tee',
      description: 'Our signature tee featuring the Vibe Supply logo print.',
      price: 229.0,
      image_url: '/images/Shirt.png',
      stock: 40,
      sku: 'TEE101',
    },
    {
      category: 'Pants',
      name: 'Relaxed Cargo Pants',
      description: 'Utility-inspired cargo pants with multiple pockets.',
      price: 649.0,
      image_url: '/images/Clock.png',
      stock: 15,
      sku: 'PAN100',
    },
    {
      category: 'Shoes',
      name: 'Canvas Low-Top Sneakers',
      description: 'Everyday low-top sneakers with a durable canvas upper.',
      price: 799.0,
      image_url: '/images/Shoes.png',
      stock: 20,
      sku: 'SHO100',
    },
    {
      category: 'Accessories',
      name: 'Embroidered Cap',
      description: 'Adjustable cotton cap with embroidered logo.',
      price: 149.0,
      image_url: '/images/Clock.png',
      stock: 35,
      sku: 'ACC100',
    },
    {
      category: 'Hoodies',
      name: 'Fleece Pullover Hoodie',
      description:
        'A cozy pullover hoodie with a soft brushed fleece interior.',
      price: 579.0,
      image_url: '/images/Hoodie.png',
      stock: 22,
      sku: 'HOD102',
    },
    {
      category: 'T-Shirts',
      name: 'Striped Boxy Tee',
      description:
        'A relaxed boxy-fit tee with a classic horizontal stripe pattern.',
      price: 219.0,
      image_url: '/images/Shirt.png',
      stock: 30,
      sku: 'TEE102',
    },
    {
      category: 'T-Shirts',
      name: 'Long Sleeve Ribbed Tee',
      description: 'A fitted long-sleeve tee with subtle ribbed texture.',
      price: 249.0,
      image_url: '/images/Shirt.png',
      stock: 28,
      sku: 'TEE103',
    },
    {
      category: 'Pants',
      name: 'Slim Fit Chinos',
      description: 'Tailored slim-fit chinos in a durable cotton-blend twill.',
      price: 599.0,
      image_url: '/images/BBag.png',
      stock: 20,
      sku: 'PAN101',
    },
    {
      category: 'Pants',
      name: 'Wide Leg Sweatpants',
      description:
        'Relaxed wide-leg sweatpants with an elastic drawstring waist.',
      price: 449.0,
      image_url: '/images/BlBag.png',
      stock: 26,
      sku: 'PAN102',
    },
    {
      category: 'Shoes',
      name: 'High-Top Basketball Sneakers',
      description: 'Supportive high-top sneakers with a cushioned sole.',
      price: 899.0,
      image_url: '/images/Shoes.png',
      stock: 14,
      sku: 'SHO101',
    },
    {
      category: 'Shoes',
      name: 'Slip-On Everyday Shoes',
      description: 'Easy slip-on shoes with a lightweight, flexible sole.',
      price: 649.0,
      image_url: '/images/Shoes.png',
      stock: 24,
      sku: 'SHO102',
    },
    {
      category: 'Accessories',
      name: 'Ribbed Beanie',
      description: 'A classic ribbed-knit beanie for cold weather.',
      price: 129.0,
      image_url: '/images/Clock.png',
      stock: 40,
      sku: 'ACC101',
    },
    {
      category: 'Accessories',
      name: 'Canvas Tote Bag',
      description:
        'A durable canvas tote with the Vibe Supply logo printed on front.',
      price: 179.0,
      image_url: '/images/Clock.png',
      stock: 32,
      sku: 'ACC102',
    },
    {
      category: 'Accessories',
      name: 'Crew Socks 3-Pack',
      description: 'A three-pack of comfortable cotton-blend crew socks.',
      price: 99.0,
      image_url: '/images/Clock.png',
      stock: 45,
      sku: 'ACC103',
    },
  ];

  // Loops over all test data to instert
  for (const p of products) {
    insertProducts.run(
      p.name,
      p.description,
      p.price,
      p.image_url,
      p.stock,
      p.sku,
    );
  }

  console.log(`Seeded ${products.length} products.`);
});

try {
  runSeed();
} catch (error) {
  console.error('Seed failed during execution:', error);
}
