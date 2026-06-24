import { SITE_CONFIG } from "../config";

export function Contact() {
  const { contact, name } = SITE_CONFIG;
  const links = [
    contact.email && { label: "Email", href: `mailto:${contact.email}`, text: contact.email },
    contact.instagram && { label: "Instagram", href: `https://instagram.com/${contact.instagram.replace("@","")}`, text: contact.instagram },
  ].filter(Boolean) as { label: string; href: string; text: string }[];

  return (
    <section id="contact" className="contact-section">
      <div className="contact-section__note">
        <div className="contact-section__note-inner">
          <p className="contact-section__note-pre">Thank you so much for taking the time to look through. I always appreciate your attention.</p>
          <p className="contact-section__note-sign">If you're interested in working together —</p>
        </div>
      </div>

      <div className="contact-section__wrap">
        <h2 className="contact-section__heading">
          and that's<br />
          <span className="contact-section__heading-big">a wrap.</span>
        </h2>

        <div className="contact-section__links">
          {links.map(l => (
            <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="contact-section__link">
              <span className="contact-section__link-label">{l.label}</span>
              <span className="contact-section__link-val">{l.text} →</span>
            </a>
          ))}
        </div>
      </div>

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} {name.first} {name.last}</span>
        <span className="site-footer__hand">made with intent </span>
      </footer>
    </section>
  );
}