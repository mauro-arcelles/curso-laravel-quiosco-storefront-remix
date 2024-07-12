import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useQuiosco } from "~/hooks/useQuiosco";
import { ProductInPedido } from "~/types/products";
import { formatearDinero } from "~/utils/functions";

const ModalProducto = () => {
  const { producto, setModal, setPedido, pedido } = useQuiosco();
  const [cantidad, setCantidad] = useState(1);
  const [edicion, setEdicion] = useState(false);

  const handleAgregarPedido = (producto: ProductInPedido) => {
    const productoEnPedido = pedido.find(
      (pedidoState) => pedidoState.id === producto.id
    );
    if (productoEnPedido) {
      productoEnPedido.cantidad = producto.cantidad;
      toast.success("Producto actualizado en el pedido");
      setPedido([...pedido]);
    } else {
      setPedido([...pedido, producto]);
      toast.success("Producto agregado al pedido");
    }
  };

  useEffect(() => {
    if (!producto) return;

    const productoEnPedido = pedido.find(
      (pedidoState) => pedidoState.id === producto.id
    );
    if (productoEnPedido) {
      setCantidad(productoEnPedido.cantidad);
      setEdicion(true);
    }
  }, [producto, pedido, producto?.id]);

  if (!producto) {
    return null;
  }

  return (
    <div className="md:flex gap-10">
      <div className="md:w-1/3">
        <img
          src={`/img/${producto.imagen}.jpg`}
          alt={`producto ${producto.nombre}`}
        />
      </div>
      <div className="md:w-2/3">
        <div className="flex justify-end">
          <button onClick={setModal}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        <h1 className="text-3xl font-bold mt-5">{producto.nombre}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatearDinero(producto.precio)}
        </p>

        <div className="flex gap-4 mt-5">
          <button
            type="button"
            onClick={() => {
              if (cantidad <= 1) return;
              setCantidad(cantidad - 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>

          <p className="text-3xl">{cantidad}</p>

          <button
            type="button"
            onClick={() => {
              if (cantidad >= 5) return;
              setCantidad(cantidad + 1);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </button>
        </div>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 mt-5 font-bold uppercase rounded text-white"
          onClick={() => {
            handleAgregarPedido({ ...producto, cantidad });
            setModal();
          }}
        >
          {edicion ? "Guadar cambios" : "Añadir al pedido"}
        </button>
      </div>
    </div>
  );
};

export default ModalProducto;
