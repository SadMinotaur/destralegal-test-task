import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";

const cnb = className.bind(styles);

interface Props {
  title?: React.ReactNode;
  onClick?: () => void;
}

export default function User({ title, onClick }: Readonly<Props>): React.ReactElement {
  return (
    <div className={cnb("userStyles")} onClick={onClick}>
      <h6 className={cnb("bp4-heading", "titleStyle")}>{title}</h6>
      <span className={cnb("avatarIcon")} />
    </div>
  );
}
