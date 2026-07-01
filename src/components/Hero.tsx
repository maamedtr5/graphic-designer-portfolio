import { useState, useEffect } from "react";
import { SITE_CONFIG } from "../config";

interface HeroProps {
  userEmail: string | null; 
  onUploadClick?: () => void; 
}

export function Hero({ userEmail, onUploadClick }: HeroProps) {
  const [roleIndex, setRoleIndex] = useState(0);
  const [show, setShow] = useState(true);
  const roles = SITE_CONFIG.roles;

  useEffect(() => {
    const t = setInterval(() => {
      setShow(false);
      setTimeout(() => {
        setRoleIndex(i => (i + 1) % roles.length);
        setShow(true);
      }, 350);
    }, 2600);
    return () => clearInterval(t);
  }, [roles.length]);

  const isDesigner = userEmail === SITE_CONFIG.designerEmail;

  return (
    <section id="hero" className="hero">
      {/* Sticky-note annotation top-left */}
      <div className="hero__note hero__note--tl">
        <span className="hero__note-text">hi, since you're new here —</span>
      </div>

      {/* Right annotation */}
      <div className="hero__note hero__note--tr">
        <span className="hero__note-text">let me be your guide </span>
      </div>

      <div className="hero__center">
        {/* Big stacked name */}
        <h1 className="hero__name">
          <span className="hero__name-first">{SITE_CONFIG.name.first}</span>
          <span className="hero__name-last">{SITE_CONFIG.name.last}</span>
        </h1>

        <div className="hero__meta">
          <div className="hero__role-strip">
            <span className="hero__role-label">I am a</span>
            <span className={`hero__role ${show ? "hero__role--in" : "hero__role--out"}`}>
              {roles[roleIndex]}
            </span>
          </div>

          {SITE_CONFIG.availableForWork && (
            <div className="hero__avail">
              <span className="hero__avail-dot" />
              Available for projects
            </div>
          )}
        </div>

        <p className="hero__tagline">"{SITE_CONFIG.tagline}"</p>

        <button
          className="hero__cta"
          onClick={() =>
            document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })
          }
        >
          see the work ↓
        </button>

        {/* Designer-only upload shortcut */}
        {isDesigner && onUploadClick && (
          <button
            className="hero__cta hero__cta--upload"
            onClick={onUploadClick}
          >
            + Upload new work 
          </button>
        )}
      </div>

      {/* Scrapbook decorative tape strips */}
      <div className="hero__tape hero__tape--1" />
      <div className="hero__tape hero__tape--2" />

      {/* Scrapbook torn-paper edge — transitions hero into the works section */}
      <div className="hero__divider" aria-hidden />
    </section>
  );
}