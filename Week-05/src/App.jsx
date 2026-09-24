import "./App.css";
import ToDoList from "./components/ToDoList.jsx";
import { useState } from "react";
import AuthPage from "./Pages/AuthPage.jsx";

import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com/"; // your PARSE_SERVER_URL
Parse.initialize(
  "IbkJawJSPMyFgsCA2L0pX8m68E2KyPFyFweSM5eU",
  "yfi1elVE4aGLHhBPxUSfoqNHUaLUWPkp7MYmDFY2",
);

function App() {
  const [user, setUser] = useState(Parse.User.current());

  async function handleLogout() {
    try {
      await Parse.User.logOut();
      setUser(null);
    } catch (error) {
      alert(error);
    }
  }

  function handleAuthenticated(loggedInUser) {
    setUser(loggedInUser);
  }

  if (!user) {
    return <AuthPage onAuthenticated={handleAuthenticated} />;
  }

  return (
    <>
      <ToDoList firstName={user.get("username")} />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}

export default App;
