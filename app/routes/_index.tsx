import {
  ActionFunctionArgs,
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/react";
import { logout } from "~/actions/auth";
import { getCategories } from "~/actions/categories";
import { createOrder } from "~/actions/orders";
import { getProducts } from "~/actions/products";
import { getUser } from "~/actions/user";
import Products from "~/components/products";
import Resumen from "~/components/resumen";
import Sidebar from "~/components/sidebar";
import { authCookie } from "~/cookies.server";
import ModalProvider from "~/providers/modal-provider";
import ToastProvider from "~/providers/toast-provider";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const token = await authCookie.parse(cookieHeader);
  if (!token) {
    return redirect("/auth/login");
  }
  const [user, categories, products] = await Promise.all([
    getUser(token),
    getCategories(),
    getProducts(),
  ]);
  if (!user) {
    return redirect("/auth/login");
  }
  return json({
    categories,
    user,
    products,
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const token = await authCookie.parse(cookieHeader);
  if (!token) {
    return redirect("/auth/login");
  }
  const user = await getUser(token);
  if (!user) {
    return redirect("/auth/login");
  }

  const data = await request.json();

  if (data.action === "createOrder") {
    const resp = await createOrder(data, token);
    if (resp) {
      return json({
        message: resp,
      });
    }

    return json({
      message: "Error al crear la orden",
    });
  }

  if (data.action === "logout") {
    await logout(token);
    return redirect("/auth/login");
  }

  return null;
}

export default function Index() {
  return (
    <div className="md:flex">
      <Sidebar />
      <main className="flex-1 h-screen overflow-y-scroll bg-gray-100 p-3">
        <Products />
      </main>
      <Resumen />

      <ModalProvider />
      <ToastProvider />
    </div>
  );
}
