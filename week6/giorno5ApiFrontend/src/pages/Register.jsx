import { useState } from "react";
import axios from "axios";



function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/register", { username, password });
      setMessage(res.data.msg || "Registrazione completata ✅");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Errore durante la registrazione");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Registrazione</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text" placeholder="Username"
          value={username} onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <input
          type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">Registrati</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Register;
