import { useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [testo, setTesto] = useState("");

  const aggiungi = () => {
    const nuovo = { id: Date.now(), text: testo };
    setTodos([...todos, nuovo]);
    setTesto(""); // svuota input
  };

  const rimuovi = (id) => {
    setTodos(todos.filter((t) => t.id !== id));
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>To-Do List</h1>

      <input
        type="text"
        value={testo}
        onChange={(e) => setTesto(e.target.value)}
        placeholder="Scrivi un task..."
      />
      <button onClick={aggiungi}>Aggiungi</button>

      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            {t.text} <button onClick={() => rimuovi(t.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
