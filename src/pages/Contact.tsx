import { Mail, Link as LinkIcon } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { site } from "@/content/site.config";
import { Seo } from "@/lib/seo";

const CHANNELS = [
  {
    label: "GitHub",
    href: "https://github.com/KaranJoyKundu",
    display: "github.com/KaranJoyKundu",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/karan-joy-kundu-b460513b3/",
    display: "linkedin.com/in/karan-joy-kundu",
  },
];

export function Contact() {
  return (
    <>
      <Seo
        title="Contact — Karan Joy Kundu"
        description="Email and profiles for Karan Joy Kundu — ECE student at KUET, Khulna, Bangladesh."
        path="/contact"
      />
      <Section
      kicker="07 / Contact"
      title="Contact"
      lede="The fastest path is email. I read it every day."
    >
      <div className="max-w-xl divide-y divide-border border-y border-border">
        <div className="flex items-center justify-between gap-4 py-5">
          <div className="flex items-center gap-3">
            <Mail size={18} aria-hidden className="text-accent-text" />
            <div>
              <a
                href={`mailto:${site.links.email}`}
                className="font-mono text-sm text-text hover:text-accent-text"
              >
                {site.links.email}
              </a>
              <p className="text-xs text-muted">Email</p>
            </div>
          </div>
          <CopyEmail email={site.links.email} />
        </div>

        {CHANNELS.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-4 py-5"
          >
            <div className="flex items-center gap-3">
              <LinkIcon size={18} aria-hidden className="text-accent-text" />
              <div>
                <p className="font-mono text-sm text-text group-hover:text-accent-text">
                  {c.display}
                </p>
                <p className="text-xs text-muted">{c.label}</p>
              </div>
            </div>
          </a>
        ))}
      </div>

      <section className="mt-12 max-w-2xl rounded-md border border-border bg-surface p-6">
        <h2 className="font-display text-lg font-medium">Kundu Electronics</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          My family runs Kundu Electronics, an electronics components business
          in Khulna, Bangladesh. If you&apos;re in Khulna and need parts for a
          build, that&apos;s the shop — and it&apos;s where I learned to talk
          about circuits in concrete terms.
        </p>
      </section>
      </Section>
    </>
  );
}
