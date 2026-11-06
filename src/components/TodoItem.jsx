import { useState, memo } from "react";
import Button from "./Button";

function TodoItem({ todo, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);
  const [editDescription, setEditDescription] = useState(todo.description);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [error, setError] = useState("");

  function startEdit() {
    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditPriority(todo.priority);
    setError("");
    setIsEditing(true);
  }

  function saveEdit() {
    if (editTitle.trim() === "") {
      setError("Task title cannot be empty");
      return;
    }
    onEdit(todo.id, {
      title: editTitle.trim(),
      description: editDescription.trim(),
      priority: editPriority,
    });
    setIsEditing(false);
  }

  return (
    <li className="flex flex-wrap items-start gap-3 rounded-lg border-l-4 border-blue-500 bg-white p-4 shadow">
      {isEditing ? (
        <>
          <div className="min-w-0 flex-1 space-y-2">
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            <input
              type="text"
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              className="w-full rounded border px-3 py-2"
            />
            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
              className="w-full rounded border px-3 py-2"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
            <p className="min-h-5 text-sm text-red-600">{error}</p>
          </div>
          <div className="flex gap-1">
            <Button onClick={saveEdit}>Save</Button>
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
          </div>
        </>
      ) : (
        <>
          <div className="min-w-0 flex-1">
            <h3 className={`font-semibold ${todo.completed ? "line-through text-slate-400" : ""}`}>
              {todo.title}
            </h3>
            <p className="text-sm text-slate-600">{todo.description}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs">
              <span className="rounded bg-slate-100 px-2 py-0.5">
                Priority: {todo.priority}
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5">
                {todo.completed ? "Completed" : "Pending"}
              </span>
            </div>
          </div>
          <div className="flex gap-1">
            <Button onClick={() => onToggle(todo.id)}>
              {todo.completed ? "Undo" : "Complete"}
            </Button>
            <Button onClick={startEdit}>Edit</Button>
            <Button variant="danger" onClick={() => onDelete(todo)}>Delete</Button>
          </div>
        </>
      )}
    </li>
  );
}

export default memo(TodoItem);