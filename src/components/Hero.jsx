export default function Hero({ projectCount, onStartProject }) {
  return (
    <section className="hero" id="studio">
      <div className="container hero__inner">
        <p className="eyebrow">Personal Project Showcase</p>
        <h1>My Project Showcase</h1>
        <p className="hero__lede">
          Welcome to my portfolio. This page shows some of the projects I have
          worked on. You can search the projects, filter them by category, or add
          a new project using the form.
        </p>
        <div className="hero__actions">
          <button
            type="button"
            className="button button--dark"
            onClick={onStartProject}
          >
            Add New Project
          </button>
          <a className="button button--ghost" href="#work">
            View Projects
          </a>
        </div>
        <p className="hero__count">
          There are currently <strong>{projectCount}</strong> projects in this
          showcase.
        </p>
      </div>
    </section>
  );
}
