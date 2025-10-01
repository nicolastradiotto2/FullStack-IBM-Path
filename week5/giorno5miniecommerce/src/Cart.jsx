import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "./redux/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Carrello</h2>
      {cart.length === 0 ? (
        <p>Il carrello è vuoto 🛒</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.name}{" "}
              <button onClick={() => dispatch(removeFromCart(item.id))}>
                ❌ Rimuovi
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Cart;
