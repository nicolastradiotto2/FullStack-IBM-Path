import { useState } from "react";

function TodoInput({ onAdd }) {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);       // passa il testo al padre
    setText("");       // svuota l’input
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Scrivi un task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Aggiungi</button>
    </form>
  );
}

export default TodoInput;
