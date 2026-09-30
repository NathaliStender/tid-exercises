import { useState } from "react";

export default function NewListForm({ onAdd }) {
  const [text, setText] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form className="new-list-form" onSubmit={handleSubmit}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="New list"
        aria-label="New list name"
      />
      <button type="submit" disabled={text.trim().length === 0}>
        New list
      </button>
    </form>
  );
}
