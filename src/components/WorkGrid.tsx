import type { Work, WorkCategory } from '../types/index';
import { WorkCard } from "./Workcard";

interface Props {
  works: Work[];
  categories: WorkCategory[];
  activeCategory: WorkCategory;
  onCategoryChange: (c: WorkCategory) => void;
  onRemove: (id: string) => void;
  onUploadClick: () => void;
}

export function WorksGrid({
  works,
  categories,
  activeCategory,
  onCategoryChange,
  onRemove,
  onUploadClick,
}: Props) {
  return (
    <section id="work" className="works-section">
      <div className="works-section__head">
        <h2 className="works-section__title">
          <span className="works-section__title-label">skills &</span>
          <span className="works-section__title-big">works.</span>
        </h2>
        <div className="works-section__filters">
          {categories.map(c => (
            <button
              key={c}
              className={`filter-btn ${activeCategory === c ? "filter-btn--active" : ""}`}
              onClick={() => onCategoryChange(c)}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {works.length === 0 ? (
        <div className="works-empty">
          <p>No works yet — drop something in.</p>
          <button onClick={onUploadClick} className="works-empty__cta">
            + Upload your first piece
          </button>
        </div>
      ) : (
        <div className="works-grid">
          {works.map((w, i) => (
            <WorkCard key={w.id} work={w} onRemove={onRemove} index={i} />
          ))}
          <button className="works-add-tile" onClick={onUploadClick}>
            <span className="works-add-tile__plus">+</span>
            <span className="works-add-tile__text">add work</span>
          </button>
        </div>
      )}
    </section>
  );
}
