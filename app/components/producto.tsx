import { FC } from "react";
import { useQuiosco } from "~/hooks/useQuiosco";
import { Product } from "~/types/products";
import { formatearDinero } from "~/utils/functions";

type ProductoProps = {
  producto: Product;
};

const Producto: FC<ProductoProps> = ({ producto }) => {
  const { setModal, setProducto } = useQuiosco();
  const { nombre, imagen, precio } = producto;

  return (
    <div className="border p-3 shadow bg-white">
      <img
        src={`/img/${imagen}.jpg`}
        alt={`imagen ${nombre}`}
        className="w-full"
      />

      <div className="p-5 ">
        <h3 className="text-2xl font-bold">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-amber-500">
          {formatearDinero(precio)}
        </p>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
          onClick={() => {
            setModal();
            setProducto(producto);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default Producto;
