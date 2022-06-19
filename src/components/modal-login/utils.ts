import React from "react";

export const handleChangeInput =
  (setState: React.Dispatch<React.SetStateAction<string>>) =>
  (e: React.ChangeEvent<HTMLInputElement>): void =>
    setState(e.currentTarget.value);
