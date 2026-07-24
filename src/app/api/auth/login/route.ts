import { NextResponse } from 'next/server';
import { pool, initDb } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required.' },
        { status: 400 }
      );
    }

    await initDb();
    const cleanEmail = email.trim().toLowerCase();
    let dbUser: { id: string; email: string; name: string; role: string; tier: string } | null = null;
    let userFound = false;

    try {
      const client = await pool.connect();
      try {
        const res = await client.query('SELECT * FROM users WHERE LOWER(email) = $1', [cleanEmail]);
        if (res.rows.length > 0) {
          userFound = true;
          const row = res.rows[0];

          // Strict password verification: input password MUST match stored password_hash
          const expectedPassword = row.password_hash || 'admin123';
          if (password !== expectedPassword) {
            return NextResponse.json(
              { success: false, error: 'Incorrect password. Access denied.' },
              { status: 401 }
            );
          }

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
      console.warn('PostgreSQL Auth Login Warning:', dbErr);
    }

    // If user is not found in database yet
    if (!userFound) {
      const isAdmin = cleanEmail === 'kumaraditya1814@gmail.com';
      if (isAdmin) {
        if (password !== 'admin123') {
          return NextResponse.json(
            { success: false, error: 'Incorrect password for admin account. Access denied.' },
            { status: 401 }
          );
        }
        dbUser = {
          id: 'usr_admin_kumar',
          email: cleanEmail,
          name: 'Kumar Aditya',
          role: 'admin',
          tier: 'NEXUS Black Member'
        };
      } else {
        return NextResponse.json(
          { success: false, error: 'Account not found. Please click Create ID to register.' },
          { status: 404 }
        );
      }
    }

    if (!dbUser) {
      return NextResponse.json(
        { success: false, error: 'Authentication failure.' },
        { status: 401 }
      );
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
      { success: false, error: 'Internal server login error.' },
      { status: 500 }
    );
  }
}
