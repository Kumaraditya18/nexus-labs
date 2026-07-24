import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { success: false, error: 'Email and password are required' },
        { status: 400 }
      );
    }

    const isAdmin = email.includes('admin') || email.includes('amber.vance');

    const dbUser = {
      id: `usr_${Math.floor(1000 + Math.random() * 9000)}`,
      email,
      name: name || email.split('@')[0],
      role: isAdmin ? 'admin' : 'user',
      tier: isAdmin ? 'NEXUS Black Member' : 'Pro'
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

    response.cookies.set('nexus_user_role', isAdmin ? 'admin' : 'user', {
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
