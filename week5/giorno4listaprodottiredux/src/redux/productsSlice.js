import { createSlice } from "@reduxjs/toolkit";

// Slice per i prodotti
const productsSlice = createSlice({
  name: "products",
  initialState: [], // partiamo con lista vuota
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload); // aggiunge un nuovo prodotto
    },
    removeProduct: (state, action) => {
      return state.filter((p) => p.id !== action.payload); 
      // rimuove il prodotto con id specifico
    }
  }
});

// Esportiamo le azioni
export const { addProduct, removeProduct } = productsSlice.actions;

// Esportiamo il reducer per lo store
export default productsSlice.reducer;
