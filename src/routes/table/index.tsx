import Header from "@components/header";
import Head from "next/head";
import React from "react";

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
