import { useState } from "react";

// Custom hook che salva e legge dal localStorage
function useLocalStorage(key, initialValue) {
  // Stato iniziale: se c'è qualcosa nel localStorage lo uso,
  // altrimenti parto dal valore di default (initialValue)
  const [storedValue, setStoredValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  // Funzione che aggiorna sia lo stato di React che il localStorage
  const setValue = (value) => {
    setStoredValue(value);
    localStorage.setItem(key, JSON.stringify(value));
  };

  // Ritorno lo stato e la funzione di aggiornamento, come useState
  return [storedValue, setValue];
}

export default useLocalStorage;
