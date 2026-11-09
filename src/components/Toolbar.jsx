function SearchIcon() {
  return (
    <svg
      className="search-field__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function Toolbar({
  query,
  onQueryChange,
  categories,
  activeCategory,
  onCategoryChange,
  resultCount,
}) {
  return (
    <div className="toolbar">
      <div className="search-field">
        <SearchIcon />
        <label className="visually-hidden" htmlFor="project-search">
          Search projects
        </label>
        <input
          id="project-search"
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search by project, category or tag…"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            className="search-field__clear"
            onClick={() => onQueryChange("")}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>

      <div className="toolbar__filters">
        <div className="filter-chips" role="group" aria-label="Filter by category">
          {categories.map((category) => {
            const isActive = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                className={`filter-chip${isActive ? " is-active" : ""}`}
                aria-pressed={isActive}
                onClick={() => onCategoryChange(category)}
              >
                {category}
              </button>
            );
          })}
        </div>
        <p className="result-count" role="status" aria-live="polite">
          <strong>{resultCount}</strong>{" "}
          {resultCount === 1 ? "project" : "projects"}
        </p>
      </div>
    </div>
  );
}
