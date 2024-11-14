import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import { Spotter } from "@spotter.dev/solidstart";
import "./app.css";

Spotter.init({
  apikey: process.env.SPOTTER_API_KEY!,
  projectId: process.env.SPOTTER_PROJECT_ID!,
  environment: "debug",
  debugUrl: "https://webhook.site/20a13784-475d-4070-9570-82f99c239786",
  logLevel: "verbose",
});

export default function App() {
  return (
    <Router
      root={(props) => (
        <>
          <Nav />
          <Suspense>{props.children}</Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
