import { Button, Intent } from "@blueprintjs/core";
import { ContentRequestParams } from "@src/api/types";
import usePagination, { ButtonState, PaginationStep } from "@src/utils/usePagination";
import className from "classnames/bind";
import React from "react";
import styles from "./styles.module.scss";
import { handleResize, ifDisabled } from "./utils";

const cnb = className.bind(styles);

interface Props {
  setQuery?: React.Dispatch<React.SetStateAction<ContentRequestParams>>;
  totalCount: number;
  limit: number;
  page: number;
}

export default function Pagination({
  totalCount,
  limit,
  page,
  setQuery
}: Readonly<Props>): React.ReactElement {
  const [paginationType, setPaginationType] = React.useState(PaginationStep.DESKTOP);

  const {
    pagination,
    leftFunctionButton: leftFuntionButton,
    rightFunctionButton: rightFuntionButton
  } = usePagination({
    limit,
    page,
    totalCount,
    type: paginationType
  });

  const setPage = (page: number) => (): void => setQuery?.((state) => ({ ...state, page }));

  React.useEffect(() => {
    window.addEventListener("resize", handleResize(setPaginationType));
    return () => window.removeEventListener("resize", handleResize(setPaginationType));
  }, []);

  return (
    <footer className={cnb("footerElements")}>
      <label className={cnb("totalCount")}>Всего: {totalCount}</label>
      <div className={cnb("buttonsRow")}>
        {leftFuntionButton.map((item) => (
          <Button
            onClick={setPage(item.page)}
            key={item.value}
            text={item.value}
            disabled={ifDisabled(item.type)}
          />
        ))}
        {pagination.map((item) => (
          <Button
            onClick={setPage(item.value)}
            key={item.value}
            text={item.value + 1}
            intent={item.type === ButtonState.SELECTED ? Intent.SUCCESS : Intent.NONE}
            disabled={ifDisabled(item.type)}
          />
        ))}
        {rightFuntionButton.map((item) => (
          <Button
            onClick={setPage(item.page)}
            key={item.value}
            text={item.value}
            disabled={ifDisabled(item.type)}
          />
        ))}
      </div>
    </footer>
  );
}
