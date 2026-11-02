/** Join truthy class names without a dependency. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Protocols considered safe for external/href-bound URLs. */
const SAFE_PROTOCOLS = new Set(["http:", "https:", "mailto:"]);

/**
 * Strict URL validation: parses and requires an allowlisted protocol.
 * Rejects `javascript:`, `data:`, malformed values, and empty strings.
 * Internal router links arrive via `to`, never through here.
 */
export function isSafeUrl(value: string): boolean {
  if (!value) return false;
  try {
    const url = new URL(value);
    return SAFE_PROTOCOLS.has(url.protocol);
  } catch {
    return false;
  }
}
