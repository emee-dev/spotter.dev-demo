import type { APIEvent } from '@solidjs/start/server';
import { withSpotter } from '@spotter.dev/solidstart';

// POST /api/auth
export const POST = withSpotter(async (event: APIEvent) => {
  try {
    const params = (await event.request.json()) as {
      username: string;
      password: string;
    };

    if (!params.username || !params.password) {
      throw new Error('Invalid credentials');
    }

    console.log('User login attempt:', params.username);
    return Response.json({ token: 'abc123' }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Invalid login' }, { status: 401 });
  }
});
