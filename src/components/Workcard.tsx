import { useState } from "react";
import type { Work } from "../types";
import { ImageModal } from "./ImageModal";

interface Props {
  work: Work;
  onRemove?: (id: string) => void;
  index: number;
}

const TILTS = [-2.1, 1.4, -0.8, 2.5, -1.7, 0.9, -2.8, 1.1, 2.0, -0.5];

export function WorkCard({ work, onRemove, index }: Props) {
  const [err, setErr] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const tilt = TILTS[index % TILTS.length];

  return (
    <>
      <article
        className="work-card"
        style={{
          "--tilt": `${tilt}deg`,
          animationDelay: `${index * 55}ms`,
        } as React.CSSProperties}
      >
        <div className="work-card__tape" />

        <div className="work-card__img-wrap">
          {!err ? (
            <img
              src={work.src}
              alt={work.title}
              className="work-card__img"
              loading="lazy"
              draggable={false}
              onError={() => setErr(true)}
              onContextMenu={e => e.preventDefault()}
              onClick={() => setModalOpen(true)}
              style={{ cursor: "zoom-in" }}
            />
          ) : (
            <div className="work-card__placeholder">
              {work.title.charAt(0)}
            </div>
          )}

          <div className="work-card__overlay">
            {work.description && (
              <p className="work-card__desc">{work.description}</p>
            )}
            <div className="work-card__overlay-actions">
              <button
                className="work-card__zoom"
                onClick={() => setModalOpen(true)}
                aria-label="View full size"
              >
                ⤢ view
              </button>
              {work.source === "uploaded" && onRemove && (
                <button
                  className="work-card__remove"
                  onClick={e => {
                    e.stopPropagation();
                    onRemove(work.id);
                  }}
                >
                  × remove
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="work-card__footer">
          <span className="work-card__category">{work.category}</span>
          <h3 className="work-card__title">{work.title}</h3>
          {work.year && (
            <span className="work-card__year">'{work.year.slice(-2)}</span>
          )}
        </div>
      </article>

      {modalOpen && (
        <ImageModal
          work={work}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
}