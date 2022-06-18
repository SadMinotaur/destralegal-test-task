import { Button } from "@blueprintjs/core";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";

const cnb = className.bind(styles);

export default function Header(): React.ReactElement {
  return (
    <header className={cnb("headerWrapper")}>
      <h5 className={cnb("bp4-heading", "leftText")}>
        Тестовое
        <br />
        задание
      </h5>
      <Button className={cnb("buttonStyles")} text='Вход' intent='primary' />
    </header>
  );
}
