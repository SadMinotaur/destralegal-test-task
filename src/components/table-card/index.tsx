import { Card, CardProps, Elevation } from "@blueprintjs/core";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";

const cnb = className.bind(styles);

interface Props extends Omit<CardProps, "elevation"> {
  name?: string;
  category?: string;
}

export default function TableCard({
  name,
  category,
  ...props
}: Readonly<Props>): React.ReactElement {
  return (
    <Card elevation={Elevation.TWO} className={cnb("card")} {...props}>
      <h5 className={cnb("bp4-heading")}>{name}</h5>
      <p>{category}</p>
    </Card>
  );
}
