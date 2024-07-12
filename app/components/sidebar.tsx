import { useLoaderData } from "@remix-run/react";
import { FC, useEffect } from "react";
import Categoria from "~/components/categoria";
import { useQuiosco } from "~/hooks/useQuiosco";
import { loader } from "~/routes/_index";

const Sidebar: FC = () => {
  const { categories, user } = useLoaderData<typeof loader>();
  const { setCategoriaActual, setCategories } = useQuiosco();

  // const handleLogout = async () => {
  //   await logout();
  // };

  useEffect(() => {
    setCategoriaActual(categories[0]);
  }, [categories, setCategoriaActual]);

  useEffect(() => {
    setCategories(categories);
  }, [categories, setCategories]);

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img src="/img/logo.svg" alt="imagen logo" className="w-40" />
      </div>

      <p className="my-10 text-xl text-center">Hola: {user?.name}</p>

      <div className="mt-10">
        {categories.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>

      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          // onClick={handleLogout}
        >
          Cancelar Orden
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
