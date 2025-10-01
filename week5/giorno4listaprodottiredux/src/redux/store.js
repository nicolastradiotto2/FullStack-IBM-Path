import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./productsSlice";

// Lo store conterrà la lista prodotti
export const store = configureStore({
  reducer: {
    products: productsReducer,
  },
});
