import "./App.css";
import ToDoList from "./ToDoList.jsx";
import { useState } from "react";

import Parse from "parse";

Parse.serverURL = "https://parseapi.back4app.com/"; // your PARSE_SERVER_URL
Parse.initialize(
  "IbkJawJSPMyFgsCA2L0pX8m68E2KyPFyFweSM5eU",
  "yfi1elVE4aGLHhBPxUSfoqNHUaLUWPkp7MYmDFY2",
);

function App() {
  const annasToDoList = ["Call the landlord", "Book the dentist"];

  const [name, setName] = useState("Anna");

  return (
    <>
      <div className="main-inner">
        <ToDoList firstName={name} />
      </div>
    </>
  );
}

export default App;
