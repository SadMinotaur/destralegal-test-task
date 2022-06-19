import { useRouter } from "next/router";
import React from "react";
import { AllAction, ContextStateType, SetTokenAction, SetUserAction, StoreType } from "./types";

const appState = "app_state";
const initialState: StoreType = {
  userEmail: "",
  access_token: "",
  refresh_token: ""
};

const refreshToken = (state: StoreType, action: SetTokenAction): StoreType => {
  const nextState = {
    ...state,
    access_token: action.payload
  } as const;
  localStorage.setItem(appState, JSON.stringify(nextState));
  return nextState;
};

const setUser = (state: StoreType, action: SetUserAction): StoreType => {
  const nextState = {
    ...state,
    userEmail: action.payload.userEmail,
    access_token: action.payload.access_token,
    refresh_token: action.payload.refresh_token
  } as const;
  localStorage.setItem(appState, JSON.stringify(nextState));
  return nextState;
};

const resetStote = (): StoreType => {
  localStorage.setItem(appState, JSON.stringify(initialState));
  return initialState;
};

const mainReducer = (state: StoreType, action: AllAction): StoreType => {
  switch (action.type) {
    case "REFRESH_TOKEN":
      return refreshToken(state, action);
    case "SET_USER_DATA":
      return setUser(state, action);
    case "RESET_STORE":
      return resetStote();
    default:
      return state;
  }
};

export const useStateReducer = (): NonNullable<ContextStateType> => {
  const roter = useRouter();
  const [state, reducer] = React.useReducer(mainReducer, initialState);

  React.useEffect(() => {
    const savedState = localStorage.getItem(appState);
    if (!savedState) {
      roter.push({ pathname: "/login" });
      return;
    }
    const parsedState: StoreType = JSON.parse(savedState);
    if (Object.values(parsedState).includes("")) {
      roter.push({ pathname: "/login" });
      return;
    }
    reducer({ type: "SET_USER_DATA", payload: parsedState });
  }, []);

  return { state, reducer };
};
export const AppContext = React.createContext<ContextStateType>(null);
export const useStateValue = () => React.useContext(AppContext);
