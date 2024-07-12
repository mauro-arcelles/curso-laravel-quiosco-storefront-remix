import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect, useActionData } from "@remix-run/react";
import { login } from "~/actions/auth";
import Alerta from "~/components/alerta";
import { authCookie } from "~/cookies.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = await login({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });
  if (data.token) {
    const cookie = await authCookie.serialize(data.token);
    return redirect("/", {
      headers: {
        "Set-Cookie": cookie,
      },
    });
  }

  return json({
    errors: data.errors,
  });
};

export default function AuthLogin() {
  const actionData = useActionData<typeof action>();
  const errores: string[] = [];
  if (actionData) {
    if (Array.isArray(actionData.errors)) {
      errores.push(...actionData.errors);
    } else {
      Object.values(actionData.errors).forEach((error: any) => {
        errores.push(error[0]);
      });
    }
  }

  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p>Para crear un pedido debes iniciar sesión</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <Form method="post" noValidate>
          {errores &&
            errores.map((error, index) => <Alerta key={index}>{error}</Alerta>)}

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu email"
              // ref={emailRef}
            />
          </div>

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password">
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-2 w-full p-3 bg-gray-50"
              placeholder="Tu password"
              // ref={passwordRef}
            />
          </div>

          <input
            type="submit"
            value="Ingresar"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          />
        </Form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/register">¿No tienes cuenta? Crea una</Link>
      </nav>
    </>
  );
}
