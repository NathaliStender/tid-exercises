import "./App.css";
import ToDoList from "./ToDoList.jsx";
import ToDoPanel from "./ToDoPanel.jsx";

function App() {
  const annasToDoList = [
    { id: 1, text: "Call the landlord" },
    { id: 2, text: "Book the dentist" },
  ];
  const konstantinaToDoList = [
    { id: 1, text: "Buy milk" },
    { id: 2, text: "Book the dentist" },
  ];

  return (
    <>
      <ToDoList firstName="Anna" todos={annasToDoList} />
      <ToDoList firstName="Konstantina" todos={konstantinaToDoList} />
    </>
  );
}

export default App;
