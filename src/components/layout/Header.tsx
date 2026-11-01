import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { site } from "@/content/site.config";
import { visibleNavItems } from "@/lib/nav";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

function MobileMenu({
  open,
  onToggle,
}: {
  open: boolean;
  onToggle: () => void;
}) {
  const items = visibleNavItems();
  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={onToggle}
        className="grid size-9 place-items-center rounded-xs border border-border bg-surface text-muted hover:text-text"
      >
        {open ? <X size={16} aria-hidden /> : <Menu size={16} aria-hidden />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="absolute inset-x-0 top-full border-b border-border bg-surface px-6 py-4"
        >
          <ul className="flex flex-col">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "block py-2 font-mono text-sm",
                      isActive ? "text-accent-text" : "text-muted"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const items = visibleNavItems();

  return (
    <header className="sticky top-0 z-50 relative border-b border-border bg-bg/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-mono text-sm tracking-tight text-text">
          {site.shortName}
          <span className="text-muted"> / ECE·KUET</span>
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6">
            {items.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "font-mono text-xs uppercase tracking-[0.14em] transition-colors duration-[var(--dur-fast)]",
                      isActive
                        ? "text-accent-text"
                        : "text-muted hover:text-text"
                    )
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <MobileMenu open={open} onToggle={() => setOpen((v) => !v)} />
        </div>
      </div>
    </header>
  );
}
