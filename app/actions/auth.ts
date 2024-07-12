import { FetchMethods, getFetchConfig } from "~/utils/fetch";

export const login = async (body: { email: string; password: string }) => {
  const url = `${process.env.VITE_PUBLIC_API_URL}/api/login`;
  const resp = await fetch(url, {
    ...getFetchConfig(FetchMethods.POST, undefined, body),
    body: JSON.stringify(body),
  });
  const data = await resp.json();
  return data;
};

export const logout = async (token: string) => {
  const url = `${process.env.VITE_PUBLIC_API_URL}/api/logout`;
  const resp = await fetch(url, {
    ...getFetchConfig(FetchMethods.POST, token),
  });
  const data = await resp.json();
  return data;
};
