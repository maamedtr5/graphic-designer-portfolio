import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import type { Work } from "../types";

interface Props {
  work: Work;
  onRemove?: (id: string) => void;
  index: number;
}

const TILTS = [-2.1, 1.4, -0.8, 2.5, -1.7, 0.9, -2.8, 1.1, 2.0, -0.5];

// ─── Full-screen modal — rendered via Portal at <body> level ─────────────────
// This is the fix: the old modal was trapped inside <article>, which has a CSS
// transform (tilt) applied. CSS transforms create a new stacking context, so
// position:fixed children can't escape the card. Portal renders into document.body
// directly, completely outside the card's stacking context.
function ImageModal({ work, onClose }: { work: Work; onClose: () => void }) {
  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";

    // Block right-click to discourage image saving
    const noContext = (e: MouseEvent) => e.preventDefault();
    document.addEventListener("contextmenu", noContext);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("contextmenu", noContext);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return createPortal(
    <div
      className="img-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={work.title}
    >
      {/* Stop clicks on the image itself from closing the modal */}
      <div className="img-modal-frame" onClick={e => e.stopPropagation()}>
        <img
          src={work.src}
          alt={work.title}
          className="img-modal-img"
          draggable={false}
          onContextMenu={e => e.preventDefault()}
        />
        <div className="img-modal-footer">
          <span className="img-modal-category">{work.category}</span>
          <span className="img-modal-title">{work.title}</span>
          {work.year && <span className="img-modal-year">{work.year}</span>}
          {work.description && <p className="img-modal-desc">{work.description}</p>}
        </div>
      </div>

      <button className="img-modal-close" onClick={onClose} aria-label="Close">
        ✕
      </button>
    </div>,
    document.body
  );
}

// ─── WorkCard ─────────────────────────────────────────────────────────────────
export function WorkCard({ work, onRemove, index }: Props) {
  const [err, setErr] = useState(false);
  const [open, setOpen] = useState(false);
  const tilt = TILTS[index % TILTS.length];

  return (
    <>
      <article
        className="work-card"
        style={{ "--tilt": `${tilt}deg`, animationDelay: `${index * 55}ms` } as React.CSSProperties}
      >
        <div className="work-card__tape" />

        <div className="work-card__img-wrap">
          {!err ? (
            <img
              src={work.src}
              alt={work.title}
              className="work-card__img"
              loading="lazy"
              onError={() => setErr(true)}
              onClick={() => setOpen(true)}
              style={{ cursor: "zoom-in" }}
            />
          ) : (
            <div className="work-card__placeholder">{work.title.charAt(0)}</div>
          )}
          <div className="work-card__overlay">
            {work.description && <p className="work-card__desc">{work.description}</p>}
            {work.source === "uploaded" && onRemove && (
              <button
                className="work-card__remove"
                onClick={e => { e.stopPropagation(); onRemove(work.id); }}
              >
                × remove
              </button>
            )}
          </div>
        </div>

        <div className="work-card__footer">
          <span className="work-card__category">{work.category}</span>
          <h3 className="work-card__title">{work.title}</h3>
          {work.year && <span className="work-card__year">'{work.year.slice(-2)}</span>}
        </div>
      </article>

      {/* Portal modal lives outside the article — no stacking context issues */}
      {open && <ImageModal work={work} onClose={() => setOpen(false)} />}
    </>
  );
}