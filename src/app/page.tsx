"use client";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "./store/index";
import ErrorBoundery from "./components/ErrorBoundery";
import PokedexPage from "./components/pokemon/PokedexPage";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundery>
      <Provider store={store}>
        <PokedexPage />
      </Provider>
    </ErrorBoundery>
  );
}
