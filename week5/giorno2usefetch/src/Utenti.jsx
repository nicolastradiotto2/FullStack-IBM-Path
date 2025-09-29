import useFetch from "./hooks/useFetch";

function Utenti() {
  const { dati, loading, errore } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <p>Caricamento in corso...</p>;
  if (errore) return <p>Errore: {errore}</p>;

  return (
    <ul>
      {dati.map((user) => (
        <li key={user.id}>
          {user.name} – {user.email}
        </li>
      ))}
    </ul>
  );
}

export default Utenti;
