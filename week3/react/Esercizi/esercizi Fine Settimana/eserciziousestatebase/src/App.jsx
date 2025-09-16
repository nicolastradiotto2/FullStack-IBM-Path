import {useState} from "react";

function App(){

    const [numero, setNumero] = useState(0);

    const Aumenta = () => setNumero(numero+1);
    const Diminusce = () => setNumero(numero-1);

    return(
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h1>Numero di partenza 0</h1>
            <p>Numero attuale: {numero}</p>

            <button onClick={Aumenta}>Aumenta il numero di 1</button>
            <button onClick={Diminusce}>Diminuisci il numero di 1</button>

        </div>


    )

}
export default App;