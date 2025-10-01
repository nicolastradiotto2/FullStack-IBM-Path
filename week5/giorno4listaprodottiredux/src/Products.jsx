import { useSelector, useDispatch } from "react-redux";
import { addProduct, removeProduct } from "./redux/productsSlice";

function Products() {
  const products = useSelector((state) => state.products); // leggo la lista
  const dispatch = useDispatch();

  // Aggiunge un prodotto "finto"
  const handleAdd = () => {
    const nuovo = { id: crypto.randomUUID(), name: "Prodotto " + Date.now() };
    dispatch(addProduct(nuovo));
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Lista Prodotti</h2>
      <button onClick={handleAdd}>➕ Aggiungi prodotto</button>

      {products.length === 0 ? (
        <p>Nessun prodotto ancora 📦</p>
      ) : (
        <ul>
          {products.map((p) => (
            <li key={p.id}>
              {p.name}
              <button onClick={() => dispatch(removeProduct(p.id))}>
                ❌ Rimuovi
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Products;
