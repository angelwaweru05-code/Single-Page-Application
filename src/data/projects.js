// Starter projects shown the first time the app is opened.
export const seedProjects = [
  {
    id: "react-portfolio",
    title: "React Portfolio",
    description:
      "Module 2 project: A personal portfolio website built with React to showcase my projects and skills.",
    tech: ["React", "JavaScript", "CSS"],
  },
  {
    id: "recipe-hub",
    title: "Recipe Hub",
    description:
      "Module 3 project: A recipe website where users can browse, search, and view different recipes.",
    tech: ["React", "JavaScript", "CSS", "API"],
  },
  {
    id: "react-forms",
    title: "React Forms",
    description:
      "Module 3 project: A React project that demonstrates form handling, validation, and user input.",
    tech: ["React", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "api-fetching",
    title: "API Fetching",
    description:
      "Module 3 project: A JavaScript app that fetches data from an API and displays it on the page.",
    tech: ["JavaScript", "Fetch API", "HTML", "CSS"],
  },
  {
    id: "techybit",
    title: "TechyBit",
    description:
      "Module 3 project: A technology website called TechyBit that displays tech news and articles.",
    tech: ["React", "JavaScript", "CSS"],
  },
];

// localStorage key used to save the project list in the browser.
// The version suffix makes the app load the new starter projects once.
export const STORAGE_KEY = "personal-showcase-projects-v4";
