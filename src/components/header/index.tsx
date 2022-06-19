import { Button } from "@blueprintjs/core";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";
import User from "./user";

const cnb = className.bind(styles);

interface Props {
  onButtonClick?: () => void;
  onUserClick?: () => void;
  username?: string;
}

export default function Header({
  onButtonClick,
  username,
  onUserClick
}: Readonly<Props>): React.ReactElement {
  return (
    <header className={cnb("headerWrapper")}>
      <h5 className={cnb("bp4-heading", "titleStyle")}>
        Тестовое
        <br />
        задание
      </h5>
      {username ? (
        <User title={username} onClick={onUserClick} />
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
