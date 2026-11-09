import Header from "./components/Header";
import AddProjectForm from "./components/AddProjectForm";
import SearchBar from "./components/SearchBar";
import ProjectGrid from "./components/ProjectGrid";
import Footer from "./components/Footer";
import useProjects from "./hooks/useProjects";
import useProjectFilters from "./hooks/useProjectFilters";

export default function App() {
  // useProjects owns the full project list and localStorage persistence.
  const { projects, addProject, deleteProject } = useProjects();

  // useProjectFilters owns the search text and the filtered project list.
  const { query, setQuery, filteredProjects, resetFilters } =
    useProjectFilters(projects);

  function handleAddProject(project) {
    addProject(project);
    resetFilters();
  }

  return (
    <div className="app-shell" id="top">
      <a className="skip-link" href="#projects">
        Skip to projects
      </a>

      <Header />

      <main className="container page-main">
        <section className="panel" id="add-project">
          <h2>Add Project</h2>
          <AddProjectForm onAddProject={handleAddProject} />
        </section>

        <section className="panel" id="search-project">
          <h2>Search Project</h2>
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            resultCount={filteredProjects.length}
          />
        </section>

        <section className="panel" id="projects">
          <h2>Projects</h2>
          <ProjectGrid
            projects={filteredProjects}
            onDeleteProject={deleteProject}
          />
        </section>
      </main>

      <Footer />
    </div>
  );
}
