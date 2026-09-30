import { useEffect, useState } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList.jsx";
import NewListForm from "./components/NewListForm.jsx";
import Parse from "parse";
import AuthPage from "./pages/AuthPage.js";
import { createList, fetchLists } from "./service/listServices.js";

Parse.initialize(
  "IbkJawJSPMyFgsCA2L0pX8m68E2KyPFyFweSM5eU",
  "yfi1elVE4aGLHhBPxUSfoqNHUaLUWPkp7MYmDFY2",
);
Parse.serverURL = "https://parseapi.back4app.com";

function App() {
  const [user, setUser] = useState(Parse.User.current());
  const [lists, setLists] = useState([]);
  const [selectedListId, setSelectedListId] = useState(null);

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }

  useEffect(() => {
    if (!user) return;

    async function loadLists() {
      const savedLists = await fetchLists();
      setLists(savedLists);
    }

    loadLists();
  }, [user]);

  async function handleNewList(title) {
    const newList = await createList(title);
    setLists((currentLists) => [...currentLists, newList]);
    setSelectedListId(newList.id);
  }

  async function handleLogout() {
    await Parse.User.logOut();
    setUser(null);
  }

  if (!user) return <AuthPage onAuthenticated={handleAuthenticated} />;

  return (
    <div className="main-inner">
      <button className="logout-button" onClick={handleLogout}>
        Log out
      </button>

      <NewListForm onAdd={handleNewList} />

      <nav className="list-picker" aria-label="Todo lists">
        <button
          className={selectedListId === null ? "active" : ""}
          onClick={() => setSelectedListId(null)}
        >
          My Todo List
        </button>
        {lists.map((list) => (
          <button
            className={selectedListId === list.id ? "active" : ""}
            key={list.id}
            onClick={() => setSelectedListId(list.id)}
          >
            {list.title}
          </button>
        ))}
      </nav>

      <ToDoList
        key={selectedListId ?? "default"}
        listTitle={
          selectedListId === null
            ? "My Todo List"
            : lists.find((list) => list.id === selectedListId)?.title
        }
        listId={selectedListId}
      />
    </div>
  );
}

export default App;
