import React from "react";

export enum PaginationStep {
  DESKTOP = 9,
  MOBILE = 2,
  FUNCTIONAL = 10
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
  type?: PaginationStep;
}

const usePagination = ({ limit, totalCount, page, type = PaginationStep.DESKTOP }: Arguments) => {
  const totalPages = Math.ceil(totalCount / limit) - 1;

  const pagination = React.useMemo<Readonly<PaginationButton[]>>(() => {
    const pagesSet = new Set<number>([0]);
    for (let index = page - type; index < totalPages && index < page + type; index++) {
      if (index > 0) pagesSet.add(index);
    }
    pagesSet.add(totalPages);

    const buttonArray = Array.from(pagesSet).map((value) => {
      let type: ButtonState;
      switch (value) {
        case page:
          type = ButtonState.SELECTED;
          break;
        default:
          type = ButtonState.ACTIVE;
          break;
      }
      return {
        type,
        value
      };
    });
    return buttonArray;
  }, [page, totalPages, type]);

  const leftFunctionButton = [
    {
      value: "<<",
      page: page - PaginationStep.FUNCTIONAL,
      type: page - PaginationStep.FUNCTIONAL >= 0 ? ButtonState.ACTIVE : ButtonState.DISABLED
    },
    {
      value: "<",
      page: page - 1,
      type: page - 1 >= 0 ? ButtonState.ACTIVE : ButtonState.DISABLED
    }
  ] as const;
  const rightFunctionButton = [
    {
      value: ">",
      page: page + 1,
      type: page + 1 <= totalPages ? ButtonState.ACTIVE : ButtonState.DISABLED
    },
    {
      value: ">>",
      page: page + PaginationStep.FUNCTIONAL,
      type:
        page + PaginationStep.FUNCTIONAL <= totalPages ? ButtonState.ACTIVE : ButtonState.DISABLED
    }
  ] as const;

  return {
    pagination,
    leftFunctionButton,
    rightFunctionButton
  };
};

export default usePagination;
