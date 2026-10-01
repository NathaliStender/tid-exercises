import { useEffect, useState } from "react";
import "./App.css";
import ToDoList from "./components/ToDoList.jsx";
import NewListForm from "./components/NewListForm.jsx";
import Parse from "parse";
import AuthPage from "./pages/AuthPage.jsx";
import { createList, fetchLists } from "./service/listServices.js";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage.jsx";

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
    <BrowserRouter>
      <div className="main-inner">
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <NewListForm onAdd={handleNewList} />

                <nav className="list-picker">
                  {lists.map((list) => (
                    <Link key={list.id} to={`/lists/${list.id}`}>
                      {list.title}
                    </Link>
                  ))}
                </nav>

                <ToDoList listTitle="My Todo List" listId={null} />
              </>
            }
          />

          <Route path="/lists/:listId" element={<ListPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
