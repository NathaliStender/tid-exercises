import { useState } from "react";

export default function TodoList() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = () => {
    if (newItem.trim() !== "") {
      setItems((currentItems) => [...currentItems, newItem.trim()]);
      setNewItem("");
    }
  };

  return (
    <div style={{ color: "lightblue" }}>
      <h1>My Todo List</h1>

      <input
        type="text"
        value={newItem}
        onChange={(event) => setNewItem(event.target.value)}
        placeholder="Type something..."
        onKeyDown={(event) => {
          if (event.key === "Enter") handleAddItem();
        }}
      />

      <button onClick={handleAddItem}>Add</button>

      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}
