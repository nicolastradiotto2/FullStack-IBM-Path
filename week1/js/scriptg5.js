// Funzione per generare un colore casuale
function coloreRandom() {
  let rosso = Math.floor(Math.random() * 256);
  let verde = Math.floor(Math.random() * 256);
  let blu = Math.floor(Math.random() * 256);
  return `rgb(${rosso}, ${verde}, ${blu})`;
}

// Seleziona il bottone
let bottone = document.querySelector("#cambiaColore");

// Evento click sul bottone
bottone.addEventListener("click", () => {
  document.body.style.backgroundColor = coloreRandom();
});
