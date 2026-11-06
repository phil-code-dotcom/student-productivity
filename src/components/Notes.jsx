import { useState, useId } from "react";
import Button from "./Button";

function Notes({ notes, onAddNote, onDeleteNote }) {
  const [noteText, setNoteText] = useState("");
  const noteId = useId();

  function handleSubmit(event) {
    event.preventDefault();
    if (noteText.trim() === "") return;

    onAddNote({ id: crypto.randomUUID(), text: noteText.trim() });
    setNoteText("");
  }

  return (
    <section className="rounded-lg bg-white p-4 shadow">
      <h2 className="mb-2 text-lg font-bold">Study Notes</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        <label htmlFor={noteId} className="mb-1 block text-sm text-slate-500">
          Write a note
        </label>
        <textarea
          id={noteId}
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          rows="3"
          className="mb-2 w-full rounded border px-3 py-2"
        />
        <Button type="submit" variant="solid">Save Note</Button>
      </form>

      <ul className="space-y-2">
        {notes.map((note) => (
          <li key={note.id} className="flex items-start justify-between gap-3 rounded border p-3">
            <p className="min-w-0 flex-1 break-words">{note.text}</p>
            <Button variant="danger" onClick={() => onDeleteNote(note.id)}>Delete</Button>
          </li>
        ))}
      </ul>

      {notes.length === 0 && <p className="text-slate-500">No notes yet.</p>}
    </section>
  );
}

export default Notes;