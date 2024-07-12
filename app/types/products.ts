export type ProductsResponse = {
  data: Product[];
};

export type Product = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  disponible: number;
  categoria_id: number;
  created_at: string;
  updated_at: string;
};

export type ProductInPedido = {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
  cantidad: number;
};
