import { LoaderFunctionArgs } from "@remix-run/node";
import { Outlet, redirect } from "@remix-run/react";
import { getUser } from "~/actions/user";
import { authCookie } from "~/cookies.server";

export async function loader({ request }: LoaderFunctionArgs) {
  const cookieHeader = request.headers.get("cookie");
  const token = await authCookie.parse(cookieHeader);
  const user = await getUser(token);
  if (user) {
    return redirect("/");
  }
  return null;
}

export default function AuthLayout() {
  return (
    <main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
      <img src="/img/logo.svg" alt="imagen logotipo" className="max-w-xs" />

      <div className="p-10 w-full">
        <Outlet />
      </div>
    </main>
  );
}
