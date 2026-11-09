import { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Toolbar from "./components/Toolbar";
import ProjectGrid from "./components/ProjectGrid";
import AddProjectForm from "./components/AddProjectForm";
import Footer from "./components/Footer";
import { CATEGORIES } from "./data/projects";
import useProjects from "./hooks/useProjects";
import useProjectFilters from "./hooks/useProjectFilters";

export default function App() {
  // useProjects owns the full project list and localStorage persistence.
  const { projects, addProject, deleteProject } = useProjects();

  // useProjectFilters owns the search text, selected category, and the
  // filtered list that should be shown on the page.
  const {
    query,
    setQuery,
    activeCategory,
    setActiveCategory,
    filteredProjects,
    resetFilters,
  } = useProjectFilters(projects);

  // This state controls whether the add-project modal is visible.
  const [isFormOpen, setIsFormOpen] = useState(false);

  function handleAddProject(project) {
    addProject(project);
    resetFilters();
    setIsFormOpen(false);
  }

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#work">
        Skip to projects
      </a>
      <Header onStartProject={() => setIsFormOpen(true)} />
      <main>
        <Hero
          projectCount={projects.length}
          onStartProject={() => setIsFormOpen(true)}
        />
        <section className="work-section" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2 id="work-title">Projects with a point of view.</h2>
              </div>
              <p className="section-heading__copy">
                Brand, product and campaign work made with curious people across
                the world.
              </p>
            </div>
            <Toolbar
              query={query}
              onQueryChange={setQuery}
              categories={["All", ...CATEGORIES]}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              resultCount={filteredProjects.length}
            />
            <ProjectGrid
              projects={filteredProjects}
              onDeleteProject={deleteProject}
            />
          </div>
        </section>
      </main>
      <Footer />
      {isFormOpen && (
        <AddProjectForm
          categories={CATEGORIES}
          onAddProject={handleAddProject}
          onClose={() => setIsFormOpen(false)}
        />
      )}
    </div>
  );
}
