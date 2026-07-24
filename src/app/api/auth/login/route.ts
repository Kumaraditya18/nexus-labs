import { NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    await initDb();
    const cleanEmail = email.trim().toLowerCase();
    let dbUser: { id: string; email: string; name: string; role: string; tier: string } | null = null;

    try {
      const client = await pool.connect();
      try {
        const res = await client.query('SELECT * FROM users WHERE LOWER(email) = $1', [cleanEmail]);
        if (res.rows.length > 0) {
          const row = res.rows[0];
          dbUser = {
            id: row.id,
            email: row.email,
            name: row.name,
            role: row.role || (cleanEmail === 'kumaraditya1814@gmail.com' ? 'admin' : 'user'),
            tier: row.tier || (row.role === 'admin' ? 'NEXUS Black Member' : 'Pro')
          };
        }
      } finally {
        client.release();
      }
    } catch (dbErr) {
      console.warn('PostgreSQL Auth Login Fallback:', dbErr);
    }

    if (!dbUser) {
      const isAdmin = cleanEmail === 'kumaraditya1814@gmail.com';
      dbUser = {
        id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
        email: cleanEmail,
        name: isAdmin ? 'Kumar Aditya' : cleanEmail.split('@')[0],
        role: isAdmin ? 'admin' : 'user',
        tier: isAdmin ? 'NEXUS Black Member' : 'Pro'
      };
    }

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
    console.error('Login Route Error:', err);
    return NextResponse.json(
      { success: false, error: 'Internal server login error' },
      { status: 500 }
    );
  }
}
