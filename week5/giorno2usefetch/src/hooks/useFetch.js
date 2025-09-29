import { useState, useEffect } from "react";

// Hook personalizzato per chiamate API
function useFetch(url) {
  const [dati, setDati] = useState(null);       // qui memorizziamo la risposta
  const [loading, setLoading] = useState(true); // stato di caricamento
  const [errore, setErrore] = useState(null);   // eventuali errori

  useEffect(() => {
    setLoading(true); // ogni volta che cambia url, ricominciamo da loading
    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error("Errore nella fetch 🚨");
        return res.json();
      })
      .then((data) => setDati(data))    // se va bene → salviamo i dati
      .catch((err) => setErrore(err.message)) // se c’è errore → lo salviamo
      .finally(() => setLoading(false)); // in ogni caso → smettiamo di caricare
  }, [url]); // effetto dipende da url → se cambia url rifacciamo la fetch

  return { dati, loading, errore }; // ritorniamo un oggetto
}

export default useFetch;
