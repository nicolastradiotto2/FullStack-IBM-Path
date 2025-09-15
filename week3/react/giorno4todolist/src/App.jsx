import { useState } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    const newTodo = { id: Date.now(), text }; // id = timestamp, semplice
    setTodos([...todos, newTodo]);
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoInput onAdd={addTodo} />
      <TodoList items={todos} />
    </div>
  );
}

export default App;
