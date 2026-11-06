import { useState, useRef, useEffect, useId } from "react";
import Button from "./Button";

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [error, setError] = useState("");

  const titleInputRef = useRef(null);
  const id = useId();

  // focus the title input when the page loads
  useEffect(() => {
    titleInputRef.current.focus();
  }, []);

  function handleSubmit(event) {
    event.preventDefault();

    if (title.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }
    if (priority === "") {
      setError("Please select a priority");
      return;
    }

    onAddTask({
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority: priority,
      completed: false,
    });

    setTitle("");
    setDescription("");
    setPriority("");
    setError("");
    titleInputRef.current.focus();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-lg bg-white p-4 shadow">
      <div className="grid gap-3 md:grid-cols-4">
        <div>
          <label htmlFor={`${id}-title`} className="mb-1 block text-sm text-slate-500">
            Title
          </label>
          <input
            id={`${id}-title`}
            ref={titleInputRef}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor={`${id}-description`} className="mb-1 block text-sm text-slate-500">
            Description
          </label>
          <input
            id={`${id}-description`}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label htmlFor={`${id}-priority`} className="mb-1 block text-sm text-slate-500">
            Priority
          </label>
          <select
            id={`${id}-priority`}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="w-full rounded border px-3 py-2"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div className="flex items-end">
          <Button type="submit" variant="solid">Add Task</Button>
        </div>
      </div>
      <p className="min-h-5 pt-1 text-sm text-red-600">{error}</p>
    </form>
  );
}

export default TaskForm;