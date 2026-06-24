import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { Work } from "../types";

interface Props {
  work: Work;
  onClose: () => void;
}

export function ImageModal({ work, onClose }: Props) {
  useEffect(() => {
    // Close on Escape
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    const noContext = (e: MouseEvent) => e.preventDefault();

    const noSave = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "S")) {
        e.preventDefault();
      }
    };

    // Lock body scroll while modal is open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    document.addEventListener("keydown", noSave);
    document.addEventListener("contextmenu", noContext);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("keydown", noSave);
      document.removeEventListener("contextmenu", noContext);
    };
  }, [onClose]);

  return createPortal(
    <div
      className="img-modal-backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`Viewing: ${work.title}`}
    >
      
      <button
        className="img-modal-close"
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>

    
      <div
        className="img-modal-frame"
        onClick={e => e.stopPropagation()}
      >
        
        <div className="img-modal-img-wrap">
          <img
            src={work.src}
            alt={work.title}
            className="img-modal-img"
            draggable={false}
            onContextMenu={e => e.preventDefault()}
            onDragStart={e => e.preventDefault()}
          />
         
          <div className="img-modal-img-shield" />
        </div>

       
        <div className="img-modal-footer">
          <span className="img-modal-category">{work.category}</span>
          <span className="img-modal-title">{work.title}</span>
          {work.year && (
            <span className="img-modal-year">{work.year}</span>
          )}
          {work.description && (
            <p className="img-modal-desc">{work.description}</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
}