import React from "react";
import { Action, LanguageActions, StateType, StoreType } from "./types";

const changeLanguage = (state: StoreType, action: LanguageActions): StoreType => ({
  ...state,
  lang: action.payload
});

export const mainReducer = (state: StoreType, action: Action): StoreType => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return changeLanguage(state, action);
    default:
      return state;
  }
};

export const initialState: StoreType = {
  lang: "ru"
};
export const AppContext = React.createContext<StateType>(null);
