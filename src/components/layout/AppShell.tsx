import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SkipLink } from "./SkipLink";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CircuitTrace } from "@/components/effects/CircuitTrace";
import { CursorGlow } from "@/components/effects/CursorGlow";

/** Page chrome shared by every route. */
export function AppShell({ children }: { children: React.ReactNode }) {
  const { pathname } = useLocation();

  // Close any mobile menu / reset focus context on navigation.
  useEffect(() => {
    document.getElementById("main")?.setAttribute("tabindex", "-1");
  }, [pathname]);

  return (
    <>
      <CircuitTrace />
      <CursorGlow />
      <SkipLink />
      <Header />
      <main id="main" className="min-h-[60vh]">
        {children}
      </main>
      <Footer />
    </>
  );
}
