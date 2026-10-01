import { useState, useEffect } from "react";
import NewTodoForm from "./NewTodoForm.jsx";
import ToDoItem from "./ToDoItem.jsx";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "../service/todoServices.js";

export default function ToDoList({ listTitle, listId }) {
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    async function load() {
      const todos = await fetchTodos(listId);
      setTodoList(todos);
    }
    load();
  }, [listId]);

  async function handleAdd(text) {
    const newToDo = await createTodo(text, listId);
    setTodoList([newToDo, ...todoList]);
  }
  async function handleToggle(id) {
    const todo = todoList.find((t) => t.id === id);
    await setTodoDone(id, !todo.done);
    setTodoList(
      todoList.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
    );
  }
  async function handleRemove(idToDelete) {
    await deleteTodo(idToDelete);
    setTodoList(todoList.filter((todo) => todo.id !== idToDelete));
  }

  return (
    <div className="todo-body">
      <h1>{listTitle}</h1>

      <NewTodoForm onAdd={handleAdd} />
      {todoList.length === 0 ? (
        <p>Nothing to do. Enjoy your day!</p>
      ) : (
        <ul>
          {todoList.map((todo) => (
            <ToDoItem
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onRemove={handleRemove}
            />
          ))}
        </ul>
      )}
    </div>
  );
}
