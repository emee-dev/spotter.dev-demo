import type { APIEvent } from '@solidjs/start/server';
import { withSpotter } from '@spotter.dev/solidstart';

// GET /api/users
export const GET = withSpotter(async (event: APIEvent) => {
  try {
    console.log('Fetching user list');

    return Response.json(
      {
        users: [
          { id: 1, name: 'Alice' },
          { id: 2, name: 'Bob' },
        ],
      },
      { status: 200 }
    );
  } catch (error) {
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
});

// POST /api/users
export const POST = withSpotter(async (event: APIEvent) => {
  try {
    const params = (await event.request.json()) as { name: string };
    if (!params.name) {
      throw new Error("Missing 'name' in request body");
    }

    console.log('User created:', params);
    return Response.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    return Response.json({ message: 'Internal server error' }, { status: 500 });
  }
});
