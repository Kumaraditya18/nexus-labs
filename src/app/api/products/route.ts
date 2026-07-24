import { NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';
import { seedProducts } from '@/lib/seed';
import { PRODUCTS } from '@/data/products';

export async function GET() {
  try {
    await initDb();
    await seedProducts();

    const client = await pool.connect();
    try {
      const res = await client.query('SELECT * FROM products ORDER BY name ASC');
      return NextResponse.json({
        success: true,
        source: 'postgresql',
        products: res.rows.length > 0 ? res.rows : PRODUCTS
      });
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('PostgreSQL Fetch Error, returning fallback products array:', err);
    return NextResponse.json({
      success: true,
      source: 'memory_fallback',
      products: PRODUCTS
    });
  }
}
