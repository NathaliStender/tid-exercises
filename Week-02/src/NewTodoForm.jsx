import { useState } from "react";

export default function NewTodoForm({ onAdd }) {
  const [text, setText] = useState("");

  function handelSubmit(event) {
    event.preventDefault();
    onAdd(text);
    setText("");
  }

  return (
    <form onSubmit={handelSubmit}>
      <input
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Add a new todo"
      />
      <button disabled={text.trim().length === 0}>Add</button>
    </form>
  );
}
