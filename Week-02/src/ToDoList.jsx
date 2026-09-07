import { useEffect, useState } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import Todoitem from "./TodoItem.jsx";

function loadTodos(todos) {
  const storedTodos = localStorage.getItem("todos");
  return storedTodos ? JSON.parse(storedTodos) : todos;
}

export default function ToDoList({ firstName, todos }) {
  const [todoList, setTodoList] = useState(() => loadTodos(todos));

  function handleAdd(text) {
    const newTodoList = { id: crypto.randomUUID(), text: text, done: false };
    setTodoList((currentTodos) => [...currentTodos, newTodoList]);
  }

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todoList));
  }, [todoList]);

  function handelToggle(id) {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    );
  }

  function handelRemove(id) {
    setTodoList(todoList.filter((todo) => todo.id !== id));
  }

  return (
    <>
      <h1>To Do List for {firstName}</h1>

      <NewTodoForm onAdd={handleAdd} />

      {todoList.length === 0 ? (
        <p> No tasks to display.</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <Todoitem
              key={todo.id}
              todo={todo}
              onToggle={handelToggle}
              onRemove={handelRemove}
            />
          ))}
        </ul>
      )}
    </>
  );
}
