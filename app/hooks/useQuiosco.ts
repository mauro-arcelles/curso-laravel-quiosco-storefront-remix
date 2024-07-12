import { create } from "zustand";
import { Category } from "~/types/categories";
import { Product, ProductInPedido } from "~/types/products";

type QuiscoStore = {
  categoriaActual: Category | undefined;
  setCategoriaActual: (categoria: Category) => void;
  pedido: ProductInPedido[];
  setPedido: (pedido: ProductInPedido[]) => void;
  modal: boolean;
  setModal: () => void;
  categories: Category[];
  setCategories: (categories: Category[]) => void;
  producto: Product | undefined;
  setProducto: (producto: Product) => void;
};

export const useQuiosco = create<QuiscoStore>((set) => ({
  categoriaActual: undefined,
  setCategoriaActual: (categoria) => set({ categoriaActual: categoria }),
  pedido: [],
  setPedido: (pedido) => set({ pedido }),
  modal: false,
  setModal: () => set((state) => ({ modal: !state.modal })),
  categories: [],
  setCategories: (categories) => set({ categories }),
  producto: undefined,
  setProducto: (producto) => set({ producto }),
}));
