import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header titolo="La mia prima app React" sottotitolo="Creata con Vite 🚀" />
      <p>Benvenuto Nicola, ora i componenti comunicano con le props.</p>
      <Footer autore="Nicola Stradiotto" />
    </div>
  );
}

export default App;
