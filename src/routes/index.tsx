import { createSignal, createResource, Suspense } from 'solid-js';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';

const wait = async () => {
  return new Promise((resolve) => {
    return setTimeout(resolve, 3000);
  });
};

const fetcher = async (args: Payload) => {
  // await wait();

  const res = await fetch(args.path, {
    method: args.method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: args.body ? JSON.stringify(args.body) : undefined,
  });
  const data = await res.json();

  return data;
};

type Payload = {
  path: string;
  method: string;
  body?: object;
};

export default function Component() {
  const [makeRequest, setMakeRequest] = createSignal<Payload | null>(null);
  const [postAuth, _] = createResource(makeRequest, fetcher);

  // const makeRequest = async ({
  //   path,
  //   method,
  //   body,
  // }: {
  //   path: string;
  //   method: string;
  //   body?: object;
  // }) => {
  //   try {
  //     const res = await fetch(path, {
  //       method,
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: body ? JSON.stringify(body) : undefined,
  //     });
  //     const data = await res.json();
  //     setResponse(JSON.stringify(data, null, 2));
  //   } catch (error) {
  //     setResponse(`Error: ${error.message}`);
  //   }
  // };

  return (
    <div class="container mx-auto p-4 space-y-6">
      <h1 class="text-2xl font-bold mb-4">API Observability Demo</h1>

      <Card>
        <CardHeader>
          <CardTitle>POST /api/auth</CardTitle>
        </CardHeader>
        <CardContent class="space-x-4">
          <Button
            onClick={() =>
              setMakeRequest({
                path: '/api/auth',
                method: 'POST',
                body: {
                  username: 'user',
                  password: 'pass',
                },
              })
            }
          >
            Good Login
          </Button>
          <Button
            onClick={() =>
              setMakeRequest({
                path: '/api/auth',
                method: 'POST',
                body: { username: 'user' },
              })
            }
          >
            Bad Login
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>GET /api/users</CardTitle>
        </CardHeader>
        <CardContent class="space-x-4">
          <Button
            onClick={() =>
              setMakeRequest({
                path: '/api/users',
                method: 'GET',
              })
            }
          >
            Get Users
          </Button>
          <Button
            onClick={() =>
              setMakeRequest({
                path: '/api/users?error=true',
                method: 'GET',
              })
            }
          >
            Get Users (Error)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>POST /api/users</CardTitle>
        </CardHeader>
        <CardContent class="space-x-4">
          <Button
            onClick={() =>
              setMakeRequest({
                path: '/api/users',
                method: 'POST',
                body: { name: 'New User' },
              })
            }
          >
            Create User
          </Button>
          <Button
            onClick={() =>
              setMakeRequest({
                path: '/api/users',
                method: 'POST',
                body: {},
              })
            }
          >
            Create User (Error)
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <pre class="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
                {'No response yet'}
              </pre>
            }
          >
            <pre class="bg-gray-100 p-4 rounded-md overflow-auto max-h-60">
              <div>{JSON.stringify(postAuth(), null, 3)}</div>
            </pre>
          </Suspense>
        </CardContent>
      </Card>
    </div>
  );
}
