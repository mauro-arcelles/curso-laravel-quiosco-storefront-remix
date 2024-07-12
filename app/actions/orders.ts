import { FetchMethods, getFetchConfig } from "~/utils/fetch";

export const createOrder = async (
  body: any,
  token: string
): Promise<string> => {
  const url = `${process.env.VITE_PUBLIC_API_URL}/api/pedidos`;
  const resp = await fetch(url, {
    ...getFetchConfig(FetchMethods.POST, token, body),
  });
  const data = await resp.json();
  return data;
};
