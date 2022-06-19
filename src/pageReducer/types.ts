export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export interface SetUserPayload extends TokenPair {
  userEmail: string;
}

export interface SetTokenAction {
  type: "REFRESH_TOKEN";
  payload: string;
}
export interface SetUserAction {
  type: "SET_USER_DATA";
  payload: SetUserPayload;
}
export interface ResetStoreAction {
  type: "RESET_STORE";
}
export type AllAction = SetTokenAction | SetUserAction | ResetStoreAction;

export type StoreType = SetUserPayload;

export type ContextStateType = {
  state: StoreType;
  reducer: React.Dispatch<AllAction>;
} | null;
