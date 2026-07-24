import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://amber@localhost:5432/nexus_db';

export const pool = new Pool({
  connectionString,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export async function initDb() {
  try {
    const client = await pool.connect();
    try {
      // 1. Users Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password_hash VARCHAR(255) DEFAULT 'pbkdf2_hash_nexus',
          role VARCHAR(32) DEFAULT 'user',
          tier VARCHAR(64) DEFAULT 'Pro',
          passkeys_enabled BOOLEAN DEFAULT true,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Ensure admin user exists
      await client.query(`
        INSERT INTO users (id, email, name, password_hash, role, tier)
        VALUES ('usr_admin', 'amber.vance@nexuslabs.tech', 'Amber Vance', 'admin123', 'admin', 'NEXUS Black Member')
        ON CONFLICT (email) DO NOTHING;
      `);

      // 2. Products Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS products (
          id VARCHAR(64) PRIMARY KEY,
          slug VARCHAR(128) NOT NULL,
          name VARCHAR(255) NOT NULL,
          category VARCHAR(64) NOT NULL,
          price NUMERIC(10, 2) NOT NULL,
          rating NUMERIC(3, 2) DEFAULT 4.9,
          stock_status VARCHAR(64) DEFAULT 'In Stock',
          description TEXT,
          image TEXT
        );
      `);

      // 3. Orders Table
      await client.query(`
        CREATE TABLE IF NOT EXISTS orders (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id),
          total NUMERIC(10, 2) NOT NULL,
          status VARCHAR(64) NOT NULL,
          carrier VARCHAR(128) NOT NULL,
          tracking_code VARCHAR(128) NOT NULL,
          items JSONB NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      console.log('PostgreSQL 18 tables initialized successfully.');
    } finally {
      client.release();
    }
  } catch (err) {
    console.warn('PostgreSQL Connection Warning (falling back to memory state if offline):', err);
  }
}
