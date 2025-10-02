# React Todo App

A modern, responsive, and theme-aware todo application built with React and Vite. It features task management, real-time filtering, detailed task views, and local data persistence.

## Features

- **Task Management**: Create, edit, mark complete, or delete tasks with ease.
- **Detailed Task View**: Access full task details, including descriptions and timestamps, via dedicated routes.
- **Search & Filter**: Quickly locate tasks using the live search bar.
- **Local Persistence**: Tasks are stored in `localStorage` to persist across sessions.
- **Theme Toggle**: Switch between light and dark themes using the Bootstrap-themed UI.
- **Responsive Layout**: Built with React Bootstrap components for a polished, mobile-friendly experience.

## Tech Stack

- **React** (19) with hooks and functional components
- **React Router DOM** for routing
- **React Bootstrap** and **Bootstrap** for styling
- **Vite** for fast development and builds

## Getting Started

### 1. Prerequisites

- Node.js 18 or later
- npm 9 or later

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will start on the URL printed in the terminal (typically `http://localhost:5173`).

### 4. Build for Production

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
react-todo-app/
├── public/
│   └── images/
│       └── todo-logo.png
├── src/
│   ├── components/
│   │   ├── NavBar.jsx
│   │   ├── SearchBar.jsx
│   │   ├── Stats.jsx
│   │   ├── ThemeToggle.jsx
│   │   ├── TodoForm.jsx
│   │   ├── TodoItem.jsx
│   │   └── TodoList.jsx
│   ├── pages/
│   │   ├── PageNotFound.jsx
│   │   ├── TaskDetails.jsx
│   │   └── TodoPage.jsx
│   ├── utils/
│   │   └── localStorage.js
│   ├── App.jsx
│   ├── main.jsx
│   └── themes.css
├── package.json
├── vite.config.js
└── README.md
```

## Key Components

- **`App.jsx`**: Root component that sets up routes, theme, and global state.
- **`TodoForm.jsx`**: Handles task creation with validation.
- **`TodoList.jsx`**: Renders the task list with filtering and actions.
- **`TodoItem.jsx`**: Individual task item with editing modal and status toggles.
- **`TaskDetails.jsx`**: Dedicated page displaying detailed task information.

## Available Scripts

1. `npm run dev` – Start the development server.
2. `npm run build` – Create a production build in the `dist/` directory.
3. `npm run preview` – Preview the production build locally.
4. `npm run lint` – Run ESLint on the project.

## License

This project is open-source and available under the [MIT License](LICENSE).
