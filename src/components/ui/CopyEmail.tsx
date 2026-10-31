import { useRef, useState } from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Copy an email with accessible feedback (aria-live), no clipboard library.
 * Falls back to a hidden textarea when the async Clipboard API is absent.
 */
export function CopyEmail({
  email,
  className,
}: {
  email: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number>(0);

  async function copy(): Promise<void> {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(email);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.append(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard blocked: keep the mailto path usable, no error toast noise.
    }
  }

  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <button
        type="button"
        onClick={() => void copy()}
        className="inline-flex items-center gap-1.5 rounded-xs border border-border bg-surface px-2.5 py-1.5 font-mono text-xs text-muted transition-colors duration-[var(--dur-fast)] hover:border-muted hover:text-text"
      >
        {copied ? <Check size={14} aria-hidden className="text-accent-text" /> : <Copy size={14} aria-hidden />}
        {copied ? "Copied" : "Copy"}
      </button>
      <span aria-live="polite" className="sr-only">
        {copied ? "Email copied to clipboard" : ""}
      </span>
    </span>
  );
}
