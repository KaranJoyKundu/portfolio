import { Link } from "react-router-dom";
import { site } from "@/content/site.config";

export function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-32 text-center">
      <p className="font-mono text-sm text-accent-text">ERR 404 · SIGNAL LOST</p>
      <h1 className="mt-4 font-display text-3xl font-medium">Page not found</h1>
      <p className="mt-3 text-muted">
        The trace you followed doesn't connect to anything.
      </p>
      <Link
        to="/"
        className="mt-8 inline-block font-mono text-sm text-accent-text underline underline-offset-4"
      >
        Back to {site.shortName}
      </Link>
    </div>
  );
}
