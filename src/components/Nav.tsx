import { useState, useEffect } from "react";
import { SITE_CONFIG } from "../config";

interface NavProps {
  onUploadClick: () => void;
  userEmail: string | null;
  onLoginClick: () => void;
}

export function Nav({ onUploadClick, userEmail, onLoginClick }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  const isDesigner = userEmail === SITE_CONFIG.designerEmail;

  return (
    <nav className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <button className="nav__logo" onClick={() => go("hero")}>
        <span className="nav__logo-name">{SITE_CONFIG.name.first}</span>
        <span className="nav__logo-tag">✦ {SITE_CONFIG.name.last}</span>
      </button>

      <div className={`nav__links ${open ? "nav__links--open" : ""}`}>
        <button onClick={() => go("work")}>Work</button>
        <button onClick={() => go("about")}>About</button>
        <button onClick={() => go("contact")}>Contact</button>

        {isDesigner ? (
          <button
            className="nav__upload"
            onClick={() => { onUploadClick(); setOpen(false); }}
          >
            + Upload
          </button>
        ) : (
          <button className="nav__login" onClick={() => { onLoginClick(); setOpen(false); }}>
            Designer ✦
          </button>
        )}
      </div>

      <button
        className={`nav__burger ${open ? "open" : ""}`}
        onClick={() => setOpen(v => !v)}
        aria-label="Menu"
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}