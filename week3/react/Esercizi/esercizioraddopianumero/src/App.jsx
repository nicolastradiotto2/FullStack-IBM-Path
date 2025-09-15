import { useState } from "react";

function App(){
  const numBase = 10;
  const [numero, setNumero] = useState(numBase);

  const raddoppia = () => setNumero(numero*2);
  const azzera = () => setNumero(numBase);

  return(
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Numero base : {numBase}</h1>
      <p>Valore attuale : {numero}</p>

      <button onClick={raddoppia}>Raddoppia il numero</button>
      <button onClick={azzera}>Riporta il valore al numero di partenza</button>
    </div>

  )
}
export default App;