import { Routes, Route } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Projects } from "@/pages/Projects";
import { Engineering } from "@/pages/Engineering";
import { Software } from "@/pages/Software";
import { Achievements } from "@/pages/Achievements";
import { Resume } from "@/pages/Resume";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";
import { site } from "@/content/site.config";

export function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/engineering" element={<Engineering />} />
        <Route path="/software" element={<Software />} />
        {site.achievements.enabled && (
          <Route path="/achievements" element={<Achievements />} />
        )}
        <Route path="/resume" element={<Resume />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AppShell>
  );
}
