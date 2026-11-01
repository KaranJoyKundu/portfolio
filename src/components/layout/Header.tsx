import { NavLink, Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Escape closes the menu; move focus to the toggle so keyboard users
  // aren't stranded without a visible focus target.
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onToggle();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    buttonRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onToggle]);

  // Click outside closes the menu.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onToggle();
      }
    };
    document.addEventListener("mousedown", onPointerDown);
    return () => document.removeEventListener("mousedown", onPointerDown);
  }, [open, onToggle]);

  return (
    <div className="md:hidden" ref={panelRef}>
      <button
        ref={buttonRef}
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
                  onClick={onToggle}
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
  const toggle = () => setOpen((v) => !v);

  return (
    <header className="sticky top-0 z-50 relative border-b border-border bg-bg/90">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" onClick={toggle} className="font-mono text-sm tracking-tight text-text">
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
                  onClick={toggle}
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
          <MobileMenu open={open} onToggle={toggle} />
        </div>
      </div>
    </header>
  );
}
