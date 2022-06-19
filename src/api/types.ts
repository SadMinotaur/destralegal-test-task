import { TokenPair } from "@src/pageReducer/types";

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginSuccessBody {
  status: number;
  success: boolean;
  event: string;
  result?: TokenPair;
}

export interface ContentRequestParams {
  page?: number;
  limit?: number;
}
