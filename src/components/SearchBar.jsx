function SearchIcon() {
  return (
    <svg
      className="search-field__icon"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="m16 16 4 4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SearchBar({ query, onQueryChange, resultCount }) {
  return (
    <div className="search-area">
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
          placeholder="Search projects by title or description"
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

      <p className="result-count" role="status" aria-live="polite">
        {resultCount} {resultCount === 1 ? "project" : "projects"} found
      </p>
    </div>
  );
}
