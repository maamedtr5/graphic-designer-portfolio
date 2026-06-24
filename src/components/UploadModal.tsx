import { useState, useRef, useCallback } from "react";
import type { Work, WorkCategory } from "../types";

const CATS: Exclude<WorkCategory, "All">[] = [
  "Branding",
  "Illustration",
  "Typography",
  "Motion",
  "Editorial",
  "Digital Art",
  "Photography",
  "Collage",
];

function toDataURL(file: File): Promise<string> {
  return new Promise((res, rej) => {
    const r = new FileReader();
    r.onload = () => res(r.result as string);
    r.onerror = rej;
    r.readAsDataURL(file);
  });
}

interface Props {
  open: boolean;
  onClose: () => void;
  onAdd: (w: Work) => void;
}

export function UploadModal({ open, onClose, onAdd }: Props) {
  const [drag, setDrag] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Exclude<WorkCategory, "All">>("Branding");
  const [desc, setDesc] = useState("");
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const reset = () => {
    setPreview(null);
    setTitle("");
    setCategory("Branding");
    setDesc("");
    setYear(new Date().getFullYear().toString());
    setError("");
  };

  const close = () => { reset(); onClose(); };

  const handleFile = useCallback(async (f: File) => {
    if (!f.type.startsWith("image/")) { setError("Images only please."); return; }
    if (f.size > 10 * 1024 * 1024) { setError("Max file size is 10 MB."); return; }
    setError("");
    const url = await toDataURL(f);
    setPreview(url);
    if (!title) setTitle(f.name.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "));
  }, [title]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDrag(false);
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, [handleFile]);

  const handleSubmit = () => {
    if (!preview) { setError("Please choose an image."); return; }
    if (!title.trim()) { setError("Please enter a title."); return; }
    onAdd({
      id: `up-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      title: title.trim(),
      category,
      src: preview,
      description: desc.trim() || undefined,
      year: year.trim() || undefined,
      source: "uploaded",
    });
    close();
  };

  if (!open) return null;

  return (
    <div className="modal-backdrop" onClick={close}>
      <div className="modal" onClick={e => e.stopPropagation()} role="dialog" aria-modal aria-label="Upload new work">

        <div className="modal__head">
          <h2 className="modal__title">✦ Add new work</h2>
          <button className="modal__close" onClick={close} aria-label="Close">✕</button>
        </div>

        {/* Drop zone */}
        <div
          className={`modal__drop ${drag ? "modal__drop--active" : ""} ${preview ? "modal__drop--preview" : ""}`}
          onDragOver={e => { e.preventDefault(); setDrag(true); }}
          onDragLeave={() => setDrag(false)}
          onDrop={handleDrop}
          onClick={() => !preview && inputRef.current?.click()}
        >
          {preview ? (
            <div className="modal__preview-wrap">
              <img src={preview} alt="Preview" className="modal__preview" />
              <button
                className="modal__preview-clear"
                onClick={e => { e.stopPropagation(); setPreview(null); }}
                aria-label="Remove image"
              >
                ✕
              </button>
            </div>
          ) : (
            <div className="modal__drop-inner">
              <span className="modal__drop-icon">↑</span>
              <span>Drop image here or <u>browse</u></span>
              <span className="modal__drop-hint">JPG · PNG · GIF · WEBP — max 10 MB</span>
            </div>
          )}
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="modal__file-input"
            onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }}
          />
        </div>

        {error && <p className="modal__error">{error}</p>}

        <div className="modal__fields">
          <label className="modal__label">
            Title *
            <input
              className="modal__input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="e.g. Harmattan Series"
            />
          </label>

          <label className="modal__label">
            Category *
            <select
              className="modal__select"
              value={category}
              onChange={e => setCategory(e.target.value as Exclude<WorkCategory, "All">)}
            >
              {CATS.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <label className="modal__label">
            Year
            <input
              className="modal__input"
              value={year}
              onChange={e => setYear(e.target.value)}
              placeholder="2025"
              maxLength={4}
            />
          </label>

          <label className="modal__label modal__label--full">
            Description
            <textarea
              className="modal__textarea"
              value={desc}
              onChange={e => setDesc(e.target.value)}
              placeholder="One sentence about this piece…"
              rows={2}
            />
          </label>
        </div>

        <div className="modal__actions">
          <button className="modal__cancel" onClick={close}>Cancel</button>
          <button className="modal__submit" onClick={handleSubmit}>Add to portfolio ✦</button>
        </div>

      </div>
    </div>
  );
}