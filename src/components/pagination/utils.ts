import { ButtonState, PaginationStep } from "@src/utils/usePagination";

export const ifDisabled = (type: ButtonState): boolean => type === ButtonState.DISABLED;
export const handleResize =
  (setPaginationType: React.Dispatch<React.SetStateAction<PaginationStep>>) => () => {
    if (window.innerWidth < 400) {
      setPaginationType(PaginationStep.MOBILE);
    } else {
      setPaginationType(PaginationStep.DESKTOP);
    }
  };
