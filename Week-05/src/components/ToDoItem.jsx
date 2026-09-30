export default function ToDoItem({ todo, onToggle, onRemove }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={todo.done}
        onChange={() => onToggle(todo.id)}
      />

      <span>{todo.text}</span>
      <button type="button" onClick={() => onRemove(todo.id)}>
        Delete
      </button>
    </li>
  );
}
