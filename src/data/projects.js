// These categories are shared by the filter buttons and the add-project form.
export const CATEGORIES = [
  "Branding",
  "Digital",
  "Motion",
  "Campaign",
  "Strategy",
];

// Starter projects shown the first time the app is opened.
export const seedProjects = [
  {
    id: "aria-coffee",
    title: "Aria Coffee Rebrand",
    category: "Branding",
    year: "2024",
    description:
      "A tactile identity and packaging system for a neighbourhood roastery with a growing cult following.",
    image:
      "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1200&q=80",
    tags: ["Identity", "Packaging", "Art direction"],
    featured: true,
  },
  {
    id: "northwind-digital",
    title: "Northwind Banking App",
    category: "Digital",
    year: "2024",
    description:
      "A calm, confident mobile experience that makes everyday money management feel effortless.",
    image:
      "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&w=1200&q=80",
    tags: ["Product design", "UX research", "Design system"],
    featured: false,
  },
  {
    id: "kinetic-motion",
    title: "Kinetic Type Studies",
    category: "Motion",
    year: "2023",
    description:
      "A self-initiated series exploring how typography behaves when rhythm, sound and motion collide.",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    tags: ["Motion", "Typography", "Sound"],
    featured: false,
  },
  {
    id: "solstice-campaign",
    title: "Solstice Summer Campaign",
    category: "Campaign",
    year: "2023",
    description:
      "A sun-drenched, feel-good campaign that turned a small outdoor label into a summer staple.",
    image:
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    tags: ["Campaign", "Photography", "Social"],
    featured: false,
  },
  {
    id: "terra-strategy",
    title: "Terra Futures Report",
    category: "Strategy",
    year: "2022",
    description:
      "A future-facing brand strategy and editorial platform for a climate-focused investment fund.",
    image:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    tags: ["Strategy", "Editorial", "Naming"],
    featured: false,
  },
  {
    id: "form-festival",
    title: "FORM Design Festival",
    category: "Branding",
    year: "2022",
    description:
      "A bold, shape-shifting visual language for a festival celebrating the edges of contemporary design.",
    image:
      "https://images.unsplash.com/photo-1558603668-6570496b66f8?auto=format&fit=crop&w=1200&q=80",
    tags: ["Identity", "Wayfinding", "Digital"],
    featured: false,
  },
];

// localStorage key used to save the project list in the browser.
export const STORAGE_KEY = "project-showcase-projects";
