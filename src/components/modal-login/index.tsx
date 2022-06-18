import { Button, Dialog, DialogProps } from "@blueprintjs/core";
// import { leadingCallPromise } from "@src/utils";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";
import { handleChangeInput } from "./utils";

const cnb = className.bind(styles);
// const lead = leadingCallPromise();

interface Props extends DialogProps {
  buttonButtonText?: string;
  buttonButtonClassname?: string;
  inputAdditionalAttributes?: React.InputHTMLAttributes<HTMLInputElement>;
}

export default function ModalLogin({
  inputAdditionalAttributes,
  buttonButtonClassname,
  buttonButtonText = "Войти",
  title = "Вход",
  isCloseButtonShown = true,
  ...props
}: Readonly<Props>): React.ReactElement {
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [loaderButton, setLoaderButton] = React.useState<boolean>(false);

  const formSubmiting = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
