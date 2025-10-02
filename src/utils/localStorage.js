export function loadTodos(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) return null;
    return parsed.map((item) => ({
      id: item.id,
      title: String(item.title || ""),
      description: String(item.description || ""),
      createdAt: item.createdAt || new Date().toISOString(),
      completed: !!item.completed,
    }));
  } catch (error) {
    console.warn("Failed to load todos from localStorage:", error);
    return null;
  }
}

export function saveTodos(key, todos) {
  try {
    window.localStorage.setItem(key, JSON.stringify(todos));
  } catch (error) {
    console.error("Failed to save todos:", error);
  }
}
