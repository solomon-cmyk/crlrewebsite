import type { ReactNode } from "react";
import Link from "next/link";
import { CONTACT } from "@/lib/contact";
import { LEGAL_LINKS, SITE } from "@/lib/site";

export type LegalSection = {
  id: string;
  title: string;
  paragraphs: string[];
  list?: string[];
};

export function LegalPageShell({
  title,
  intro,
  sections,
  children,
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  children?: ReactNode;
}) {
  return (
    <div className="legal-page">
      <header className="legal-page__header">
        <div className="wrap">
          <Link href="/" className="legal-page__back">
            Back to home
          </Link>
          <p className="eyebrow">Legal</p>
          <h1>{title}</h1>
          <p className="legal-page__meta">Last updated: {SITE.lastUpdated}</p>
          <p className="legal-page__intro">{intro}</p>
        </div>
      </header>
      <div className="wrap legal-page__body">
        <nav className="legal-page__toc" aria-label="On this page">
          <p className="legal-page__toc-title">On this page</p>
          <ul>
            {sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="legal-page__content">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="legal-section">
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 40)}>{paragraph}</p>
              ))}
              {section.list && (
                <ul>
                  {section.list.map((item) => (
                    <li key={item.slice(0, 40)}>{item}</li>
                  ))}
                </ul>
              )}
            </section>
          ))}
          {children}
        </article>
      </div>
      <footer className="legal-page__footer">
        <div className="wrap">
          <p>
            Questions about these policies? Contact{" "}
            <a href={CONTACT.emailCrlreHref}>{CONTACT.emailCrlre}</a> or call{" "}
            <a href={CONTACT.phoneUsHref}>{CONTACT.phoneUs}</a>.
          </p>
          <p className="legal-page__footer-links">
            {LEGAL_LINKS.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
