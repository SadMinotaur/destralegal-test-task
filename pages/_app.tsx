import "@blueprintjs/core/lib/css/blueprint.css";
import { AppContext, useStateReducer } from "@src/pageReducer";
import "@src/styles/globals.scss";
import type { AppProps } from "next/app";
import React from "react";
import "the-new-css-reset/css/reset.css";

export default function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  const stateReducer = useStateReducer();

  return (
    <AppContext.Provider value={stateReducer}>
      <Component {...pageProps} />
    </AppContext.Provider>
  );
}
