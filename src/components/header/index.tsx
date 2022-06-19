import { Button } from "@blueprintjs/core";
import { useStateValue } from "@src/pageReducer";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";
import User from "./user";

const cnb = className.bind(styles);

interface Props {
  onButtonClick?: () => void;
}

function Header({ onButtonClick }: Readonly<Props>): React.ReactElement {
  const stateValue = useStateValue();

  const showLogined = stateValue?.state.refresh_token && stateValue?.state.access_token;

  // const onUserClick = () => stateValue?.reducer({ type: "RESET_STORE" });

  return (
    <header className={cnb("headerWrapper")}>
      <h5 className={cnb("bp4-heading", "titleStyle")}>
        Тестовое
        <br />
        задание
      </h5>
      {showLogined ? (
        <User title={stateValue?.state.userEmail} />
      ) : (
        <Button
          className={cnb("buttonStyles")}
          text='Вход'
          intent='primary'
          onClick={onButtonClick}
        />
      )}
    </header>
  );
}

export default React.memo(Header);
