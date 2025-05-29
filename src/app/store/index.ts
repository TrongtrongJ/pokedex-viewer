import { configureStore } from "@reduxjs/toolkit";
import pokedexReducer from "./pokedex.store";

export const store = configureStore({
  reducer: {
    pokedex: pokedexReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare({
      immutableCheck: {
        warnAfter: 128, // Warn if state takes longer than 128ms
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
