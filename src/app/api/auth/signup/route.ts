import { NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    await initDb();
    const cleanEmail = email.trim().toLowerCase();
    const isAdmin = cleanEmail === 'kumaraditya1814@gmail.com';
    const userId = `usr_${Math.floor(1000 + Math.random() * 9000)}`;
    const userName = name || (isAdmin ? 'Kumar Aditya' : cleanEmail.split('@')[0]);
    const userRole = isAdmin ? 'admin' : 'user';
    const userTier = isAdmin ? 'NEXUS Black Member' : 'Pro';

    try {
      const client = await pool.connect();
      try {
        await client.query(
          `INSERT INTO users (id, email, name, password_hash, role, tier)
           VALUES ($1, $2, $3, $4, $5, $6)
           ON CONFLICT (email) DO UPDATE SET password_hash = EXCLUDED.password_hash, name = EXCLUDED.name`,
          [userId, cleanEmail, userName, password, userRole, userTier]
        );
      } finally {
        client.release();
      }
    } catch (dbErr) {
      console.warn('PostgreSQL Signup Warning:', dbErr);
    }

    const dbUser = {
      id: userId,
      email: cleanEmail,
      name: userName,
      role: userRole,
      tier: userTier
    };

    const response = NextResponse.json({
      success: true,
      user: dbUser
    });

    response.cookies.set('nexus_auth_token', dbUser.id, {
      path: '/',
      httpOnly: false,
      maxAge: 86400,
      sameSite: 'lax'
    });

    response.cookies.set('nexus_user_role', dbUser.role, {
      path: '/',
      httpOnly: false,
      maxAge: 86400,
      sameSite: 'lax'
    });

    return response;
  } catch (err) {
    console.error('Signup Route Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server signup error' },
      { status: 500 }
    );
  }
}
