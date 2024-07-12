export interface CategoriesResponse {
  data: Category[];
}

export interface Category {
  id: number;
  nombre: string;
  icono: string;
}
