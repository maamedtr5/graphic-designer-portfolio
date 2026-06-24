import type { SiteConfig, Work } from "./types";
export const SITE_CONFIG: SiteConfig = {
  name: { first: " Kwaku", last: "Ankomah" },
  roles: ["Graphic Designer", "Visual Artist", "Brand Storyteller"], 
  tagline: "Making ideas visible — one mark at a time.", 
  about: {
    headline: "Obsessed with the space between concept and craft.",
    body: [
      "I'm a graphic designer and artist who believes great design doesn't whisper — it lands. My work lives at the intersection of bold visual language and deliberate restraint.",
      "From brand identities to editorial illustration, I bring a sharp eye and a restless curiosity to every brief. If a concept deserves to exist, it deserves to be seen.",
    ],
  },
  contact: {
    email: "kelvinankomah01@gmail.com",          
    instagram: "@bywaakye",               
   
  
  },
  availableForWork: true,
    designerEmail: "kelvinankomah01@gmail.com", 
};


export const SEEDED_WORKS: Work[] = [
   {
     id: "seed-1",
     title: "Study of Kamsy",
     category: "Collage",
     src: "assets/works/kamsy-collage.jpg",
     description: "Editorial-style collage exploring identity through inverted portraits and layered typography.",
     year: "2026",
     source: "seeded",
   },
   {
  id: "seed-2",
  title: "La Haine Poster Study",
  category: "Editorial",
  src: "assets/works/la-haine-poster.jpg", 
  description: "High-contrast editorial poster inspired by the 1995 French film, blending collage and gritty typography.",
  year: "2026",
  source: "seeded",
},
{
  id: "seed-3",
  title: "KD Special Sobolo Ad",
  category: "Branding",
  src: "assets/works/sobolo-ad.jpg",
  description: "Colorful product advertisement highlighting natural Ghanaian ingredients like hibiscus, pineapple, ginger, and orange.",
  year: "2024",
  source: "seeded",
},
{
  id: "seed-4",
  title: "Frank Ocean Collage",
  category: "Digital Art",
  src: "assets/works/frank-ocean-collage.jpg",
  description: "Layered graphic collage referencing Frank Ocean’s 'Blond' album, mixing portraits, abstract shapes, and lyrical typography.",
  year: "2025",
  source: "seeded",
},
{
  id: "seed-5",
  title: "Pink Pantheress Collage",
  category: "Editorial",
  src: "assets/works/pink-pantheress-collage.jpg", 
  description: "Pop-art inspired collage blending London motifs with music culture, featuring Pink Pantheress and British icons.",
  year: "2026",
  source: "seeded",
},
{
  id: "seed-6",
  title: "Sorry, Baby Poster",
  category: "Editorial",
  src: "/assets/works/sorry-baby-poster.jpg", 
  description: "Stylized film poster for 'Sorry, Baby' blending surreal imagery, layered text, and cinematic motifs.",
  year: "2025",
  source: "seeded",
},
{
  id: "seed-7",
  title: "The Bear Poster",
  category: "Editorial",
  src: "assets/works/the-bear-poster.jpg",
  description: "Bold red‑blue poster for 'The Bear', combining textured collage, minimalist typography, and dramatic visual contrast.",
  year: "2026",
  source: "seeded",
},
{
  id: "seed-8",
  title: "Hunny Sip Poster",
  category: "Branding",
  src: "assets/works/hunny-sip-poster.jpg", 
  description: "Bright promotional poster for Hunny Sip beverages, showcasing traditional Ghanaian drinks and fresh fruit juices.",
  year: "2024",
  source: "seeded",
},
{
  id: "seed-9",
  title: "Pathways Collage",
  category: "Digital Art",
  src: "assets/works/pathways-collage.jpg", 
  description: "Philosophical digital collage combining stone statues, swirling distortions, and layered typography exploring human subjectivity.",
  year: "2025",
  source: "seeded",
},
{
  id: "seed-10",
  title: "Sobolo Mascot Logo",
  category: "Branding",
  src: "/assets/works/sobolo-mascot-logo.jpg", 
  description: "Playful logo design featuring a cartoon beverage can mascot promoting Special Sobolo hibiscus juice.",
  year: "2024",
  source: "seeded",
},
{
  id: "seed-11",
  title: "Matcha Tea Packaging",
  category: "Branding",
  src: "assets/works/matcha-tea-packaging.jpg", 
  description: "Clean modern packaging design for organic matcha tea, blending Japanese typography with a playful character illustration.",
  year: "2025",
  source: "seeded",
},
{
  id: "seed-12",
  title: "Matcha Me Packaging",
  category: "Branding",
  src: "assets/works/matcha-me-packaging.jpg", 
  description: "Playful packaging design for Matcha Me organic tea, combining modern branding with traditional Japanese tea culture motifs.",
  year: "2025",
  source: "seeded",
},
{
  id: "seed-13",
  title: "Matcha Me Logo",
  category: "Branding",
  src: "assets/works/matcha-me-logo.jpg", 
  description: "Circular logo design for Matcha Me, featuring a playful character illustration with Japanese‑inspired elements and green leaf motifs.",
  year: "2025",
  source: "seeded",
},
{
  id: "seed-14",
  title: "Hunny Sip Logo",
  category: "Branding",
  src: "assets/works/hunny-sip-logo.jpg", 
  description: "Warm circular logo for Hunny Sip, featuring a stylized jar illustration and artisanal beverage branding.",
  year: "2024",
  source: "seeded",
}










];