import { useDispatch } from "react-redux";
import { addToCart } from "./redux/cartSlice";

const prodottiFinti = [
  { id: 1, name: "Pianta Verde" },
  { id: 2, name: "Ficus" },
  { id: 3, name: "Cactus" },
];

function ProductList() {
  const dispatch = useDispatch();

  return (
    <div style={{ marginRight: "40px" }}>
      <h2>Lista Prodotti</h2>
      <ul>
        {prodottiFinti.map((p) => (
          <li key={p.id}>
            {p.name}{" "}
            <button onClick={() => dispatch(addToCart({id: Date.now(),name: p.name}))}>
              🛒 Aggiungi
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
