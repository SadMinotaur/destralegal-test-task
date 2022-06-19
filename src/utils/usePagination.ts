import React from "react";

export enum PaginationType {
  DESKTOP = 10,
  MOBILE = 5
}

export enum ButtonState {
  DISABLED = "DISABLED",
  ACTIVE = "ACTIVE",
  SELECTED = "SELECTED"
}

interface PaginationButton {
  type: ButtonState;
  value: number;
}

interface Arguments {
  totalCount: number;
  limit: number;
  page: number;
  type?: PaginationType;
}

const usePagination = ({
  limit,
  totalCount,
  page,
  type = PaginationType.DESKTOP
}: Arguments): PaginationButton[] => {
  const pagination = React.useMemo<PaginationButton[]>(() => {
    const totalPages = Math.ceil(totalCount / limit);
    const pagesSet = new Set<number>([0]);
    for (let index = page - type; index < totalPages && index < page + type; index++) {
      if (index > 0) pagesSet.add(index);
    }
    pagesSet.add(totalPages);
    const buttonArray = Array.from(pagesSet).map((item) => {
      let type: ButtonState;
      switch (item) {
        case page:
          type = ButtonState.SELECTED;
          break;
        default:
          type = ButtonState.ACTIVE;
          break;
      }
      return {
        type,
        value: item
      };
    });

    return buttonArray;
  }, [limit, page, totalCount, type]);

  return pagination;
};

export default usePagination;
