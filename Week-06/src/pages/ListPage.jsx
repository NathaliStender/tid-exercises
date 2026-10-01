import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Parse from "parse";

import TodoItem from "../components/ToDoItem.jsx";
import { fetchTodosForList } from "../service/listServices.js";

import { Link } from "react-router-dom";

const List = Parse.Object.extend("List");

export default function ListPage() {
  const { listId } = useParams();
  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const listQuery = new Parse.Query(List);
      const list = await listQuery.get(listId);
      const todo = await fetchTodosForList(list);

      setList(list);
      setTodos(todo);
    }

    load();
  }, [listId]);

  if (!list) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{list.get("name")}</h1>
      <h2>
        <Link to={`/lists/${list.id}`}>{list.get("name")}</Link>
      </h2>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <TodoItem todo={todo} />
          </li>
        ))}
      </ul>
    </div>
  );
}
