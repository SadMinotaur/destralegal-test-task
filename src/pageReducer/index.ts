import { useRouter } from "next/router";
import React from "react";
import { AllAction, ContextStateType, SetTokenAction, SetUserAction, StoreType } from "./types";

const initialState: StoreType = {
  userEmail: "",
  access_token: "",
  refresh_token: ""
};

const changeTokens = (state: StoreType, action: SetTokenAction): StoreType => ({
  ...state,
  access_token: action.payload.access_token,
  refresh_token: action.payload.refresh_token
});

const setUser = (state: StoreType, action: SetUserAction): StoreType => ({
  ...state,
  userEmail: action.payload.userEmail,
  access_token: action.payload.access_token,
  refresh_token: action.payload.refresh_token
});

const mainReducer = (state: StoreType, action: AllAction): StoreType => {
  switch (action.type) {
    case "SET_TOKENS":
      return changeTokens(state, action);
    case "SET_USER_DATA":
      return setUser(state, action);
    case "RESET_STORE":
      return initialState;
    default:
      return state;
  }
};

const appState = "app_state";
export const useStateReducer = (): NonNullable<ContextStateType> => {
  const roter = useRouter();
  const [state, reducer] = React.useReducer(mainReducer, initialState);

  React.useEffect(() => {
    const savedState = localStorage.getItem(appState);
    if (savedState) {
      const parsed: StoreType = JSON.parse(savedState);
      if (parsed.access_token && parsed.refresh_token) {
        reducer({ type: "SET_USER_DATA", payload: parsed });
      } else {
        roter.push({ pathname: "/login" });
      }
    } else {
      roter.push({ pathname: "/login" });
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem(appState, JSON.stringify(state));
  }, [state]);

  return { state, reducer };
};

export const AppContext = React.createContext<ContextStateType>(null);
export const useStateValue = () => React.useContext(AppContext);
