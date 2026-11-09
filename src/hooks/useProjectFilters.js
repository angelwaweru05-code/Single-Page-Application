import { useMemo, useState } from "react";

export default function useProjectFilters(projects) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Combine every searchable field into one string so the user can search
  // by title, category, description, year, or tag.
  const filteredProjects = useMemo(() => {
    const term = query.trim().toLowerCase();

    return projects.filter((project) => {
      const matchesCategory =
        activeCategory === "All" || project.category === activeCategory;
      if (!matchesCategory) return false;
      if (!term) return true;

      const searchable = [
        project.title,
        project.category,
        project.description,
        project.year,
        ...(project.tags || []),
      ]
        .join(" ")
        .toLowerCase();

      return searchable.includes(term);
    });
  }, [projects, query, activeCategory]);

  function resetFilters() {
    setQuery("");
    setActiveCategory("All");
  }

  return {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filteredProjects,
    resetFilters,
  };
}
