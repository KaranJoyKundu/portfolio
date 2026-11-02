import { useState, type FormEvent } from "react";
import { Mail, Link as LinkIcon, Send } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { site } from "@/content/site.config";
import { Seo } from "@/lib/seo";
import { isSafeUrl } from "@/lib/utils";

const CHANNELS = [
  {
    label: "Facebook",
    href: site.links.facebook,
    display: "facebook.com/karan.kundu-0206",
  },
  {
    label: "GitHub",
    href: site.links.github,
    display: "github.com/KaranJoyKundu",
  },
  {
    label: "LinkedIn",
    href: site.links.linkedin,
    display: "linkedin.com/in/karan-joy-kundu-b460513b3",
  },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const subject = encodeURIComponent(`Portfolio contact from ${name || "visitor"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${site.links.email}?subject=${subject}&body=${body}`;
    setSent(true);
  }

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
            href={isSafeUrl(c.href) ? c.href : undefined}
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

      <form
        className="mt-12 max-w-2xl rounded-md border border-border bg-surface p-6"
        onSubmit={onSubmit}
      >
        <h2 className="font-display text-lg font-medium">Write to me</h2>
        <p className="mt-2 text-sm text-muted">
          Plain text is fine — I read email daily. The form opens your mail
          client addressed to me.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="contact-name" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Name
            </label>
            <input
              id="contact-name"
              name="name"
              type="text"
              required
              autoComplete="name"
              className="mt-2 w-full rounded-xs border border-border bg-bg px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
            />
          </div>
          <div>
            <label htmlFor="contact-email" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              Email
            </label>
            <input
              id="contact-email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xs border border-border bg-bg px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="contact-message" className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={5}
            className="mt-2 w-full rounded-xs border border-border bg-bg px-3 py-2 text-sm text-text focus:border-accent focus:outline-none"
          />
        </div>
        <div className="mt-6">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xs bg-btn-bg px-4 py-2.5 font-sans text-sm text-btn-fg transition-opacity hover:opacity-90"
          >
            <Send size={14} aria-hidden />
            Send
          </button>
          {sent ? <p className="mt-3 text-sm text-accent-text">Opening your mail client…</p> : null}
        </div>
      </form>
      </Section>
    </>
  );
}
