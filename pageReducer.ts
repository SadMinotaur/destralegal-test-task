import React from "react";

export const mainReducer = (state: StoreType, action: Action): StoreType => {
  switch (action.type) {
    case "CHANGE_LANGUAGE":
      return changeLanguage(state, action);
    default:
      return state;
  }
};

export const changeLanguage = (
  state: StoreType,
  action: LanguageActions
): StoreType => {
  return {
    ...state,
    lang: action.payload,
  };
};

export type LanguageActions = { type: "CHANGE_LANGUAGE"; payload: string };
export type Action = LanguageActions;

export type StateType = { state: StoreType; reducer: React.Dispatch<Action> };
export type StoreType = { lang: string };

export const initialState: StoreType = {
  lang: "ru",
};
export const AppContext = React.createContext<StateType>(null!);
