import { refreshRequest } from "@src/api";
import { ContentResponse, TotalCountResponse } from "@src/api/types";

export const defaultLimit = 10;
export const defaultPage = 0;

interface Arguments<T> {
  access_token: string;
  refresh_token: string;
  mainRequest: (access_token: string) => Promise<T>;
  tokenRefresh: (refresh_token: string) => void;
}

export const refreshRequestWrapper = async <T extends ContentResponse | TotalCountResponse>({
  access_token,
  refresh_token,
  tokenRefresh,
  mainRequest
}: Arguments<T>) => {
  const requestResp: T = await mainRequest(access_token);
  if (requestResp.result) return requestResp;
  if (requestResp.event === "UNAUTHORIZED") {
    const refreshResult = await refreshRequest(refresh_token);
    const refreshedAccess = refreshResult.result?.access_token;
    if (refreshedAccess) {
      tokenRefresh(refreshedAccess);
      const requestResp: T = await mainRequest(refreshedAccess);
      return requestResp;
    }
  }
};
