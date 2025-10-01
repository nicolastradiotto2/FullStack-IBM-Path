import ProductList from "./ProductList";
import Cart from "./Cart";


function App() {
  return (
    <div style={{ display: "flex", padding: "20px" }}>
      <ProductList></ProductList>
      <Cart></Cart>
    </div>
  )
}

export default App;