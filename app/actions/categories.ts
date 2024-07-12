import { CategoriesResponse, Category } from "~/types/categories";
import { FetchMethods, getFetchConfig } from "~/utils/fetch";

export const getCategories = async (): Promise<Category[]> => {
  try {
    const url = `${process.env.VITE_PUBLIC_API_URL}/api/categorias`;
    const resp = await fetch(url, {
      ...getFetchConfig(FetchMethods.GET, undefined),
    });
    const data: CategoriesResponse = await resp.json();
    if (!resp.ok) {
      return [];
    }
    return data.data;
  } catch (error) {
    return [];
  }
};
