import { TokenPair } from "@src/pageReducer/types";

interface BaseRequestResponse {
  status: number;
  success: boolean;
  event: string;
  result?: unknown;
}

export interface LoginRequestBody {
  email: string;
  password: string;
}

export interface LoginSuccessBody extends BaseRequestResponse {
  result?: TokenPair;
}

export interface ContentRequestParams {
  page?: number;
  limit?: number;
}

export interface CardType {
  _id: string;
  name: string;
  category: string;
}
export interface ContentResponse extends BaseRequestResponse {
  result?: CardType[];
}

export interface RefreshAccessResponse extends BaseRequestResponse {
  result?: {
    access_token: string;
  };
}

export interface TotalCountResponse extends BaseRequestResponse {
  result?: {
    count: number;
  };
}
