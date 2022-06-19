import { ContentRequestParams, LoginRequestBody, LoginSuccessBody } from "./types";

const baseUrl = "http://api.interview.michaelknyazev.com/";

const getJson = (resp: Response) => resp.json();

export const loginRequest = (loginData: LoginRequestBody) =>
  fetch(baseUrl + "api/v1/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(loginData)
  }).then<LoginSuccessBody>(getJson);

export const refreshRequest = (token: string) =>
  fetch(baseUrl + "api/v1/refresh", {
    method: "POST",
    headers: { "x-refresh-token": token }
  }).then(getJson);

export const contentRequest = (
  token: string,
  params: ContentRequestParams = Object.create(null)
) => {
  const query = new URLSearchParams(Object.entries(params));
  return fetch(baseUrl + "api/v1/content?" + query.toString(), {
    method: "GET",
    headers: { "x-access-token": token }
  }).then(getJson);
};

export const totalCountRequest = (token: string) =>
  fetch(baseUrl + "api/v1/content/total", {
    method: "GET",
    headers: { "x-access-token": token }
  }).then(getJson);
