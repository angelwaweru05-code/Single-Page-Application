# My Project Showcase

A simple single-page portfolio application built with React. It displays a list of projects and allows users to search, filter, add, and remove projects. The project list is saved in the browser using `localStorage`.

This project was created as a student project to practise React components, state management, props, hooks, forms, responsive CSS, and testing.

## Features

- Landing page with a project list and project cards
- Search projects by title, category, description, year, or tag
- Filter projects by category
- Add a new project using a form
- Remove a project from the list
- Save changes in `localStorage`
- Responsive layout for desktop, tablet, and mobile
- Basic accessibility support:
  - Form labels
  - Keyboard Escape to close the form
  - Visible focus styles
  - Accessible delete button labels
  - Live result count
- Unit and integration tests with Jest and React Testing Library

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

1. Scroll to the project section to view the starter projects.
2. Type in the search box to filter projects.
3. Click a category button to show only that category.
4. Click **Add Project** in the header or hero section.
5. Fill in the project title and description, then submit the form.
6. Click **Remove** on a card to delete a project.

Added and removed projects are stored in the browser and remain after a page refresh.

## Project structure

```text
src/
├── components/
│   ├── AddProjectForm.jsx
│   ├── Footer.jsx
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── ProjectCard.jsx
│   ├── ProjectGrid.jsx
│   └── Toolbar.jsx
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
│   └── Toolbar.test.jsx
├── App.jsx
└── main.jsx
```

## Component tree

```text
App
├── Header
├── Hero
├── Work section
│   ├── Toolbar
│   └── ProjectGrid
│       └── ProjectCard
├── Footer
└── AddProjectForm
```

## State and data flow

- `useProjects` holds the full project list and saves it to `localStorage`.
- `useProjectFilters` holds the search text and selected category, then calculates the filtered list.
- `App` holds `isFormOpen`, which controls whether the form modal is visible.
- `App` passes data down to child components through props.
- Child components send actions back to `App` through callback functions.

## Testing

The project uses Jest and React Testing Library. The tests cover:

- Rendering the landing page and project cards
- Searching and category filtering
- In-page navigation links
- Adding a project and saving it to `localStorage`
- Form validation
- Removing a project
- Toolbar interactions
- Project card details and delete actions
- Add-project form submission and closing behaviour

Run all tests with:

```bash
npm test
```

## Known limitations

- Projects are saved only in the current browser using `localStorage`. There is no backend, database, or user account system.
- Clearing browser storage will remove added projects and bring back the starter projects.
- There is no project details page. Project information is shown only on the cards.
- There is no image upload. Users must provide an image URL.
- Images come from external URLs, so they require an internet connection.
- Deleting a project happens immediately and there is no undo option.
- There is no real authentication or admin access control.

## Possible future improvements

- Add a backend and database
- Add image uploads
- Add a project details page
- Add edit-project functionality
- Add sorting by year or title
- Add pagination for larger project lists
