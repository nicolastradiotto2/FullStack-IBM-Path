import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";

// Qui creiamo il "magazzino centrale" dell'app
export const store = configureStore({
  reducer: {
    counter: counterReducer, // aggiungiamo il nostro contatore
  },
});
