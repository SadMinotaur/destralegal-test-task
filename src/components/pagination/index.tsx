import { Button, Intent } from "@blueprintjs/core";
import usePagination, { ButtonState, PaginationStep } from "@src/utils/usePagination";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";
import { handleResize, ifDisabled } from "./utils";

const cnb = className.bind(styles);

interface Props {
  setPage?: (page: number) => void;
  totalCount: number;
  limit: number;
  page: number;
}

export default function Pagination({
  totalCount,
  limit,
  page,
  setPage
}: Readonly<Props>): React.ReactElement {
  const [type, setPaginationType] = React.useState(PaginationStep.DESKTOP);

  const { pagination, leftFunctionButton, rightFunctionButton } = usePagination({
    limit,
    page,
    totalCount,
    type
  });

  const onButtonClick = (page: number) => (): void => setPage?.(page);

  React.useEffect(() => {
    window.addEventListener("resize", handleResize(setPaginationType));
    return () => window.removeEventListener("resize", handleResize(setPaginationType));
  }, []);

  return (
    <footer className={cnb("footerElements")}>
      <label className={cnb("totalCount")}>Всего: {totalCount}</label>
      <div className={cnb("buttonsRow")}>
        {leftFunctionButton.map((item) => (
          <Button
            onClick={onButtonClick(item.page)}
            key={item.value}
            text={item.value}
            disabled={ifDisabled(item.type)}
          />
        ))}
        {pagination.map((item) => (
          <Button
            onClick={onButtonClick(item.value)}
            key={item.value}
            text={item.value + 1}
            intent={item.type === ButtonState.SELECTED ? Intent.SUCCESS : Intent.NONE}
            disabled={ifDisabled(item.type)}
          />
        ))}
        {rightFunctionButton.map((item) => (
          <Button
            onClick={onButtonClick(item.page)}
            key={item.value}
            text={item.value}
            disabled={ifDisabled(item.type)}
          />
        ))}
      </div>
    </footer>
  );
}
