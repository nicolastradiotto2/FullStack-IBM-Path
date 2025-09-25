import useLocalStorage from "./useLocalStorage";

function App() {
  const [nome, setNome] = useLocalStorage("nome", "");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ciao {nome || "ospite"} 👋</h1>
      <input
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Scrivi il tuo nome"
        style={{ padding: "10px", borderRadius: "8px", border: "1px solid #ccc" }}
      />
    </div>
  );
}

export default App;
