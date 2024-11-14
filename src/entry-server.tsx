// @refresh reload
import { createHandler, StartServer } from '@solidjs/start/server';
import { Spotter } from '@spotter.dev/solidstart';

Spotter.init({
  apikey: 'api_key',
  projectId: 'project_id',
  environment: 'debug',
  debugUrl: 'https://webhook.site/20a13784-475d-4070-9570-82f99c239786',
  logLevel: 'verbose',
});

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
        </head>
        <body>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
