import "@blueprintjs/core/lib/css/blueprint.css";
import type { AppProps } from "next/app";
import React from "react";
import "the-new-css-reset/css/reset.css";
import { AppContext, initialState, mainReducer } from "../src/pageReducer";
import "../src/styles/globals.scss";

export default function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const [state, reducer] = React.useReducer(mainReducer, {
    ...initialState,
    lang: "ru"
  });

  React.useEffect(() => {
    // const lang = localStorage.getItem('lang');
    // if (lang && lang !== state.lang) {
    // }
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        reducer
      }}
    >
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
