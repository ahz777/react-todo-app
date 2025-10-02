import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container, Card } from "react-bootstrap";
import { useEffect, useState, useMemo } from "react";

import ThemeToggle from "./components/ThemeToggle";
import NavBar from "./components/NavBar";
import TodoPage from "./pages/TodoPage";
import TaskDetails from "./pages/TaskDetails";
import PageNotFound from "./pages/PageNotFound";
import TodoForm from "./components/TodoForm";
import SearchBar from "./components/SearchBar";
import Stats from "./components/Stats";
import TodoList from "./components/TodoList";
import { loadTodos, saveTodos } from "./utils/localStorage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./themes.css";

const LOCAL_STORAGE_KEY = "ls_key";
const LOCAL_THEME_KEY = "lt_key";
const AVAILABLE_THEMES = ["sea", "sky", "galaxy", "desert", "woods"];

export default function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = window.localStorage.getItem(LOCAL_THEME_KEY);
    if (savedTheme && AVAILABLE_THEMES.includes(savedTheme)) {
      return savedTheme;
    }
    return "sea";
  });
  const [todos, setTodos] = useState(() => loadTodos(LOCAL_STORAGE_KEY) || []);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const searchTerm = search.trim().toLowerCase();
    if (!searchTerm) return todos;
    return todos.filter(
      (searched) =>
        searched.title.toLowerCase().includes(searchTerm) || searched.description.toLowerCase().includes(searchTerm)
    );
  }, [todos, search]);

  function changeTheme(newTheme) {
    if (AVAILABLE_THEMES.includes(newTheme)) {
      setTheme(newTheme);
    }
  }
  useEffect(() => {
    window.localStorage.setItem(LOCAL_THEME_KEY, theme);
    document.body.setAttribute("data-bs-theme", theme);
  }, [theme]);

  useEffect(() => {
    saveTodos(LOCAL_STORAGE_KEY, todos);
  }, [todos]);

  function addTodo(todo) {
    let newTodos = [...todos];
    newTodos.push(todo);
    setTodos(newTodos);
  }

  function handleTitleChange(event) {
    setTitle(event.target.value);
    if (titleError) setTitleError(false);
  }

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!title.trim()) {
      setTitleError(true);
      return;
    }

    const newTodo = {
      id: Date.now(),
      title: title,
      description: description,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    addTodo(newTodo);
    setTitle("");
    setDescription("");
    setTitleError(false);
  }

  function toggleComplete(id) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  }

  function deleteTodo(id) {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  }

  function updateTodo(id, updatedFields) {
    setTodos((prev) => prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo)));
  }

  return (
    <BrowserRouter>
      <NavBar>
        <ThemeToggle theme={theme} changeTheme={changeTheme} />
      </NavBar>
      <Container className="app-layout py-4 px-3 px-md-4">
        <Card className="app-card glass-card border-0 shadow-lg">
          <Card.Body className="p-4 p-lg-5">
            <Routes>
              <Route
                path="/"
                element={
                  <TodoPage>
                    <section className="todo-sidebar d-flex flex-column gap-4">
                      <TodoForm
                        title={title}
                        description={description}
                        handleTitleChange={handleTitleChange}
                        handleDescriptionChange={handleDescriptionChange}
                        handleSubmit={handleSubmit}
                      />
                      <Stats todos={todos} />
                    </section>
                    <section className="todo-main d-flex flex-column gap-4">
                      <SearchBar value={search} onChange={setSearch} />
                      <TodoList
                        theme={theme}
                        todos={filtered}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        updateTodo={updateTodo}
                        searchTerm={search}
                        allTodos={todos}
                      />
                    </section>
                  </TodoPage>
                }
              />
              <Route
                path="/task/:id"
                element={
                  <TaskDetails
                    theme={theme}
                    todos={todos}
                    toggleComplete={toggleComplete}
                    deleteTodo={deleteTodo}
                    updateTodo={updateTodo}
                  />
                }
              />
              <Route path="*" element={<PageNotFound />} />
            </Routes>
          </Card.Body>
        </Card>
      </Container>
    </BrowserRouter>
  );
}
