import { useState, useMemo, useCallback } from "react";
import useLocalStorage from "./hooks/useLocalStorage";
import TodoItem from "./components/TodoItem";
import Button from "./components/Button";
import TaskForm from "./components/TaskForm";
import StatsCards from "./components/StatsCards";
import StudyTimer from "./components/StudyTimer";
import Notes from "./components/Notes";

function App() {
  const [todos, setTodos] = useLocalStorage("todos", []);
  const [notes, setNotes] = useLocalStorage("notes", []);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [todoToDelete, setTodoToDelete] = useState(null);

  const addTodo = useCallback((newTodo) => {
    setTodos((prev) => [...prev, newTodo]);
  }, [setTodos]);

  const toggleTodo = useCallback((id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }, [setTodos]);

  const editTodo = useCallback((id, updatedFields) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, ...updatedFields } : todo))
    );
  }, [setTodos]);

  function confirmDelete() {
    setTodos((prev) => prev.filter((todo) => todo.id !== todoToDelete.id));
    setTodoToDelete(null);
  }

  const addNote = useCallback((newNote) => {
    setNotes((prev) => [...prev, newNote]);
  }, [setNotes]);

  const deleteNote = useCallback((id) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  }, [setNotes]);

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((todo) => todo.completed).length;
    const pending = total - completed;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);
    return { total, completed, pending, percent };
  }, [todos]);

  const visibleTodos = useMemo(() => {
    return todos.filter((todo) => {
      const matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase());
      if (filter === "completed") return todo.completed && matchesSearch;
      if (filter === "pending") return !todo.completed && matchesSearch;
      return matchesSearch;
    });
  }, [todos, filter, search]);

  const filters = [
    { value: "all", label: "All Tasks" },
    { value: "completed", label: "Completed Tasks" },
    { value: "pending", label: "Pending Tasks" },
  ];

  return (
    <>
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between p-4">
          <h1 className="text-2xl font-bold text-blue-600">Student Productivity Dashboard</h1>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-4 p-4">
        <StatsCards stats={stats} />

        <TaskForm onAddTask={addTodo} />

        <section className="flex flex-wrap items-center gap-3 rounded-lg bg-white p-3 shadow">
          {filters.map((item) => (
            <Button
              key={item.value}
              variant={filter === item.value ? "active" : "outline"}
              onClick={() => setFilter(item.value)}
            >
              {item.label}
            </Button>
          ))}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title"
            className="min-w-0 flex-1 rounded border px-3 py-2"
          />
        </section>

        <section>
          <ul className="space-y-3">
            {visibleTodos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={toggleTodo}
                onEdit={editTodo}
                onDelete={setTodoToDelete}
              />
            ))}
          </ul>

          {todos.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow">
              <p className="text-lg font-semibold">No tasks yet</p>
              <p className="text-slate-500">Add your first task above.</p>
            </div>
          )}

          {todos.length > 0 && visibleTodos.length === 0 && (
            <div className="rounded-lg bg-white p-8 text-center shadow">
              <p className="text-lg font-semibold">No tasks found</p>
              <p className="text-slate-500">Try a different filter or search.</p>
            </div>
          )}
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <StudyTimer />
          <Notes notes={notes} onAddNote={addNote} onDeleteNote={deleteNote} />
        </div>
      </main>

      {todoToDelete && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 p-4">
          <div className="mx-auto mt-24 w-full max-w-sm rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-xl font-bold">Delete task?</h2>
            <p className="mb-4 text-slate-600">
              Do you really want to delete "{todoToDelete.title}"?
            </p>
            <div className="flex justify-end gap-2">
              <Button onClick={() => setTodoToDelete(null)}>Cancel</Button>
              <Button variant="danger" onClick={confirmDelete}>Delete</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;