# Software Engineering

A simple single-page project showcase built with React. The page has a heading, an add-project form, a search box, and a list of projects.

This project was created as a student project to practise React components, state, props, hooks, forms, responsive CSS, and testing.

## Features

- Landing page with a list of projects
- Add-project form with title, description, and technologies fields
- Search projects by title or description
- Remove a project from the list
- Show the technologies used to build each project
- Save projects in the browser using `localStorage`
- Colorful, responsive layout for desktop and mobile
- Keyboard-friendly form labels and accessible buttons
- Tests using Jest and React Testing Library

## Page layout

```text
Software Engineering
Add Project
  Title
  Description
  Technologies used
  Add Project button

Search Project
  Search input

Projects
  React Portfolio + description
  Recipe Hub + description
  React Forms + description
  API Fetching + description
  TechyBit + description
```

## Setup and usage

### Requirements

- Node.js 18 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open the local URL printed in the terminal, usually `http://localhost:5173`.

### Run the tests

```bash
npm test
```

### Create a production build

```bash
npm run build
```

### Preview the production build

```bash
npm run preview
```

## How to use the app

1. Enter a project title and description in the **Add Project** section.
2. Optionally enter the technologies used, separated by commas.
3. Click **Add Project** to add it to the list.
4. Use the **Search Project** box to filter projects by title or description.
5. Click **Remove** on a project to delete it.

Added and removed projects are saved in the browser and remain after a page refresh.

## Project structure

```text
src/
├── components/
│   ├── AddProjectForm.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectGrid.jsx
│   └── SearchBar.jsx
├── data/
│   └── projects.js
├── hooks/
│   ├── useProjectFilters.js
│   └── useProjects.js
├── styles/
│   └── index.css
├── tests/
│   ├── AddProjectForm.test.jsx
│   ├── App.test.jsx
│   ├── ProjectCard.test.jsx
│   └── SearchBar.test.jsx
├── App.jsx
└── main.jsx
```

## Component tree

```text
App
├── Header
├── AddProjectForm
├── SearchBar
├── ProjectGrid
│   └── ProjectCard
└── Footer
```

## State and data flow

- `useProjects` holds the full project list and saves it to `localStorage`.
- `useProjectFilters` holds the search text and calculates the filtered list.
- `App` passes the project list to `ProjectGrid`.
- `App` passes search values to `SearchBar`.
- `AddProjectForm` sends a new project to `App` through the `onAddProject` callback.
- `ProjectCard` sends a remove action to `App` through the `onDeleteProject` callback.

## Testing

The project uses Jest and React Testing Library. The tests cover:

- Rendering the heading and starter projects
- Searching by title or description
- Adding a project and saving it to `localStorage`
- Form validation
- Removing a project
- Search input interactions
- Project card rendering and delete actions

Run all tests with:

```bash
npm test
```

## Known limitations

- Projects are saved only in the current browser using `localStorage`.
- Data does not sync between different browsers or devices.
- There is no backend, database, or login system.
- Clearing browser storage resets the project list to the starter projects.
- There is no edit-project feature.
- Deleting a project has no undo option.
- Project images and categories are not included in this simple version.
- The app is not deployed online yet; it runs locally with Vite.

## Repository

Public GitHub repository:  
https://github.com/angelwaweru05-code/Single-Page-Application
