import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#eee" }}>
      <Link to="/register" style={{ marginRight: 10 }}>Registrati</Link>
      <Link to="/" style={{ marginRight: 10 }}>Login</Link>
      <Link to="/profile">Profilo</Link>
    </nav>
  );
}

export default Navbar;
