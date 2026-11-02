import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";
import { cn, isSafeUrl } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xs font-sans transition-colors duration-[var(--dur-fast)]";

const variants: Record<Variant, string> = {
  primary: "bg-btn-bg text-btn-fg hover:opacity-90",
  secondary: "border border-border bg-surface text-text hover:border-muted",
  ghost: "text-muted hover:text-text",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2.5 text-sm",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
};

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { to?: never; href?: never };

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { to: string; href?: never };

type ButtonAsExternal = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; to?: never };

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsExternal;

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if ("to" in rest && rest.to !== undefined) {
    const { to, ...anchorRest } = rest as ButtonAsLink;
    return (
      <Link to={to} className={classes} {...anchorRest}>
        {children}
      </Link>
    );
  }
  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsExternal;
    const external = isSafeUrl(href) && !href.startsWith("/");
    return (
      <a
        href={external ? href : undefined}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorRest}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...(rest as ButtonAsButton)}>
      {children}
    </button>
  );
}
