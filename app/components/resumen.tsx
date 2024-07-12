"use client";

import { useActionData, useSubmit } from "@remix-run/react";
import { FC, FormEvent, useEffect } from "react";
import { toast } from "react-toastify";
import ResumenProducto from "~/components/resumen-producto";
import { useQuiosco } from "~/hooks/useQuiosco";
import { action } from "~/routes/_index";
import { formatearDinero } from "~/utils/functions";

const Resumen: FC = () => {
  const actionData = useActionData<typeof action>();
  const submit = useSubmit();
  const { pedido, setPedido } = useQuiosco();

  const total = pedido.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  const comprobarPedido = pedido.length === 0;

  const handleSubmitNuevaOrden = async () => {
    try {
      const data = {
        total,
        productos: pedido.map((p) => {
          return {
            id: p.id,
            cantidad: p.cantidad,
          };
        }),
        action: "createOrder",
      };
      submit(data, {
        method: "POST",
        action: "/?index",
        encType: "application/json",
      });

      // toast.success(data);
      // setTimeout(() => {
      //   setPedido([]);
      // }, 1000);
      setTimeout(() => {
        submit(
          {
            action: "logout",
          },
          {
            method: "POST",
            action: "/?index",
            encType: "application/json",
          }
        );
      }, 3000);
    } catch (error) {
      console.log(
        "🚀 ~ file: resumen.tsx:43 ~ handleSubmitNuevaOrden ~ error:",
        error
      );
      toast.error("Hubo un error al crear la orden", (error as any).message);
    }
  };

  useEffect(() => {
    if (actionData) {
      if (actionData.message) {
        toast.success("Orden creada correctamente");
        setPedido([]);
      }
    }
  }, [actionData, setPedido]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmitNuevaOrden();
  };

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">Mi Pedido</h1>
      <p className="text-lg my-5">
        Aquí podrás ver el resumen y totales de tu pedido
      </p>

      <div className="py-10">
        {pedido.length === 0 && (
          <p className="text-center text-2xl">
            No hay elementos en tu pedido aún
          </p>
        )}
        {pedido.length > 0 &&
          pedido.map((producto) => (
            <ResumenProducto key={producto.id} producto={producto} />
          ))}
      </div>

      <p className="text-xl mt-10">Total: {formatearDinero(total)}</p>

      <div className="mt-5">
        <input
          type="submit"
          className={`px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer  ${
            comprobarPedido
              ? "bg-indigo-100"
              : "bg-indigo-600 hover:bg-indigo-800"
          }`}
          value="Confirmar pedido"
          disabled={comprobarPedido}
          onClick={handleSubmit}
        />
      </div>
    </aside>
  );
};

export default Resumen;
