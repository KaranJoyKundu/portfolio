import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Home } from "@/pages/Home";
import { NotFound } from "@/pages/NotFound";
import { hasVerifiedAchievements } from "@/lib/content";

/**
 * Home stays eager (LCP); every other route is code-split. The fallback is
 * empty on purpose: chunks are tiny and local, a spinner flash would cost
 * more than it buys.
 */
const About = lazy(() => import("@/pages/About").then((m) => ({ default: m.About })));
const Projects = lazy(() => import("@/pages/Projects").then((m) => ({ default: m.Projects })));
const ProjectDetail = lazy(() =>
  import("@/pages/ProjectDetail").then((m) => ({ default: m.ProjectDetail }))
);
const Engineering = lazy(() =>
  import("@/pages/Engineering").then((m) => ({ default: m.Engineering }))
);
const Software = lazy(() => import("@/pages/Software").then((m) => ({ default: m.Software })));
const Achievements = lazy(() =>
  import("@/pages/Achievements").then((m) => ({ default: m.Achievements }))
);
const Resume = lazy(() => import("@/pages/Resume").then((m) => ({ default: m.Resume })));
const Contact = lazy(() => import("@/pages/Contact").then((m) => ({ default: m.Contact })));

export function App() {
  return (
    <AppShell>
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/engineering" element={<Engineering />} />
          <Route path="/software" element={<Software />} />
          {hasVerifiedAchievements && (
            <Route path="/achievements" element={<Achievements />} />
          )}
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AppShell>
  );
}
