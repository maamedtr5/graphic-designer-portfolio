import { useState, useEffect, useCallback } from "react";
import type { Work, WorkCategory } from "../types";
import { SEEDED_WORKS } from "../config";

const KEY = "scrapbook_uploaded_works";

function load(): Work[] {
  try { const r = localStorage.getItem(KEY); return r ? JSON.parse(r) : []; }
  catch { return []; }
}
function save(w: Work[]) {
  try { localStorage.setItem(KEY, JSON.stringify(w)); } catch {}
}

export function useWorks() {
  const [uploaded, setUploaded] = useState<Work[]>(load);
  const [activeCategory, setActiveCategory] = useState<WorkCategory>("All");

  useEffect(() => { save(uploaded); }, [uploaded]);

  const all: Work[] = [...SEEDED_WORKS, ...uploaded];
  const filtered = activeCategory === "All" ? all : all.filter(w => w.category === activeCategory);
  const categories: WorkCategory[] = ["All", ...Array.from(new Set(all.map(w => w.category)))] as WorkCategory[];
  const addWork = useCallback((w: Work) => setUploaded(p => [w, ...p]), []);
  const removeWork = useCallback((id: string) => setUploaded(p => p.filter(w => w.id !== id)), []);

  return { allWorks: all, filteredWorks: filtered, categories, activeCategory, setActiveCategory, addWork, removeWork };
}