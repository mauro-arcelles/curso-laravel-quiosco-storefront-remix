import { useLoaderData } from "@remix-run/react";
import { FC, useEffect, useState } from "react";
import Producto from "~/components/producto";
import { useQuiosco } from "~/hooks/useQuiosco";
import { loader } from "~/routes/_index";
import { Product } from "~/types/products";

const Products: FC = () => {
  const { products } = useLoaderData<typeof loader>();
  const { categoriaActual } = useQuiosco();
  const [localProducts, setLocalProducts] = useState<Product[]>(products);

  // useEffect(() => {
  //   const initProducts = async () => {
  //     const products = await getProducts();
  //     setAllProducts(products);
  //   };

  //   initProducts();
  // }, []);

  useEffect(() => {
    if (!categoriaActual) return;

    const filteredProducts = products.filter(
      (product) => product.categoria_id === categoriaActual.id
    );

    setLocalProducts(filteredProducts);
  }, [categoriaActual, products]);

  return (
    <>
      <h1 className="text-4xl font-black">{categoriaActual?.nombre}</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a confirmación
      </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        {localProducts.map((producto) => (
          <Producto key={producto.id} producto={producto} />
        ))}
      </div>
    </>
  );
};

export default Products;
