import { useMemo, useState } from "react";

export default function useProjectFilters(projects) {
  const [query, setQuery] = useState("");

  // Search both the title and the description of each project.
  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return projects;

    return projects.filter((project) =>
      `${project.title} ${project.description}`
        .toLowerCase()
        .includes(term),
    );
  }, [projects, query]);

  function resetFilters() {
    setQuery("");
  }

  return { query, setQuery, filteredProjects, resetFilters };
}
