// Selezioni elementi
const input = document.querySelector("#taskInput");
const addBtn = document.querySelector("#addTask");
const list = document.querySelector("#taskList");

// Funzione per aggiungere un task
function addTask() {
  if (input.value.trim() === "") return; // Evita task vuoti

  // Creiamo <li>
  const li = document.createElement("li");
  li.textContent = input.value;

  // Bottone "completa"
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
  });

  // Bottone "elimina"
  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";
  delBtn.addEventListener("click", () => {
    li.remove();
  });

  li.appendChild(delBtn);
  list.appendChild(li);

  // Pulisci input
  input.value = "";
}

// Eventi
addBtn.addEventListener("click", addTask);

// Aggiungere con "Enter"
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});
