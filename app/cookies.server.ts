import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const authCookie = createCookie(
  process.env.VITE_PUBLIC_AUTH_COOKIE_NAME!
);
