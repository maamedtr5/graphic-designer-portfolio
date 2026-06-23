export type WorkCategory =
  | "All"
  | "Branding"
  | "Illustration"
  | "Typography"
  | "Motion"
  | "Editorial"
  | "Digital Art"
  | "Photography"
  | "Collage";

export interface Work {
  id: string;
  title: string;
  category: Exclude<WorkCategory, "All">;
  src: string;
  description?: string;
  year?: string;
  source: "seeded" | "uploaded";
}

export interface SiteConfig {
  name: { first: string; last: string };
  roles: string[];
  tagline: string;
  about: { headline: string; body: string[] };
  contact: {
    email: string;
    instagram?: string;
  };
  availableForWork: boolean;

  designerEmail: string;
}
