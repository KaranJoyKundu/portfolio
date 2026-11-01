import { Link } from "react-router-dom";
import { site } from "@/content/site.config";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} · {site.location}
        </p>
        <p>
          <a href={`mailto:${site.links.email}`} className="hover:text-accent-text">
            {site.links.email}
          </a>
          <span aria-hidden> · </span>
          <a href={site.links.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-accent-text">
            Facebook
          </a>
          <span aria-hidden> · </span>
          <Link to="/contact" className="hover:text-accent-text">
            Contact
          </Link>
        </p>
      </div>
    </footer>
  );
}
