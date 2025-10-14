// script.js
// Collega il frontend al backend Express
const API = location.hostname.endsWith("vercel.app")
  ? "https://full-stack-ibm-path-6ezx.onrender.com/api/v1"  // backend online
  : "http://localhost:4000/api/v1"; // per test locale

let token = localStorage.getItem("token");

// Riferimenti HTML
const areaProdotti = document.getElementById("areaProdotti");
const lista = document.getElementById("lista");

// ------------------ REGISTRAZIONE ------------------
document.getElementById("btnRegister").onclick = async () => {
  const username = document.getElementById("regUser").value;
  const password = document.getElementById("regPass").value;

  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();
  alert(data.msg || data.error);
};

// ------------------ LOGIN ------------------
document.getElementById("btnLogin").onclick = async () => {
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  const res = await fetch(`${API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  });
  const data = await res.json();

  if (data.token) {
    localStorage.setItem("token", data.token);
    token = data.token;
    alert("Login effettuato ✅");
    mostraAreaProdotti();
  } else {
    alert(data.error);
  }
};

// ------------------ MOSTRA AREA PRODOTTI ------------------
function mostraAreaProdotti() {
  areaProdotti.style.display = "block";
  caricaProdotti();
}

// ------------------ CREA PRODOTTO ------------------
document.getElementById("btnAggiungi").onclick = async () => {
  const name = document.getElementById("nomeProd").value;
  const price = Number(document.getElementById("prezzoProd").value);

  const res = await fetch(`${API}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({ name, price })
  });

  const data = await res.json();
  alert(data.msg || data.error);
  caricaProdotti();
};

// ------------------ CARICA PRODOTTI ------------------
async function caricaProdotti() {
  const res = await fetch(`${API}/products`);
  const data = await res.json();

  lista.innerHTML = "";
  data.products.forEach(p => {
    const li = document.createElement("li");
    li.textContent = `${p.name} - €${p.price}`;
    const btnDel = document.createElement("button");
    btnDel.textContent = "Elimina";
    btnDel.onclick = () => eliminaProdotto(p._id);
    li.appendChild(btnDel);
    lista.appendChild(li);
  });
}

// ------------------ ELIMINA PRODOTTO ------------------
async function eliminaProdotto(id) {
  const res = await fetch(`${API}/products/${id}`, {
    method: "DELETE",
    headers: { "Authorization": `Bearer ${token}` }
  });
  const data = await res.json();
  alert(data.msg || data.error);
  caricaProdotti();
}

// ------------------ LOGOUT ------------------
document.getElementById("btnLogout").onclick = () => {
  localStorage.removeItem("token");
  token = null;
  areaProdotti.style.display = "none";
  alert("Logout effettuato ✅");
};
