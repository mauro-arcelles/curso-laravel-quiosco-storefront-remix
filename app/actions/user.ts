import { FetchMethods, getFetchConfig } from "~/utils/fetch";

export const getUser = async (token: string) => {
  try {
    const url = `${process.env.VITE_PUBLIC_API_URL}/api/user`;
    const resp = await fetch(url, {
      ...getFetchConfig(FetchMethods.GET, token),
    });
    if (!resp.ok) {
      throw new Error("No se pudo obtener el usuario");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    return null;
  }
};
