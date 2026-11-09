export default function Header({ onStartProject }) {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="brand" href="#top" aria-label="My Portfolio home">
          <span className="brand__mark" aria-hidden="true">
            MP
          </span>
          <span className="brand__name">My Portfolio</span>
        </a>

        <nav className="site-nav" aria-label="Main navigation">
          <a href="#work">Work</a>
          <a href="#studio">About</a>
          <a href="#contact">Contact</a>
        </nav>

        <button
          type="button"
          className="button button--dark header__cta"
          onClick={onStartProject}
        >
          Add Project
        </button>
      </div>
    </header>
  );
}
