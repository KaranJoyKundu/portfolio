/**
 * Base-aware asset URL: content files store repo-relative paths like
 * "images/bee/photo1.jpg"; this joins them onto the Vite base at runtime
 * so images resolve under both `/` and `/portfolio/`.
 */
export function assetSrc(path: string): string {
  const base = import.meta.env.BASE_URL;
  const clean = path.replace(/^\//, "");
  const root = base.endsWith("/") ? base : `${base}/`;
  return `${root}${clean}`;
}
