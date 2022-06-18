import Header from "@components/header";
import ModalLogin from "@components/modal-login";
import Head from "next/head";
import React from "react";

export default function Login(): React.ReactElement {
  const [modalState, setModalState] = React.useState<boolean>(false);

  const openModal = (): void => setModalState(true);
  const onModalClose = (): void => setModalState(false);

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header onEnterClick={openModal} />
      <main>
        <ModalLogin isOpen={modalState} onClose={onModalClose} />
      </main>
      <footer></footer>
    </>
  );
}
