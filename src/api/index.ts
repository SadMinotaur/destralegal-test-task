import * as T from "./types";

const baseUrl = "http://api.interview.michaelknyazev.com/";

const getJson = (resp: Response) => resp.json();

export const loginRequest = (loginData: T.LoginRequestBody) =>
  fetch(baseUrl + "api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData)
  }).then<T.LoginSuccessBody>(getJson);

export const refreshRequest = (refreshToken: string) =>
  fetch(baseUrl + "api/v1/refresh", {
    method: "POST",
    headers: { "x-refresh-token": refreshToken }
  }).then<T.RefreshAccessResponse>(getJson);

export const contentRequest = async (
  token: string,
  params: T.ContentRequestParams = Object.create(null)
): Promise<T.ContentResponse> => {
  const query = new URLSearchParams(Object.entries(params));
  const resp = await fetch(baseUrl + "api/v1/content?" + query.toString(), {
    method: "GET",
    headers: { "x-access-token": token }
  });
  return getJson(resp);
};

export const totalCountRequest = (token: string) =>
  fetch(baseUrl + "api/v1/content/total", {
    method: "GET",
    headers: { "x-access-token": token }
  }).then<T.TotalCountResponse>(getJson);
