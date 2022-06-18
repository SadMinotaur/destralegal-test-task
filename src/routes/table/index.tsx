import Head from "next/head";
import React from "react";
import Header from "@components/header";

export default function Table(): React.ReactElement {
  return (
    <>
      <Head>
        <title>Table</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main></main>
      <footer></footer>
    </>
  );
}
