import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [data, setData] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/auth/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(res.data);
      } catch (err) {
        setData({ msg: "Accesso negato ❌" });
      }
    };

    fetchProfile();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Area Riservata</h2>
      {data ? (
        <div>
          <p>{data.msg}</p>
          {data.user && <p>Utente: {data.user}</p>}
        </div>
      ) : (
        <p>Caricamento...</p>
      )}
    </div>
  );
}

export default Profile;
