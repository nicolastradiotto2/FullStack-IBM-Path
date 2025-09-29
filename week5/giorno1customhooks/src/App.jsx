import useLocalStorage from "./hooks/useLocalStorage";

function App() {
  const [nome, setNome] = useLocalStorage("nomeUtente", "");

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Ciao {nome ? nome : "ospite"} 👋</h1>
      <input
        type="text"
        placeholder="Scrivi il tuo nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
    </div>
  );
}

export default App;
