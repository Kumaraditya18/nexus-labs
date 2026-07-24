import { pool, initDb } from './db';
import { PRODUCTS } from '@/data/products';

export async function seedProducts() {
  try {
    await initDb();
    const client = await pool.connect();
    try {
      const countRes = await client.query('SELECT COUNT(*) FROM products');
      const count = parseInt(countRes.rows[0].count, 10);

      if (count === 0) {
        console.log('Seeding 14 NEXUS products into PostgreSQL database...');
        for (const prod of PRODUCTS) {
          await client.query(
            `INSERT INTO products (id, slug, name, category, price, rating, stock_status, description, image)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
             ON CONFLICT (id) DO NOTHING`,
            [
              prod.id,
              prod.slug,
              prod.name,
              prod.category,
              prod.price,
              prod.rating,
              prod.stockStatus,
              prod.description,
              prod.image
            ]
          );
        }
        console.log('Database seeding complete.');
      }
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('PostgreSQL Seed Warning:', err);
  }
}
