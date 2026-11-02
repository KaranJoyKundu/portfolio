import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";

import "@fontsource/ibm-plex-mono/400.css";
import "@fontsource/ibm-plex-mono/500.css";
/* Design B fonts are critical: Design B is the definitive production
   design, so Fraunces + Geist load eagerly with the critical face —
   no style-switch flash, no fallback swap for the final design. */
import "@fontsource-variable/fraunces";
import "@fontsource/geist-sans";
import "./styles/base.css";

/*
 * GitHub Pages SPA fallback bridge: public/404.html stashes the real URL
 * and bounces to the app entry; restore it before the router reads history.
 */
(function restoreRedirect(): void {
  try {
    const stored = sessionStorage.getItem("redirect");
    if (stored) {
      sessionStorage.removeItem("redirect");
      if (stored.startsWith(window.location.origin)) {
        window.history.replaceState(null, "", stored);
      }
    }
  } catch {
    /* no sessionStorage: direct navigation, nothing to restore */
  }
})();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <App />
    </BrowserRouter>
  </StrictMode>
);
