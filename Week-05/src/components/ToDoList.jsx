import { useState, useEffect } from "react";
import Parse from "parse";
import NewTodoForm from "./NewTodoForm.jsx";
import ToDoItem from "./ToDoItem.jsx";
import {
  fetchTodos,
  createTodo,
  setTodoDone,
  deleteTodo,
} from "../services/todoServices.js";

export default function ToDoList({ firstName, onLogout }) {
  let h1Style = { fontFamily: "oswald" };

  let [todos, setTodos] = useState([]);

  // newTask is a string
  async function handleAdd(newTask) {
    const newTodo = await createTodo(newTask);
    setTodos([...todos, newTodo]);
  }

  async function handleDelete(idToDelete) {
    await deleteTodo(idToDelete);
    setTodos(todos.filter((each) => each.id !== idToDelete));
  }

  async function handleToggle(id) {
    const todoToToggle = todos.find((t) => t.id === id);
    await setTodoDone(id, !todoToToggle.done);
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  useEffect(() => {
    async function loadTodos() {
      try {
        setTodos(await fetchTodos());
      } catch (error) {
        if (error.code === Parse.Error.INVALID_SESSION_TOKEN) {
          await onLogout();
          return;
        }
        throw error;
      }
    }
    loadTodos();
  }, [onLogout]);

  return (
    <>
      <div className="todoItems">
        <h1 style={h1Style}>To Do List for {firstName}</h1>
        {todos.length === 0 ? (
          <>Nothing to do</>
        ) : (
          <ul>
            {todos.map((elem) => (
              <ToDoItem
                key={elem.id}
                elem={elem}
                onDelete={handleDelete}
                onChange={handleToggle}
              />
            ))}
          </ul>
        )}

        <NewTodoForm onAdd={handleAdd} />
      </div>
    </>
  );
}
