export interface LanguageActions {
  type: "CHANGE_LANGUAGE";
  payload: string;
}
export type Action = LanguageActions;

export interface StoreType {
  lang: string;
}
export type StateType = {
  state: StoreType;
  reducer: React.Dispatch<Action>;
} | null;
