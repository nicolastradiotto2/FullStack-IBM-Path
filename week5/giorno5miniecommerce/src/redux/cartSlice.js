import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [], // il carrello parte vuoto
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload); // aggiunge il prodotto al carrello
    },
    removeFromCart: (state, action) => {
      return state.filter((item) => item.id !== action.payload); 
      // rimuove il prodotto con quell’id
    }
  }
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
