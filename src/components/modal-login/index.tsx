import { Button, Dialog, DialogProps } from "@blueprintjs/core";
import { LoginRequestBody } from "@src/api/types";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";
import { handleChangeInput } from "./utils";

const cnb = className.bind(styles);

interface Props extends DialogProps {
  buttonButtonText?: string;
  buttonButtonClassname?: string;
  inputAdditionalAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
  formRequest?: (body: LoginRequestBody) => Promise<void>;
  error?: string;
}

export default function ModalLogin({
  formRequest,
  inputAdditionalAttributes,
  buttonButtonClassname,
  buttonButtonText = "Войти",
  title = "Вход",
  isCloseButtonShown = true,
  ...props
}: Readonly<Props>): React.ReactElement {
  const [loaderButton, setLoaderButton] = React.useState<boolean>(false);
  const [password, setPassword] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");

  const formSubmiting = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (formRequest) {
      setLoaderButton(true);
      formRequest({ email, password }).finally(() => setLoaderButton(false));
    }
  };

  return (
    <Dialog isCloseButtonShown={isCloseButtonShown} title={title} {...props}>
      <form className={cnb("dialogBody")} onSubmit={formSubmiting}>
        <div className={cnb("inputsGroup")}>
          <input
            required
            type='email'
            name='email'
            className={cnb("bp4-input", "bp4-round")}
            placeholder='email'
            value={email}
            onChange={handleChangeInput(setEmail)}
            autoComplete='on'
            {...inputAdditionalAttributes}
          />
          <input
            autoComplete='on'
            required
            name='password'
            type='password'
            className={cnb("bp4-input", "bp4-round")}
            placeholder='password'
            value={password}
            onChange={handleChangeInput(setPassword)}
            {...inputAdditionalAttributes}
          />
        </div>
        <Button
          type='submit'
          text={buttonButtonText}
          loading={loaderButton}
          className={cnb("buttonFooter", "bp4-minimal", "bp4-fill", buttonButtonClassname)}
        />
      </form>
    </Dialog>
  );
}
