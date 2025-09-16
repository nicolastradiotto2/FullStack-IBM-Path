import {useState} from "react";

function App(){


  const [testo, setTesto] = useState(" ");

  function motTesto (){
    if(testo === " "){
      setTesto("Messaggio nascosto");
    }else{
      setTesto(" ");
    }

  }

    return(
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>{testo}</h1>
        <button onClick={motTesto}> Mostra testo</button>
      </div>

    )




}
export default App;