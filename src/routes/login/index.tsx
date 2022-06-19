import { Intent, IToastProps, Toaster } from "@blueprintjs/core";
import Header from "@components/header";
import ModalLogin from "@components/modal-login";
import { loginRequest } from "@src/api";
import { LoginRequestBody } from "@src/api/types";
import { useStateValue } from "@src/pageReducer";
import Head from "next/head";
import { useRouter } from "next/router";
import React from "react";

const errorToast: IToastProps = {
  message: "Неверный логин или пароль",
  icon: "warning-sign",
  intent: Intent.DANGER
} as const;

export default function Login(): React.ReactElement {
  const router = useRouter();
  const stateValue = useStateValue();
  const [modalState, setModalState] = React.useState<boolean>(false);

  const openModal = (): void => setModalState(true);
  const onModalClose = (): void => setModalState(false);

  const toaster = React.useRef<Toaster>(null);

  const loginRequests = (data: LoginRequestBody): Promise<void> =>
    loginRequest(data)
      .then((e) => {
        if (e.result) {
          onModalClose();
          stateValue?.reducer({
            type: "SET_USER_DATA",
            payload: { ...e.result, userEmail: data.email }
          });
          router.push({ pathname: "/table" });
        } else {
          toaster.current?.show(errorToast);
        }
      })
      .catch(() => {
        toaster.current?.show(errorToast);
      });

  return (
    <>
      <Head>
        <title>Login</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header onButtonClick={openModal} />
      <main>
        <ModalLogin isOpen={modalState} onClose={onModalClose} formRequest={loginRequests} />
      </main>
      <Toaster ref={toaster} />
    </>
  );
}
