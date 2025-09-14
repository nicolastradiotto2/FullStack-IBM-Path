import { useState } from "react";

function App(){

  const [count, setCount] = useState(0);

  const incrementa = () => setCount(count+1);
  const decrementa = () => setCount(count-1);
  return(
     <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Contatore React</h1>
      <p>Valore attuale: {count}</p>

      <button onClick={incrementa}>+1</button>
      <button onClick={decrementa}>-1</button>
     </div>
  )
}
export default App;