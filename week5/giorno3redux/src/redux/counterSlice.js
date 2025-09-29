import { createSlice } from "@reduxjs/toolkit";

// Qui definiamo il nostro contatore
const counterSlice = createSlice({
  name: "counter",                // nome del pezzo di stato
  initialState: { value: 0 },     // parte da 0
  reducers: {
    increment: (state) => { state.value += 1 },  // aumenta di 1
    decrement: (state) => { state.value -= 1 },  // diminuisce di 1
    reset: (state) => { state.value = 0 },       // torna a 0
  }
});

// Esportiamo le "azioni" → i bottoni che useremo in App
export const { increment, decrement, reset } = counterSlice.actions;

// Esportiamo il reducer per collegarlo allo store
export default counterSlice.reducer;
