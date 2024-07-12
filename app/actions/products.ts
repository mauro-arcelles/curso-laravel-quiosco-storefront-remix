import { Product, ProductsResponse } from "~/types/products";
import { FetchMethods, getFetchConfig } from "~/utils/fetch";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const url = `${process.env.VITE_PUBLIC_API_URL}/api/productos`;
    const resp = await fetch(url, {
      ...getFetchConfig(FetchMethods.GET, undefined),
    });
    const data: ProductsResponse = await resp.json();
    if (!resp.ok) {
      return [];
    }
    return data.data;
  } catch (error) {
    return [];
  }
};
