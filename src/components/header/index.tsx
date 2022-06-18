import { Button } from "@blueprintjs/core";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";

const cnb = className.bind(styles);

interface Props {
  onEnterClick?: () => void;
}

export default function Header({ onEnterClick }: Readonly<Props>): React.ReactElement {
  return (
    <header className={cnb("headerWrapper")}>
      <h5 className={cnb("bp4-heading", "leftText")}>
        Тестовое
        <br />
        задание
      </h5>
      <Button className={cnb("buttonStyles")} text='Вход' intent='primary' onClick={onEnterClick} />
    </header>
  );
}
