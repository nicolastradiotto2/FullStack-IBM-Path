import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/auth/login", { username, password });
      localStorage.setItem("token", res.data.token);
      setMessage("Login riuscito ✅");
      navigate("/profile");
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.msg || "Errore durante il login");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
        <button type="submit">Accedi</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default Login;
