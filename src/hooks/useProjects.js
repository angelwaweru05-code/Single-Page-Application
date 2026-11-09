import { useEffect, useState } from "react";
import { STORAGE_KEY, seedProjects } from "../data/projects";

// Read saved projects from localStorage. If there is no saved data, or the
// saved value is not a valid array, fall back to the starter projects.
function loadProjects() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return seedProjects;
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : seedProjects;
  } catch {
    return seedProjects;
  }
}

// Use a browser-generated ID when available, with a timestamp fallback.
function createId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `project-${Date.now()}`;
}

export default function useProjects() {
  const [projects, setProjects] = useState(loadProjects);

  // Save the latest project list whenever it changes.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch {
      return;
    }
  }, [projects]);

  // Put the newest project first so it is easy to see after adding it.
  function addProject(project) {
    setProjects((current) => [
      { ...project, id: createId() },
      ...current,
    ]);
  }

  // Keep every project whose ID is different from the one being removed.
  function deleteProject(id) {
    setProjects((current) =>
      current.filter((project) => project.id !== id),
    );
  }

  return { projects, addProject, deleteProject };
}
